import { useRef, useState } from "react";
import { Client } from "../../lib/types";
import { getBtcRate } from "../../pages/api/btc";
import { getReport } from "../../pages/api/manager";

interface ReportProps {}

export default function Order({}: ReportProps) {

  const [from, setFrom] = useState("");
  const [till, setTill] = useState("");
  const [comp, setComp] = useState(0);
  const [pend, setPend] = useState(0);
  const [canc, setCanc] = useState(0);
  const [totalTrans, setTotalTrans] = useState(0);
  const [sales, setSales] = useState(0);
  const [purchases, setPurchases] = useState(0);
  const [btcBought, setBtcBought] = useState(0);
  const [rate, setRate] = useState(0);
  const [btcSold, setBtcSold] = useState(0);
  const [usdCom, setUsdCom] = useState(0);
  const [btcCom, setBtcCom] = useState(0);
  const [totalCom, setTotalCom] = useState(0);
  const [message, setMessage] = useState("");

  const generate = async (e: any) => {
    e.preventDefault();

    const report = await getReport(from, till);
    const btcRate = await getBtcRate();
    console.log(report);
    if (report) {
      setComp(report?.completed);
      setPend(report?.pending);
      setCanc(report?.cancelled);
      setTotalCom(comp + pend + canc);
      setRate(btcRate);
      setSales(report?.sales);
      setPurchases(report?.purchases);
      setBtcSold(report?.btcSold);
      setBtcBought(report?.btcBought);
      setUsdCom(report?.usdCommission);
      setBtcCom(report?.btcCommission);
      setTotalCom(usdCom + btcCom * rate);
    }
  };

  return (
    <div>
      <div className="py-8 text-5xl font-light ">Report Generator</div>
      <form onSubmit={generate}>
        <div className="flex flex-wrap gap-x-8 xl:gap-x-12 gap-y-6 mb-12">
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
              onChange={(e) => setFrom(e.target.value)}
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
              onChange={(e) => setTill(e.target.value)}
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
      <div className="flex flex-wrap justify-between">
        <div className="max-w-lg mr-auto">
          <div className="text-4xl font-bold flex flex-shrink justify-between mb-8 gap-16">
            <div>Finances</div>
            <div className="flex items-center gap-2"></div>
          </div>
          <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-16">
            <div>Bitcoins Sold: </div>
            <div className="flex items-center gap-2">
              {btcSold.toFixed(5)} BTC
            </div>
          </div>
          <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-16">
            <div>Bitcoin Sales: </div>
            <div className="flex items-center gap-2">{sales.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} $</div>
          </div>
          <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-16">
            <div>Bitcoins Bought: </div>
            <div className="flex items-center gap-2">
              {btcBought.toFixed(5)} BTC
            </div>
          </div>
          <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-16">
            <div>Bitcoin Purchases: </div>
            <div className="flex items-center gap-2">{purchases.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} $</div>
          </div>
          <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-16">
            <div>BTC Commission: </div>
            <div className="flex items-center gap-2">
              {btcCom.toFixed(5)} BTC
            </div>
          </div>
          <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-16">
            <div>USD Sold: </div>
            <div className="flex items-center gap-2">{usdCom.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} $</div>
          </div>
          <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-16">
            <div>Total Commission: </div>
            <div className="flex items-center gap-2">
              {totalCom.toFixed(2)} $
            </div>
          </div>
        </div>
        <div className="max-w-lg ml-auto">
          <div className="text-4xl font-bold flex flex-shrink justify-between mb-8 gap-16">
            <div>Records </div>
            <div className="flex items-center gap-2"></div>
          </div>
          <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-16">
            <div>Completed Transactions: </div>
            <div className="flex items-center gap-2">{comp}</div>
          </div>
          <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-16">
            <div>Pending Transactions: </div>
            <div className="flex items-center gap-2">{pend}</div>
          </div>
          <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-16">
            <div>Cancelled Transactions:</div>
            <div className="flex items-center gap-2">{canc}</div>
          </div>
          <div className="text-2xl  flex flex-shrink justify-between mb-8 gap-16">
            <div>Total Transactions: </div>
            <div className="flex items-center gap-2">{totalTrans}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
