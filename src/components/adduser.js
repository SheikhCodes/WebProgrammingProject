import AdminNavbar from "./adminNavbar";
import Learnerpopup from "./addlearner";
import {useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addUser } from "../redux/action/admin.action";
import { getAllLearners,deleteLearner } from "../redux/action/admin.action";

  
 const Adduser = (props) => {
    const [open, setOpen] = useState(false);
    const [users, setUser] = useState([]);
    useEffect(() => {
      props.getAllLearners();
      },[])
      

    return (
      
      <div className="px-4 sm:px-6 lg:px-8">
        <Learnerpopup open={open} setOpen={setOpen} addLearner={props.addUser} />
        <AdminNavbar></AdminNavbar>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users with their email and password.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              onClick={() => setOpen(true)}
            >
              Add User
            </button>
          </div>
        </div>
        <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                 Name
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Password
                </th>
                
                <th scope="col" className="relative py-3.5 pl-3 pr-6 text-sm font-semibold text-gray-900">
                  Actions
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Edit</span>
                </th>
                <th><td>
                  <span className="sr-only">   Delete</span>
                  </td></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {props.learner ? props.learner.map((user) => (
                <tr key={user.email}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {user.name}
                  </td>
                  <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {user.email}
                  </td>
                  <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                    {user.password}
                  </td>
                  
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                    <a href="#" className="mx-1 text-indigo-600 hover:text-indigo-900">
                      Edit<span className="sr-only">, {user.name}</span>
                    </a>
                    <a href="#" onClick={() => props.deleteLearner(user._id )} className="mx-1 text-indigo-600 hover:text-indigo-900">
                      Delete<span className="sr-only">, {user.name}</span>
                    </a>
                  </td>
                </tr>
              )):<tr><td>No User</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const mapStateToProps = (state) => {
    console.log(state.adminState.admin.learners);
    return {
      learner: state.adminState.admin.learners
    }
  }

  export default connect(mapStateToProps, { addUser,getAllLearners,deleteLearner })(Adduser);