import graphqlEndpoint from "./graphql/index";

export const getLevelRate = async (level: number): Promise<number> => {

  // const res = await fetch(graphqlEndpoint, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       query: GET_COMMISSION_RATE,
  //       variables: {
  //         classification: level,
  //       },
  //     }),
  //   })
  //   const {data} = await res.json();
  //   console.log(data);
  //   if(!data || !data.getUser){
  //     return;
  //   }
  //   else if(data.getUser.pw != password){
  //     return;
  //   }
    
  //   const loginUser: User = {
  //     id: data.getUser.id,
  //     email: data.getUser.email,
  //     firstName: data.getUser.first_name,
  //     lastName: data.getUser.last_name,
  //     userType: (data.getUser.user_type == 'client') ? 'Client' : ((data.getUser.user_type == 'trader') ? 'Trader' : 'Manager'),
  //   };

    return 0.03;
};