import CourseAdmin from './components/admincourses'
import SignIn from './components/signIn'
import Adduser from './components/adduser'
import SignUp from './components/signUp'
import Aboutus from './components/aboutus'
import AdminSignIn from './components/AdminSignin'
import Footer from './components/footer'
import Materials from './components/materials'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Error404 from './Error/error'
import Dashboard from './containers/Dashboard'
import AdminDashboard from './containers/AdminDashboard'
import Landingpage from './components/landingpage'
import CourseLearner from './components/learnerCourses'
import MaterialDetailPage from './components/materialDetailPage'
import Assessment from './components/assessment'
import Aboutuspage from './components/aboutuspage'
import Dashboardpage from './components/dashboardpage'
import CourseMaterials from './components/courseMaterial'
import CourseLearners from './components/courseLearner'
import AdminNavbar from './components/adminNavbar'

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/adminDashboard" element={<AdminDashboard/>} />
        <Route path="/materials" element={<Materials/>} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/adminC" element={<CourseAdmin />} />
        <Route path="/adduser" element={<Adduser />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/admin" element={<AdminSignIn />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/" element={<Landingpage />} />
        <Route path="/learnerCourses" element={<CourseLearner />} />
        <Route path="/*" element={<Error404/>} />
        <Route path="/materialDetailPage" element={<MaterialDetailPage/>} />
        <Route path="/assessment" element={<Assessment/>} />
        <Route path="/aboutuspage" element={<Aboutuspage/>} />
        <Route path="/dashboardpage" element={<Dashboardpage/>} />
        <Route path="/course" element={<CourseMaterials/>} />
        <Route path="/courseLearner" element={<CourseLearners/>} />
        <Route path="/adminNavbar" element={<AdminNavbar/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}
