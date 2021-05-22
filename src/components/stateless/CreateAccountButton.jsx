import React from 'react'
import algosdk from 'algosdk'

/**
 * Button to generate a new account
 * @param {function} createAccount
 */
export default function CreateAccountButton({ createAccount }) {
  const generateAcct = () => {
    const keys = algosdk.generateAccount()
    createAccount(keys)
  };

  return (
    <button
      type="button"
      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      onClick={generateAcct}
    >
      Generate Account
    </button>
  )
}
