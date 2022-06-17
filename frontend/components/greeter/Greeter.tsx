import { SetStateAction, useEffect, useState } from 'react';
import type { NextPage } from 'next'
import { abi } from "../../abi.json"
import { useContract, useSigner } from 'wagmi'
import { CONTRACT_ADDRESS } from '../../constant'
import { Container, Input, Button } from '@chakra-ui/react'


const Greeter: NextPage = () => {
  const { data: signer } = useSigner()
  const [greeter, setGreeter] = useState('')
  const [value, setValue] = useState('')
  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => setValue(event.target.value)



  const contract = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: abi,
    signerOrProvider: signer,
  })

  const updateContract = async (newMessage: string) => {
    if (signer) {
      const tx = await contract.update(newMessage)
      await tx.wait()
      const message = await contract.message()
      setGreeter(message)
    }
  }

  useEffect(() => {
    const getMessage = async () => {
      if (signer) {
        const message = await contract.message();
        setGreeter(message)
      }
    }
    getMessage()
  }, [contract, signer])

  return (
    <Container mt={5}>
      <Input value={value}
        onChange={handleChange} placeholder='modify greeter' />
      <Button onClick={() => updateContract(value)}>Change Greeter</Button>
      <p>{greeter}</p>
    </Container>
  )
}

export default Greeter;