import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { ClientType } from '../TypeDefs/Client';
import { Client } from "../../Entities/Client";
import { resolveModuleName } from "typescript";
import { User } from "../../Entities/User";
import { UserType } from "../TypeDefs/User";

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

export const GET_ALL_CLIENTS = {
    type: new GraphQLList(ClientType),
    args: {
    },
    async resolve(parent: any, args: any){
        const users: User[] = await User.find();
        let ids: number[] = [];
        users.forEach( user => ids.push(user.id));
        const clients = await Client.findByIds(ids);
        return clients;
    }
}