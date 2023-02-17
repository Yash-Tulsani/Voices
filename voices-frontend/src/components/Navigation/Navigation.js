import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Navigation.module.css"

export default function Navigation() {
  return (
    <nav className={styles.navbar}>
        <Link to="/">
            <span className={styles.brandName}>Voices</span>
        </Link>
    </nav>
  )
}
