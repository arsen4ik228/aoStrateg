import React from 'react'
import AddButton from '../../Work/EditOrder/AddButton.js'
import ImageWithDescriptions from '../../Work/EditOrder/ImageWithDescription.js'
import Header from './Header.js'
import Input from '../../Work/EditOrder/Input.js'
import SelectionBlock from '../../Work/EditOrder/SelectionBlock.js'
import Selection from '../../Work/EditOrder/Selection.js'
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
