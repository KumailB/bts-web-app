export const GET_USER = `
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

export const GET_USER_NAME = `
  query getUserName($id: ID!) {
    getUserName(id: $id){
      first_name
      last_name
    }
  }
`;

export const GET_CLIENT = `
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

export const GET_ADDRESS = `
  query getAddress($client_id: ID!) {
    getAddress(client_id: $client_id){
      street_address
      city
      state
      zip_code
    }
  }
`;

export const GET_PENDING_TRANSACTIONS = `
  query getPendingTransactions($trader_id: ID!) {
    getPendingTransactions(trader_id: $trader_id){
      id
      value
      date
      commission_paid
      commission_payment_type
      status
      trader_id
      client_id
      order_type
    }
  }
`;