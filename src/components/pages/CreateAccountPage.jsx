import React from 'react'
import algosdk from 'algosdk'
import { useHistory, withRouter, Link } from 'react-router-dom'
import CreateAccountButton from '../stateless/CreateAccountButton'

function CreateAccountPage() {
  const history = useHistory()

  const createAccount = (keys) => {
    localStorage.setItem('address', keys.addr)
    localStorage.setItem('mnemonic', algosdk.secretKeyToMnemonic(keys.sk))

    let accountList = JSON.parse(localStorage.getItem('accountList')) || []
    accountList.push({
      address: keys.addr,
      mnemonic: algosdk.secretKeyToMnemonic(keys.sk)
    })
    localStorage.setItem('accountList', JSON.stringify(accountList))

    history.push('/account')
  }
  
  return (
    <>
      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 text-center">
        <div className="px-4 py-5 sm:p-6">
          <div className="py-4">
            <CreateAccountButton createAccount={createAccount} />
          </div>
          <div className="py-4 border-t border-gray-200">
            <p className="mb-2">Already have an account?</p>
            <Link to="/restore" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Restore Account
            </Link>
          </div>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6 text-center">
        <p className="text-sm text-gray-400">Powered by Algorand</p>
      </div>
    </>
  )
}

export default withRouter(CreateAccountPage)
