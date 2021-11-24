import { Client, Payment, Transaction, User } from "../../lib/types";
import {
  GET_PENDING_PAYMENTS,
  GET_PENDING_TRANSACTIONS,
  GET_SEARCH_CLIENTS,
} from "./graphql/Queries";
import graphqlEndpoint from "./graphql/index";
import { getUser } from "./login";
import apollo from "./apollo";
import { getClient } from "./client";
import { UPDATE_CLIENT, UPDATE_PAYMENT, UPDATE_TRANSACTION } from "./graphql/Mutations";

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
      convRate: transac.conv_rate,
    };

    transactions.push(transaction);
  });
  for (const transaction of transactions) {
    const client = await getUser(transaction.clientId);
    if (client) transaction.client = <Client>client;
  }

  return transactions;
};

export const getPendingPayments = async (
  trader_id: number
): Promise<Payment[] | undefined> => {
  if (!trader_id) {
    return;
  }

  const { data } = await apollo.query({
    query: GET_PENDING_PAYMENTS,
    variables: {
      trader_id: trader_id,
    },
  });

  if (!data || !data.getPendingPayments) {
    return;
  }
  const payments: Payment[] = [];
  await data.getPendingPayments.forEach((pay: any) => {
    const payment: Payment = {
      id: pay.id,
      value: pay.value,
      date: pay.date,
      status: pay.status,
      traderId: pay.trader_id,
      clientId: pay.client_id,
    };

    payments.push(payment);
  });
  for (const payment of payments) {
    const client = await getUser(payment.clientId);
    if (client) payment.client = <Client>client;
  }

  return payments;
};

export const updateTransaction = async (
  id: number, status: string
): Promise<boolean | undefined> => {
  if (!id || !status) {
    return false;
  }

  const { data } = await apollo.mutate({
    mutation: UPDATE_TRANSACTION,
    variables: {
      id: id,
      status: status,
    }
  })
  return true;
};

export const updatePayment = async (
  id: number, status: string
): Promise<boolean | undefined> => {
  if (!id || !status) {
    return false;
  }

  const { data } = await apollo.mutate({
    mutation: UPDATE_PAYMENT,
    variables: {
      id: id,
      status: status,
    }
  })
  return true;
};

export const updateClient = async (
  id: number, usd: number, btc: number
): Promise<boolean | undefined> => {
  if (!id) {
    return false;
  }

  const { data } = await apollo.mutate({
    mutation: UPDATE_CLIENT,
    variables: {
      id: id,
      usd: usd,
      btc: btc,
    }
  })
  return true;
};

export const getSearchResults = async (
  firstName: string,
  lastName: string,
  address: string,
  city: string,
  state: string,
  zip: string
): Promise<Client[] | undefined> => {
  const { data } = await apollo.query({
    query: GET_SEARCH_CLIENTS,
    variables: {
      first_name: firstName,
      last_name: lastName,
      street_address: address,
      city: city,
      state: state,
      zip_code: zip,
    },
  });
  if (!data || !data.getSearchClients) {
    return;
  }
  const clients: Client[] = [];
  await data.getSearchClients.forEach(async (search: any) => {
    const user: User = {
      id: search.id,
      email: search.email,
      firstName: search.first_name,
      lastName: search.last_name,
      userType: 'Client',
    };

    const client = await getClient(user, false);
    if (client)
      clients.push(<Client>client);
  });

  return clients;
};
