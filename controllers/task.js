// const res = require("express/lib/response")
const Task = require('../models/Task')
const asyncWrapper = require('../middlewares/asyncWrapper')
const ErrorResponse = require('../utils/ErrorResponse')

const getAllTasks = asyncWrapper(async (req, res, next) => {
     const task = await Task.find()
     res.status(200).json({count: task.length, task})

     console.error({msg: err.message})

     next(err)
})

const createTask = asyncWrapper( async (req, res, next) => {

     const task = await Task.create(req.body)
     res.status(201).json({task})
     
//  next(err)
})

const getTask = asyncWrapper( async (req, res, next) => {

    const {id: taskID} = req.params

    const task = await Task.findOne({_id: taskID})

    if(!task) {
    //    return res.status(404).json({msg: `There is no task with the id of ${taskID}`})
    return next(new ErrorResponse(`No task with the id of ${taskID}`, 404))
        
    }

    res.status(200).json({task})

    // if(err) {
    //     return res.status(404).json({msg: `There is no task with the id of ${err.value}`})
    //  }
    next(new ErrorResponse(`Task not found with the id of ${taskID}`, 404))
 
})

const updateTask = asyncWrapper( async (req, res, next) => {
 
        const {id: taskID} = req.params

        let task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            runValidators: true,
            new: true
        })

        if(!task) {
            return res.status(404).json({msg: `Task not found with the id of ${taskID}`})
        }

        res.status(200).json({task})
   

        // if(err) {
        //     return res.status(400).json({msg: `Task not found with the id of ${err.value}`})
        // }

        next(err)
    
})

const deleteTask = asyncWrapper(  async(req, res, next) =>{
   
        const {id: taskID} = req.params
        const task = await Task.findOneAndDelete({_id: taskID})

        if(!task) {
            return res.status(404).json({msg: `task not found with the id of ${taskID}`})
        }

        res.status(200).json({task: null, status: 'Success'})
   
        // if(err) {
        //     res.status(404).json({msg: err.message})
        // }

        next(err)
   
})


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}