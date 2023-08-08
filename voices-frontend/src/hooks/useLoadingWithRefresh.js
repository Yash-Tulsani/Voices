import {useState,useEffect} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/slices/userAuthSlice';
import api from '../http/http';

export  function useLoadingWithRefresh(){
    const [loading,setLoading]=useState(true);
    const dispatch=useDispatch();
    useEffect(()=>{
        (async()=>{
            try{
                const baseUrl=process.env.REACT_APP_API_URL;
                console.log(baseUrl);
                const {data}=await api.get(`/api/refresh`,{
                    withCredentials: true
                })
                dispatch(setAuth(data));
                
            }catch(err){
                console.log(err.message);
            }finally{
                setLoading(false);
            }
        })();
    },[])
    return {loading};
}

