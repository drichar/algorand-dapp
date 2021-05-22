import React, { useState, useEffect } from 'react'
import AlgorandClient from '../../services/algorandsdk'

export default function SuggestedFee() {
  const [fee, setFee] = useState(0)

  useEffect(() => {
    async function setSuggestedFee() {
      const txnParams = await AlgorandClient.getTransactionParams().do()
			console.log({ txnParams })
      setFee(txnParams.fee * 1000)
    }
    setSuggestedFee()
  }, [])

  return (
    <div>
      <label>Fees: </label>
      <span className="ml-2">{fee} microAlgos</span>
    </div>
  )
}
