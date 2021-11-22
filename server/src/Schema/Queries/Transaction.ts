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
import { ReportType } from "../TypeDefs/Report";

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

export const GET_REPORT_DURING = {
  type: ReportType,
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

    const compQuery: string =
      "SELECT COUNT(*) as `completed` FROM `transaction` `Transaction` WHERE ( `Transaction`.`status` = 'Completed'" +
      fromDate +
      tillDate +
      " )";

    const pendQuery: string =
      "SELECT COUNT(*) as `pending` FROM `transaction` `Transaction` WHERE ( `Transaction`.`status` = 'Pending'" +
      fromDate +
      tillDate +
      " )";

    const cancQuery: string =
      "SELECT COUNT(*) as `cancelled` FROM `transaction` `Transaction` WHERE ( `Transaction`.`status` = 'Cancelled'" +
      fromDate +
      tillDate +
      " )";

    const boughtQuery: string =
      "SELECT SUM(`value`) as `btc_bought`, SUM(`value` * `conv_rate`) as `sales` FROM `transaction` `Transaction` WHERE ( `Transaction`.`order_type` = 'BUY' AND `Transaction`.`status` = 'Completed'" +
      fromDate +
      tillDate +
      " )";

    const soldQuery: string =
      "SELECT SUM(`value`) as `btc_sold`, SUM(`value` * `conv_rate`) as `purchases` FROM `transaction` `Transaction` WHERE ( `Transaction`.`order_type` = 'SELL' AND `Transaction`.`status` = 'Completed'" +
      fromDate +
      tillDate +
      " )";

      const usdQuery: string =
      "SELECT SUM(`commission_paid`) as `usd` FROM `transaction` `Transaction` WHERE ( `Transaction`.`commission_payment_type` = 'USD' AND `Transaction`.`status` = 'Completed'" +
      fromDate +
      tillDate +
      " )";

      const btcQuery: string =
      "SELECT SUM(`commission_paid`) as `btc` FROM `transaction` `Transaction` WHERE ( `Transaction`.`commission_payment_type` = 'BTC' AND `Transaction`.`status` = 'Completed'" +
      fromDate +
      tillDate +
      " )";
    
    const entityManager = getManager();
    const comp = await entityManager.query(compQuery);
    const pend = await entityManager.query(pendQuery);
    const canc = await entityManager.query(cancQuery);
    const bought = await entityManager.query(boughtQuery);
    const sold = await entityManager.query(soldQuery);
    const usd = await entityManager.query(usdQuery);
    const btc = await entityManager.query(btcQuery);

    return {
      completed: comp[0].completed,
      pending: pend[0].pending,
      cancelled: canc[0].cancelled,
      btc_bought: bought[0].btc_bought,
      sales: bought[0].sales,
      btc_sold: sold[0].btc_sold,
      purchases: sold[0].purchases,
      usd_commission: usd[0].usd,
      btc_commission: btc[0].btc,
    }
  },
};
