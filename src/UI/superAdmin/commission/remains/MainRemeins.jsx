import React, { useState } from 'react'
import TableRemains from './TableRemains'
import Header from './Header'

export default function MainRemeins() { 

    const [dummyKey,setDummyKey] = useState(0)

  return (
    <>
    <Header setDummyKey={setDummyKey}></Header>
        <TableRemains dummyKey={dummyKey}></TableRemains>
    </>
  )
}
