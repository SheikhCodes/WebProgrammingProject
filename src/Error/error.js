import { NextSeo } from "next-seo";
import { LockClosedIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom';

const Error404 = () => {
    const navigate = useNavigate();
  return (
    <>
      <NextSeo title="Page Not Found" description="The Page you are looking for is not available." />
      <div className="bg-white min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="max-w-max mx-auto">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-primary sm:text-5xl">404</p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Page not found</h1>
                <p className="mt-1 text-base text-gray-500">Please check the URL in the address bar and try again.</p>
              </div>
              <div>
              <button
                onClick={() => {
                    navigate('/')
                }}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                </span>
                Home
              </button>
            </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Error404;
