import { Client, Transaction } from "../../lib/types";
import moment from "moment";
import { useRouter } from "next/router";

interface PendingItemProps {
  client: Client;
}

export default function Pending({ client }: PendingItemProps) {
  
  console.log("Here")

  const approve = async (e : any) => {

    e.preventDefault();
    
    router.reload();
  }
  const cancel = async (e : any) => {
    e.preventDefault();
    router.reload();
  }

  return (
  <div className="flex gap-auto justify-between bg-blue-600 drop-shadow-2xl text-gray-100 text-xl mb-4 p-4 font-light  rounded-lg">
    <div>{client.firstName + " " + client.lastName}</div>
    {/*<div>{moment(Number(transaction.date)).format("D MMM YYYY h:mm A")}</div> */}
  </div>);
}
