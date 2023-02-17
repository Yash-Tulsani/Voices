import React, { useState } from 'react'

import styles from "./Login.module.css"
import PhoneEmailStep from '../../components/StepComponents/PhoneEmailStep/PhoneEmailStep'
import OtpStep from '../../components/StepComponents/OtpStep/OtpStep'
import NameStep from '../../components/StepComponents/NameStep/NameStep'
import AvatarStep from '../../components/StepComponents/AvatarStep/AvatarStep'
import UsernameStep from '../../components/StepComponents/UsernameStep/UsernameStep'
import Steps from '../../components/Steps/Steps'

export default function Login() {
  const [step, setStep] = useState(0)
  const stepsLabel = ['Enter Phone or Email', 'Enter OTP'];
    const stepsComponents={
        0:<PhoneEmailStep/>,
        1:<OtpStep/>
    }
  return (
    <Steps step={step} stepsComponents={stepsComponents} stepsLabel={stepsLabel}/>
  )
}
