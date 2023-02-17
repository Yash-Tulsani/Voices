import React, { useState } from 'react'

import styles from "./Register.module.css"
import PhoneEmailStep from '../../components/StepComponents/PhoneEmailStep/PhoneEmailStep'
import OtpStep from '../../components/StepComponents/OtpStep/OtpStep'
import NameStep from '../../components/StepComponents/NameStep/NameStep'
import AvatarStep from '../../components/StepComponents/AvatarStep/AvatarStep'
import UsernameStep from '../../components/StepComponents/UsernameStep/UsernameStep'
import Steps from '../../components/Steps/Steps'

export default function Register() {
  // const [step, setStep] = useState(0)
  const stepsLabel = ['Enter Phone Number', 'Enter the OTP', 'Enter Your Name','Set an Avatar','Enter Username'];
 

  return (
    <Steps stepsLabel={stepsLabel}/>
  )
}
