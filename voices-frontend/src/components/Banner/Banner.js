import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AnimatedBg from '../AnimatedBg/AnimatedBg'
import styles from "./Banner.module.css"

const rand=(min,max)=>{
  return Math.floor(min+Math.random()*(max-min+1))
}


export default function Banner() {
  const navigate = useNavigate();

  const [starTopPos,setStarTopPos]=React.useState([])
  const [starLeftPos,setStarLeftPos]=React.useState([])
  const startRegistration = () => {
    navigate('/register')
  }

  const changeStarPositions=()=>{
    let topPos=[]
    let leftPos=[]
    for(let i=0;i<3;i++){
      topPos.push(rand(-20,70))
      leftPos.push(rand(-10,100))
    }
    // React automatic batching
    setStarTopPos(topPos)
    setStarLeftPos(leftPos)
  }
  
  // Setting interval on mount
  useEffect(() => {
    const timer = setInterval(() => {
      changeStarPositions()
    }, 2000);
    // Clearing interval on unmount
    return () => clearInterval(timer);
  }, []);



  useEffect(()=>{
    const stars=document.querySelectorAll(`.${styles.magicStars}`)
    stars.forEach((star,i)=>{
      star.style.top=`${starTopPos[i]}%`
    })
  },[starTopPos])
  
  useEffect(()=>{
    const stars=document.querySelectorAll(`.${styles.magicStars}`)
    stars.forEach((star,i)=>{
      star.style.left=`${starLeftPos[i]}%`
    })
  },[starLeftPos])

    
  return (
    <>

      <div className={styles.bannerContainer}>

        <div className={styles.bannerHeadContainer}>
          <div className={styles.bannerHead}>
            Create Space For Everyone To Find Belongings With <span className={styles.bannerHighlight}>
              <span className={styles.magicText}>Voices</span>
              <span className={styles.magicStars} >
                <svg viewBox="0 0 512 512">
                  <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                </svg>
              </span>
              <span className={styles.magicStars} >
                <svg viewBox="0 0 512 512">
                  <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                </svg>
              </span>
              <span className={styles.magicStars}>
                <svg viewBox="0 0 512 512">
                  <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                </svg>
              </span>
            </span>
          </div>
          <div className={styles.bannerDescription}>Voices allows people to talk in real time to one another over the internet, join different podcasts of many different topics or conduct a podcast session whether it be public or private.</div>
          <div className={styles.joinContainer}>
            <div className={styles.usernameBtn} onClick={startRegistration}>Get Your Username</div>
            <div className={styles.signinContainer}>
              <span className={styles.signinText}>Have an invite text?</span>
              <Link to="/login" className={styles.signInBtn} >Sign In</Link>
            </div>
          </div>
        </div>
        <div className={styles.bannerImg}></div>
      </div>
    </>
  )
}
