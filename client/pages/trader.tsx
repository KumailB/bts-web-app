import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Login from '../components/login/Login';
import { Trader, Transaction } from '../lib/types';
import { getUser } from './api/login';
import SiteHeader from '../components/common/SiteHeader';
import Pending from '../components/trader/Pending';
import { getPendingTransactions } from './api/trader';
interface TraderPageProps{
  trader_email: string;
  trader: Trader;
}

const TraderPage: NextPage<TraderPageProps> = ({trader}) => {
  
  const router = useRouter();
  useEffect( () => {
    if(!trader || trader.userType != 'Trader'){
      router.push('/');
    }
  });

  return (

    <div className="static bg-white text-white">
    <SiteHeader name={trader.firstName}></SiteHeader>
    <Head>
      <title>Trader Dashboard</title>
      <meta name="description" content="Dashboard for BTS Manager" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="min-h-screen text-black my-12 mx-8 lg:mx-36 xl:mx-56">
        <div>
          <Pending traderId={trader.id} />
        </div>         
    </main>
  </div>

  )
}

export default TraderPage

export async function getServerSideProps(context: { query: { email?: any } }) {
  if(Object.keys(context.query).length == 0){
    return {
      props: {
        trader: null
      },
    };
  }
  const user = await getUser(context.query.email);

  return {
    props: {
      trader: user,

    },
  };
}