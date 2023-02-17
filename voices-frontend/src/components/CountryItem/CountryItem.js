import React from 'react'
import styles from "./CountryItem.module.css"

export default function CountryItem({country}) {
    const countryFlagUrl=`https://countryflagsapi.com/svg/${country.name.toLowerCase()}`
  return (
    <div className={styles.countryContainer}>
        {/* <img src={countryFlagUrl} alt=""  className={styles.flag}/> */}
        <span className={styles.countryName}>{country.name}</span>
        <span className={styles.countryCode}>{country.dial_code}</span>
    </div>
  )
}
