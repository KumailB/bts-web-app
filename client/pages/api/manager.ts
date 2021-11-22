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
    completed: data.getReportDuring.completed,
    pending: data.getReportDuring.pending,
    cancelled: data.getReportDuring.cancelled,
    sales: data.getReportDuring.sales,
    purchases: data.getReportDuring.purchases,
    btcBought: data.getReportDuring.btc_bought,
    btcSold: data.getReportDuring.btc_sold,
    usdCommission: data.getReportDuring.usd_commission,
    btcCommission: data.getReportDuring.btc_commission,
  }

  return report;
}