import { Transaction } from "../../lib/types";
import moment from "moment";
import { useRouter } from "next/router";

interface PendingItemProps {
  transaction: Transaction;
}

export default function Pending({ transaction }: PendingItemProps) {
  const router = useRouter();

  const approve = async (e : any) => {

    e.preventDefault();
    
    router.reload();
  }
  const cancel = async (e : any) => {
    e.preventDefault();
    router.reload();
  }

  return (
  <div className="flex gap-auto justify-between bg-blue-600 drop-shadow-2xl text-gray-100 text-3xl mb-4 p-4 font-light  rounded-lg">
    <div className="w-1/5 break-all">{transaction.clientName}</div>
    <div className="w-1/6 break-all text-right">{transaction.value.toFixed(5)}</div>

    <div className="w-1/5 break-all text-right">{moment(Number(transaction.date)).format("D MMM YYYY")}</div>
    
    <div className="w-1/6 break-all text-right">{transaction.commissionType == "BTC" ? transaction.commissionPaid.toFixed(5)+" BTC" : transaction.commissionPaid.toFixed(2)+" $"}</div>
    <div className="w-1/12 break-al text-right">{transaction.orderType}</div>
    <div className="w-1/12 ml-2 flex flex-wrap gap-4 justify-end">
      <a href="#" onClick={cancel}>
      <img className="h-10 transition duration-200 ease-in-out transform hover:-translate hover:scale-125" src='/cross.svg'></img>
      </a>
      <a href="#" onClick={approve}>
      <img className="h-10 transition duration-200 ease-in-out transform hover:-translate hover:scale-125" src='/check.svg'></img>
      </a>
    </div>
    {/*<div>{moment(Number(transaction.date)).format("D MMM YYYY h:mm A")}</div> */}
  </div>);
}
