import React from 'react'
import Header from './Header'
import TabsComponents from './Tabs'
import BookletInfo from './BookletInfo'
import { useState } from 'react'
export default function MainAddBookletAdmin() {

  const [productId, setProductId] = useState('')
      return (
    <>
        <Header></Header>
        <TabsComponents setProductId={setProductId}></TabsComponents>
        <BookletInfo productId={productId}></BookletInfo>
    </>
  )
}
