import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Login from '../components/login/Login'
import { GET_USER } from './api/graphql/Queries';
import { Client } from '../lib/types';
import { useRouter } from "next/router";
import { useEffect } from 'react';
import { getUser } from './api/login';
import SiteHeader from '../components/common/SiteHeader';
import Order from '../components/client/Order';
import Account from '../components/client/Account';
import Profile from '../components/client/Profile';
import { getBtcRate } from './api/btc';
import { getLevelRate } from './api/level';
import { withIronSession } from 'next-iron-session';

interface ClientPageProps{
  client: Client;
  rate: number;
  levelRate: number;
}

const ClientPage: NextPage<ClientPageProps> = ({client, rate, levelRate}) => {

  return (
    
    <div className="static bg-white text-white">
      <SiteHeader user={client}></SiteHeader>
      <Head>
        <title>Client Dashboard</title>
        <meta name="description" content="Dashboard for BTS Client" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen text-black my-12 mx-8 lg:mx-36 xl:mx-56">
        <div className="grid grid-rows-3 grid-flow-col gap-4">
          <div className="row-span-3">
            <Order client={client} rate={rate} levelRate={levelRate} />
          </div>
          <div className="justify-self-end">
            <Account client={client} />
          </div>
          <div className="justify-self-end row-span-2">
            <Profile client={client} />
          </div>
          
        </div>
       
      </main>

      <footer >
        <div className="absolute bottom-0 w-full text-lg text-center">© Copyright 2021 Bitcoin Trading System, All Rights Reserved</div>
      </footer>
    </div>

  )
}
export default ClientPage

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {

    
    const userData = await req.session.get("user");

    if (!userData) {
      res.statusCode = 404;
      //res.end();
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    const {user} = userData;
    const rate = await getBtcRate();
    const levelRate = await getLevelRate((user as Client).level == "Silver" ? 1 : 2);
    
    return {
      props: {
        client: user,
        rate: rate,
        levelRate: levelRate,
      },
    };
  },
  {
    cookieName: "BTSCOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: process.env.NEXT_APPLICATION_SECRET ? process.env.NEXT_APPLICATION_SECRET : "dev",
  }
);
