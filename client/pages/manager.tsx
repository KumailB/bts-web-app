import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Login from '../components/common/Login'
import { Manager } from '../lib/types'
import { getUser } from './api/login'


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

    <div className="static bg-blue-800 text-white">
      <Head>
        <title>BTS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <div className="flex gap-x-4 items-center justify-center pt-48 pb-4">
        <img src="/logo.svg" className="h-28"/>
          <h1 className="text-9xl italic font-semibold tracking-wide">
            MANAGER GANG
          </h1>
          <h2>Hi {manager?.firstName}</h2>
        </div>
        <div className="m-auto w-1/2 max-w-lg bg-yellow-500 p-8 rounded-md">
          
          {Login()}
        </div>
       
      </main>

      <footer >
        <div className="absolute bottom-0 w-full text-lg text-center">© Copyright 2021 Bitcoin Trading System, All Rights Reserved</div>
      </footer>
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
