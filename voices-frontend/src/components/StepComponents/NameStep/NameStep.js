import React,{useState} from 'react'
import styles from './NameStep.module.css'

export default function NameStep({name,setName}) {
  
  function handleNameChange(e){
    setName(e.target.value);
  }
  return (
    <div className={styles.nameStepContainer}>
      <span className={styles.nameStepHead}>What's your full name ?</span>
      <input type="text" value={name} onChange={handleNameChange} className={styles.nameStepInput}/>
    </div>
  )
}
