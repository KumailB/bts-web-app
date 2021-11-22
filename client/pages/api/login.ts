import { User, Client, Trader, Manager } from "../../lib/types";
import {
  GET_USER,
  GET_CLIENT,
  GET_ADDRESS,
  GET_USER_FROM_ID,
} from "./graphql/Queries";
import graphqlEndpoint from "./graphql/index";
import apollo from "./apollo";
import { getClient } from "./client";

export const tryLogin = async (
  email: string,
  password: string
): Promise<Client | Trader | Manager | undefined> => {
  const { data } = await apollo.query({
    query: GET_USER,
    variables: {
      email: email,
    },
  });
  if (!data || !data.getUser) {
    return;
  } else if (data.getUser.pw != password) {
    return;
  }

  const loginUser: User = {
    id: data.getUser.id,
    email: email,
    firstName: data.getUser.first_name,
    lastName: data.getUser.last_name,
    userType:
      data.getUser.user_type == "client"
        ? "Client"
        : data.getUser.user_type == "trader"
        ? "Trader"
        : "Manager",
  };

  if (loginUser.userType === "Client") {
    const loginClient = await getClient(loginUser, true);
    return loginClient;
  }

  return loginUser;
};

export const getUser = async (id: number): Promise<Object | undefined> => {
  
  const { data } = await apollo.query({
    query: GET_USER_FROM_ID,
    variables: {
      id: id
    },
  });
  if (!data || !data.getUserFromId) {
    return;
  }

  const user: User = {
    id: data.getUserFromId.id,
    email: data.getUserFromId.email,
    firstName: data.getUserFromId.first_name,
    lastName: data.getUserFromId.last_name,
    userType:
      data.getUserFromId.user_type == "client"
        ? "Client"
        : data.getUserFromId.user_type == "trader"
        ? "Trader"
        : "Manager",
  };

  if (user.userType === "Client") {
    const client = await getClient(user, false);
    return client;
  }

  return user;
};
