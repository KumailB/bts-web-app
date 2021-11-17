import { User, Client, Trader, Manager } from "../../lib/types";
import { GET_USER, GET_CLIENT } from "./graphql/Queries";
import graphqlEndpoint from "./graphql/index";

export const tryLogin = async (email: string, password: string): Promise<Client|Trader|Manager|undefined> => {

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
    if(!data || !data.getUser){
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

    if(loginUser.userType === 'Client'){
      const loginClient = <Client> loginUser;
      const res = await fetch(graphqlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: GET_CLIENT,
          variables: {
            id: loginUser.id,
          },
        }),
      })
      const {data} = await res.json();
      if(!data || !data.getClient){
        return loginUser;
      }
      loginClient.phoneNum = data.getClient.phone_num;
      loginClient.cellNum = data.getClient.cell_phone_num;
      loginClient.balance = data.getClient.usd;
      loginClient.wallet = data.getClient.btc;
      loginClient.level = (data.getClient.level == 1) ? 'Silver' : 'Gold';
      loginClient.lastUpdate = data.getClient.last_update;
      loginClient.traderId = data.getClient.trader_id;
      return loginClient;
    }
    
    return loginUser;
};
