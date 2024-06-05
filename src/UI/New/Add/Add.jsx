import React, { useState } from 'react';
import ImageWithDescriptions from './ImageWithDescription.js';
import SelectionBlock from './SelectionBlock.js';
import Selection from './Selection.js';
import Input from './Input.js';
import AddButton from './AddButton.js';
import Header from './Header.js';

export default function Add() {
  // Состояние для хранения количества
  const [quantity, setQuantity] = useState('');

  // Функция для обновления количества
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  return (
    <div>
        <Header/>
        <ImageWithDescriptions/>
        <SelectionBlock/>
        <Selection/>
        <Input onQuantityChange={handleQuantityChange}/> {/* Передаем функцию для изменения количества */}
        <AddButton quantity={quantity}/> {/* Передаем текущее количество в AddButton */}
    </div>
  )
}
