import Greeting from './greeting'
import History from './History'
import Input from './Input'
import { useState } from 'react'

import { supabase } from '../utils/supabaseClient'
export default function Home() {

  const [user, setUser] = useState ({
    "name": "Ryan",
    "email": "rmillares@chapman.edu"

  })
  const [gratitudes, setGratitudes] = useState (['sunsets','music','friendship', 'pillows'])

  //const [gratitudes, setGratitudes] = useState (['rainfall', 'clouds', 'music', 'sunsets'])
  //let gratitudes = 
  //let gratitudes =  ['rainfall', 'clouds', 'music', 'sunsets']
  const [hasSubmittedToday, setHasSubmitted] = useState(false)
  //let hasSubmittedToday = true

  const addGratitude = (entry) => {
    let newGratitudes = [...gratitudes, entry]
    setGratitudes(newGratitudes)
    setHasSubmitted(true)

  }
  console.log(gratitudes)




  return (
    <div className="bg-blue-700 flex flex-col items-center min-h-screen py-2">


      <main className="container mx-auto max-w-prose px-4 pt-12">
        <Greeting
          user = {user}
          color = "text-green-300"
          gratitudes = {gratitudes}
          hasSubmittedToday = {hasSubmittedToday}
          ></Greeting>
          <div className = "spacer"/>
          <div className = "spacer"/>
          {
          !hasSubmittedToday && <Input handleSubmit = {addGratitude} />

          }
          {
            gratitudes.length > 0 && 
            <History 
            gratitudes = {gratitudes}  
            isFilled = {gratitudes.length > 0} //the && works already and ensures history won't run if empty, but this is a backup
            />
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
