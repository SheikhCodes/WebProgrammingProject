import { Popover } from '@headlessui/react'
import {
  InboxIcon,
  MenuIcon,
} from '@heroicons/react/outline'
import logo from '../assests/img/logo.png'
import logo1 from '../assests/img/logo1.PNG'
import { useState } from 'react'
import Aboutus from './aboutus'
import Contact from './contact'
import Footer from './footer'
import landdash from '../assests/img/dashss.jpeg'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Landingpage() {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white">
      <Aboutus open={open} setOpen={setOpen}/>
      {/* <Contact open={open} setOpen={setOpen}/> */}
      <header>
        <Popover className="relative bg-white">
          <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 md:justify-start md:space-x-10 lg:px-8">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-20 w-35"
                  src={logo1}
                  alt=""
                />
              </a>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden md:flex space-x-10">

              <a href="/aboutuspage" className="text-base font-medium text-gray-500 hover:text-gray-900">
                About Us
              </a>
              <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900" onClick={() =>setOpen(true) }>
                Partners
              </a>
              <a href="aboutuspage" className="text-base font-medium text-gray-500 hover:text-gray-900">
                Contact Us
              </a>
            </Popover.Group>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <a href="/signIn" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                Sign in
              </a>
              <a
                href="/signUp"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white hover:from-purple-700 hover:to-indigo-700"
              >
                Sign up
              </a>
            </div>
          </div>
        </Popover>
      </header>

      <main>
        {/* Hero section */}
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt="People working on laptops"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-indigo-700 mix-blend-multiply" />
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white">Brilliant Pro LMS</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-indigo-200 sm:max-w-3xl">
                Brilliant Pro is a proven, trusted and flexible tool-set to support both blended learning and 100% online courses. 
                It delivers a powerful set of learner-centric tools and collaborative learning environments that empower teaching as well as 
                learning, and are simple to understand and easy to use.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Alternating Feature Sections */}
        <div className="relative pt-16 pb-32 overflow-hidden">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100" />
          <div className="relative">
            <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
              <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                <div>
                  <div>
                    <span className="h-12 w-12 rounded-md flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600">
                    <InboxIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-6">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                      Vision and Mission of Brilliant Pro
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                    Brilliant Pro LMS is striving for a better E-Learning System across the Pakistan which will help the learners to get themselves 
                    acquainted with a learning process that has already adopted worldwide.
                    Our Mission is to Transfer of technologies and innovations, which emerge as a result of research, in the form of 
                    cooperation with public and private enterprises.
                    </p>
                    <div className="mt-6">
                      <a
                        href="signUp"
                        className="inline-flex bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white hover:from-purple-700 hover:to-indigo-700"
                      >
                        Get started
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-6">
                </div>
              </div>
              <div className="mt-12 sm:mt-16 lg:mt-0">
                <div className="pl-4 -mr-48 sm:pl-6 md:-mr-16 lg:px-0 lg:m-0 lg:relative lg:h-full">
                  <img
                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                    src={landdash}
                    alt="Inbox user interface"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
