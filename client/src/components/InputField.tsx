import React from 'react'
import { Puppy } from '../interfaces'

interface Props{
  category: string,
  onChange: any,
  isRequired?: boolean
  value?: string|number
}

export function InputField1({ category, onChange }: Props) {
  const capitalizeFirstChar = (str:string) => str.charAt(0).toUpperCase() + str.slice(1);
    
  
  return (
    <div className='inputContainer'>
      <label htmlFor={category}>{capitalizeFirstChar(category)}</label>
      <input
        onChange={onChange}
        name={category}
        className='inputField1'
        required
      />
    </div >
  )
}

export function InputField2({ category, onChange, value }: Props) {
  return (
    <div className='inputContainer'>
      <label htmlFor={category}>{category}</label>
      <input
        onChange={onChange}
        name={category}
        defaultValue={value}
        className='inputField2'
      />
    </div>
  )
}
