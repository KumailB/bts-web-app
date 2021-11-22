import { GraphQLID, GraphQLString } from "graphql";
import { UserNameType, UserType } from "../TypeDefs/User";
import { User } from "../../Entities/User";

export const GET_USER = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { email } = args;
    const user = await User.findOne({ email: email });
    return user;
  },
};

export const GET_USER_FROM_ID = {
  type: UserType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { id } = args;
    const user = await User.findOne({ id: id });
    return user;
  },
};