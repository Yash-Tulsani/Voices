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

import { useState } from 'react';


import {sendOtpRequest,verifyOtpRequest} from "../../http/http"

// Redux Imports
import {useDispatch, useSelector} from 'react-redux'
import {setOtp,setAuth} from "../../redux/slices/userAuthSlice"


export default function Steps({stepsLabel}) {
  const dispatch=useDispatch();
  const {phone,hash}=useSelector((state)=> state.auth.otp);

  // Steps Component States
  const [activeStep, setActiveStep] = React.useState(0);

  // Phone component states
  const [phoneNumber, setPhoneNumber] = useState("")
  const [currentCountryCode, setcurrentCountryCode] = useState("")

  // Otp component States
  const [otpInput, setOtpInput] = useState("")

  // Funtions for Steps
  // Send Otp Step functions
  const sendOtp=async()=>{
    const res=await sendOtpRequest({phone: `${currentCountryCode} ${phoneNumber}`})
    dispatch(setOtp({phone: res.data.phone, hash: res.data.hash}))

  }

  // Verify Otp Step functions
  const verifyOtp=async ()=>{
      const {data}=await verifyOtpRequest({phone,hash,otp:otpInput});
      dispatch(setAuth({user:data.user}))
  }

  const handleNext = async() => {
    switch (activeStep) {
      case 0:
        await sendOtp();
        break;
      case 1:
        await verifyOtp();
        break;
      default:
        break;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  
 
  const stepsComponents={
    0:<PhoneEmailStep phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} currentCountryCode={currentCountryCode} setcurrentCountryCode={setcurrentCountryCode}/>,
    1:<OtpStep otpInput={otpInput} setOtpInput={setOtpInput}/>,
    2:<NameStep/>,
    3:<AvatarStep/>,
    4:<UsernameStep/>
  }

  const stepImgUrl={
    0: "../../../Images/phoneImg.png",
    1: "../../../Images/otpImg.png",
    2: "../../../Images/nameImg.png",
    3: "../../../Images/avatarImg.png",
    4: "../../../Images/usernameImg.png",
  }


  return (
    <div className={styles.stepContainer}>
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