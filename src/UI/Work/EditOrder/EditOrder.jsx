import React from 'react'
import Header from './Header'
import AddButton from './AddButton'
import ImageWithDescriptions from './ImageWithDescription'
import Input from './Input'
import SelectionBlock from './SelectionBlock'

export default function EditOrder() {
  return (
    <div>
        <Header/>
        <ImageWithDescriptions/>
        <SelectionBlock options={['1-ое поколение','2-поколение']}/>
        <SelectionBlock options={['Доступ','Доп. буклет']} />
        <SelectionBlock options={['Электронный','Бумажный']} />
        <Input/>
        <AddButton/>

    </div>
  )
}
