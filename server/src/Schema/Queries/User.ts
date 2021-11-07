import { GraphQLString } from "graphql";
import { UserType } from '../TypeDefs/User';
import { User } from "../../Entities/User";
import { resolveModuleName } from "typescript";

export const GET_USER = {
    type: UserType,
    args: {
        email: { type: GraphQLString},
    },
    async resolve(parent: any, args: any){
        const { email } = args;
        const user = await User.findOne({email: email})
        return user;
    }
}