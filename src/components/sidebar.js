import React from 'react';
import { HiOutlineSearch, HiTicket, HiX } from 'react-icons/hi';
import {FaUserCircle} from 'react-icons/fa';
import { MdSettings,MdAssignment } from 'react-icons/md';
import { Link } from 'react-router-dom';
const links = [
    {
        name: 'Materials and Assessments',
        href: '/course',
        icon: <MdAssignment />,
        current: true,
    },
    {
        name: 'Learners',
        href: '/courseLearner',
        icon: <FaUserCircle />,
        current: false,
    },
    {
        name: 'Course Setting',
        href: '/materialDetailPage',
        icon: <MdSettings />,
        current: false,
    },
];

const Sidebar = ({isSidebarOpen, closeSidebar, name, CourseData}) => {

	return (
		<div
			className={`transition-all  duration-500  fixed top-15 ${
				isSidebarOpen ? 'left-0' : '-left-64'
			}`}
		>
			<div className="flex overflow-y-auto flex-col bg-white  w-64 px-4 py-8 border-r  relative">
				<button
					onClick={() => closeSidebar(!isSidebarOpen)}
					className="absolute top-1 right-1  text-gray-600 w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800"
				>
					<HiX className="w-5 h-5" />
				</button>
				<h2 className="text-3xl font-semibold text-gray-800">
					Brilliant <span className="text-indigo-500 ml-1">Pro</span>
				</h2>
				<div className="flex flex-col mt-6  justify-between flex-1">
					<nav className="text">
						{links.map((link, index) => {
							return (
								<Link
									key={link.name}
									to={link.href}
                                    state={CourseData}
									className={`capitalize flex items-center px-4 py-2 ${
										index === 0
											? 'bg-gray-200 text-gray-700'
											: null
									} ${
										index > 0
											? 'mt-5 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 transform'
											: null
									} rounded-md`}
								>
									{link.icon}
									<span className="mx-4 font-medium">
										{link.name}
									</span>
								</Link>
							);
						})}
						<hr className="my-6" />
					</nav>
					<div className="flex items-center px-4 -mx-2 mt-5">
						<img
							src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
							alt="avatar"
							className="h-9 w-9 mx-2 object-center object-cover rounded-full"
						/>
						<h4 className="mx-2 font-medium text-gray-800 hover:underline cursor-pointer">
							{name? name : 'No Name'}
						</h4>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;