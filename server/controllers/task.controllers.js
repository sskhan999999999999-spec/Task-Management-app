import { Task } from "../models/task.models.js";

export const createTask = async(req,res)=>{

    try {
        
        const {name, description, status, startDate, endDate, priority, asingTo } = req.body;

        if(!name || !description || !status || !startDate || !endDate || !priority || !asingTo){
            console.log("All fileds are required");
        }

        const io = req.app.get("io")

        const task = await Task.create({
            name, 
            description, 
            status, 
            startDate, 
            endDate, 
            priority, 
            asingTo
        })

        console.log("NEW TASK CREATED:", task._id);
        
        io.emit("newTask", task)

        res
        .status(200)
        .json({
            message: "Task create succussfully",
            task
        })

    } catch (error) {
        console.log(error);
        
        res.status(400)
        .json({
            message: "something went wrong while creating task"
        })
    }
}

export const getAllTasks = async(req,res)=>{
    try {
        
       const allTasks = await Task.find({})

       res.status(200)
       .json({
        allTasks,
        message: "tasks fetched successfully"
       })

    } catch (error) {
        res
        .status(500)
        .json({
            message: "something went wrong"
        })
    }
}