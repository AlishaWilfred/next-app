import React from 'react'
import {signOut} from "next-auth/react"
import ConversationSection from '@/components/ConversationSection'

export default function index() {
  return (
    <div className='hidden lg:block h-full lg:pl-80'>   
        {/* <button onClick={()=>signOut()}>Logout</button> */}
        <ConversationSection/>
    </div>
  )
}
