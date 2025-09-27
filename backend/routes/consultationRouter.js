import { Router } from "express";
import { getConsultation, getConsultations, createConsultation } from "../controllers/consultationController.js";

const router = Router()

router.post('/', createConsultation)
router.get('/:id', getConsultation)
router.get('/', getConsultations)

export { router as consultationRouter }