import React from 'react'
import styles from './layout.module.css'
import logo from '../../logo.svg'

/**
 * Layout
 */
export interface LayoutProps {}
export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div className={styles.layout}>
      <header>
        <img src={logo} className={styles.logo} alt="logo" />
      </header>
      <div className={styles.container}>{props.children}</div>
      <footer>
        <p className={styles.copyrightText}>Copyright &copy; {new Date().getFullYear()} All Rights Reserved by Aman</p>
      </footer>
    </div>
  )
}
