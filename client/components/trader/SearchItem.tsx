import { Client, Transaction } from "../../lib/types";
import moment from "moment";
import { useAsync } from "react-async-hook";
import { useRouter } from "next/router";
import { getClientTransactions } from "../../pages/api/trader";
import { useEffect, useRef, useState } from "react";
import TransactionItem from "./TransactionItem";

interface PendingItemProps {
  client: Client;
}

export default function Pending({ client }: PendingItemProps) {
  let show = useRef(false);
  //const [show, setShow] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [view, setView] = useState(
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        setPressed(true);
      }}
      className="transition duration-400 ease-in-out bg-yellow-500 hover:bg-green-500 rounded-full text-white font-semibold"
    >
      <div className="flex py-2 px-4 gap-2 items-center">
        <div className="text-xl">View Transactions</div>
        <img
          className="h-5 transition duration-100 ease-in-out transform hover:-translate hover:scale-110"
          src="/arrowdown.svg"
        ></img>
      </div>
    </button>
  );
  useEffect(() => {
    if (pressed) {
      if (!show.current) {
        show.current = !show.current;
        setView(
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setPressed(true);
            }}
            className="transition duration-400 ease-in-out bg-yellow-500 hover:bg-red-500 rounded-full text-white font-semibold"
          >
            <div className="flex py-2 px-4 gap-2 items-center">
      <div className="text-xl">Hide Transactions</div>
      <img className="h-5 transition duration-100 ease-in-out transform hover:-translate hover:scale-110" src='/arrowup.svg'></img>
      </div>
          </button>
        );
      } else {
        show.current = !show.current;
        setView(
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setPressed(true);
            }}
            className="transition duration-400 ease-in-out bg-yellow-500 hover:bg-green-500 rounded-full text-white font-semibold"
          >
            <div className="flex py-2 px-4 gap-2 items-center">
              <div className="text-xl">View Transactions</div>
              <img
                className="h-5 transition duration-100 ease-in-out transform hover:-translate hover:scale-110"
                src="/arrowdown.svg"
              ></img>
            </div>
          </button>
        );
      }
    }
    setPressed(false);
  }, [pressed]);
  let asyncHero = useAsync(getClientTransactions, [client.id]);

  return (
    <div className=" bg-blue-600 drop-shadow-2xl text-gray-100 text-3xl mb-4 p-8 font-light  rounded-lg">
      <div className="flex flex-wrap justify-between">
        <div>{client?.firstName + " " + client?.lastName}</div>
        {view}
      </div>
      <div className="">
        {show.current && (
          <div>
            <div className="flex gap-auto justify-between drop-shadow-2xl text-white font-semibold text-xl pt-8 p-4 font-light  rounded-lg">
              <div className="w-1/6 break-all">Order/BTC</div>
              <div className="w-1/6 break-all text-right">Buy/Sell</div>
              <div className="w-1/6 break-all text-right">BTC Price/$</div>
              <div className="w-1/6 break-all text-right">Subtotal/$</div>
              <div className="w-1/6  break-all text-right">Commission </div>

              <div className="w-1/6  break-all text-right">Total/$</div>
              <div className="w-1/6  break-all text-right">Date</div>

              <div className="w-1/6  break-all text-right">Status</div>
              {/*<div>{moment(Number(transaction.date)).format("D MMM YYYY h:mm A")}</div> */}
            </div>
            <div className="block bg-green-400 pb-1 mb-4 rounded-lg"></div>
          </div>
        )}
        {show.current && asyncHero.loading && (
          <div className="text-center w-full text-3xl pt-4 italic font-light">
            Loading
          </div>
        )}
        {show.current && asyncHero.error && (
          <div className="text-center w-full text-3xl pt-4 italic font-light">
            Error: {asyncHero.error.message}
          </div>
        )}
        {show.current &&
          (asyncHero.result?.length ? (
            <div className="">
              {asyncHero.result.map((transaction) => {
                return (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center w-full text-3xl italic font-light">
              No transactions.
            </div>
          ))}
      </div>
    </div>
  );
}
