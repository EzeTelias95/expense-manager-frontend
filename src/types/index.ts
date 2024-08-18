export interface Category {
  id: number;
  name: string;
}

export interface ExpenseGroup {
  id: number;
  name: string;
}

export interface Budget {
  id: number;
  amount: number;
  start_date: string;
  end_date: string;
  group?: number;
  category?: number;
}

export interface Expense {
  id: number;
  amount: number;
  description: string;
  date: string;
  category?: number;
  category_name?: string;
  groups: ExpenseGroup[];
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}
