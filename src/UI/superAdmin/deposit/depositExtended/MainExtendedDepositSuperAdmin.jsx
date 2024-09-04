import React, { useState } from 'react'
import Header from './Header'
import ExtendedDeposit from './ExtendedDeposit'
import AddDeposit from './AddDeposit'
export default function MainExtendedDeposit() {

  const [addRules, setAddRules] = useState(false)
  // console.log(addRules)
  return (
    <>
        <Header setAddRules={setAddRules}></Header>
        {addRules && <AddDeposit setAddRules={setAddRules} onClose={() => setAddRules(false)} />}
        <ExtendedDeposit></ExtendedDeposit>
    </>
)
}
