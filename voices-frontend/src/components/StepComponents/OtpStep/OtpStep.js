import React from 'react'
import styles from './OtpStep.module.css'

export default function OtpStep({otpInput,setOtpInput}) {
  function handleOtpChange(e){
    setOtpInput(e.target.value)
  }
  return (
    <div className={styles.otpContainer}>
      <input type="tel" name="" value={otpInput} onChange={handleOtpChange} className={styles.otpInput} maxLength={4}/>
    </div>
  )
}
