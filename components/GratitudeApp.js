import Greeting from './greeting'
import History from './History'
import Input from './Input'
import { useEffect, useState } from 'react'

import { supabase } from '../utils/supabaseClient'
import { data } from 'autoprefixer'
export default function GratitudeApp({ user }) {


  const [gratitudes, setGratitudes] = useState ([])
  const [hasSubmittedToday, setHasSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  //let hasSubmittedToday = true

  useEffect(() => {
    // run the fetchGratitudes() function
    // after the initial render of the app
    // so we have access to the logged in user
    fetchGratitudes()
  }, [])

  const fetchGratitudes = async () => {
    //get the gratitudes data from supabase
    //set the value of gratitudes state to that data


    let { data: gratitudes, error } = await supabase
    .from('gratitudes')
    .select('entry,date_insert_ts')

    if (!error){
      setGratitudes(gratitudes)
      let currentTime = new Date().getTime()
      
      let mostRecentRecordTime = new Date(gratitudes.slice(-1)[0].date_insert_ts).getTime()
      let hoursSincelastSubmission = (currentTime - mostRecentRecordTime) / 3600000
      let didSubmitToday = hoursSincelastSubmission < 24 
      console.log(hoursSincelastSubmission  )
      setHasSubmitted(didSubmitToday)
    

      setLoading(false)

    } else {
      //there is an error
      console.log(error)
      setError(error)
      setLoading(false)
    }
  }


  const addGratitude = async (entry) => {
    //let newGratitudes = [...gratitudes, entry]
    //setGratitudes(newGratitudes)
    //setHasSubmitted(true)
    
    const { data, error } = await supabase
      .from('gratitudes')
      .insert([
    { id: user.id, entry: entry },
    ])
    setLoading(true)
    if (error) { 
      console.log(error) 
      setError(error)
    }
    else {
      setGratitudes([...gratitudes, {'entry': entry, 'date_insert_ts': null }])
      setLoading(false)
      setHasSubmitted(true)
    }

  }
  /* Application is still fetching data */
  if (loading) {
    return <p>Loading...</p>
  }
  /* Something went wrong while fetching data */
   if(error) {
     return <p>{error}</p>
   }
  //console.log(gratitudes)




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
          !hasSubmittedToday && <Input defaultValue = "Enter gratitude" handleSubmit = {addGratitude} />

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
