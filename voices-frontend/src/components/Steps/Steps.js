import * as React from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';



import PhoneEmailStep from '../StepComponents/PhoneEmailStep/PhoneEmailStep';
import OtpStep from '../StepComponents/OtpStep/OtpStep'
import NameStep from '../StepComponents/NameStep/NameStep'
import AvatarStep from '../StepComponents/AvatarStep/AvatarStep'
import UsernameStep from '../StepComponents/UsernameStep/UsernameStep'

import styles from "./Steps.module.css"
import StepBox from '../StepComponents/StepBox/StepBox';

import { useState,useEffect } from 'react';
import {toast} from 'react-toastify'

import {sendOtpRequest,verifyOtpRequest, sendActivateRequest} from "../../http/http"

// Redux Imports
import {useDispatch, useSelector} from 'react-redux'
import {setOtp,setAuth} from "../../redux/slices/userAuthSlice"
import { setUsername,setAvatar } from '../../redux/slices/activateSlice';
import { useNavigate } from 'react-router-dom';

export default function Steps({stepsLabel}) {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {phone,hash}=useSelector((state)=> state.auth.otp);

  // Steps Component States
  const [activeStep, setActiveStep] = React.useState(0);
  const [isMounted,setIsMounted]=useState(false);

  useEffect(()=>{
    setIsMounted(true);
    return ()=>{
      setIsMounted(false);
    }
  },[])

  // Phone component states
  const [phoneNumber, setPhoneNumber] = useState("")
  const [currentCountryCode, setcurrentCountryCode] = useState("")

  // Otp component States
  const [otpInput, setOtpInput] = useState("")

  // Funtions for Steps
  // Send Otp Step functions
  const sendOtp=async()=>{
    if(phoneNumber==="" || !phoneNumber){
      toast.error("Phone number cannot be empty.")
      return false;
    }
    const res=await toast.promise(sendOtpRequest({phone: `${currentCountryCode} ${phoneNumber}`}),{
      pending: "Sending OTP...",
      success: "OTP sent successfully.",
      error: "Error sending OTP! Try Again."
    })
    
    dispatch(setOtp({phone: res.data.phone, hash: res.data.hash}));
    return true;

  }

  // Verify Otp Step functions
  const verifyOtp=async ()=>{
      if(otpInput==="" || !otpInput || !phone || !hash){
        toast.error("OTP cannot be empty.")
        return false;
      }
      const {data}=await toast.promise(verifyOtpRequest({phone,hash,otp:otpInput}),{
        pending: "Verifying OTP...",
        success: "OTP verified !",
        error:{
          render({data}){
            return data.response.data.message
          }
        }
      });
      dispatch(setAuth({user:data.user}))
      return true;
  }

  // Name Component states
  const [name,setName]=useState(useSelector(state=>state.activate).username);
  // Name components functions

    // function to run before moving to next step
  const setUsernameStep=async ()=>{
    if(name==undefined || name==="" || !name){
      toast.error("Name cannot be empty.")
      return false;
    }
    else{
      dispatch(setUsername(name))
      return true;
    }
  }

  // Activating user after avatar step
  const {avatar}=useSelector((state)=>state.activate);
  const activateUser=async ()=>{
    if(avatar==""){
      toast.error("Please select a profile picture")
      return false;
    }
    try{
      const {data}=await sendActivateRequest({name,avatar});
      if(data.auth){
        if(isMounted){
          dispatch(setAuth({user:data.user}))
        }
        navigate('/rooms');
      }

      return false;
    }catch(err){  
      console.log("User activation error");
      toast.error(err.message)
      return false;
    }

  }

  const handleNext = async() => {
    let canMoveToNextStep=true;
    switch (activeStep) {
      case 0:
        canMoveToNextStep=await sendOtp();
        break;
      case 1:
        canMoveToNextStep=await verifyOtp();
        break;
      case 2:
        canMoveToNextStep=await setUsernameStep();
        break;
      case 3:
        canMoveToNextStep=await activateUser();
      default:
        break;
    }
    if(canMoveToNextStep){
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleNextOnEnterKeyPress= (e)=>{
    if(e.key==="Enter"){
      handleNext();
    }
  }

 
  const stepsComponents={
    0:<PhoneEmailStep phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} currentCountryCode={currentCountryCode} setcurrentCountryCode={setcurrentCountryCode}/>,
    // 0:<AvatarStep/>,
    1:<OtpStep otpInput={otpInput} setOtpInput={setOtpInput}/>,
    2:<NameStep name={name} setName={setName}/>,
    3:<AvatarStep/>,
    4:<UsernameStep/>
  }

  const stepImgUrl={
    0: "/Images/phoneImg.png",
    1: "/Images/otpImg.png",
    2: "/Images/nameImg.png",
    3: "/Images/avatarImg.png",
    4: "/Images/usernameImg.png",
  }


  return (
    <div className={styles.stepContainer} tabIndex={0} onKeyDown={handleNextOnEnterKeyPress}>
    <Box sx={{ width: '80%'}}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {stepsLabel.map((label, index) => {
          return (
            <Step key={label} >
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <StepBox stepImgUrl={stepImgUrl[activeStep]} handleNext={handleNext} handleBack={handleBack} activeStep={activeStep} stepsLabel={stepsLabel}>
        {stepsComponents[activeStep]}
      </StepBox>
    </Box>
    </div>
  );
}