import { Transaction } from "../../lib/types";
import moment from "moment";
import { useRouter } from "next/router";
import { updateClient, updateTransaction } from "../../pages/api/trader";

interface PendingItemProps {
  transaction: Transaction;
}

export default function Pending({ transaction }: PendingItemProps) {
  const router = useRouter();

  const buy = transaction.orderType === "BUY" ? true : false;
  const usd = transaction.commissionType === "USD" ? true : false;
  let subTotal : number;
  let orderTotal : number;

  if(buy){
    // BUY ORDER
    if(usd){
      subTotal = transaction.convRate * transaction.value;
      orderTotal = subTotal + transaction.commissionPaid
    }
    else{
      subTotal = transaction.convRate * (transaction.value-transaction.commissionPaid);
      orderTotal = subTotal + transaction.commissionPaid * transaction.convRate;
    }
  }
  else{
    if(usd){
      subTotal = transaction.convRate * transaction.value * -1;
      orderTotal = subTotal + transaction.commissionPaid;
    }
    else{
      subTotal = transaction.convRate * transaction.value * -1;
      orderTotal = subTotal + transaction.convRate * transaction.commissionPaid;
    }
  }


  return (
  <div className="flex gap-auto justify-between bg-blue-600 drop-shadow-2xl text-gray-100 text-xl px-4 pb-2 font-light  rounded-lg">
    <div className="w-1/6 break-all ">{transaction.value.toFixed(5)}</div>
    <div className="w-1/6 break-al text-right">{transaction.orderType}</div>
    <div className="w-1/6 break-all text-right">{transaction.convRate.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
    <div className="w-1/6 break-all text-right">{subTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
    <div className="w-1/6 break-all text-right">{transaction.commissionType == "BTC" ? transaction.commissionPaid.toFixed(5)+" BTC" : transaction.commissionPaid.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" $"}</div>

   
    <div className="w-1/6 break-all text-right">{orderTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>

    <div className="w-1/6 -mr-2 break-all text-right">{moment(Number(transaction.date)).format("D MMM YYYY")}</div>
    <div className="w-1/6 break-al text-right">{transaction.status}</div>
    
    {/*<div>{moment(Number(transaction.date)).format("D MMM YYYY h:mm A")}</div> */}
  </div>);
}
