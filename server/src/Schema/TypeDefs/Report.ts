import { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLFloat } from "graphql";

export const ReportType = new GraphQLObjectType({
  name: "Report",
  fields: () => ({
    completed: { type: GraphQLInt },
    pending: { type: GraphQLInt },
    cancelled: { type: GraphQLInt },
    sales: { type: GraphQLFloat },
    purchases: { type: GraphQLFloat },
    btc_bought: { type: GraphQLFloat },
    btc_sold: { type: GraphQLFloat },
    usd_commission: { type: GraphQLFloat },
    btc_commission: { type: GraphQLFloat },
  }),
});
