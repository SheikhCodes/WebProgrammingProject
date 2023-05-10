import { useState, useEffect } from "react"
import AdminNavbar from "./adminNavbar"
import Footer from "./footer"
import Sidebar from "./sidebar"
import{ FaBars }from "react-icons/fa"
import { connect } from "react-redux"
import { Link,useLocation } from 'react-router-dom'
import LinkCoursePopUp from "./linkCoursePopUp"
import { getMaterials } from '../redux/action/admin.action';
import { addMaterialToCourse } from "../redux/action/admin.action";

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
  
const  CourseMaterials = (props) => {
      const [open,setOpen] = useState(false)
      const [openPopup,setOpenPopup] = useState(false)
      const location = useLocation()
      const [Data,setData] = useState(location.state)
      const [materials,setMaterials] = useState([])
      let count = 0
      console.log(Data.material)
      useEffect(() => {
        props.getMaterials();
        console.log(props.materials)
        props.materials ? props.materials.map(material => {
          if(material._id === Data.material[count] && Data.material.length > count){
            console.log("count",count)
            setMaterials(materials => [...materials,material])
            count++
          }
        }) : console.log("No materials")
        },[])
      //match data.materials to props.materials._id if matches setMaterials to props.materials
      console.log("Materials",materials ? materials : "")

      

    return (
        <>
    <AdminNavbar/>
    <LinkCoursePopUp open={openPopup} setOpen={setOpenPopup} materials={props.materials? props.materials:null} course_id={Data ? Data._id :null} addMaterialToCourse={props.addMaterialToCourse}/>
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
              Add course
            </button>
          </div>
      <div className="bg-white ml-60">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Materials</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {materials.length !=0  ?   materials.map((product) => (
              <div key={product._id} className="group relative">
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
                  </div>
                </div>
              </div>
            )): <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">This Course Have no Material</h2>}
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
      materials: getState.adminState.admin.materials
    }
  }
  
  export default connect(mapStateToProps,{getMaterials,addMaterialToCourse})(CourseMaterials)