import { useRef, useState } from "react";
import { Client } from "../../lib/types";
import { getBtcRate } from "../../pages/api/btc";

interface ReportProps{
}

export default function Order({}: ReportProps) {

  const [from, setFrom] = useState("");
  const [till, setTill] = useState("");

  const generate = async (e : any) => {
    e.preventDefault();
  }

  return (
    <div>
        <div className="py-8 text-5xl font-light ">Report Generator</div>
        <form onSubmit={generate}>
            
            <div className="flex flex-wrap gap-x-36 gap-y-6 mb-12">
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
                    onInput={e => setFrom(e.target.value)}
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
                    onInput={e => setTill(e.target.value)}
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
          <div className="flex items-center gap-2">
          </div>
        </div>
        <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-8">
          <div>BTC Sold: </div>
          <div className="flex items-center gap-2">
            BTC
          </div>
        </div>
        <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-8">
          <div>BTC Bought: </div>
          <div className="flex items-center gap-2">
            BTC 
          </div>
        </div>
        <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-8">
          <div>BTC Bought: </div>
          <div className="flex items-center gap-2">
            BTC  
          </div>
        </div>
        <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-8">
          <div>BTC Commission: </div>
          <div className="flex items-center gap-2">
            BTC  
          </div>
        </div>
        <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-8">
          <div>USD Sold: </div>
          <div className="flex items-center gap-2">
            $  
          </div>
        </div>
        <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-8">
          <div>Total Commission: </div>
          <div className="flex items-center gap-2">
            $ 
          </div>
        </div>
        </div>
    </div>
  );
}
