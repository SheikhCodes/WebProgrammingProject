const router = require('express').Router();
const {
    signUp,
    signIn,
    signOut,
    createCourse,
    addMaterial,
    getCourses,
    createMaterial,
    getMaterials,
    deleteMaterial,
    deleteCourse,
    createAssessment,
    getAssessments,
    deleteAssessment,
    addUserToCourse
} = require('../controller/admin.controller');
const { adminToken } = require('../midlleware/authenticate');
const upload = require('multer');

router.post('/admin/signUp', signUp);
router.post('/admin/signIn', signIn);
router.delete('/admin/signOut', adminToken, signOut);
router.post('/admin/createCourse', adminToken, createCourse);
router.post('/admin/addMaterial/:id', adminToken, upload().single('file'), addMaterial);
router.get('/admin/courses', adminToken, getCourses);
router.post('/admin/createMaterial', adminToken, createMaterial);
router.get('/admin/materials', adminToken, getMaterials);
router.delete('/admin/deleteMaterial/:id', adminToken, deleteMaterial);
router.delete('/admin/deleteCourse/:id', adminToken, deleteCourse);
router.post('/admin/createAssessment', adminToken, createAssessment);
router.get('/admin/assessments', adminToken, getAssessments);
router.delete('/admin/deleteAssessment/:id', deleteAssessment);

router.post('/admin/addLearner/:id', adminToken, addUserToCourse);

module.exports = router;