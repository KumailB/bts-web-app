import { GraphQLID, GraphQLString } from "graphql";
import { ClientType } from '../TypeDefs/Client';
import { Client } from "../../Entities/Client";
import { resolveModuleName } from "typescript";
import { User } from "../../Entities/User";

export const GET_CLIENT = {
    type: ClientType,
    args: {
        id: { type: GraphQLID},
    },
    async resolve(parent: any, args: any){
        const { id } = args;
        const client = await Client.findOne({id: id})
        return client;
    }
}