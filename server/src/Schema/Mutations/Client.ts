import { GraphQLFloat, GraphQLID, GraphQLInt, GraphQLString } from "graphql";
import { QueryPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Client } from "../../Entities/Client";
import { ClientType } from "../TypeDefs/Client";

export const UPDATE_CLIENT = {
  type: ClientType,
  args: {
    id: { type: GraphQLID },
    usd: { type: GraphQLFloat },
    bitcoin: { type: GraphQLFloat },

  },
  async resolve(parent: any, args: any) {
    const { id, usd, bitcoin, level, last_update } = args;
    let updateArgs: QueryPartialEntity<Client> = {};
    if (usd) updateArgs.usd = usd;
    if (bitcoin) updateArgs.bitcoin = bitcoin;
    await Client.update(
      { id: id },
      updateArgs
    );
    return args;
  },
};
