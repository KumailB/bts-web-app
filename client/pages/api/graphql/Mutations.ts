import { gql } from "@apollo/client";

export const CREATE_TRANSACTION = gql`
  mutation createTransaction(
    $commission_payment_type: String!
    $value: Float!
    $commission_paid: Float!
    $status: String!
    $trader_id: ID!
    $client_id: ID!
    $order_type: String!
    $conv_rate: Float!
  ) {
    createTransaction(
      commission_payment_type: $commission_payment_type
      value: $value
      commission_paid: $commission_paid
      status: $status
      trader_id: $trader_id
      client_id: $client_id
      order_type: $order_type
      conv_rate: $conv_rate
    ) {
      id
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation updateTransaction($id: ID!, $status: String!) {
    updateTransaction(id: $id, status: $status) {
      id
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation updateClient($id: ID!, $usd: Float!, $btc: Float!) {
    updateClient(id: $id, usd: $usd, btc: $btc) {
      id
    }
  }
`;

