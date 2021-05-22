import React, { useState } from 'react'
import { useHistory, withRouter, Link } from 'react-router-dom'
import RestoreAccountButton from '../stateless/RestoreAccountButton'

function RestoreAccountPage() {
  const [mnemonic, setMnemonic] = useState('')
  const history = useHistory()

  const restoreAccount = (keys) => {
    console.log(keys)
    localStorage.setItem('address', keys.addr)
    localStorage.setItem('mnemonic', mnemonic)

    let accountList = JSON.parse(localStorage.getItem('accountList')) || []
    accountList.push({
      address: keys.addr,
      mnemonic
    })
    localStorage.setItem('accountList', JSON.stringify(accountList))

    history.push('/account')
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
      <div className="px-4 py-5 sm:p-6">
        <div>
          <label htmlFor="mnemonic" className="block text-sm font-medium text-gray-700">
            Mnemonic
          </label>
          <div className="mt-1">
            <textarea
              id="mnemonic"
              name="about"
              rows="4"
              placeholder="Write your mnemonic"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={mnemonic}
              onChange={(e) => setMnemonic(e.target.value)}
            />
          </div>
        </div>
        <div>
          <RestoreAccountButton
            restoreAccount={restoreAccount}
            mnemonic={mnemonic}
          />
        </div>
        <div>
          <p>Don't have an account?</p>
          <Link to="/create" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Create Account
          </Link>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <p>Powered by Algorand</p>
      </div>
    </div>
  )
}

export default withRouter(RestoreAccountPage)
