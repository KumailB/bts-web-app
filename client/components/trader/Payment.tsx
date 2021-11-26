import { useEffect, useRef, useState } from "react";
import { Client } from "../../lib/types";
import { getBtcRate } from "../../pages/api/btc";
import { getPedningPayments, getPendingPayments, getPendingTransactions } from "../../pages/api/trader";
import PayItem from "./PaymentItem";
import PendingItem from "./PendingItem";

interface PendingProps {
  traderId: number;
}

export default function Payment({ traderId }: PendingProps) {
  //const transactions = await getPendingTransactions(traderId);
  //console.log(transactions);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const payments = await getPendingPayments(traderId);
        if (payments) {
          setPayments(payments);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const payItems = payments.map((payment) => {
    return (
      <PayItem key={payment.id} payment={payment}></PayItem>
    );
  });
  const noPayments = (
    <div className="text-center w-full text-3xl pt-4 italic font-light">
      No pending payments.
    </div>
  );
  
  return (
    <div>
      <div className="py-8 text-5xl font-light ">Pending Payments</div>
      <div className="">
        <div className="flex gap-auto justify-between drop-shadow-2xl text-black font-semibold text-xl p-4 font-light  rounded-lg">
          <div className="w-1/5 break-all">Name</div>
          <div className="w-1/6 break-all text-right">Wallet/BTC</div>
          <div className="w-1/6 break-all text-right">Balance/$</div>
          <div className="w-1/6  break-all text-right">Payment/$</div>
          <div className="w-1/6  break-all text-right">Date</div>

          <div className="w-1/6  break-all text-right">Action</div>
          {/*<div>{moment(Number(transaction.date)).format("D MMM YYYY h:mm A")}</div> */}
        </div>
        <div className="block bg-purple-400 pb-1 rounded-lg"></div>
        <div className="pb-8 mt-4">
          {payments.length ? payItems : noPayments}
        </div>
      </div>
    </div>
  );
}
