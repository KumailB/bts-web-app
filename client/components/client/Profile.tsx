import { useRef, useState } from "react";
import { Client } from "../../lib/types";

interface AccountProps {
  client: Client;
}

export default function Order({ client }: AccountProps) {
  return (
    <div className="max-w-md mr-auto text-right">
      <div className="py-8 text-5xl font-light ">Your Profile</div>
      <div className=" text-black text-2xl">
        <div className="text-2xl mb-4 ">
          {client.firstName} {client.lastName}
        </div>
        <div className="text-2xl mb-4 ">
          {client.email}
        </div>
        <div className="text-2xl mb-4 ">
          +{client.cellNum}
        </div>
        <div className="text-2xl mb-4 ">
          +{client.phoneNum}
        </div>
        <div className="text-2xl mb-4 ">
          {client.address.street}
        </div>
        <div className="text-2xl mb-4 ">
          {client.address.city}, {client.address.state}
        </div>
        <div className="text-2xl mb-4 ">
          {client.address.zip}
        </div>

      </div>
    </div>
  );
}
