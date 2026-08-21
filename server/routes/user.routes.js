import {Router} from "express"
import { createUser, login } from "../controllers/user.controllers.js"

const router = Router()

router.route("/create-user").post(createUser)
router.route("/login").post(login)

export default router