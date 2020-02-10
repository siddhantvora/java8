var backlog = require('../model/backlog')
var auth = require('../utils/auth')

exports.getBacklogs = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin'||payload.role === 'user') {
            backlog.find({}, (err, data) => {
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
exports.getBacklogById = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin'||payload.role === 'user'){
            backlog.find({ "backlogId": req.params.backlogId }, (err, data) => {
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
exports.getBacklogsByProjectId = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin'||payload.role === 'user'){
            backlog.find({ "projectId": req.params.projectId }, (err, data) => {
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
exports.addBacklog = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin') {
            let newbacklog = new backlog({
                projectId: req.body.projectId,
                backlogId: req.body.backlogId,
                title: req.body.title,
                requirement: req.body.requirement,
                created_at: req.body.created_at,
                updated_at: req.body.updated_at
            })
            console.log(newbacklog)
            newbacklog.save((err) => {
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
exports.updateBacklog = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin'||payload.role === 'user') {
            backlog.findOneAndUpdate({ "backlogId": req.params.backlogId }, {
                $set:{
                title: req.body.title,
                requirement: req.body.requirement,
                updated_at: req.body.updated_at
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
exports.updateBacklogRequirement = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin'||payload.role === 'user') {
            backlog.findOneAndUpdate({ "backlogId": req.params.backlogId }, {
                $push:{
                requirement: req.body.requirement
            }
            },
                (err) => {
                    if (err)
                       res.status(400).json("provide valid data");
                    else
                        res.json("updated requirement succefully");
                })
        } else {
            res.status(403).json("not authorized");
        }
    })
}
exports.deleteBacklog = (req, res) => {
    auth.isAuthorised(req, res, (payload) => {
        if (payload.role === 'admin') {
            backlog.findOneAndRemove({ "backlogId": req.params.backlogId },
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

