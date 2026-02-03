import { 
  collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc,
  query, where, orderBy, Timestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { Product, PersonalizationConfig, User, Quotation, LocationTemplate, UploadedDesign } from '@/types';

// Products
export async function getProducts(): Promise<Product[]> {
  const snap = await getDocs(collection(db, 'products'));
  return snap.docs.map(d => {
    const data = d.data() as Product;
    return { ...data, id: d.id };
  });
}

export async function getProductById(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, 'products', id));
  if (!snap.exists()) return null;
  const data = snap.data() as Product;
  return { ...data, id: snap.id };
}

export async function createProduct(product: Omit<Product, 'id'>): Promise<string> {
  const ref = doc(collection(db, 'products'));
  await setDoc(ref, product);
  return ref.id;
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  await updateDoc(doc(db, 'products', id), data as any);
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, 'products', id));
}

// Personalization configs
export async function getPersonalizationConfig(technique: 'DTF' | 'DTG'): Promise<PersonalizationConfig | null> {
  const snap = await getDoc(doc(db, 'personalization_configs', technique));
  return snap.exists() ? (snap.data() as PersonalizationConfig) : null;
}

export async function savePersonalizationConfig(config: PersonalizationConfig): Promise<void> {
  await setDoc(doc(db, 'personalization_configs', config.technique), config);
}

export async function getLocationTemplates(productId: string): Promise<LocationTemplate[]> {
  const snap = await getDoc(doc(db, 'location_templates', productId));
  return snap.exists() ? (snap.data()?.locations ?? []) as LocationTemplate[] : [];
}

// Users
export async function getUserById(uid: string): Promise<User | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  const data = snap.data() as User;
  return { ...data, uid: snap.id };
}

export async function createUser(user: Partial<User> & { uid: string }): Promise<void> {
  await setDoc(doc(db, 'users', user.uid), {
    ...user,
    createdAt: Timestamp.now(),
    active: true,
  });
}

export async function updateUser(uid: string, data: Partial<User>): Promise<void> {
  await updateDoc(doc(db, 'users', uid), data as any);
}

export async function getClientsByCommercial(commercialId: string): Promise<User[]> {
  const q = query(
    collection(db, 'users'),
    where('assignedTo', '==', commercialId),
    where('role', '==', 'client')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => {
    const data = d.data() as User;
    return { ...data, uid: d.id };
  });
}

// Quotations
export async function createQuotation(quotation: Omit<Quotation, 'id'>): Promise<string> {
  const ref = doc(collection(db, 'quotations'));
  await setDoc(ref, quotation);
  return ref.id;
}

export async function getQuotationById(id: string): Promise<Quotation | null> {
  const snap = await getDoc(doc(db, 'quotations', id));
  if (!snap.exists()) return null;
  const data = snap.data() as Quotation;
  return { ...data, id: snap.id };
}

export async function updateQuotationStatus(id: string, status: Quotation['status']): Promise<void> {
  await updateDoc(doc(db, 'quotations', id), { status } as any);
}

export async function getQuotationsByClient(clientId: string): Promise<Quotation[]> {
  const q = query(collection(db, 'quotations'), where('clientId', '==', clientId), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => {
    const data = d.data() as Quotation;
    return { ...data, id: d.id };
  });
}

// Orders
export async function createOrder(order: any): Promise<string> {
  const ref = doc(collection(db, 'orders'));
  await setDoc(ref, order);
  return ref.id;
}

export async function updateOrderStatus(id: string, status: any): Promise<void> {
  await updateDoc(doc(db, 'orders', id), { status } as any);
}

export async function getOrdersByClient(clientId: string): Promise<any[]> {
  const q = query(collection(db, 'orders'), where('clientId', '==', clientId), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => {
    const data = d.data();
    return { ...data, id: d.id };
  });
}

export async function getOrderById(id: string): Promise<any | null> {
  const snap = await getDoc(doc(db, 'orders', id));
  if (!snap.exists()) return null;
  return { ...snap.data(), id: snap.id };
}

export async function getAllOrders(): Promise<any[]> {
  const snap = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc')));
  return snap.docs.map(d => {
    const data = d.data();
    return { ...data, id: d.id };
  });
}

// Uploaded designs
export async function saveUploadedDesign(design: Omit<UploadedDesign, 'id'>): Promise<string> {
  const ref = doc(collection(db, 'uploaded_designs'));
  await setDoc(ref, design);
  return ref.id;
}

export async function getUserDesigns(userId: string): Promise<UploadedDesign[]> {
  const q = query(collection(db, 'uploaded_designs'), where('userId', '==', userId), orderBy('uploadedAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => {
    const data = d.data() as UploadedDesign;
    return { ...data, id: d.id };
  });
}
