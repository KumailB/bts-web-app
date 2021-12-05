
import { useRef, useState } from "react";
import { Client, Payment, Transaction } from "../../lib/types";
import { getBtcRate } from "../../pages/api/btc";
import { createPayment, createTransaction } from "../../pages/api/client";

interface PaymentProps{
  client: Client,

}

export default function Pay({client}: PaymentProps) {

  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [buy, setBuy] = useState(1);
  const [usd, setUsd] = useState(1);
  
  const payment = async (e : any) => {
    e.preventDefault();

    // DEFAULT TRANSACTION
    const payment: Payment = {
      id: -1,       // Placeholders
      date: '',     // Placeholders
      value: Number(amount),
      status: 'Pending',
      traderId: client.traderId,
      clientId: client.id,
    }
    const done = await createPayment(payment);
    if(!done){
      setMessage("There was an error placing your order. Please try again later!");
      return;
    }


    // UPDATE CLIENT
    setAmount("");

    setMessage("Your payment has been submitted! Once approved, you will see changes in your account.");
  };

  return (
    <div className="max-w-md mr-auto">
      <div className="py-8 text-5xl font-light ">Make a Payment</div>
      <form onSubmit={payment}>
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
              onInput={e => setAmount(e.currentTarget.value)}
              className="py-4 px-8 w-80 rounded-lg transition duration-400 bg-gray-200 hover:bg-ais-blue-gray"
            />

            <div className="text-2xl font-semibold ">$</div>
          </div>
          <div className="text-2xl  flex flex-shrink justify-between mb-8">
            <div >Payment: </div>
            <div>{amount ?  (Number(amount)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : (0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') } $</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 items-center mt-4 justify-between">
          <button
            type="submit"
            className={"w-full transition duration-400 ease-in-out rounded-full text-white font-semibold"+((message.includes("fund") || message.includes("error")) ? " bg-red-500 hover:bg-red-600 " : " bg-green-500 hover:bg-green-600 ")}
          >
            <div className="py-4 text-2xl">Pay</div>
          </button>

          <div className={"text-xl py-4 font-semibold "+((message.includes("fund") || message.includes("error")) ? " text-red-500" : " text-green-600")}>
            {message ? message : null}
          </div>
        </div>
      </form>
    </div>
  );
}
