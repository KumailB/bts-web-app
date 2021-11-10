import { GraphQLFloat, GraphQLID, GraphQLString } from "graphql";
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
    console.log(args);
    await Client.update(
      { id: id },
      {
        usd: usd,
        bitcoin: bitcoin,
        last_update: last_update,
      }
    );
    return args;
  },
};
