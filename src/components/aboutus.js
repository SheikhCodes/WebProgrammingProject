import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import React from "react";
import "../assests/styles/Aboutus.css";
import AVTR1 from "../assests/img/zohaib.jpeg";
import AVTR2 from "../assests/img/hajira.jpeg";
import AVTR3 from "../assests/img/ahmad.jpeg"
import { Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const data = [
  {
    avatar: AVTR1,
    name: "M.Zohaib",
    review: "Full Stack Developer",
  },

  {
    avatar: AVTR2,
    name: "Hajira Uzair",
    review: "Full Stack Developer",
  },
  {
    avatar: AVTR3,
    name: "Ahmad Ibrahim",
    review: "Full Stack Developer",
  },
];

const Aboutus = ({ open, setOpen }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div
          className="flex min-h-screen text-center md:block md:px-2 lg:px-4"
          style={{ fontSize: 0 }}
        >
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
          <span
            className="hidden md:inline-block md:align-middle md:h-screen"
            aria-hidden="true"
          >
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
            <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
              <button
                type="button"
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close</span>
                <XIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              <section aria-labelledby="options-heading" className="mt-6">
                <Swiper
                  className="container aboutus__container"
                  modules={[Pagination]}
                  spaceBetween={40}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                >
                  {data.map(({ avatar, name, review }, index) => {
                    return (
                      <SwiperSlide
                        key={index}
                        className="aboutus bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                      >
                        <div className="client__avatar">
                          <img src={avatar} alt="Avatar one" />
                        </div>
                        <h5 className="client__name">{name}</h5>
                        <small className="client__review">{review}</small>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </section>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Aboutus;
