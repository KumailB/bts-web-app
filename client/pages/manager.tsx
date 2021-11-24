import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Login from '../components/login/Login'
import { Manager } from '../lib/types'
import { getUser } from './api/login'

import SiteHeader from '../components/common/SiteHeader';
import Report from '../components/manager/Report';
import { withIronSession } from 'next-iron-session'
import SiteFooter from '../components/common/SiteFooter';

interface ManagerPageProps{
  manager: Manager;
}

const ManagerPage: NextPage<ManagerPageProps> = ({manager}) => {

  const router = useRouter();
  useEffect( () => {
    if(!manager || manager.userType != 'Manager'){
      router.push('/');
    }
  }, []);

  return (

    <div className="static bg-white text-white">
      <SiteHeader user={manager}></SiteHeader>
      <Head>
        <title>Manager Dashboard</title>
        <meta name="description" content="Dashboard for BTS Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen text-black my-12 mx-4 lg:mx-36 xl:mx-56">
          <div>
            <Report/>
          </div>         
      </main>
      <SiteFooter/>
    </div>

  )
}
export default ManagerPage

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
        manager: user,
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
