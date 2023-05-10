import AdminNavbar from "./adminNavbar";
import CoursePopUp from "./addcoursepopup";
import { useEffect, useState } from "react";
import { addCourse } from "../redux/action/admin.action";
import { connect } from "react-redux";
import { getCourses, deleteCourse } from "../redux/action/admin.action";
import { CURRENCY_SYMBOL } from "../utils/constant";
import { Link, useLocation } from "react-router-dom";
// Define an array of course objects
const course = [
  {
    coursename: "Programming Fundamental",
    coursecode: "CS124",
    credithours: "3",
    enrollment: "Active",
  },
];

// Define a functional component named CourseAdmin
const CourseAdmin = (props) => {
  // Set initial state for 'open' using the useState hook
  const [open, setOpen] = useState(false);

  // Log the list of courses if available, otherwise log "No courses"
  props.courses ? console.log(props.courses) : console.log("No courses");

  // Trigger the 'getCourses' action once on component mount using the useEffect hook
  useEffect(() => {
    props.getCourses();
  }, []);

  // Log the list of courses if available, otherwise log "No courses"
  props.courses ? console.log(props.courses) : console.log("No courses");

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <CoursePopUp open={open} setOpen={setOpen} addCourse={props.addCourse} />
      <AdminNavbar />
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Admin Courses</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the courses with their Description , Price and
            Actions.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            onClick={() => setOpen(true)}
          >
            Add course
          </button>
        </div>
      </div>
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Course-Name
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Course-Description
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Course-Price
              </th>
              <th
                scope="col"
                className="relative py-3.5 pl-3 pr-4 text-sm font-semibold text-gray-900"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {props.courses ? (
              props.courses.map((course) => (
                <tr key={course.coursecode}>
                  <Link to={`/materialDetailPage`} state={course}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {course.courseName}
                    </td>
                  </Link>
                  <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {course.courseDescription}
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    $ {course.price}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                    <a
                      href="#"
                      className="mx-1 text-indigo-600 hover:text-indigo-900"
                    >
                      Edit<span className="sr-only">, {course.coursename}</span>
                    </a>
                    <a
                      href="#"
                      onClick={() => props.deleteCourse(course._id)}
                      className="mx-1 text-indigo-600 hover:text-indigo-900"
                    >
                      Delete
                      <span className="sr-only">, {course.coursename}</span>
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No courses</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    courses: state.adminState.admin.courses,
  };
};

export default connect(mapStateToProps, {
  addCourse,
  getCourses,
  deleteCourse,
})(CourseAdmin);
