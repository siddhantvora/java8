var express=require('express');
var router=express.Router();
var user=require("../controller/userController")
var project=require("../controller/projectController")
var task=require("../controller/taskController") 
var backlog=require("../controller/backlogController") 


router.get('/users',user.getUsers);

router.get('/users/:userId',user.getUserById);
router.post('/users/register',user.registerUser);
router.post('/users/checkLoginName',user.isUniqueLoginName);
router.post('/users/login',user.loginUser);
router.put('/users/:userId',user.updateUser);
router.delete('/users/:userId',user.deleteUser);

router.get('/projects',project.getProjects);
router.get('/projects/:projectId',project.getProjectById);
router.post('/projects/add',project.addProject);
router.put('/projects/:projectId',project.updateProject);
router.put('/projects/:projectId/status',project.updateProjectStatus);
router.delete('/projects/:projectId',project.deleteProject);

router.get('/tasks',task.getTasks);
router.get('/tasks/:taskId',task.getTaskById);
router.get('/backlogs/:projectId/tasks',task.getTasksByBacklogId);
router.get('/users/:userId/tasks',task.getTasksByUser);
router.post('/tasks/add',task.addTask);
router.put('/tasks/:taskId',task.updateTask);
router.put('/tasks/assign/:taskId',task.updateUserForTask);
router.delete('/tasks/:taskId',task.deleteTask);

router.get('/backlogs',backlog.getBacklogs);
router.get('/backlogs/:backlogId',backlog.getBacklogById);
router.get('/projects/:projectId/backlogs',backlog.getBacklogsByProjectId);
router.post('/backlogs/add',backlog.addBacklog);
router.put('/backlogs/:backlogId',backlog.updateBacklog);
router.put('/backlogs/:backlogId/requirement',backlog.updateBacklogRequirement);
router.delete('/backlogs/:taskId',backlog.deleteBacklog);

module.exports=router;
