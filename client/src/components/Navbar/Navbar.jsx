import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { FaUserAlt } from 'react-icons/fa';
import { NavLink} from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';
import useLogout from "../../components/Auth/useLogout";
import useAuth from "../../context/Auth/useAuth";

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

// const firebase_auth = firebase.auth();


/**
 * Contains all functionality of the navbar.
 * 
 * @author Scott Mains
 * 
 */


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Navbar = () => {

const {auth } = useAuth();

const navigate = useNavigate();
const logout = useLogout();

const [isAdmin, setAdmin] = useState(false)

// Calls auth context and checks if the user is admin
useEffect(() => {
  if (auth.roles.includes(5150)) {
    setAdmin(true);
  }
}, [])

const signOut = async () => {
 await logout();
//  firebase_auth.signOut();
 navigate('/');
}

<div className="text-center pt-20">
<button onClick={signOut}>Sign Out</button>
</div>

let adminPage = (
  <></>
)


// If user is admin, display admin pages.
if (isAdmin) { 
  adminPage = (
    <>
       
  <Menu.Item>
  {({ active}) => (
 <NavLink to="/newsfeedadmin"> 
    <a
      className={classNames(active ? 'bg-green-100' : '', 'block px-4 py-2 text-sm text-gray-700 ')}
    >
     Add/Remove Post
    </a>
  </NavLink>
  )} 
</Menu.Item>
<Menu.Item>
  {({ active}) => (
    <NavLink to="/admin"> 
    <a
     
      className={classNames(active ? 'bg-green-100' : '', 'block px-4 py-2 text-sm text-gray-700 ')}
    >
      Admin Dashboard
    </a>
    </NavLink>
  )} 
</Menu.Item>
</>
)
  }

  return (
    <Disclosure as="nav" className="bg-green-800">
    {({ open }) => (
      <>
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                
                <NavLink
                                    to="/newsfeed"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    
                                >
                 Home
                </NavLink>
                <NavLink
                                    to="/calendar"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    
                                >
                 Calendar
                </NavLink>
                <NavLink
                                    to="/pokerpractice"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                               
                                >
                Play
                </NavLink>
                <NavLink
                                    to="/chat"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                
                                >
                Chat
                </NavLink>
              
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
           
              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="bg-green-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-800 focus:ring-white">
                    <span className="sr-only">Open user menu</span>
                    <FaUserAlt className="text-xl text-white " />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="z-20 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <NavLink to="/profile"> 
                        <a
                          className={classNames(active ? 'bg-green-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Your Profile
                        </a>
                        </NavLink>
                      )}
                    </Menu.Item>
                    {adminPage}
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          onClick={signOut}
                          className={classNames(active ? 'bg-green-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <Disclosure.Panel className="sm:hidden ">
          <div className="px-2 pt-2 pb-3 space-y-1 text-center">
          <NavLink
                                    to="/newsfeed"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                 Home
                </NavLink>
                <NavLink
                                    to="/calendar"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                 Calendar
                </NavLink>
                <NavLink
                                    to="/pokerpractice"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                Play
                </NavLink>
                <NavLink
                                    to="/chat"
                                    className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                Chat
                </NavLink>
              </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
)
}

export default Navbar