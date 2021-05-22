import React, { useState } from 'react'
import Account from '../stateful/Account'

export default function AccountPage() {
	const [address, setAddress] = useState(localStorage.getItem('address'))
	const [mnemonic, setMnemonic] = useState(localStorage.getItem('mnemonic'))
	const [accountList, setAccountList] = useState(localStorage.getItem('accountList'))

	const changeAccount = (account) => {
		localStorage.setItem('address', account.address)
		localStorage.setItem('mnemonic', account.mnemonic)
		setAddress(localStorage.getItem('address'))
		setMnemonic(localStorage.getItem('mnemonic'))
		setAccountList(localStorage.getItem('accountList'))
	}

	return (
		<div>
			<Account
				address={address}
				mnemonic={mnemonic}
				accountList={JSON.parse(accountList) || []}
				changeAccount={changeAccount}
			/>
		</div>
	)
}
