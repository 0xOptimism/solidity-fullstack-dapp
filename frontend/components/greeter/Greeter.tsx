import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import { abi } from "../../abi.json"
import { useContract, useSigner } from 'wagmi'

const Greeter: NextPage = () => {
  const { data: signer, isError, isLoading } = useSigner()
  const [message, setMessage] = useState('')


  const contract = useContract({
    addressOrName: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    contractInterface: abi,
    signerOrProvider: signer,
  })


  const greetFunction = async () => {
    if (signer) {
      const greet = await contract.greet()
      setMessage(greet)
    }
  }

  const setGreet = async () => {
    if (signer) {
      try {
        const tx = await contract.setGreeting("Running ETH")
        await tx.wait()
        const getGreetMessage = await contract.greet();
        setMessage(getGreetMessage)
      } catch (error) {
        console.log(error)
        setMessage("contract did not exectute correctly")
      }
    }
  }

  useEffect(() => {
    // Update the document title using the browser API
    if (contract) {
      greetFunction();
    }
  });

  return (
    <div>
      <h2>Hello from the frontend</h2>
      <p>{message}</p>
      <button onClick={() => setGreet()}>Set New greeting</button>
    </div>
  )
}

export default Greeter;