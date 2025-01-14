import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { BiCoffeeTogo } from "react-icons/bi";


export const Toastify = ({signin, err, signup, resetPW, update}) => {
	const {setMsg}=useContext(UserContext)//
	const navigate = useNavigate()

	useEffect(()=>{
		if(err){
			toast.error(err,{position:"top-left"})
		} else if(signin||signup){
			toast.success(signin||signup,{position:"top-center", icon:BiCoffeeTogo})
			setTimeout(()=>navigate('/'),2000)
		}else if (resetPW){
			toast.success(resetPW,{position:"top-center"})
			setTimeout(()=>navigate('/auth/in'),2000)
		}else if(update){
			toast.success(update,{position:"top-center"})
		}
		setMsg({})//
	}, [signin, err, signup, resetPW, update])

  return (
	<div>
	  <ToastContainer progressClassName={"felugro"}/>
	</div>
  )
}

