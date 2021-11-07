import { GraphQLString } from 'graphql';
import { User } from '../../Entities/User';
import { UserType } from '../TypeDefs/User';

export const CREATE_USER = {
    type: UserType,
    args: {
      email: { type: GraphQLString },
      pw: { type: GraphQLString },
    },
    async resolve(parent: any, args: any) {
      const { email, pw } = args;
      await User.insert({ email, pw });
      return args;
    },
  };