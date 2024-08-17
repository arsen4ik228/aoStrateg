import React, {useState} from 'react'
import Header from './Header'
import AddButton from './AddButton'
import ImageWithDescriptions from './ImageWithDescription'
import Input from './Input'
import SelectionBlock from './SelectionBlock'
import Selection from './Selection'

export default function EditOrder() {

    // Состояние для хранения количества
    const [quantity, setQuantity] = useState('1');

    // Функция для обновления количества
    const handleQuantityChange = (newQuantity) => {
      setQuantity(newQuantity);
    };

  return (
    <div>
        <Header/>
        <ImageWithDescriptions/>
        <SelectionBlock />
        <Selection/>
        <Input onQuantityChange={handleQuantityChange}/> {/* Передаем функцию для изменения количества */}
        <AddButton quantity={quantity}/>

    </div>
  )
}
