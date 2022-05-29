import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import { abi } from "../../abi.json"
import { useContract, useSigner } from 'wagmi'
import { formatEth, parseUnits } from '../../helpers';


const Greeter: NextPage = () => {
  const { data: signer, isError, isLoading } = useSigner()
  const [balance, setBalance] = useState(0)


  const contract = useContract({
    addressOrName: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    contractInterface: abi,
    signerOrProvider: signer,
  })


  const getContractBalance = async () => {
    if (signer) {
      const balance = await contract.getBalance()
      setBalance(balance.toString())
    }
  }

  const sendETH = async () => {
    if (signer) {
      try {
        const numberOfEth = 3
        const option = {
          value: parseUnits(numberOfEth.toString()),
        }
        await contract.deposit(option)
      } catch (error) {
        console.log(error)
      }

    }
  }

  useEffect(() => {
    getContractBalance();
  });

  return (
    <div>
      <p>Smart contract balance: {formatEth(balance, "ether")} ETH</p>
      <button onClick={() => sendETH()}>Set New greeting</button>
    </div>
  )
}

export default Greeter;