import { Fragment } from "react";
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const LinkCoursePopUp = ({open,setOpen,materials,course_id,addMaterialToCourse}) => {
    const navigate = useNavigate();
    const [material, setMaterial] = useState(materials  ? materials : null)
    const [selected, setSelected] = useState(materials ? materials[0] : null)
    console.log(selected)
    console.log(material)
    const handleChange = (e) => {
        setSelected(e.target.value)
        console.log(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const mat = material.filter((mat) => mat._id === selected)
        //convert mat to json
        const matJson = JSON.stringify(Object.assign({},mat[0]))
        console.log(JSON.parse(matJson))
        addMaterialToCourse(matJson,course_id)
        
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
                      <form>
                      <div>
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Materials
                          </label>
                          <select
                            id="location"
                            name="materials"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={selected}
                            onChange={handleChange}
                          >
                            {materials ? materials.map(material => <option key={material._id} value={material._id}>{material.name}</option>) : null}
                            
                          </select>
                        </div>    
                        <div className="mt-6">
                          <button
                            onClick={handleSubmit}
                            className="relative flex w-full bg-gradient-to-r from-purple-600 to-indigo-600 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:from-purple-700 hover:to-indigo-700">
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

export default LinkCoursePopUp;