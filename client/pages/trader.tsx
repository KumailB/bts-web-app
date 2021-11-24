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
import Search from '../components/trader/Search'
import { getPendingTransactions } from './api/trader';
import { withIronSession } from 'next-iron-session';
import Payment from '../components/trader/Payment';
import SiteFooter from '../components/common/SiteFooter';
interface TraderPageProps{
  trader: Trader;
}

const TraderPage: NextPage<TraderPageProps> = ({trader}) => {
  
  const router = useRouter();
  useEffect( () => {
    if(!trader || trader.userType != 'Trader'){
      router.push('/');
    }
  }, []);
  
  return (

    <div className="static bg-white text-white">
      <SiteHeader user={trader}></SiteHeader>
    <Head>
      <title>Trader Dashboard</title>
      <meta name="description" content="Dashboard for BTS Trader" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="min-h-screen text-black my-12 mx-8 lg:mx-12 xl:mx-16">
        <div>
          <Payment traderId={trader.id} />
          <Pending traderId={trader.id} />
          <Search/>
        </div>         
    </main>
    <SiteFooter/>
  </div>

  )
}

export default TraderPage

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
    return {
      props: { 
        trader: user,
       }
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