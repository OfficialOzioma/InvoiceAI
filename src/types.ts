export type PlanType = 'free' | 'pro';
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  onboarded: boolean;
  activeWorkspace?: string;
  createdAt: number;
}

export interface Workspace {
  id: string;
  name: string;
  ownerId: string;
  logoUrl?: string;
  currency: string;
  address?: string;
  contactEmail?: string;
  taxId?: string;
  paystackPublicKey?: string;
  paystackSecretKey?: string;
  plan: PlanType;
  aiCredits: number;
  createdAt: number;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  workspaceId: string;
  clientId: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  notes?: string;
  templateId: string;
  createdAt: number;
  updatedAt: number;
}

export interface Client {
  id: string;
  workspaceId: string;
  name: string;
  email: string;
  address?: string;
  phone?: string;
  createdAt: number;
}
