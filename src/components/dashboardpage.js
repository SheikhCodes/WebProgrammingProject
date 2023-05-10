import AdminNavbar from './adminNavbar';
import lmsdash from '../assests/img/lmsdash.jpeg'; 


export default function Dashboardpage() {
  return (
    <section class="bg-white">
    <AdminNavbar/>
    <div class="flex flex-col px-8 mx-auto space-y-12 max-w-7xl xl:px-12">
        <div class="relative">
            <br></br>
            <h2 class="w-full text-3xl font-bold text-left sm:text-4xl md:text-5xl"> Admin Dashboard</h2>
        </div>

        <div class="flex">
            <span class="text-sm border border-2 rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap">Total Courses Offered:</span>
            <input name="total_courses"  readOnly={true} class="border border-2 rounded-r px-4 py-2" type="text" placeholder="0,1,2" />
        </div>
        <div class="flex">
            <span class="text-sm border border-2 rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap">Total Students Enrolled:</span>
            <input name="total_en_students"  readOnly={true} class="border border-2 rounded-r px-4 py-2" type="text" placeholder="0,1,2" />
        </div>
        <div class="flex">
            <span class="text-sm border border-2 rounded-l px-4 py-2 bg-gray-300 whitespace-no-wrap">Total Students Starting Courses:</span>
            <input name="total_students_start"  readOnly={true} class="border border-2 rounded-r px-4 py-2" type="text" placeholder="0,1,2" />
        </div>


        <div class="flex flex-col mb-8 animated fadeIn sm:flex-row">
            <div class="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last">
                <img class="rounded-lg shadow-xl" src={lmsdash} alt=""/>
            </div>
            <div class="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pr-16">
                <h3 class="mt-2 text-2xl sm:text-left md:text-4xl">Keep and Maintain Record</h3>
                <p class="mt-5 text-lg text-gray-700 text md:text-left">Perform Management of the LMS, 
                    which includes multiple tasks ranging from course creation, 
                    to learner assignment, to monitoring learner progress.</p>
            </div>
        </div>
        <div class="flex flex-col mb-8 animated fadeIn sm:flex-row">
            <div class="flex items-center mb-8 sm:w-1/2 md:w-5/12">
                <img class="rounded-lg shadow-xl" src="https://cdn.devdojo.com/images/december2020/dashboard-04.png" alt=""/>
            </div>
            <div class="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pl-16">
                <h3 class="mt-2 text-2xl sm:text-left md:text-4xl">Create and Add Material</h3>
                <p class="mt-5 text-lg text-gray-700 text md:text-left">Effectively create and manage e-Learning courses ,learning
                    material and assessment</p>
            </div>
        </div>
    </div>
</section>
  )
}