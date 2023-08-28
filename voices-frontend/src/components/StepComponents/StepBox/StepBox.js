import React from 'react'
import styles from './StepBox.module.css'



export default function StepBox({ stepImgUrl, children, handleNext, handleBack, activeStep, stepsLabel }) {
  const termsAndConditions="By entering your number, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!";
  return (
    <div className={styles.step}>
      <div className={styles.stepHeadContainer}>
        <img className={styles.stepImg} src={stepImgUrl} alt="" />
        <span className={styles.stepHeadText}>{stepsLabel[activeStep]}</span>
      </div>
      {children}
      <div className="btnContainer">
        {activeStep != 0 && <div onClick={handleBack} className="backBtn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className='backBtnImg'>
            <path d="M7.00004 0.333334L5.82504 1.50833L10.475 6.16667H0.333374V7.83333H10.475L5.82504 12.4917L7.00004 13.6667L13.6667 7L7.00004 0.333334Z" fill="white" />
          </svg>
          <span className="backBtnText">Back</span>
        </div>}
        {activeStep < stepsLabel.length - 1 && <div onClick={handleNext} className="nextBtn">
          <span className="nextBtnText">Next</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className='nextBtnImg'>
            <path d="M7.00004 0.333334L5.82504 1.50833L10.475 6.16667H0.333374V7.83333H10.475L5.82504 12.4917L7.00004 13.6667L13.6667 7L7.00004 0.333334Z" fill="white" />
          </svg>
        </div>}
      </div>
      {activeStep==0 && <div className={styles.termsAndConditions}>{termsAndConditions}</div>}
    </div>
  )
}
