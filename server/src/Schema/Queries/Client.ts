import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { ClientType } from "../TypeDefs/Client";
import { Client } from "../../Entities/Client";
import { User } from "../../Entities/User";
import { getManager, Like } from "typeorm";
import moment from "moment";
import { Address } from "../../Entities/Address";

export const GET_CLIENT_LOGIN = {
  type: ClientType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { id } = args;
    const client = await Client.findOne({ id: id });
    if (client) {
      const lastCheck: string = client.last_update;
      const timeNow = new Date();
      if (timeNow.getMonth() - new Date(lastCheck).getMonth() != 0) {
        const year = timeNow.getFullYear();
        const lastMonth = timeNow.getMonth();
        const rawQuery: string =
          "SELECT SUM(`Transaction`.`value` / `Transaction`.`conv_rate`) AS `last_month_total` FROM `transaction` `Transaction` WHERE ( `Transaction`.`status` = 'Completed' AND `Transaction`.`client_id` = " +
          id +
          " AND YEAR(`Transaction`.`date`) = " +
          year +
          " AND MONTH(`Transaction`.`date`) = " +
          lastMonth +
          " )";
        const entityManager = getManager();
        const lastMonthTotalArr = await entityManager.query(rawQuery);
        if (
          lastMonthTotalArr[0].last_month_total &&
          lastMonthTotalArr[0].last_month_total > 100000
        ) {
          await Client.update(
            { id: id },
            { level: 2, last_update: moment(Date.now()).format("yyyy-MM-DD") }
          );
        } else {
          await Client.update(
            { id: id },
            { level: 1, last_update: moment(Date.now()).format("yyyy-MM-DD") }
          );
        }
        return await Client.findOne({ id: id });
      }
    }
    return client;
  },
};

export const GET_CLIENT = {
  type: ClientType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { id } = args;
    const client = await Client.findOne({ id: id });
    return client;
  },
};

export const GET_ALL_CLIENTS = {
  type: new GraphQLList(ClientType),
  args: {},
  async resolve(parent: any, args: any) {
    const users: User[] = await User.find();
    let ids: number[] = [];
    users.forEach((user) => ids.push(user.id));
    const clients = await Client.findByIds(ids);
    return clients;
  },
};

export const GET_TRADER_CLIENTS = {
  type: new GraphQLList(ClientType),
  args: {
    trader_id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { trader_id } = args;
    const clients = await Client.find({ trader_id: trader_id });
    return clients;
  },
};

export const GET_SEARCH_CLIENTS = {
  type: new GraphQLList(ClientType),
  args: {
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    street_address: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip_code: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    let { first_name, last_name, street_address, city, state, zip_code } = args;
    if (!first_name) first_name = "";
    if (!last_name) last_name = "";
    if (!street_address) street_address = "";
    if (!city) city = "";
    if (!state) state = "";
    if (!zip_code) zip_code = "";
    const addresses = await Address.find({
      where: [
        {
          street_address: Like(`%${street_address}`),
          city: Like(`%${city}`),
          zip_code: Like(`%${zip_code}`),
          state: Like(`%${state}`),
        }
      ]
    })
    let clientIDs: number[] = [];
    addresses.forEach((entry: { client_id: number }) =>
      clientIDs.push(entry.client_id)
    );
    const users = await User.findByIds(clientIDs, {
      first_name: Like(`%${first_name}%`),
      last_name: Like(`%${last_name}%`),
    });
    clientIDs = [];
    users.forEach((entry: { id: number }) => clientIDs.push(entry.id));

    return await Client.findByIds(clientIDs);
  },
};
