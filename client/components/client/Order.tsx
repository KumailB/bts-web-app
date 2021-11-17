import { useRef, useState } from "react";
import { Client } from "../../lib/types";
import { getBtcRate } from "../../pages/api/btc";

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

    
    if(buy){
      // BUY ORDER
      
      if(usd && (client.balance < Number(amount)*rate*(1+levelRate))){  // Paying com with USD
        console.log("Here");
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
          client.balance -= Number(amount)*rate*(1+levelRate);
          client.wallet += Number(amount)
        }
        else{
          client.balance -= Number(amount)*rate;
          client.wallet += Number(amount)*rate*(1-levelRate);
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
        client.balance += Number(amount)*rate*(1-levelRate);
        client.wallet -= Number(amount)
      }
    }
    // UPDATE CLIENT
    setAmount("");

    setMessage("Your order has been placed! Once approved, you will see changes on your account. ");
  };

  return (
    <div className="max-w-md mr-auto">
      <div className="py-8 text-5xl font-light ">Place an Order</div>
      <form onSubmit={order}>
        <div className=" text-black">
          <div className="flex items-center justify-between mb-8 text-2xl">
            <input
              id="amount-input"
              name="amount"
              placeholder="Amount"
              value={amount}
              required
              type="number"
              step="any"
              min="0"
              onInput={e => setAmount(e.target.value)}
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
            <div className ="flex items-center gap-2" >1    <img src="/logo.svg" className="h-8" /> = {rate.toFixed(2)} $</div>
         
          </div>
          <div className="text-2xl  flex flex-shrink justify-between mb-8">
            <div >Order price: </div>
            <div>{amount ? (buy ? (Number(amount)*rate).toFixed(2) : (Number(amount)*rate*-1).toFixed(2)) : (0).toFixed(2) } $</div>
         
          </div>
          <div className="text-2xl  flex flex-shrink justify-between mb-8">
            <div >Commission: </div>
            <div>{amount ? (usd ? (Number(amount)*rate*levelRate).toFixed(2)+" $" : (Number(amount)*levelRate).toFixed(5)+" BTC") : usd ? (0).toFixed(2)+" $" :  (0).toFixed(5)+" BTC" } </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 items-center mt-4 justify-between">
          <button
            type="submit"
            className={"transition duration-400 ease-in-out rounded-full text-white font-semibold"+(message.includes("fund") ? " bg-red-500 hover:bg-red-600 " : " bg-green-600 hover:bg-green-600 ")}
          >
            <div className="py-4 px-40 text-2xl">Place order</div>
          </button>

          <div className={"text-xl py-4 font-semibold "+(message.includes("fund") ? " text-red-500" : " text-green-600")}>
            {message ? message : null}
          </div>
        </div>
      </form>
    </div>
  );
}
