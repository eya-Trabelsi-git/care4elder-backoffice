export interface Invoice {
  id?: string;
  reference: string;
  amount: number;
  description: string;
  status: 'UNPAID' | 'PAID' | 'CANCELLED';
  dueDate: string;
  dateCreation: string;
}
