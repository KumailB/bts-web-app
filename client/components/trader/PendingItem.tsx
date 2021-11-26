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
  let newWallet : number;
  let newBalance : number;
  let subTotal : number;
  let orderTotal : number;

  if(buy){
    // BUY ORDER
    if(usd){
      subTotal = transaction.convRate * transaction.value;
      orderTotal = subTotal + transaction.commissionPaid
      newWallet = transaction.client?.wallet + transaction.value;
      newBalance = transaction.client?.balance - orderTotal;
    }
    else{
      subTotal = transaction.convRate * (transaction.value-transaction.commissionPaid);
      orderTotal = subTotal + transaction.commissionPaid * transaction.convRate;
      newWallet = transaction.client?.wallet + (transaction.value-transaction.commissionPaid);
      newBalance = transaction.client?.balance - orderTotal;
    }
  }
  else{
      subTotal = transaction.convRate * transaction.value * -1;
      orderTotal = subTotal + transaction.convRate * transaction.commissionPaid;
      newWallet = transaction.client?.wallet - transaction.value;
      newBalance = transaction.client?.balance + orderTotal
  }
  

  const approve = async (e : any) => {
    e.preventDefault();
    const updated = await updateClient(transaction.clientId, newBalance, newWallet);
    if(updated){
      await updateTransaction(transaction.id, "Completed");
    }
    
    router.reload();
  }
  const cancel = async (e : any) => {
    e.preventDefault();
    await updateTransaction(transaction.id, "Cancelled");

    router.reload();
  }

  return (
  <div className="flex gap-auto justify-between bg-blue-600 drop-shadow-2xl text-gray-100 text-xl mb-4 p-4 font-light  rounded-lg">
    <div className="w-1/5 break-all">{transaction.client?.firstName+ " "+ transaction.client?.lastName}</div>
    <div className="w-1/6 break-all text-right">{transaction.client?.wallet.toFixed(5)}</div>
    <div className="w-1/6 break-all text-right">{transaction.client?.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
    <div className="w-1/6 break-all text-right">{transaction.value.toFixed(5)}</div>
    <div className="w-1/6 break-all text-right">{transaction.convRate.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
    <div className="w-1/6 break-all text-right">{subTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
    <div className="w-1/6 break-all text-right">{transaction.commissionType == "BTC" ? transaction.commissionPaid.toFixed(5)+" BTC" : transaction.commissionPaid.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" $"}</div>

    <div className="w-1/6 break-al text-right">{transaction.orderType}</div>
    <div className="w-1/6 break-all text-right">{orderTotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>

    <div className="w-1/6 -mr-2 break-all text-right">{moment(Number(transaction.date)).format("D MMM YYYY")}</div>
    
    
    <div className="w-1/6  flex flex-wrap gap-4 justify-end">
      <a href="#" onClick={cancel}>
      <img className="h-8 transition duration-200 ease-in-out transform hover:-translate hover:scale-110" src='/cross.svg'></img>
      </a>
      <a href="#" onClick={approve}>
      <img className="h-8 transition duration-200 ease-in-out transform hover:-translate hover:scale-110" src='/check.svg'></img>
      </a>
    </div>
    {/*<div>{moment(Number(transaction.date)).format("D MMM YYYY h:mm A")}</div> */}
  </div>);
}
