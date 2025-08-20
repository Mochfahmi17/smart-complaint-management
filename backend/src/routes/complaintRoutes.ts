import express from "express";
import { createComplaint, deleteComplaint, editComplaint, getAllComplaints, getDetailComplaint, getStatusComplaints } from "../controllers/complaintController";
import validate from "../middleware/validate";
import { complaintSchema, updateComplaintSchema } from "../schema";
import upload from "../middleware/multer";
const complaintRouter = express.Router();

//* GET
complaintRouter.get("/", getAllComplaints);
complaintRouter.get("/stats", getStatusComplaints);
complaintRouter.get("/:id", getDetailComplaint);

//* POST
complaintRouter.post("/create", upload.single("photo"), validate(complaintSchema), createComplaint);

//* PUT
complaintRouter.put("/update/:id", upload.single("photo"), validate(updateComplaintSchema), editComplaint);
complaintRouter.delete("/delete/:id", deleteComplaint);

export default complaintRouter;
