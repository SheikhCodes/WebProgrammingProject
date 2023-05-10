import { Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

// MaterialPopUp component
const MaterialPopUp = ({ open, setOpen, createMaterial }) => {
  const inputRef = useRef(); // Ref for file input element
  const [file, setFile] = useState(null); // State to store selected file
  const [materials, setMaterials] = useState({ // State to store material name
    name: ''
  });
  const navigate = useNavigate(); // Navigation hook from react-router-dom

  // Event handler for input change
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setMaterials({
      ...materials,
      [e.target.name]: e.target.value
    });
  }

  // Event handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(file);
    console.log(materials);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', materials.name);
    
    createMaterial(formData, materials, navigate);
  }

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
            <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle">
              <div className="w-full bg-white  ">
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                    <section aria-labelledby="options-heading" className="mt-6">
                      <form onSubmit={handleSubmit}>
                      <div className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                        <label htmlFor="name" className="block text-xs font-medium text-gray-900">
                            Material Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                            onChange={handleChange}
                        />
                        </div> <br/>
                      
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                            <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                Material
                            </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                        >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file"        className="sr-only" onChange={()=>setFile(inputRef.current.files[0])} 
                                            ref={inputRef}/>
                                              
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PDF, MP4, PPTX up to 10MB</p>
                                    </div>
                                  </div>
                              </div>
                            </div>
                        <div className="mt-6">
                          <button
                            className="relative flex w-full bg-gradient-to-r from-purple-600 to-indigo-600 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200">
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
};

export default MaterialPopUp;