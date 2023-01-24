import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken, setUser } from '../store/reducers/authReducer';
import { useUserLoginMutation } from '../store/services/authServices';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");  
    const [loginUser, res] = useUserLoginMutation();
    console.log(res);
    useEffect(()=>{
        if(res.isSuccess){
          localStorage.setItem("userData",JSON.stringify(res?.data))
          dispatch(setUser(res?.data?.user))
          dispatch(setToken(res?.data?.token))
          navigate("/")
        }
      },[res.isSuccess])
      const handleSubmit = (e) => {
        e.preventDefault();
        if (email !== "" && password !== "") {
          loginUser({ email,password });
        }
      };
  return (
    <div className='w-screen flex items-center justify-center h-screen bg'>
        <div className='w-4/12 bg-white flex   rounded-lg'>
            <div className='px-4 py-8  w-full text-center flex flex-col gap-2'>
                <div className='flex  flex-col gap-2'>
                    <h6 className='font-bold text-2xl color'>Angels here</h6>
                    <p className='font-semibold text-lg color'>Login</p>
                </div>
                <div className='flex   my-8  justify-center'>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input type="email"
                        value={email}
                        name="email"
                        onChange={(e)=>setEmail(e.target.value)}
                         placeholder='Email' 
                        className='rounded-lg  w-64 bg-gray-100 p-4 border-none outline-none' />
                        <input 
                         value={password}
                         name="password"
                         onChange={(e)=>setPassword(e.target.value)}
                        type="password"  placeholder='Password' 
                        className='rounded-lg w-64 bg-gray-100 p-4 border-none outline-none' />
                        <button className='bg hover:bg-purple-800 text-white rounded-lg p-2 mt-4'>Login</button>
                    </form>
                </div>
                <div className='px-4'>
                    <h6 className='text-md font-semibold '>Don't have an account ?
                     <span className='color hover:underline cursor-pointer'> Signup</span></h6>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
