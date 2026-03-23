import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

export const ForgotPassword = () => {
  const {register,handleSubmit,formState:{errors}} = useForm()
  const navigate =useNavigate()
  const submitHandler = async(data) =>{
    const res = await axios.post("/userApi/forgotpassword",data)
    console.log(res.data)
    if(ress==200){
      navigate("/login")
    }
  }
  
  return (
    <div>
         <h1>FORGOT PASSWORD</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
            <input type="email" placeholder="Email" {...register("email",{
                required:"Email is required"
            })}/>
            {errors.email && <p>{errors.email.message}</p>}
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}
