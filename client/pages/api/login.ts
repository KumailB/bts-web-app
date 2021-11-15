import { User, Client, Trader, Manager } from "../../lib/types";
import { GET_USER, GET_CLIENT } from "./graphql/Queries";
import graphqlEndpoint from "./graphql/index";

export const tryLogin = async (email: string, password: string): Promise<Client|Trader|Manager|undefined> => {
  // TODO: Return actual event info
  const res = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_USER,
        variables: {
          email: email,
        },
      }),
    })
    const {data} = await res.json();
    console.log(data);
    if(!data.getUser){
      return;
    }
    else if(data.getUser.pw != password){
      return;
    }
    
    const loginUser: User = {
      id: data.getUser.id,
      email: data.getUser.email,
      firstName: data.getUser.first_name,
      lastName: data.getUser.last_name,
      userType: (data.getUser.user_type == 'client') ? 'Client' : ((data.getUser.user_type == 'trader') ? 'Trader' : 'Manager'),
    };

    return loginUser;
};

export const getUser = async (email: string): Promise<Client|Trader|Manager|undefined> => {
  // TODO: Return actual event info
  const res = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: GET_USER,
        variables: {
          email: email,
        },
      }),
    })
    const {data} = await res.json();
    console.log(email);
    console.log(data);
    if(!data.getUser){
      return;
    }
    
    const loginUser: User = {
      id: data.getUser.id,
      email: email,
      firstName: data.getUser.first_name,
      lastName: data.getUser.last_name,
      userType: (data.getUser.user_type == 'client') ? 'Client' : ((data.getUser.user_type == 'trader') ? 'Trader' : 'Manager'),
    };
    console.log(loginUser);
    if(loginUser.userType === 'Client'){
      const loginClient = <Client> loginUser;
      // loginClient.phoneNum = data.getUser.phone_num;
      // loginClient.cellNum = data.getUser.cell_phone_num;
      // loginClient.balance = data.getUser.usd;
      // loginClient.wallet = data.getUser.btc;
      // loginClient.level = (data.getUser.level == 1) ? 'Silver' : 'Gold';
      // loginClient.lastUpdate = new Date(data.getUser.last_update);
      // loginClient.traderId = data.getUser.trader_id;
      return loginClient;
    }
    
    return loginUser;
};
