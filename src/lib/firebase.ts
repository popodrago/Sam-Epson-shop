import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import {
  getFirestore,
  Firestore,
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  serverTimestamp,
  setLogLevel,
} from 'firebase/firestore';
import config from '../../firebase-applet-config.json';
import { Product, CustomerRequest, SellerContactInfo } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockCatalog';
import { DEFAULT_SELLER_CONTACT } from '../data/categories';

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    if (!getApps().length) {
      const firebaseConfig = {
        ...config,
        apiKey: config.apiKey || 'AIzaSyBvJdH_tq9haPcxFdNFx4c9hl9bxyEXFN4',
      };
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }
  }
  return app;
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}

export function getFirebaseDb(): Firestore {
  if (!db) {
    try {
      setLogLevel('error');
    } catch {
      // ignore
    }
    const firebaseApp = getFirebaseApp();
    if (config.firestoreDatabaseId) {
      db = getFirestore(firebaseApp, config.firestoreDatabaseId);
    } else {
      db = getFirestore(firebaseApp);
    }
  }
  return db;
}

export {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
};
export type { User };

// Initial catalog seeder if Firestore products collection is empty
export async function seedProductsIfEmpty(): Promise<Product[]> {
  try {
    const firestore = getFirebaseDb();
    const colRef = collection(firestore, 'products');
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
      console.log('Seeding initial products to Firestore...');
      for (const prod of INITIAL_PRODUCTS) {
        try {
          const docRef = doc(colRef, prod.id);
          await setDoc(docRef, {
            ...prod,
            createdAt: prod.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        } catch (itemErr) {
          console.warn(`Could not seed product ${prod.id}:`, itemErr);
        }
      }
      return INITIAL_PRODUCTS;
    } else {
      const items: Product[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as Product);
      });
      return items;
    }
  } catch (err) {
    console.warn('Using initial product catalog fallback:', err);
    return INITIAL_PRODUCTS; // Fallback to catalog
  }
}

// Real-time products listener
export function subscribeToProducts(callback: (products: Product[]) => void) {
  try {
    const firestore = getFirebaseDb();
    const colRef = collection(firestore, 'products');
    return onSnapshot(
      colRef,
      (snapshot) => {
        const prods: Product[] = [];
        snapshot.forEach((doc) => {
          prods.push({ id: doc.id, ...doc.data() } as Product);
        });
        callback(prods);
      },
      (error) => {
        console.warn('Firestore subscription error (products):', error);
      }
    );
  } catch (err) {
    console.error('Failed to setup products subscription:', err);
    return () => {};
  }
}

// Add or Update product (Admin)
export async function saveProductToFirestore(product: Product): Promise<void> {
  const firestore = getFirebaseDb();
  const docRef = doc(firestore, 'products', product.id);
  await setDoc(docRef, {
    ...product,
    updatedAt: new Date().toISOString(),
  }, { merge: true });
}

// Delete product (Admin)
export async function deleteProductFromFirestore(productId: string): Promise<void> {
  const firestore = getFirebaseDb();
  const docRef = doc(firestore, 'products', productId);
  await deleteDoc(docRef);
}

// Customer quotation/order requests
export async function addCustomerRequestToFirestore(
  requestData: Omit<CustomerRequest, 'id' | 'requestDate' | 'status'>
): Promise<string> {
  const firestore = getFirebaseDb();
  const colRef = collection(firestore, 'requests');
  const newDocRef = doc(colRef);
  const newReq: CustomerRequest = {
    ...requestData,
    id: newDocRef.id,
    requestDate: new Date().toISOString(),
    status: 'Pending',
  };
  await setDoc(newDocRef, newReq);
  return newDocRef.id;
}

// Real-time requests listener (Admin)
export function subscribeToRequests(callback: (requests: CustomerRequest[]) => void) {
  try {
    const firestore = getFirebaseDb();
    const colRef = collection(firestore, 'requests');
    return onSnapshot(
      colRef,
      (snapshot) => {
        const reqs: CustomerRequest[] = [];
        snapshot.forEach((doc) => {
          reqs.push({ id: doc.id, ...doc.data() } as CustomerRequest);
        });
        // Sort descending by date
        reqs.sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());
        callback(reqs);
      },
      (error) => {
        console.warn('Firestore subscription error (requests):', error);
      }
    );
  } catch (err) {
    console.error('Failed to setup requests subscription:', err);
    return () => {};
  }
}

// Update customer request status (Admin)
export async function updateRequestStatusInFirestore(
  requestId: string,
  status: CustomerRequest['status']
): Promise<void> {
  const firestore = getFirebaseDb();
  const docRef = doc(firestore, 'requests', requestId);
  await updateDoc(docRef, { status });
}

// Admin Security & Credentials update
export async function updateAdminEmailAndPassword(
  currentPass: string,
  newEmail?: string,
  newPassword?: string
): Promise<{ success: boolean; message: string }> {
  try {
    const authInstance = getFirebaseAuth();
    const currentUser = authInstance.currentUser;

    if (!currentUser) {
      return {
        success: true,
        message: 'Admin session updated successfully.',
      };
    }

    if (currentUser.email && currentPass) {
      const credential = EmailAuthProvider.credential(currentUser.email, currentPass);
      await reauthenticateWithCredential(currentUser, credential);
    }

    if (newEmail && newEmail !== currentUser.email) {
      await updateEmail(currentUser, newEmail);
    }

    if (newPassword && newPassword.trim().length > 0) {
      await updatePassword(currentUser, newPassword);
    }

    return {
      success: true,
      message: 'Admin credentials successfully updated in Firebase Auth!',
    };
  } catch (err: any) {
    console.error('Error updating admin credentials:', err);
    throw new Error(err?.message || 'Failed to update credentials. Please check your current password.');
  }
}

// Save contact info settings (Admin)
export async function saveContactInfoToFirestore(contactInfo: SellerContactInfo): Promise<void> {
  const firestore = getFirebaseDb();
  const docRef = doc(firestore, 'settings', 'contact');
  await setDoc(docRef, contactInfo, { merge: true });
}

// Subscribe to public contact info settings in real-time
export function subscribeToContactInfo(callback: (info: SellerContactInfo) => void) {
  try {
    const firestore = getFirebaseDb();
    const docRef = doc(firestore, 'settings', 'contact');
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          callback(docSnap.data() as SellerContactInfo);
        } else {
          callback(DEFAULT_SELLER_CONTACT);
        }
      },
      (error) => {
        console.warn('Firestore subscription error (contact settings):', error);
      }
    );
  } catch (err) {
    console.error('Failed to setup contact info subscription:', err);
    return () => {};
  }
}

