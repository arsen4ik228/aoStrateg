import React from 'react'
import ImageWithDescriptions from './ImageWithDescription.js'
import SelectionBlock from './SelectionBlock.js'
import Selection from './Selection.js'
import Input from './Input.js'
import AddButton from './AddButton.js'
import Header from './Header.js'

export default function Add() {
  return (
    <div>
        <Header/>
        <ImageWithDescriptions/>
        <SelectionBlock/>
        <Selection/>
        <Input/>
        <AddButton/>

    </div>
  )
}
