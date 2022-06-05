import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Greeter } from "../components/index"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h2>Hello from the frontend</h2>
      <ConnectButton />
      <Greeter />
    </div>
  )
}

export default Home
