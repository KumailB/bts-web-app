export type PaymentType = 'USD' | 'BTC';

export type OrderType = 'BUY' | 'SELL';

export type Status = 'Pending' | 'Completed' | 'Cancelled';

export type Level = 'Silver' | 'Gold';

export type UserType = 'Client' | 'Trader' | 'Manager';

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  userType: UserType;
}

export interface Transaction {
  id: number;
  commissionType: PaymentType;
  value: number;
  date: string;
  commissionPaid: number;
  status: Status;
  convRate: number;
  traderId: number;
  clientId: number;
  orderType: OrderType;
  client?: Client;
  trader?: Trader;
}

export interface Client extends User{
  address: Address;
  phoneNum?: string;
  cellNum?: string;
  balance: number;
  wallet: number;
  level: Level;
  lastUpdate: string;
  traderId: number;
  traderName?: string; 
}

export interface Trader extends User{
}

export interface Manager extends User{
}
