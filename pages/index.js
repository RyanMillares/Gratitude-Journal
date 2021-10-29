
import Greeting from '../components/greeting'
import History from '../components/History'
import Input from '../components/Input'
import { useState } from 'react'
import Head from 'next/head'
import GratitudeApp from "../components/GratitudeApp"
import { Auth } from "@supabase/ui"

import { supabase } from '../utils/supabaseClient'
export default function Home() {

// gets logged in user from Auth.UserContextProvider
// if no user is logged in, user will be null
// uf a user is logged in, user will be an object with user info


  const { user } = Auth.useUser()

  return (
    <div className="bg-blue-700 flex flex-col items-center min-h-screen py-2">
      <Head>
        <title>Gratitude Journal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto max-w-prose px-4 pt-12">
        {
          // display app if user is logged in, otherwise show them the log in screen
          user ? (<div>
            <GratitudeApp user = {user}/>
            <button className = "text-pink-300" onClick = {async () => {
              let {error} = await supabase.auth.signOut()
              if(error){console.log(error)}
            }}>
              Logout
            </button>
          </div>) : (
            <div className = "bg-white">
              <Auth supabaseClient = {supabase} socialLayout = "horizontal" socialButtonSize = "xlarge" />
            </div>
          )
        }
        
        </main>
        <style jsx>
          {`
          .spacer {
            height: 20px;
          }
          `}
        </style>
    </div>
  )
}
