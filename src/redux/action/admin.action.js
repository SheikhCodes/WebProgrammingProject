
import { ADMIN_SIGN_IN, ADMIN_SIGN_UP,ADMIN_SIGN_OUT,GET_ADMIN,CREATE_COURSE,GET_COURSES,CREATE_MATERIAL,GET_MATERIALS,GET_ALL_LEARNERS,CREATE_ASSESSMENT,GET_ASSESSMENTS } from "../actionTypes/admin.actionType";
import { notification } from 'antd'
import axios from 'axios'
import { LEARNER_SIGN_UP } from "../actionTypes/learner.actionType";
import { GET_LEARNER } from "../actionTypes/learner.actionType";


const SERVER_BASE_URL ='http://localhost:4000'

export const adminSignUp = (user, navigate) => async dispatch => {
    console.log("USER",user);
    try {
        const headers = {
            'Content-Type': 'application/json'
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/admin/signUp`, user , {headers : headers})
        console.log("DATA",data);
        dispatch({
            type: ADMIN_SIGN_UP,
            payload: data
        })
        if(data.status === 'success'){
            notification.success({
                message: 'Success',
                description: 'Admin created successfully',
                duration: 2
            })
            navigate('/signIn')
        }else {
            notification.error({
                message: 'Error',
                description: 'Admin not created',
                duration: 2
            })
        }
    } catch (error) {
        console.log("ERROR",error);
        if(error.response.data.status === 'error'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }else if(error.response.data.status === 'fail'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }
    }
}

export const adminSignIn = (user, navigate) => async dispatch => {
    console.log("USER",user);
    try {
        const headers = {
            'Content-Type': 'application/json'
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/admin/signIn`, user , {headers : headers})
        console.log("DATA",data);
        dispatch({
            type: ADMIN_SIGN_IN,
            payload: data
        })
        if(data.status === 'success'){
            notification.success({
                message: 'Success',
                description: 'Admin signed in successfully',
                duration: 2
            })
            navigate('/adminDashboard')
        }else {
            notification.error({
                message: 'Error',
                description: 'Admin not signed in',
                duration: 2
            })
        }
    } catch (error) {
        console.log("ERROR",error);
        if(error.response.data.status === 'error'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }else if(error.response.data.status === 'fail'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }
    }
}

export const adminSignOut = (navigate) => async (dispatch,getState) => {
    console.log("USER",getState().adminState.admin.accessToken);
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': getState().adminState.admin.accessToken
        }
        const { data } = await axios.delete(`${SERVER_BASE_URL}/admin/signOut`,  {headers : headers})
        console.log("DATA",data);
        dispatch({
            type: ADMIN_SIGN_OUT,
            payload: data
        })
        if(data.status === 'success'){
            notification.success({
                message: 'Success',
                description: 'Admin signed out successfully',
                duration: 2
            })
            navigate('/admin')
        }else {
            notification.error({
                message: 'Error',
                description: 'Admin not signed out',
                duration: 2
            })
        }
    } catch (error) {
        if(error.response.data.status === 'error'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }else if(error.response.data.status === 'fail'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }
    }
}

export const addCourse = (course, navigate) => async (dispatch,getState) => {
    try{
        const headers = {
            'Content-Type': 'application/json',
            'authorization': getState().adminState.admin.accessToken
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/admin/createCourse`, course, {headers : headers})
        console.log("DATA",data);
        dispatch({
            type: CREATE_COURSE,
            payload: data
        })
        if(data.status === 'success'){
            notification.success({
                message: 'Success',
                description: 'Course created successfully',
                duration: 2
            })
            navigate('/adminDashboard')
        }else {
            notification.error({
                message: 'Error',
                description: 'Course not created',
                duration: 2
            })
        }
    } catch (error) {
        if(error.response.data.status === 'error'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }else if(error.response.data.status === 'fail'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }
    }
}

export const addUser = (user, navigate) => async (dispatch,getState) => {
    console.log("USER",user);
    try {
        const headers = {
            'Content-Type': 'application/json'
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/learner/signUp`, user , {headers : headers})
        console.log(data)
        dispatch({
            type: LEARNER_SIGN_UP,
            payload: data
        })
        if(data.status == 'success') {
            notification.success(
                {message: "Signed Up Successfully"}
            )
            navigate('/adduser')
            
        }
        else if (data.status == 'fail') {
            notification.success({
                message:"Error While signing up",
                placement: "topRight",
            })
            
        }
    }
    catch(error) {
        if(error.response.data.status == 'fail') {
            notification.info({
                message: error.response.data.message,
                placement: "topRight",
            })
        }else if(error.response.data.status == 'error') {
            notification.warning({ 
                message : error.response.data.message,
                placement: "topRight",
            })
        }

  }
}

export const getCourses = () => async (dispatch,getState) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': getState().adminState.admin.accessToken
        }
        const { data } = await axios.get(`${SERVER_BASE_URL}/admin/courses`, {headers : headers})
        console.log("DATA",data);
        dispatch({
            type: GET_COURSES,
            payload: data
        })
        if(data.status === 'success'){
            notification.success({
                message: 'Success',
                description: 'Courses fetched successfully',
                duration: 2
            })
        }else {
            notification.error({
                message: 'Error',
                description: 'Courses not fetched',
                duration: 2
            })
        }
    } catch (error) {
        if(error.response.data.status === 'error'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }else if(error.response.data.status === 'fail'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }

    }
}

export const createMaterial = (material,name, navigate) => async (dispatch,getState) => {
    console.log("MATERIAL",material,name);
    try{
        const headers = {
            'Content-Type': 'application/json',
            'authorization': getState().adminState.admin.accessToken,
            'name': name
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/admin/createMaterial`, material, {headers : headers})
        console.log("DATA",data);
        dispatch({
            type: CREATE_MATERIAL,
            payload: data
        })
        if(data.status === 'success'){
            notification.success({
                message: 'Success',
                description: 'Material created successfully',
            })
            navigate('/adminDashboard')
        }else {
            notification.error({
                message: 'Error',
                description: 'Material not created',
                duration: 2
            })
        }
    } catch (error) {
        if(error.response.data.status === 'error'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }else if(error.response.data.status === 'fail'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }
    }
}

export const getMaterials = () => async (dispatch,getState) => {
    console.log("MATERIALS",getState().adminState.admin.accessToken);
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': getState().adminState.admin.accessToken
        }
        const { data } = await axios.get(`${SERVER_BASE_URL}/admin/materials`, {headers : headers})
        console.log("DATA",data);
        dispatch({
            type: GET_MATERIALS,
            payload: data
        })
        if(data.status === 'success'){
            notification.success({
                message: 'Success',
                description: 'Materials fetched successfully',
                duration: 2
            })
        }else {
            notification.error({
                message: 'Error',
                description: 'Materials not fetched',
                duration: 2
            })
        }
    } catch (error) {
        if(error.response.data.status === 'error'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }else if(error.response.data.status === 'fail'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }

    }
}



export const getLearner = () => async (dispatch,getState) => {
    console.log("GET LEARNER");
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': getState().adminState.admin.accessToken
        }
        const { data } = await axios.get(`${SERVER_BASE_URL}/admin/learners`, {headers : headers})
        console.log("DATA",data);
        dispatch({
            type: GET_LEARNER,
            payload: data
        })
        if(data.status === 'success'){
            notification.success({
                message: 'Success',
                description: 'Learners fetched successfully',
                duration: 2
            })
        }else {
            notification.error({
                message: 'Error',
                description: 'Learners not fetched',
                duration: 2
            })
        }
    } catch (error) {
        if(error.response.data.status === 'error'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }else if(error.response.data.status === 'fail'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }

    }
}

export const getAllLearners = () => async (dispatch,getState) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
        }
        const { data } = await axios.get(`${SERVER_BASE_URL}/learner/allLearners`, {headers : headers})
        console.log("DATA",data);
        dispatch({
            type: GET_ALL_LEARNERS,
            payload: data
        })
        if(data.status === 'success'){
            notification.success({
                message: 'Success',
                description: 'Learners fetched successfully',
                duration: 2
            })
        }else {
            notification.error({
                message: 'Error',
                description: 'Learners not fetched',
                duration: 2
            })
        }
    } catch (error) {
        if(error.response.data.status === 'error'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }else if(error.response.data.status === 'fail'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }

    }
}

export const deleteLearner = (id) => async (dispatch,getState) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': getState().adminState.admin.accessToken
        }
        const { data } = await axios.delete(`${SERVER_BASE_URL}/learner/deleteLearner/${id}`, {headers : headers})
        console.log("DATA",data);
        if(data.status === 'success'){
            notification.success({
                message: 'Success',
                description: 'Learner deleted successfully',
                duration: 2
            })
        }else {
            notification.error({
                message: 'Error',
                description: 'Learner not deleted',
                duration: 2
            })
        }
    } catch (error) {
        if(error.response.data.status === 'error'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }else if(error.response.data.status === 'fail'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }

    }
}

export const deleteMaterial = (id) => async (dispatch,getState) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': getState().adminState.admin.accessToken
        }
        const { data } = await axios.delete(`${SERVER_BASE_URL}/admin/deleteMaterial/${id}`, {headers : headers})
        console.log("DATA",data);
        if(data.status === 'success'){
            notification.success({
                message: 'Success',
                description: 'Material deleted successfully',
                duration: 2
            })
        }else {
            notification.error({
                message: 'Error',
                description: 'Material not deleted',
                duration: 2
            })
        }
    } catch (error) {
        if(error.response.data.status === 'error'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }else if(error.response.data.status === 'fail'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }

    }
}

export const deleteCourse = (id) => async (dispatch,getState) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': getState().adminState.admin.accessToken
        }
        const { data } = await axios.delete(`${SERVER_BASE_URL}/admin/deleteCourse/${id}`, {headers : headers})
        console.log("DATA",data);
        if(data.status === 'success'){
            notification.success({
                message: 'Success',
                description: 'Course deleted successfully',
                duration: 2
            })
        }
        else {
            notification.error({
                message: 'Error',
                description: 'Course not deleted',
                duration: 2
            })
        }
    } catch (error) {
        if(error.response.data.status === 'error'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }
        else if(error.response.data.status === 'fail'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }
    }
}

export const createAssessment = (data) => async (dispatch,getState) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': getState().adminState.admin.accessToken
        }
        const { data: response } = await axios.post(`${SERVER_BASE_URL}/admin/createAssessment`, data, {headers : headers})
        console.log("DATA",response);
        dispatch({
            type: CREATE_ASSESSMENT,
            payload: response
        })
        if(response.status === 'success'){
            notification.success({
                message: 'Success',
                description: 'Assessment created successfully',
                duration: 2
            })
        }else {
            notification.error({
                message: 'Error',
                description: 'Assessment not created',
                duration: 2
            })
        }
    } catch (error) {
        if(error.response.data.status === 'error'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }else if(error.response.data.status === 'fail'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }

    }
}

export const getAllAssessments = () => async (dispatch,getState) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': getState().adminState.admin.accessToken
        }
        const { data } = await axios.get(`${SERVER_BASE_URL}/admin/assessments`, {headers : headers})
        console.log("DATA",data);
        dispatch({
            type: GET_ASSESSMENTS,
            payload: data
        })
        if(data.status === 'success'){
            notification.success({
                message: 'Success',
                description: 'Assessments fetched successfully',
                duration: 2
            })
        }else {
            notification.error({
                message: 'Error',
                description: 'Assessments not fetched',
                duration: 2
            })
        }
    } catch (error) {
        if(error.response.data.status === 'error'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }else if(error.response.data.status === 'fail'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }

    }
}

export const deleteAssessment = (id) => async (getState) => {
    try {
        console.log("hello")
        const headers = {
            'Content-Type': 'application/json'
        }
        console.log("hello")
        const { data } = await axios.delete(`${SERVER_BASE_URL}/admin/deleteAssessment/${id}`, {headers : headers})
        console.log("DATA",data);
        if(data.status === 'success'){
            notification.success({
                message: 'Success',
                description: 'Assessment deleted successfully',
                duration: 2
            })
        }
        else {
            notification.error({
                message: 'Error',
                description: 'Assessment not deleted',
                duration: 2
            })
        }
    } catch (error) {
        if(error.response.data.status === 'error'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }
        else if(error.response.data.status === 'fail'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }
    }
}

export const addMaterialToCourse = (materialID,courseID) => async (dispatch,getState) => {
    console.log("hello",materialID,courseID)
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': getState().adminState.admin.accessToken
        }
        const { data: response } = await axios.post(`${SERVER_BASE_URL}/admin/addMaterial/${courseID}`, materialID, {headers : headers})
        console.log("DATA",response);
        if(response.status === 'success'){
            notification.success({
                message: 'Success',
                description: 'Material added to course successfully',
                duration: 2
            })
        }else {
            notification.error({
                message: 'Error',
                description: 'Material not added to course',
                duration: 2
            })
        }
    }
    catch (error) {
        if(error.response.data.status === 'error'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }
        else if(error.response.data.status === 'fail'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }
    }
}

export const addLearnerToCourse = (materialID,courseID) => async (dispatch,getState) => {
    console.log("hello",materialID,courseID)
    try {
        const headers = {
            'Content-Type': 'application/json',
            'authorization': getState().adminState.admin.accessToken
        }
        const { data: response } = await axios.post(`${SERVER_BASE_URL}/admin/addLearner/${courseID}`, materialID, {headers : headers})
        console.log("DATA",response);
        if(response.status === 'success'){
            notification.success({
                message: 'Success',
                description: 'Material added to course successfully',
                duration: 2
            })
        }else {
            notification.error({
                message: 'Error',
                description: 'Material not added to course',
                duration: 2
            })
        }
    }
    catch (error) {
        if(error.response.data.status === 'error'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }
        else if(error.response.data.status === 'fail'){
            notification.error({
                message: 'Error',
                description: error.response.data.message,
                duration: 2
            })
        }
    }
}


