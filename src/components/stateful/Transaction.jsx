import React, { useState } from 'react'
import algosdk from 'algosdk'
import cn from 'classnames'
import AlgorandClient from '../../services/algorandsdk'
import SuggestedFee from './SuggestedFee'

export default function Transaction({ mnemonic }) {
  const [addressTo, setAddressTo] = useState({
    value: '',
    isValid: true,
    message: 'Please choose an address'
  })
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [txnId, setTxnId] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const checkBalance = async (account) => {
    const { amount: balance } = await AlgorandClient.accountInformation(account).do()
    console.log(`${balance} ${account}`)
    return balance === 0
  }

  const sendTransaction = async () => {
    const recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic)
    const hasBalance = await checkBalance(recoveredAccount.addr)

    if (addressTo.value === '') {
      setAddressTo({
        value: '',
        isValid: false,
        message: 'Please choose an address'
      })
    }
    else if (!algosdk.isValidAddress(addressTo.value)) {
      setAddressTo({
        value: '',
        isValid: false,
        message: 'Please choose an address'
      })
    }
    else if (hasBalance) {
      alert(`${recoveredAccount} does not have sufficient balance...`)
    }
    else {
      startTransaction(recoveredAccount)
        .catch((e) => console.log(e))
    }
  }

  const startTransaction = async (recoveredAccount) => {
    try {
      // get params from algod
      const params = await AlgorandClient.getTransactionParams().do()
      const endRound = params.endRound + parseInt(1000)

      // create transaction
      const txn = {
        from: recoveredAccount.addr,
        to: addressTo.value,
        fee: params.fee,
        amount: Number.parseInt(amount),
        firstRound: params.lastRound,
        lastRound: endRound,
        genesisID: params.genesisID,
        genesisHash: params.genesishashb64,
        note: algosdk.encodeObj(note)
      }

      // sign transaction
      const signedTxn = algosdk.signTransaction(txn, recoveredAccount.sk)

      // send transaction
      AlgorandClient.sendRawTransaction(signedTxn.blob)
        .then((tx) => {
          console.log(tx)
          setTxnId(tx.txId)
          setAddressTo({
            value: '',
            isValid: true,
            message: 'Please choose an address'
          })
          setAmount(0)
          setNote('')
        })
    }
    catch (err) {
      setErrorMsg(err.text)
    }
  }

  const signTransactionOffline = async () => {
    if (addressTo.value === '') {
      setAddressTo({
        value: '',
        isValid: false,
        message: 'Please choose an address'
      })
    }
    else if (!algosdk.isValidAddress(addressTo.value)) {
      setAddressTo({
        value: '',
        isValid: false,
        message: 'Please choose a valid address'
      })
    }
    else {
      const recoveredAccount = algosdk.mnemonicToSecretKey(mnemonic)
      try {
        const params = await AlgorandClient.getTransactionParams()
        const endRound = params.endRound + parseInt(1000)

        // create transaction
        const txn = {
          from: recoveredAccount.addr,
          to: addressTo.value,
          fee: params.fee,
          amount: Number.parseInt(amount),
          firstRound: params.lastRound,
          lastRound: endRound,
          genesisID: params.genesisID,
          genesisHash: params.genesishashb64,
          note: algosdk.encodeObj(note)
        }

        downloadTxnFile(txn)
      }
      catch (err) {
        console.log(err)
      }
    }
  }

  const downloadTxnFile = (txn) => {
    const element = document.createElement('a')
    const file = new Blob([JSON.stringify(txn)], {
      type: 'application/json'
    })
    element.href = URL.createObjectURL(file)
    element.download = 'txn.json'
    document.body.appendChild(element) // Required for this to work in Firefox
    element.click()
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
      <div className="px-4 py-5 sm:p-6">
        <h3>Send Transaction</h3>
        <div>
          <label htmlFor="addressTo" className="block text-sm font-medium text-gray-700">
            Address To
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="addressTo"
              placeholder="Enter address"
              className={cn('shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md', {
                'border-gray-300': addressTo.isValid,
                'border-red-500': !addressTo.isValid
              })}
              value={addressTo.value}
              onChange={(e) => setAddressTo({
                value: e.target.value,
                isValid: true,
                message: 'Please choose an address'
              })}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">{addressTo.message}</p>
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            placeholder="0 (in microAlgos)"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Note
          </label>
          <textarea
            id="note"
            rows="3"
            placeholder="Write note"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div>
          <SuggestedFee />
        </div>

        {errorMsg && (
          <div>
            <p className="text-red-500 font-bold">
              Error <br/>
              {errorMsg}
            </p>
          </div>
        )}

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={sendTransaction}
            >
              Send
            </button>
            <button
              type="button"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={signTransactionOffline}
            >
              Sign Offline
            </button>
          </div>
        </div>
      </div>
      {txnId !== '' && (
        <div className="px-4 py-5 sm:p-6">
          <p className="text-green-500 font-bold">Transaction Sent</p>
          <p>
            <span className="font-bold">txnId: </span>
            <span>{`${txnId.substr(0, 10)}...${txnId.substr(-4, 4)}`}</span>
          </p>
        </div>
      )}
    </div>
  )
}
