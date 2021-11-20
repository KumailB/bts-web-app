import { Transaction } from "../../lib/types";
import { GET_PENDING_TRANSACTIONS } from "./graphql/Queries";
import graphqlEndpoint from "./graphql/index";
import { getUserName } from "./login";

export const getPendingTransactions = async (trader_id: number): Promise<Transaction[]|undefined> => {

  if(!trader_id){
    return;
  }

  const res = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_PENDING_TRANSACTIONS,
        variables: {
          trader_id: trader_id,
        },
      }),
    })
    const {data} = await res.json();
    if(!data || !data.getPendingTransactions){
      return;
    }
    const transactions: Transaction[] = [];
    await data.getPendingTransactions.forEach( (transac: any) => {
      const transaction: Transaction = {
        id: transac.id,
        value: transac.value,
        date: transac.date,
        commissionPaid: transac.commission_paid,
        commissionType: transac.commission_payment_type,
        status: transac.status,
        traderId: transac.trader_id,
        clientId: transac.client_id,
        orderType: transac.order_type,
      };
      
      
      console.log(transaction);
      transactions.push(transaction);
    });
    for(const transaction of transactions){
      const clientNames = await getUserName(transaction.clientId);
      transaction.clientName = clientNames?.firstName +" "+ clientNames?.lastName;
    }
    return transactions;
};
