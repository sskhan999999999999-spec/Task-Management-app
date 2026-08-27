import {Router} from "express"
import { createUser, currentUser, login } from "../controllers/user.controllers.js"
import { verifyJWT } from "../middleware/auth.middleware.js"

const router = Router()

router.route("/create-user").post(createUser)
router.route("/login").post(login)
router.route("/getCurrentUser").get(verifyJWT,currentUser)

export default router