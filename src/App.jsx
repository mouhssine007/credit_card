import { useState } from "react"
import CreditCard from "./components/CreditCard"

const App = () => {
  const currentMonth = new Date().getMonth() +1
  const formatting = String(currentMonth).length<=1  ? "0": null
  const formattedCurrentMonth = formatting + currentMonth
  const CurrentYear = new Date().getFullYear()

  const [formData , setFormData] = useState({
    name : '',
    number : '',
    date : formattedCurrentMonth + '- ' + CurrentYear,
    cvv : ''
  })

  const [message  , setMessage] = useState("Please fill all data ")
  const [side , setSide]=useState('front')
  const handleChange = (e)=>{
  const name  =   e.target.name
  let value = e.target.value
  if(name === 'cvv' || name ==='number'){

    value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
  }
  setFormData({...formData , [name] : value })

  if(name === 'cvv'){
    setSide('back')
    return

  }
  setSide('front')

  }

 
  const handlesubmit= (e)=>{
    setMessage("good job ")


  }  
  return (
    <div className='form-container'>
      <CreditCard formData ={formData}  side ={side} />
      <form action="" onSubmit={handlesubmit}>
        <div className="input-container">
        <label  htmlFor="">Name On card</label>

         <input onChange={handleChange} name = "name" value={formData.name} placeholder="type your name ...."  required type="text" />
         
        </div>
        <div className="input-container">
        <label  htmlFor="">Card number</label>

         <input   onChange={handleChange}  name="number" value={formData.number} placeholder="0000 0000 0000 0000 "
          minLength={16} 
          maxLength={16} 
           required type="text" />
         
        </div>
        <div className="supporting-inputs-container">
          <label htmlFor="">Expiary date  
            <input name = "date" value={formData.date}  onChange={handleChange} type="month"  required/>
         </label>
         <label htmlFor="">CVV <input onChange={handleChange} id="cvv" name="cvv" value={formData.cvv}   max={3} maxLength={3}  required /></label>
        </div>
        <div className="input-container">

         <input type="submit" />
         
        </div>
        <p className="info-message" onClick={handlesubmit}> {message} </p>
      </form>
    </div>
  )
}

export default App