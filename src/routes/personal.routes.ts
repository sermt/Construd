import { Router } from "express";
import { verifyToken } from "../middlewares/auth";
import {
  listPersonal,
  getPersonalById,
  createPersonal,
  updatePersonal,
  deactivatePersonal,
} from "../controllers/personal.controller";

const router = Router();

router.use(verifyToken);

router.get("/", listPersonal);
router.get("/:id", getPersonalById);
router.post("/", createPersonal);
router.put("/:id", updatePersonal);
router.delete("/:id", deactivatePersonal);

export default router;
