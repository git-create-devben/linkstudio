import React from 'react'
import {
  AndroidMockup,
  AndroidTabMockup,
  IPhoneMockup,
  IPadMockup
}
  from "react-device-mockup"
const page = () => {
  return (
    <div className=''>
      <IPhoneMockup screenWidth={280}>
        <div className='text-red-400'>hello</div>
      </IPhoneMockup>
    </div>
  )
}

export default page