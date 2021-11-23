import { Client, Transaction, User } from "../../lib/types";
import apollo from "./apollo";
import { CREATE_TRANSACTION } from "./graphql/Mutations";
import { GET_ADDRESS, GET_CLIENT, GET_CLIENT_LOGIN } from "./graphql/Queries";

export const getClient = async (
  user: User,
  login: boolean
): Promise<User | Client | undefined> => {
  if (user.userType != "Client") return user;

  const { data } = await apollo.query(
    login
      ? {
          query: GET_CLIENT_LOGIN,
          variables: {
            id: user.id,
          },
        }
      : {
          query: GET_CLIENT,
          variables: {
            id: user.id,
          },
        }
  );
  const client = <Client>user;
  if (!data || !data.getClient) {
    return user;
  }
  client.phoneNum = data.getClient.phone_num;
  client.cellNum = data.getClient.cell_phone_num;
  client.balance = data.getClient.usd;
  client.wallet = data.getClient.btc;
  client.level = data.getClient.level == 1 ? "Silver" : "Gold";
  client.lastUpdate = data.getClient.last_update;
  client.traderId = data.getClient.trader_id;

  const adRes = await apollo.query({
    query: GET_ADDRESS,
    variables: {
      client_id: user.id,
    },
  });

  if (!adRes.data || !adRes.data.getAddress) {
    return client;
  }
  const address = {
    street: adRes.data.getAddress.street_address,
    city: adRes.data.getAddress.city,
    state: adRes.data.getAddress.state,
    zip: adRes.data.getAddress.zip_code,
  };
  client.address = address;
  return client;
};

export const createTransaction = async (
  transac: Transaction
): Promise<boolean|undefined> => {
  const { data } = await apollo.mutate({
    mutation: CREATE_TRANSACTION,
    variables: {
      commission_payment_type: transac.commissionType,
      value: transac.value,
      commission_paid: transac.commissionPaid,
      status: transac.status,
      trader_id: transac.traderId,
      client_id: transac.clientId,
      order_type: transac.orderType,
      conv_rate: transac.convRate,
    }
  })
  return true;
};