import {
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { TransactionType } from "../TypeDefs/Transaction";
import { Transaction } from "../../Entities/Transaction";
import { getManager } from "typeorm";
import moment from "moment";

export const GET_ALL_TRANSACTION = {
  type: new GraphQLList(TransactionType),
  args: {},
  async resolve(parent: any, args: any) {
    const transactions = await Transaction.find();
    return transactions;
  },
};

export const GET_PENDING_TRANSACTIONS = {
  type: new GraphQLList(TransactionType),
  args: {
    trader_id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    args.status = "Pending";
    const transactions = await Transaction.find(args);
    return transactions;
  },
};

export const GET_CLIENT_TRANSACTIONS = {
  type: new GraphQLList(TransactionType),
  args: {
    client_id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const transactions = await Transaction.find(args);
    return transactions;
  },
};

export const GET_MONTHLY_TRANSACTION_TOTAL = {
  type: new GraphQLObjectType({
    name: "MonthlyTotal",
    fields: () => ({
      last_month_total: { type: GraphQLFloat },
    }),
  }),
  args: {
    client_id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { client_id } = args;
    const year = new Date().getFullYear();
    const lastMonth = new Date().getMonth();

    const rawQuery: string =
      "SELECT SUM(`Transaction`.`value`) AS `last_month_total` FROM `transaction` `Transaction` WHERE (`Transaction`.`client_id` = " +
      client_id +
      " AND YEAR(`Transaction`.`date`) = " +
      year +
      " AND MONTH(`Transaction`.`date`) = " +
      lastMonth +
      " )";
    const entityManager = getManager();
    const lastMonthTotalArr = await entityManager.query(rawQuery);
    let total = 0;
    if (lastMonthTotalArr[0].last_month_total)
      total = lastMonthTotalArr[0].last_month_total;

    return { last_month_total: total };
  },
};

export const GET_TRANSACTIONS_DURING = {
  type: new GraphQLList(TransactionType),
  args: {
    from: { type: GraphQLString },
    till: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { from, till } = args;
    let fromDate = "";
    let tillDate = "";
    if (from && from != "") {
      const date = moment(new Date(from)).format("yyyy-MM-DD HH:mm:ss");
      fromDate = " AND `Transaction`.`date` >= '" + date + "'";
    }
    if (till && till != "") {
      const date = moment(new Date(till))
        .add(1, "days")
        .format("yyyy-MM-DD HH:mm:ss");
      tillDate = " AND `Transaction`.`date` < '" + date + "'";
    }

    const rawQuery: string =
      "SELECT `Transaction`.`id` AS `Transaction_id`, `Transaction`.`commission_payment_type` AS `Transaction_commission_payment_type`, `Transaction`.`value` AS `Transaction_value`, `Transaction`.`date` AS `Transaction_date`, `Transaction`.`commission_paid` AS `Transaction_commission_paid`, `Transaction`.`status` AS `Transaction_status`, `Transaction`.`trader_id` AS `Transaction_trader_id`, `Transaction`.`client_id` AS `Transaction_client_id`, `Transaction`.`order_type` AS `Transaction_order_type`, `Transaction`.`conv_rate` AS `Transaction_conv_rate` FROM `transaction` `Transaction` WHERE ( TRUE" +
      fromDate +
      tillDate +
      " )";
    const entityManager = getManager();
    const transactions = await entityManager.query(rawQuery);
    const transactionList: any[] = [];
    transactions.forEach((transac: any) =>
      transactionList.push({
        id: transac.Transaction_id,
        commission_payment_type: transac.Transaction_commission_payment_type,
        value: transac.Transaction_value,
        date: transac.Transaction_date,
        commission_paid: transac.Transaction_id,
        status: transac.Transaction_status,
        trader_id: transac.Transaction_trader_id,
        client_id: transac.Transaction_client_id,
        order_type: transac.Transaction_order_type,
        conv_rate: transac.Transaction_conv_rate,
      })
    );
    return transactionList;
  },
};
