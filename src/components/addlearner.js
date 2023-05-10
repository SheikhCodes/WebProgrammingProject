// Importing necessary dependencies and modules
import { Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// LearnerPopUp component
const LearnerPopUp = ({ open, setOpen, addLearner }) => {
  const navigate = useNavigate();
  
  // State for learner information
  const [learner, setLearner] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Event handler for input changes
  const handleChange = (e) => {
    setLearner({
      ...learner,
      [e.target.name]: e.target.value
    });
  };

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addLearner(learner, navigate);
    console.log(learner);
  };

    return(
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
          <div className="flex min-h-screen text-center md:block md:px-2 lg:px-4" style={{ fontSize: 0 }}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
            </Transition.Child>
  
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle ">
                <div className="w-full bg-white ">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
  
                  
                      <section aria-labelledby="options-heading" className="mt-6">
                        <form>
                        <div className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                          <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                              Name
                          </label>
                          <input
                              type="text"
                              name="name"
                              id="name"
                              className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                              onChange={handleChange}
                          />
                          </div> <br/>
                          <div className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                          <label htmlFor="email" className="block text-xs font-medium text-gray-900">
                              Email
                          </label>
                          <input
                              type="text"
                              name="email"
                              id="name"
                              className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                              onChange={handleChange}
                          />
                          </div> <br/>

                          <div className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                          <label htmlFor="password" className="block text-xs font-medium text-gray-900">
                              Password
                          </label>
                          <input
                              type="text"
                              name="password"
                              id="name"
                              className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                              onChange={handleChange}
                          />
                          </div>
                           
                          <div className="mt-6">
                            <button
                              onClick={handleSubmit}
                              className="relative flex w-full bg-gradient-to-r from-purple-600 to-indigo-600 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-100">
                              Submit<span className="sr-only"></span>
                            </button>
                          </div>
                        </form>
                      </section>
                    </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
  
    )
}

export default LearnerPopUp;

