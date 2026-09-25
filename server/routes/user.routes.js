import {Router} from "express"
import { createUser, currentUser, getAllUsers, login } from "../controllers/user.controllers.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
import { createProject, getAllProjects } from "../controllers/project.controllers.js"
import { createTask, getAllTasks } from "../controllers/task.controllers.js"

const router = Router()

router.route("/create-user").post(createUser)
router.route("/login").post(login)
router.route("/create-project").post(createProject)
router.route("/create-task").post(createTask)
router.route("/getCurrentUser").get(verifyJWT,currentUser)
router.route("/getAllUsers").get(verifyJWT,getAllUsers)
router.route("/getAllProjects").get(verifyJWT,getAllProjects)
router.route("/getAllTasks").get(verifyJWT,getAllTasks)

export default router