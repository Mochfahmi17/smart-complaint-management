"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const complaintController_1 = require("../controllers/complaintController");
const validate_1 = __importDefault(require("../middleware/validate"));
const schema_1 = require("../schema");
const multer_1 = __importDefault(require("../middleware/multer"));
const complaintRouter = express_1.default.Router();
//* GET
complaintRouter.get("/", complaintController_1.getAllComplaints);
complaintRouter.get("/stats", complaintController_1.getStatusComplaints);
complaintRouter.get("/:id", complaintController_1.getDetailComplaint);
//* POST
complaintRouter.post("/create", multer_1.default.single("photo"), (0, validate_1.default)(schema_1.complaintSchema), complaintController_1.createComplaint);
//* PUT
complaintRouter.put("/update/:id", multer_1.default.single("photo"), (0, validate_1.default)(schema_1.updateComplaintSchema), complaintController_1.editComplaint);
complaintRouter.delete("/delete/:id", complaintController_1.deleteComplaint);
exports.default = complaintRouter;
