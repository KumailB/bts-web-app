
import { useRef, useState } from "react";
import { Client, Transaction } from "../../lib/types";
import { getBtcRate } from "../../pages/api/btc";
import { createTransaction } from "../../pages/api/client";

interface OrderProps{
  client: Client,
  rate: number,
  levelRate: number,
}

export default function Order({client, rate, levelRate}: OrderProps) {

  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [buy, setBuy] = useState(1);
  const [usd, setUsd] = useState(1);
  
  const order = async (e : any) => {
    e.preventDefault();

    // DEFAULT TRANSACTION
    const transaction: Transaction = {
      id: -1,       // Placeholders
      date: '',     // Placeholders
      commissionType: 'USD',
      value: Number(amount),
      commissionPaid: Number(amount) * levelRate * rate,
      status: 'Pending',
      traderId: client.traderId,
      clientId: client.id,
      orderType: 'BUY',
      convRate: rate,
    }
    if(buy){
      // BUY ORDER
      
      if(usd && (client.balance < Number(amount)*rate*(1+levelRate))){  // Paying com with USD
        setMessage("Cannot place order. Insufficient funds!");
        return;
      }
      // Paying com with BTC
      else if(!usd && (client.balance < Number(amount)*rate || client.wallet < Number(amount)*levelRate)){
        setMessage("Cannot place order. Insufficient funds!");
        return;
      }
      else{   // DEDUCTING BALANCE
        if(usd){
          // client.balance -= Number(amount)*rate*(1+levelRate);
          // client.wallet += Number(amount)
        }
        else{
          transaction.commissionType = 'BTC'
          transaction.commissionPaid = Number(amount) * levelRate;
          // client.balance -= Number(amount)*rate;
          // client.wallet += Number(amount)*rate*(1-levelRate);
        }
      }
    }
    else{
      // SELL ORDER
      if(usd && (Number(amount) > client.wallet || Number(amount)*levelRate*rate > client.balance)){  // Paying com with USD
        setMessage("Cannot place order. Insufficient funds!");
        return;
      }
      // Paying com with BTC
      else if(!usd && ( client.wallet < Number(amount)*levelRate)){
        setMessage("Cannot place order. Insufficient funds!");
        return;
      }
      else{   // DEDUCTING BALANCE
        transaction.orderType = 'SELL';
        if(usd){
          transaction.commissionType = 'USD'
          transaction.commissionPaid = Number(amount) * levelRate * rate;
        }
        else{
          transaction.commissionType = 'BTC'
          transaction.commissionPaid = Number(amount) * levelRate;
        }
        // client.balance += Number(amount)*rate*(1-levelRate);
        // client.wallet -= Number(amount)
      }
    }
    const done = await createTransaction(transaction);
    if(!done){
      setMessage("There was an error placing your order. Please try again later!");
      return;
    }


    // UPDATE CLIENT
    setAmount("");

    setMessage("Your order has been placed! Once approved, you will see changes in your account.");
  };

  return (
    <div className=" max-w-md mr-auto">
      <div className="py-8 text-5xl font-light ">Place an Order</div>
      <form onSubmit={order}>
        <div className=" text-black">
          <div className="flex items-center gap-20 justify-between mb-8 text-2xl">
            <input
              id="amount-input"
              name="amount"
              placeholder="Amount"
              value={amount}
              required
              type="number"
              step="any"
              min="0"
              onInput={e => setAmount(e.currentTarget.value)}
              className="py-4 px-8 w-80 rounded-lg transition duration-400 bg-gray-200 hover:bg-ais-blue-gray"
            />

            <div className="text-2xl font-semibold ">BTC</div>
          </div>
          <div className="text-2xl font-semibold mb-8">Buy/Sell</div>
        
          <div className="flex gap-16 mb-8">
            <div className="flex items-center gap-6">
              <input
                id="buy-sell-input"
                name="buy-sell"
                value={buy}
                required
                defaultChecked
                type="radio"
                onClick={e => {setBuy(1)}}
                className="py-4 px-8 rounded-lg transition duration-400 bg-gray-200 hover:bg-ais-blue-gray"
              />

              <div className="text-2xl font-light ">Buy</div>
            </div>
            <div className="flex items-center gap-6">
              <input
                id="buy-sell-input"
                name="buy-sell"
                value={buy}
                required
                type="radio"
                onClick={e => {setBuy(0)}}
                className="py-4 px-8 rounded-lg transition duration-400 bg-gray-200 hover:bg-ais-blue-gray"
              />

              <div className="text-2xl font-light ">Sell</div>
            </div>
            
          </div>
          <div className="text-2xl font-semibold mb-8">Commission In:</div>
          <div className="flex gap-16 mb-8">
            <div className="flex items-center gap-6">
              <input
                id="commission-input"
                name="commission"
                value={usd}
                required
                defaultChecked
                type="radio"
                onClick={e => setUsd(1)}
                className="py-4 px-8 rounded-lg transition duration-400 bg-gray-200 hover:bg-ais-blue-gray"
              />

              <div className="text-2xl font-light ">USD</div>
            </div>
            <div className="flex items-center gap-6">
              <input
                id="commission-input"
                name="commission"
                value={usd}
                required
                type="radio"
                onClick={e => setUsd(0)}
                className="py-4 px-8 rounded-lg transition duration-400 bg-gray-200 hover:bg-ais-blue-gray"
              />

              <div className="text-2xl font-light ">BTC</div>
            </div>
            
          </div>
          <div className="text-2xl  flex flex-shrink justify-between mb-8">
            <div >Current Rate: </div>
            <div className ="flex items-center gap-2" >1    <img src="/logo.svg" className="h-8" /> = {rate.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} $</div>
         
          </div>
          <div className="text-2xl  flex flex-shrink justify-between mb-8">
            <div >Order price: </div>
            <div>{amount ? (buy ? (Number(amount)*rate).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : (Number(amount)*rate*-1).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')) : (0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') } $</div>
         
          </div>
          <div className="text-2xl flex flex-shrink justify-between mb-8">
            <div >Commission: </div>
            <div>{amount ? (usd ? (Number(amount)*rate*levelRate).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" $" : (Number(amount)*levelRate).toFixed(5)+" BTC") : usd ? (0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+" $" :  (0).toFixed(5)+" BTC" } </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 items-center mt-4 justify-between">
          <button
            type="submit"
            className={"w-full min-w-md transition duration-400 ease-in-out rounded-full text-white font-semibold"+((message.includes("fund") || message.includes("error")) ? " bg-red-500 hover:bg-red-600 " : " bg-green-500 hover:bg-green-600 ")}
          >
            <div className="py-4  text-2xl">Place order</div>
          </button>

          <div className={"text-xl py-4 font-semibold "+((message.includes("fund") || message.includes("error")) ? " text-red-500" : " text-green-600")}>
            {message ? message : null}
          </div>
        </div>
      </form>
    </div>
  );
}
