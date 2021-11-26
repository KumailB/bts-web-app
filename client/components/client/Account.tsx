import { useRef, useState } from "react";
import { Client } from "../../lib/types";

interface AccountProps {
  client: Client;
}

export default function Order({ client }: AccountProps) {
  return (
    <div className="max-w-md mr-auto text-right">
      <div className="py-8 text-5xl font-light ">Your Account</div>
      <div className=" text-black">
        <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-8">
          <div>BTC Wallet: </div>
          <div className="flex items-center gap-2">
            {client.wallet.toFixed(5)} <img src="/logo.svg" className="h-8" />
          </div>
        </div>
        <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-8">
          <div>Balance: </div>
          <div className="flex items-center gap-2">
            {client.balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} $
          </div>
        </div>
        <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-8">
          <div>Tier: </div>
          <div className={"flex items-center gap-2 font-bold text-2xl " + ((client.level === 'Gold') ? "text-yellow-500" : "text-gray-700")} >
            {client.level}
          </div>
        </div>
      </div>
    </div>
  );
}
