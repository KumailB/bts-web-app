export type PaymentType = 'USD' | 'BTC';

export type OrderType = 'BUY' | 'SELL';

export type Status = 'Pending' | 'Completed' | 'Cancelled';

export type Level = 'Silver' | 'Gold';

export type UserType = 'Client' | 'Trader' | 'Manager';

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
  date: Date;
  commissionPaid: number;
  status: Status;
  traderId: number;
  clientId: number;
  orderType: OrderType;
  traderName?: string;
  clientName?: string;
}

export interface Client extends User{
  phoneNum?: string;
  cellNum?: string;
  balance: number;
  wallet: number;
  level: Level;
  lastUpdate: Date;
  traderId: number;
  traderName?: string; 
}

export interface Trader extends User{
}

export interface Manager extends User{
}
