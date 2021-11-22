import { Client, Transaction } from "../../lib/types";
import { GET_PENDING_TRANSACTIONS } from "./graphql/Queries";
import graphqlEndpoint from "./graphql/index";
import { getUser } from "./login";
import apollo from "./apollo";
import { getClient } from "./client";

export const getPendingTransactions = async (
  trader_id: number
): Promise<Transaction[] | undefined> => {
  if (!trader_id) {
    return;
  }
  
  const { data } = await apollo.query({
    query: GET_PENDING_TRANSACTIONS,
    variables: {
      trader_id: trader_id,
    },
  });
  if (!data || !data.getPendingTransactions) {
    return;
  }
  const transactions: Transaction[] = [];
  await data.getPendingTransactions.forEach((transac: any) => {
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

    transactions.push(transaction);
  });
  for (const transaction of transactions) {
    const client = await getUser(transaction.clientId);
    if(client)
      transaction.client = <Client> client;

  }
  
  return transactions;
};
