import React from 'react';
import algosdk from 'algosdk'

/**
 * Button to restore account from mnemonic provided in props
 * @param {string} mnemonic
 * @param {function} restoreAccount
 */
export default function RestoreAccountButton({ mnemonic, restoreAccount }) {
  const restoreAcct = () => {
    const keys = algosdk.mnemonicToSecretKey(mnemonic)
    restoreAccount(keys)
  }

  return (
    <button
      type="button"
      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={restoreAcct}
    >
      Restore Account
    </button>
  )
}
