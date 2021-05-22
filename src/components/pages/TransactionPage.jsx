import React from 'react'
import Transaction from '../stateful/Transaction'

export default function TransactionPage() {
	return (
		<div>
			<Transaction mnemonic={localStorage.getItem("mnemonic")} />
		</div>
	)
}
