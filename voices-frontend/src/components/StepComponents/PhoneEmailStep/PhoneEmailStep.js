import { MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import env from "react-dotenv";
import CountryItem from '../../CountryItem/CountryItem';
import styles from "./PhoneEmailStep.module.css"
import CountryCodes from '../../../Utilities/CountryCodes';
import StepBox from '../StepBox/StepBox';



export default function PhoneEmailStep({phoneNumber,setPhoneNumber,currentCountryCode,setcurrentCountryCode}) {
  
  
  const phoneInputStyle={
    backgroundColor:"whitesmoke",
      opacity:"1",
      width:"80%",
      borderRadius:"0 0.8vmax 0.8vmax 0",
      fontSize:"1.2vmax",
      color:"white",
      height: "100%"
  };
  const codeInputStyle={
    position:"absolute",
    top:"0",
    left:"0",
    width:"100%",
    height:"100%",
    color:"transparent",
    border:"none",
    outline: "none"
  };
  // const countryCodeUrl=`https://gist.githubusercontent.com/DmytroLisitsyn/1c31186e5b66f1d6c52da6b5c70b12ad/raw/2bc71083a77106afec2ec37cf49d05ee54be1a22/country_dial_info.json`
  const currLocationUrl=`https://api.geoapify.com/v1/ipinfo?&apiKey=5f27bc83b82c465cbf89f3455da8f5d9`;
  const countryFlagUrl=`https://countryflagsapi.com/svg/`

  const [countryCodes, setCountryCodes] = useState([]);
  const [currentCountry, setcurrentCountry] = useState("")
  
  



  const fetchCurrentLocation=async()=>{
    const response=await fetch(currLocationUrl);
    const data=await response.json();
    setcurrentCountry(data.country.iso_code)
    setcurrentCountryCode(`+${data.country.phone_code}`)
  }
  const fetchCountryCode=async ()=>{
    setCountryCodes(CountryCodes);
  }

  const handleCodeChange=(e)=>{
    setcurrentCountry(e.target.value)
    const countryObj=CountryCodes.find((obj)=>obj.name==e.target.value);
    setcurrentCountryCode(countryObj.dial_code)
  }

  const handlePhoneInputChange=(e)=>{
    setPhoneNumber(e.target.value);
  }

  useEffect(() => {
    fetchCurrentLocation();
    fetchCountryCode();
  }, [])

  
const phonePlaceholder=`${currentCountryCode} 9898989898`
  
  return (
   
      <div className={styles.inputs}>
        <div className={styles.countryCodeContainer}>
          <img className={styles.flag} crossOrigin="anonymous" src={`${countryFlagUrl}${currentCountry}`} alt="" />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currentCountry}
            label=""
            onChange={handleCodeChange}
            sx={codeInputStyle}
          >
            {countryCodes.map((country)=>{
              return (
                <MenuItem key={country.name} value={country.name}>
                  <CountryItem key={country.dial_code} value={country.dial_code} country={country}/>
                </MenuItem>
              )

            })}
          </Select>

        </div>
        <input type="tel" id="phoneInputStyle" className={styles.phoneInputStyle} onChange={handlePhoneInputChange} value={phoneNumber}
         pattern="[0-9]{10}" maxLength={10} placeholder={phonePlaceholder}/>
      </div>
 
  )
}
