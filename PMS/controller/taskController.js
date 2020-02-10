var task = require('../model/task')
var auth = require('../utils/auth')
var backlog = require('../model/backlog')
exports.getTasks = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin' || payload.role === 'user') {
            task.find({}, (err, data) => {
                if (err)
                    res.status(400).json(err);
                else
                    res.json(data);
            })
        } else {
            res.status(403).json("not authorized");
        }
    })

}
exports.getTaskById = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin' || payload.role === 'user') {
            task.find({ "taskId": req.params.taskId }, (err, data) => {
                if (err)
                    res.status(400).json(err);
                else
                    res.json(data);
            })
        } else {
            res.status(403).json("not authorized");
        }
    })

}
exports.getTasksByBacklogId = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin' || payload.role === 'user') {
            backlog.find({ "projectId": req.params.projectId }).distinct('backlogId').exec((err, backlogId) => {
                if (err)
                    res.status(400).json("give proper project id")
                else {
                    if (backlogId) {
                        task.find({ "backlogId": backlogId}
                        ).sort({"priority":1}).exec((err, data) => {
                            if (err)
                                {
                                    console.log(err)
                                    res.status(400).json("give proper project id")
                                }
                            else {
                                //console.log(data)
                                res.json(data)
                            }
                        })
                    }
                    else {
                        res.status(400).json("give proper project id")
                    }
                }
            })
        } else {
            res.status(403).json("not authorized");
        }
    })

}
exports.getTasksByUser = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin' || payload.role === 'user') {
            task.find({ "userId": req.params.userId }, (err, data) => {
                if (err)
                    res.status(400).json(err);
                else
                    res.json(data);
            })
        } else {
            res.status(403).json("not authorized");
        }
    })

}
exports.addTask = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin') {
            let newtask = new task({
                "backlogId": req.body.backlogId,
                "taskId": req.body.taskId,
                "title": req.body.title,
                "desc": req.body.desc,
                "startDate": req.body.startDate,
                "endDate": req.body.endDate,
                "priority": req.body.priority,
                "status": req.body.status
            })
            newtask.save((err) => {
                if (err)
                   { console.log("add task err"+ err)
                       res.status(400).json("provide valid data");
                }
                else
                    res.json("added succefully");
            })

        } else {
            res.status(403).json("not authorized");
        }
    })

}
exports.updateTask = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if ( payload.role === 'user') {
            task.findOneAndUpdate({ "taskId": req.params.taskId }, {
                $set: {
                    "title": req.body.title,
                    "desc": req.body.desc,
                    "startDate": req.body.startDate,
                    "endDate": req.body.endDate,
                    "priority": req.body.priority,
                    "status": req.body.status
                }
            },
                (err) => {
                    if (err)
                        res.status(400).json("provide valid data");
                    else
                        res.json("updated succefully");
                })
        }else if (payload.role === 'admin' ) {
            task.findOneAndUpdate({ "taskId": req.params.taskId }, {
                $set: {
                    "title": req.body.title,
                    "desc": req.body.desc,
                    "userId":req.body.userId,
                    "startDate": req.body.startDate,
                    "endDate": req.body.endDate,
                    "priority": req.body.priority,
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
exports.updateUserForTask = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin' || payload.role === 'user') {
            task.findOneAndUpdate({ "taskId": req.params.taskId }, {
                $set: {
                    "userId": req.body.userId,
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
exports.updateTaskStatus = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin' || payload.role === 'user') {
            task.findOneAndUpdate({ "taskId": req.params.taskId }, {
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
exports.deleteTask = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin') {
            task.findOneAndRemove({ "taskId": req.params.taskId },
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


