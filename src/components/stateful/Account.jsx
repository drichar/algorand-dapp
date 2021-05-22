import React, { useState, useEffect } from 'react'
import AccountDetail from '../stateless/AccountDetail'
import AlgorandClient from '../../services/algorandsdk'

export default function Account({ address, mnemonic, accountList, changeAccount }) {
  const [balance, setBalance] = useState(0)

useEffect(() => {
	async function setAccountInfo() {
		console.log({ address })
		const accountInfo = await AlgorandClient.accountInformation(address).do()
		console.log({ accountInfo })
		setBalance(accountInfo.amount / 1000000)
	}
	setAccountInfo()
}, [address])

  const changeAcct = async (account) => {
    changeAccount(account)
    console.log(account)

    const accountInfo = await AlgorandClient.accountInformation(account.address)
    console.log(accountInfo)
    setBalance(accountInfo.amount / 1000000)
  }

  return (
    <div>
      <AccountDetail
        balance={balance}
        address={address}
        mnemonic={mnemonic}
        accountList={accountList}
        changeAccount={changeAcct}
      />
    </div>
  )
}
