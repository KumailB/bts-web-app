import { useEffect, useRef, useState } from "react";
import { Client } from "../../lib/types";
import { getBtcRate } from "../../pages/api/btc";
import { getPendingTransactions } from "../../pages/api/trader";
import PendingItem from "./PendingItem";

interface PendingProps {
  traderId: number;
}

export default function Pending({ traderId }: PendingProps) {
  //const transactions = await getPendingTransactions(traderId);
  //console.log(transactions);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const transacs = await getPendingTransactions(traderId);
        if (transacs) {
          setTransactions(transacs);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const pendingItems = transactions.map((transaction) => {
    return (
      <PendingItem key={transaction.id} transaction={transaction}></PendingItem>
    );
  });
  const noTransactions = (
    <div className="text-center w-full text-3xl pt-4 italic font-light">
      No pending transactions.
    </div>
  );
  const [from, setFrom] = useState("");
  const [till, setTill] = useState("");

  const getPending = async (e: any) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="py-8 text-5xl font-light ">Pending Transactions</div>
      <div className="">
        <div className="flex gap-auto justify-between drop-shadow-2xl text-black font-semibold text-xl p-4 font-light  rounded-lg">
          <div className="w-1/5 break-all">Name</div>
          <div className="w-1/6 break-all text-right">Wallet/BTC</div>
          <div className="w-1/6 break-all text-right">Balance/$</div>
          <div className="w-1/6 break-all text-right">Order/BTC</div>
          <div className="w-1/6 break-all text-right">BTC Price/$</div>
          <div className="w-1/6 break-all text-right">Subtotal/$</div>
          <div className="w-1/6  break-all text-right">Commission </div>
          
          <div className="w-1/6 break-all text-right">Buy/Sell</div>
          <div className="w-1/6  break-all text-right">Total/$</div>
          <div className="w-1/6 -mr-2  break-all text-right">Date</div>

          
          
          <div className="w-1/6  break-all text-right">Action</div>
          {/*<div>{moment(Number(transaction.date)).format("D MMM YYYY h:mm A")}</div> */}
          
        </div>
        <div className="block bg-purple-400 pb-1 rounded-lg">

          </div>
        <div className="pb-8 mt-4">
          {transactions.length ? pendingItems : noTransactions}
        </div>
      </div>

      <div className="py-8 text-5xl font-light ">Search Clients</div>
      <form onSubmit={getPending}>
        <div className="grid grid-rows-1 grid-flow-col gap-16 mb-12">
          <div className="flex items-center gap-6">
            <div className="text-2xl font-light ">From</div>
            <input
              id="date-input"
              name="from"
              placeholder="DD/MM/YYYY"
              value={from}
              required
              type="date"
              step="any"
              min="0"
              onInput={(e) => setFrom(e.target.value)}
              className="py-4 px-8 w-80 rounded-lg transition duration-400 bg-gray-200 hover:bg-ais-blue-gray"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="text-2xl font-light ">Till</div>
            <input
              id="date-input"
              name="till"
              placeholder="DD/MM/YYYY"
              value={till}
              required
              type="date"
              step="any"
              min="0"
              onInput={(e) => setTill(e.target.value)}
              className="py-4 px-8 w-80 rounded-lg transition duration-400 bg-gray-200 hover:bg-ais-blue-gray"
            />
          </div>

          <div className="flex items-center gap-6">
            <button type="submit">
              <img src="/arrow.svg" className="h-8" />
            </button>
          </div>
        </div>
      </form>

      <div className="max-w-md mr-auto">
        <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-8">
          <div>Total Transactions: </div>
          <div className="flex items-center gap-2"></div>
        </div>
        <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-8">
          <div>BTC Sold: </div>
          <div className="flex items-center gap-2">BTC</div>
        </div>
        <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-8">
          <div>BTC Bought: </div>
          <div className="flex items-center gap-2">BTC</div>
        </div>
        <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-8">
          <div>BTC Bought: </div>
          <div className="flex items-center gap-2">BTC</div>
        </div>
        <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-8">
          <div>BTC Commission: </div>
          <div className="flex items-center gap-2">BTC</div>
        </div>
        <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-8">
          <div>USD Sold: </div>
          <div className="flex items-center gap-2">$</div>
        </div>
        <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-8">
          <div>Total Commission: </div>
          <div className="flex items-center gap-2">$</div>
        </div>
      </div>
    </div>
  );
}
