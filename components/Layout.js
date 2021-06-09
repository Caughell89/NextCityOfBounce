import Footer from './Footer'
import Navbar from './Navbar'
import styles from '../styles/Layout.less'

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className={styles.content}>
      
        <main className={styles.main}>

          {children}
        </main>

      </div>
    <Footer/>
    </>
  )
}

export default Layout