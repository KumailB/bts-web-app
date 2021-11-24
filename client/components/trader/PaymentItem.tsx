import { Payment, Transaction } from "../../lib/types";
import moment from "moment";
import { useRouter } from "next/router";
import { updateClient, updatePayment, updateTransaction } from "../../pages/api/trader";

interface PendingItemProps {
  payment: Payment;
}

export default function PayItem({ payment }: PendingItemProps) {
  const router = useRouter();


  const newBalance = payment.client?.balance + payment.value;
  // if(buy){
  //   // BUY ORDER
  //   if(usd){
  //     subTotal = transaction.convRate * transaction.value;
  //     orderTotal = subTotal + transaction.commissionPaid
  //     newWallet = transaction.client?.wallet + transaction.value;
  //     newBalance = transaction.client?.balance - orderTotal;
  //   }
  //   else{
  //     subTotal = transaction.convRate * (transaction.value-transaction.commissionPaid);
  //     orderTotal = subTotal + transaction.commissionPaid * transaction.convRate;
  //     newWallet = transaction.client?.wallet + (transaction.value-transaction.commissionPaid);
  //     newBalance = transaction.client?.balance - orderTotal;
  //   }
  // }
  // else{
  //     subTotal = transaction.convRate * transaction.value * -1;
  //     orderTotal = subTotal + transaction.convRate * transaction.commissionPaid;
  //     newWallet = transaction.client?.wallet - transaction.value;
  //     newBalance = transaction.client?.balance + orderTotal
  // }
  

  const approve = async (e : any) => {
    e.preventDefault();
    console.log(payment.client?.wallet);
    const updated = await updateClient(payment.clientId, newBalance, payment.client?.wallet);
    if(updated){
      
      await updatePayment(payment.id, "Completed");
    }
    router.reload();
  }
  const cancel = async (e : any) => {
    e.preventDefault();
    await updatePayment(payment.id, "Cancelled");
    router.reload();
  }

  return (
  <div className="flex gap-auto justify-between bg-blue-600 drop-shadow-2xl text-gray-100 text-xl mb-4 p-4 font-light  rounded-lg">
    <div className="w-1/5 break-all">{payment.client?.firstName+ " "+ payment.client?.lastName}</div>
    <div className="w-1/6 break-all text-right">{payment.client?.wallet.toFixed(5)}</div>
    <div className="w-1/6 break-all text-right">{payment.client?.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
    <div className="w-1/6 break-all text-right">{payment.value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>

    <div className="w-1/6 -mr-2 break-all text-right">{moment(Number(payment.date)).format("D MMM YYYY")}</div>
    
    
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
