import { Report } from "../../lib/types";
import apollo from "./apollo";
import { GET_REPORT_DURING } from "./graphql/Queries";

export const getReport = async (
  fromDate: string, tillDate: string, 
): Promise<Report | undefined> => {

    
  const { data } = await apollo.query({
    query: GET_REPORT_DURING,
    variables: {
      from: fromDate,
      till: tillDate,
    },
  });
  if (!data || !data.getReportDuring) {
    return;
  }

  const report: Report = {
    completed: data.getReportDuring.completed ? data.getReportDuring.completed : 0,
    pending: data.getReportDuring.pending ? data.getReportDuring.pending : 0,
    cancelled: data.getReportDuring.cancelled ? data.getReportDuring.cancelled : 0,
    sales: data.getReportDuring.sales ? data.getReportDuring.sales : 0,
    purchases: data.getReportDuring.purchases ? data.getReportDuring.purchases : 0,
    btcBought: data.getReportDuring.btc_bought ? data.getReportDuring.btc_bought : 0,
    btcSold: data.getReportDuring.btc_sold ? data.getReportDuring.btc_sold : 0,
    usdCommission: data.getReportDuring.usd_commission ? data.getReportDuring.usd_commission : 0,
    btcCommission: data.getReportDuring.btc_commission ? data.getReportDuring.btc_commission : 0,
  }

  return report;
}