import { useState,useEffect } from "react"
import AdminNavbar from "./adminNavbar"
import Footer from "./footer"
import Sidebar from "./sidebar"
import{ FaBars }from "react-icons/fa"
import { connect } from "react-redux"
import { Link,useLocation } from 'react-router-dom'
import LinkCoursePopUp from "./linkCoursePopUp"
import { addLearnerToCourse,getAllLearners } from "../redux/action/admin.action"
const products = [
    {
      id: 1,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    }
    // More products...
  ]
  
const  CourseLearners = (props) => {
      const [open,setOpen] = useState(false)
      const [openPopup,setOpenPopup] = useState(false)
      const location = useLocation()
      const [Data,setData] = useState(location.state)
      const [learners,setLearners] = useState([])
      let count = 0
      console.log(Data)
      console.log(props.Course)
      useEffect(() => {
        props.getAllLearners();
        console.log(props.Learners)
        props.Learners ? props.Learners.map(learner => {
          if(learner._id === Data.learners[count] && Data.learners.length > count){
            console.log("count",count)
            setLearners(learners => [...learners,learner])
            count++
          }
        }) : console.log("No learners")
        },[])
      

    return (
        <>
    <AdminNavbar/>
    <LinkCoursePopUp open={openPopup} setOpen={setOpenPopup} materials={props.Learners? props.Learners:null} course_id={Data ? Data._id :null} addMaterialToCourse={props.addLearnerToCourse}/>
    <button
              onClick={() => setOpen(!open)}
              className={`${
                open ? '-translate-x-8' : 'translate-x-0'
              } fixed top-2 transition transform ease-linear duration-500 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800 mt-20`}
            >
              <FaBars className="w-5 h-10" />
            </button>
            <Sidebar isSidebarOpen={open} closeSidebar={setOpen} name={props.Course ? props.Course.name : null} CourseData={Data ? Data :null}/>
            <div className="sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 mt-5 ml-40 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              onClick={() => setOpenPopup(!openPopup)}
            >
              Add Learner
            </button>
          </div>

      <div className="bg-white ml-60">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Learners</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {learners.length != 0  ?   learners.map((product) => (
              <div key={product.id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none ">
                  <img
                    src="A:\6th Sem\Web Programming\Semester Project\lms\src\assests\img\pexels-hasan-albari-1229861.jpg"
                    alt="{product.imageAlt}"
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.email}</p>
                  </div>
                </div>
              </div>
            )): <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">This Course Have no Learners</h2>}
          </div>
        </div>
      </div>
      <Footer/>
      </>
    )
  }

  const mapStateToProps = (getState) => {
    return {
      Course: getState.adminState.admin,
      Learners: getState.adminState.admin.learners
    }
  }
  
  export default connect(mapStateToProps,{addLearnerToCourse,getAllLearners})(CourseLearners)