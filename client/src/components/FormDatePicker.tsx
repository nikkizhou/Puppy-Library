import React,{useState} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props{
  changeBday:Function

}

function FormDatePicker({ changeBday }: Props) {
  const [selectedDay, setSelectedDay] = useState<Date>();


  return (
    <div className='inputContainer'>
      <label htmlFor='bday'>Birthday</label>
      <DatePicker
        selected={selectedDay}
        onChange={(date: Date) => {
          setSelectedDay(date);
          changeBday(`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`);
        }}
        name='bday'
        className='inputField1'
      />
    </div >
  );
}

export default FormDatePicker
