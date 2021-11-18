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

interface ManagerPageProps{
  manager_email: string;
  manager: Manager;
}

const ManagerPage: NextPage<ManagerPageProps> = ({manager}) => {

  const router = useRouter();
  useEffect( () => {
    if(!manager || manager.userType != 'Manager'){
      router.push('/');
    }
  });

  return (

    <div className="static bg-white text-white">
      <SiteHeader name={manager.firstName}></SiteHeader>
      <Head>
        <title>Manager Dashboard</title>
        <meta name="description" content="Dashboard for BTS Manager" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen text-black my-12 mx-8 lg:mx-36 xl:mx-56">
          <div>
            <Report/>
          </div>         
      </main>
    </div>

  )
}
export default ManagerPage

export async function getServerSideProps(context: { query: { email?: any } }) {
  if(Object.keys(context.query).length == 0){
    return {
      props: {
        manager: null
      },
    };
  }
  const user = await getUser(context.query.email);
  
  return {
    props: {
      manager: user,
    },
  };
}
