import { GraphQLFloat, GraphQLID } from "graphql";
import { QueryPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Client } from "../../Entities/Client";
import { ClientType } from "../TypeDefs/Client";

export const UPDATE_CLIENT = {
  type: ClientType,
  args: {
    id: { type: GraphQLID },
    usd: { type: GraphQLFloat },
    btc: { type: GraphQLFloat },
  },
  async resolve(parent: any, args: any) {
    const { id, usd, btc } = args;
    let updateArgs: QueryPartialEntity<Client> = {};
    if (usd) updateArgs.usd = usd;
    if (btc) updateArgs.btc = btc;
    await Client.update({ id: id }, updateArgs);
    return args;
  },
};
