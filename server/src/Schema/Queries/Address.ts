import { GraphQLID } from "graphql";
import { AddressType } from "../TypeDefs/Address";
import { Address } from "../../Entities/Address";

export const GET_ADDRESS = {
  type: AddressType,
  args: {
    client_id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { client_id } = args;
    const address = await Address.findOne({ client_id: client_id });
    return address;
  },
};
