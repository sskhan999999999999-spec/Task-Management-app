import { Project } from "../models/projects.models.js"

export const createProject = async(req,res)=>{
    try {
         const {name,description,status,startDate,endDate,priority} = req.body
         if(!name || !description || !status || !startDate || !endDate || !priority ){
            return res.
            status(400)
            .json({
                message: 'all fields are required'
            })
            
         }
         const io = req.app.get("io")

         const project = await Project.create({
            name,
            description,
            status,
            startDate,
            endDate,
            priority
         })

         io.emit('newProject',project)

         return res
         .status(200)
         .json({
            project,
            message:"project created successfully"
         })


    } catch (error) {
        console.log(error);
        
        return res
        .status(400)
        .json({
            message:"failed to create project",
            error
        })
    }
}

export const getAllProjects = async(req,res)=>{
    try {

        const projects = await Project.find({})

        return res
        .status(200)
        .json({
            message: "projects fetch successfully",
            projects
        })
        
    } catch (error) {
        return res
        .status(400)
        .json({
            message: 'something went wrong while fetching projects',
            err: error.message
        })
    }
}