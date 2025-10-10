import {Router} from 'express'
import {login, signUp, contactUs } from '../controllers/authController.js'


const router = Router()

router.post('/login', login)
router.post('/signup', signUp)
router.post('/contactus', contactUs)

export {router as authRouter}