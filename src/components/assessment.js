import AdminNavbar from './adminNavbar';
import AssessmentPopUp from './assessmentPopUp';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createAssessment, getAllAssessments, deleteAssessment } from '../redux/action/admin.action';
const materials = [{
    name: 'Course-Name',
    description: 'Course-Description',
    price: 'Course-Price'
}]
  
const Assessment = (props) => {
   const [open, setOpen] = useState(false);
   useEffect(() => {
    props.getAllAssessments();
    },[])
    props.assessments ? console.log(props.assessments) : console.log('No assessments');
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <AssessmentPopUp open={open} setOpen={setOpen} createAssessment={props.createAssessment}/>
        <AdminNavbar />
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Assessments</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the assessments and actions to perform.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              onClick={() => setOpen(true)}
            >
              Add Assessment
            </button>
          </div>
        </div>
        <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                 Assessment-Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {props.assessments ? props.assessments.map((material) => (
                <tr key={material.name}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {material.name}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-medium sm:pr-6">
                    <a href="#" className="mx-1 text-indigo-600 hover:text-indigo-900">
                      Edit<span className="sr-only">, {material.name}</span>
                    </a>
                    <a href="#" onClick = {() => props.deleteAssessment(material._id)}className="mx-1 text-indigo-600 hover:text-indigo-900">
                      Delete<span className="sr-only">, {material.name}</span>
                    </a>
                  </td>
                </tr>
              )): <tr><td>No Materials</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const mapStateToProps = (state) => {
    return {
    assessments: state.adminState.admin.assessments
    }
  }
  
  export default connect(mapStateToProps, { createAssessment,getAllAssessments,deleteAssessment })(Assessment);