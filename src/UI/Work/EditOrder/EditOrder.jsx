import React from 'react'
import Header from './Header'
import AddButton from './AddButton'
import ImageWithDescriptions from './ImageWithDescription'
import Input from './Input'
import SelectionBlock from './SelectionBlock'
import Selection from './Selection'

export default function EditOrder() {
  return (
    <div>
        <Header/>
        <ImageWithDescriptions/>
        <SelectionBlock />
        <Selection/>
        <Input/>
        <AddButton/>

    </div>
  )
}
