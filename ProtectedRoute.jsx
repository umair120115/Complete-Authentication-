import {Navigate} from 'react-router-dom';//for navigation purpose
import {jwtDecode} from 'jwt-decode';//decoding our tokens
import api from '../api'; // getting our api
import { REFRESH_TOKEN,ACCESS_TOKEN } from '../constants';//accessing our tokens
import { useState,useEffect } from 'react';

function ProtectedRoute({children}){
    const[isAuthorised, setIsAuthorised]=useState(null)
    // if auth function catches any error then set authorisation is false and user have to login again
    useEffect(()=>{
        auth().catch(()=>setIsAuthorised(false))
    },[])

// for refresh token 
    const refreshToken=async()=>{
        // get refresh token from the local storage
        const refreshToken=localStorage.getItem(REFRESH_TOKEN)
        try{
            // token is sent to the backend and get back access token
            const res= await api.post("/api/token/refresh/",{refresh:refreshToken,});
            // checking if response's status is 200 then set access token equals to refresh token and set authorization is true
            if(res.status===200){
                localStorage.setItem(ACCESS_TOKEN,res.data.access)
                setIsAuthorised(true)
// if status is not equals to 200 then set authorization false and user needs to be logged in again
            }else{
                setIsAuthorised(false)
            }

        }catch(error){
            console.log(error)
            setIsAuthorised(false)
        }

    };

    const auth=async()=>{
        // is to first look at the access token see if we have one? if we have?if it is expired or not? if expired?automatically refress the token
        const token=localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setIsAuthorised(false)
            return
        }
        const decode=jwtDecode(token)
        const tokenExpiration=decode.exp
        const now=Date.now()/1000//getting day in seconds

        if (tokenExpiration< now){
            await refreshToken()
        }else{
            setIsAuthorised(true)
        }

    }
// if isAuthorised is null then will show Loading the tokens
    if(isAuthorised===null){
        return <div>Loading....</div>
    }
    // if isAuthorised is loaded then it will return the wrapped children if found access token in it otherwise navigate to login page
    return isAuthorised?children :<Navigate to="/login/"/>
}

export default ProtectedRoute