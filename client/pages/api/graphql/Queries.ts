import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($email: String!) {
    getUser(email: $email){
      id
      first_name
      last_name
      pw
      user_type
    }
  }
`;

export const GET_USER_FROM_ID = gql`
  query getUserFromId($id: ID!) {
    getUserFromId(id: $id){
      id
      email
      first_name
      last_name
      user_type
    }
  }
`;

export const GET_CLIENT_LOGIN = gql`
  query getClient($id: ID!) {
    getClient(id: $id){
      id
      phone_num
      cell_phone_num
      usd
      btc
      level
      last_update
      trader_id
    }
  }
`;

export const GET_CLIENT = gql`
  query getClient($id: ID!) {
    getClient(id: $id){
      id
      phone_num
      cell_phone_num
      usd
      btc
      level
      last_update
      trader_id
    }
  }
`;

export const GET_ADDRESS = gql`
  query getAddress($client_id: ID!) {
    getAddress(client_id: $client_id){
      street_address
      city
      state
      zip_code
    }
  }
`;

export const GET_PENDING_TRANSACTIONS = gql`
  query getPendingTransactions($trader_id: ID!) {
    getPendingTransactions(trader_id: $trader_id){
      id
      value
      date
      commission_paid
      commission_payment_type
      conv_rate
      status
      trader_id
      client_id
      order_type
    }
  }
`;