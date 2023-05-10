import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  ArchiveIcon,
  ChartSquareBarIcon,
  ClockIcon,
  HomeIcon,
  MenuAlt2Icon,
  UserCircleIcon as UserCircleIconOutline,
  ViewListIcon,
  XIcon,
} from '@heroicons/react/outline'
import {
  BellIcon,
  CalendarIcon,
  ChatAltIcon,
  CheckCircleIcon,
  LockOpenIcon,
  PencilIcon,
  SearchIcon,
  TagIcon,
  UserCircleIcon as UserCircleIconSolid,
} from '@heroicons/react/solid'
import AdminNavbar from './adminNavbar'
import { connect } from 'react-redux'
import { Link,useLocation } from 'react-router-dom'
import {Pie} from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaBars } from 'react-icons/fa';
import Sidebar from './sidebar'
const navigation = [
  { name: 'All Issues', href: '#', icon: HomeIcon, current: true },
  { name: 'My Issues', href: '#', icon: ViewListIcon, current: false },
  { name: 'Assigned', href: '#', icon: UserCircleIconOutline, current: false },
  { name: 'Closed', href: '#', icon: ArchiveIcon, current: false },
  { name: 'Recent', href: '#', icon: ClockIcon, current: false },
]



const MaterialDetailPage = (props)  => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [open, setOpen] = useState(false);
  const location = useLocation()
  const [Data, setData] = useState(location.state)
  const [chart, setChart] = useState({
    labels: ["Learners","Materials","Started"],
    datasets: [
      {
        data:[2000,4000,2850],
        backgroundColor: [
          'red',
          'green',
          'blue']
      }]
  })

  return (
    <>
          <AdminNavbar />
          <main className="flex-1">
            <button
              onClick={() => setOpen(!open)}
              className={`${
                open ? '-translate-x-8' : 'translate-x-0'
              } fixed top-2 transition transform ease-linear duration-500 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800 mt-20`}
            >
              <FaBars className="w-5 h-10" />
            </button>
            <Sidebar isSidebarOpen={open} closeSidebar={setOpen} name={props.Course ? props.Course.name : null} CourseData={Data ? Data :null}/>

            <div className="py-8 xl:py-10">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-5xl xl:grid xl:grid-cols-3">
                <div className="xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200">
                  <div>
                    <div>
                      <div className="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
                        <div>
                          {Data ? <h1 className="text-2xl font-bold text-gray-900">{Data.courseName}</h1>: <h1 className="text-2xl font-bold text-gray-900">No Data</h1>}
                          <p className="mt-2 text-sm text-gray-500">
                            Created by{' '}
                            <a href="#" className="font-medium text-gray-900">
                              {props.Course ? props.Course.name: 'No Data'}
                            </a>{' '}
                            in{' '}
                            <a href="#" className="font-medium text-gray-900">
                              Admin Portal
                            </a>
                          </p>
                        </div>
                        <div className="mt-4 flex space-x-3 md:mt-0">
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                          >
                            <PencilIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                          >
                            <BellIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span>Subscribe</span>
                          </button>
                        </div>
                      </div>
                      
                      <div className="py-3 xl:pt-6 xl:pb-0">
                        <h2 className="">Description</h2>
                        <div className="prose max-w-none">
                          <p>
                            {Data ? Data.courseDescription: 'No Data'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* make a pie chart od chart state */}
                  <div className="py-3 xl:pt-6 xl:pb-0">
                    <h2 className="">Course Report</h2>
                    <div className="prose max-w-none">
                      <Pie
                        data={{
                          labels:chart.labels,
                          datasets: chart.datasets
                        }}
                        /><br/>

                    </div>
                  </div>

                  <section aria-labelledby="activity-title" className="mt-8 xl:mt-10">
                    <div>
                      <div className="divide-y divide-gray-200">
                        <div className="pt-6">
                          <div className="mt-6">
                            <div className="flex space-x-3">
                              <div className="min-w-0 flex-1">
                                <form action="#">
                                  <div>
                                    <label htmlFor="comment" className="sr-only">
                                      Comment
                                    </label>
                                    <textarea
                                      id="comment"
                                      name="comment"
                                      rows={3}
                                      className="shadow-sm block w-full focus:ring-gray-900 focus:border-gray-900 sm:text-sm border border-gray-300 rounded-md"
                                      placeholder="Leave a comment"
                                      defaultValue={''}
                                    />
                                  </div>
                                  <div className="mt-6 flex items-center justify-end space-x-4">
                                    <button
                                      type="submit"
                                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                    >
                                      Comment
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </main>
    </>
  )
}

const mapStateToProps = (getState) => {
  return {Course: getState.adminState.admin}
}

export default connect(mapStateToProps)(MaterialDetailPage)
