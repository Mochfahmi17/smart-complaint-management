import express from "express";
import { getAllCategories } from "../controllers/categoryController";

const categoryRouter = express.Router();

//* GET
categoryRouter.get("/", getAllCategories);

export default categoryRouter;
