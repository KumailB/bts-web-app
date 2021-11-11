import { GraphQLFloat, GraphQLID, GraphQLString } from "graphql";
import { QueryPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Client } from "../../Entities/Client";
import { ClientType } from "../TypeDefs/Client";

export const UPDATE_CLIENT = {
  type: ClientType,
  args: {
    id: { type: GraphQLID },
    usd: { type: GraphQLFloat },
    bitcoin: { type: GraphQLFloat },
    last_update: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { id, usd, bitcoin, last_update } = args;
    let updateArgs: QueryPartialEntity<Client> = {};
    if (usd) updateArgs.usd = usd;
    if (bitcoin) updateArgs.bitcoin = bitcoin;
    if (last_update) updateArgs.last_update = last_update;
    await Client.update(
      { id: id },
      updateArgs
    );
    return args;
  },
};
