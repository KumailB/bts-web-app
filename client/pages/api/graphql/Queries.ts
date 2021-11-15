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