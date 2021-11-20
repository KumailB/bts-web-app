import { Client } from "../../lib/types";

const client: Client = {};
const res = await fetch(graphqlEndpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: GET_CLIENT,
    variables: {
      id: {}.id,
    },
  }),
})
const {data} = await res.json();
if(!data || !data.getClient){
  return {};
}
const client: Client = {
  id: data.getUser.id,
  email: email,
  firstName: data.getUser.first_name,
  lastName: data.getUser.last_name,
  userType: data.getUser.user_type, 
  phoneNum: data.getClient.phone_num,
  cellNum: data.getClient.cell_phone_num,
  balance: data.getClient.usd,
  wallet: data.getClient.btc,
  level: (data.getClient.level == 1) ? 'Silver' : 'Gold',
  lastUpdate: data.getClient.last_update,
  traderId: data.getClient.trader_id,
};