/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Transition } from '@headlessui/react'
import algoicon from '../../assets/images/react-algo-logo.jpg'

export default function AccountDetail({ mnemonic, address, accountList, changeAccount, balance }) {
  const [isOpen, setIsOpen] = useState(false)

  const downloadMnemonicFile = () => {
    const element = document.createElement('a')
    const file = new Blob([JSON.stringify(mnemonic)], {
      type: 'text/plain'
    })
    element.href = URL.createObjectURL(file)
    element.download = 'mnemonic.txt'
    document.body.appendChild(element) // Required for this to work in Firefox
    element.click()
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between">
          <div className="w-10" />
          <div className="flex flex-col items-center">
            <h4 className="text-2xl font-semibold">Account</h4>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800">
              {`${address.substr(0, 4)}...${address.substr(-4, 4)}`}
            </span>
          </div>

          {/* accounts menu */}
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                id="accounts-menu"
                onClick={(e) => setIsOpen(!isOpen)}
                aria-haspopup="true"
                aria-expanded="true"
              >
                {/* Heroicon name: solid/chevron-down */}
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <Transition
              show={isOpen}
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div className="py-1 divide-y divide-gray-200" role="menu" aria-orientation="vertical" aria-labelledby="accounts-menu">
                <div>
                  {accountList.map((account, i) => (
                    <a
                      role="button"
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      key={account.address}
                      onClick={(e) => {
                        changeAccount(account)
                      }}
                    >
                      <span className="block font-bold">{`Account ${i + 1}`}</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                        {`${account.address.substr(0, 4)}...${account.address.substr(-4, 4)}`}
                      </span>
                    </a>
                  ))}
                </div>
                <div>
                  <Link to="/create" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                    Create Account
                  </Link>
                  <Link to="/restore" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                    Restore Account
                  </Link>
                </div>
              </div>
            </Transition>
          </div>
        </div>
        <div className="flex flex-col items-center py-10">
          <img
            src={algoicon}
            alt="Algorand logo"
            className="rounded-full w-20 h-20 border border-gray-200 mb-4"
          />
          <h2 className="text-4xl font-semibold">{`${balance} ALGOS`}</h2>
        </div>
        <div className="flex justify-between my-4">
          <h4 className="text-xl font-semibold">Mnemonic</h4>
          <button
            type="button"
            className="ml-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={downloadMnemonicFile}
          >
            Save
          </button>
        </div>
        <div>
          {mnemonic.split(' ').map((term, i) => (
            <span key={i} className="mr-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
              {term}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
