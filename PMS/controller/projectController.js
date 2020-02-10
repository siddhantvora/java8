var project = require('../model/project')
var task = require('../model/task')
var backlog = require('../model/backlog')
var auth = require('../utils/auth')

exports.getProjects = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin') {
            project.find({ "managerId": payload.userId }, (err, data) => {
                if (err)
                    res.status(400).json(err);
                else
                    res.json(data);
            })
        } else if (payload.role === 'user') {
            task.find({ "userId": payload.userId }).distinct("backlogId").exec((err, backlogId) => {
                if (err)
                    res.status(400).json("give proper project id")
                else {
                    if (backlogId) {
                        console.log(backlogId)
                        backlog.find({ "backlogId": backlogId }).distinct("projectId").exec((err, projectId) => {
                            if (err)
                                res.status(400).json("give proper project id")
                            else {
                                if (projectId) {
                                    project.find({ "projectId": projectId }, (err, data) => {
                                        if (err)
                                            throw err;
                                        else
                                            res.json(data);
                                    })
                                }
                                else {
                                    res.status(400).json("give proper project id")
                                }
                            }
                        })
                    }
                    else {
                        res.status(400).json("give proper project id")
                    }
                }

            })

        }
    })
}
exports.getProjectById = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin' || payload.role === 'user') {
            project.find({ "projectId": req.params.projectId }, (err, data) => {
                if (err)
                    throw err;
                else
                    res.json(data);
            })
        } else {
            res.status(403).json("not authorized");
        }
    })

}
exports.addProject = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin') {
            let newproject = new project({
                "managerId": req.body.managerId,
                "projectId": req.body.projectId,
                "projectName": req.body.projectName,
                "teamMember": req.body.teamMember,
                "scrumMaster": req.body.scrumMaster,
                "status": req.body.status
            })
            newproject.save((err) => {
                if (err)
                    res.status(400).json("provide valid data");
                else
                    res.json("added succefully");
            })

        } else {
            res.status(403).json("not authorized");
        }
    })

}
exports.updateProject = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin') {
            project.findOneAndUpdate({ "projectId": req.params.projectId }, {
                $set: {
                    "managerId": req.body.managerId,
                    "projectName": req.body.projectName,
                    "teamMember": req.body.teamMember,
                    "scrumMaster": req.body.scrumMaster,
                    "status": req.body.status
                }
            },
                (err) => {
                    if (err)
                        res.status(400).json("provide valid data");
                    else
                        res.json("updated succefully");
                })
        } else {
            res.status(403).json("not authorized");
        }
    })



}
exports.updateProjectStatus = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin') {
            project.findOneAndUpdate({ "projectId": req.params.projectId }, {
                $set: {
                    "status": req.body.status
                }
            },
                (err) => {
                    if (err)
                        res.status(400).json("provide valid data");
                    else
                        res.json("updated succefully");
                })
        } else {
            res.status(403).json("not authorized");
        }
    })

}
exports.deleteProject = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin') {
            project.findOneAndRemove({ "projectId": req.params.projectId },
                (err) => {
                    if (err)
                        res.status(400).json("provide valid data");
                    else
                        res.json("deleted succefully");
                })
        } else {
            res.status(403).json("not authorized");
        }
    })

}

