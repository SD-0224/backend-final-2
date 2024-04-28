import express from "express";
import { verifyToken } from "../Controllers/userController";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = express.Router();
import * as profileController from "../Controllers/profileController";
import { uploadImageValidator } from "../Validators/imageValidator";

// Endpoint to get user orders
router.get("/orders", verifyToken, profileController.getUserOrders);

// Endpoint to get user addresses
router.get("/addresses", verifyToken, profileController.getUserAddresses);

// Endpoint to change user password
router.put("/change-password", verifyToken, profileController.changePassword);

// Endpoint to upload user photo
router.post(
  "/upload-photo",
  uploadImageValidator,
  upload.single("file"),
  verifyToken,
  profileController.uploadPhoto
);

// Endpoint to get user details
router.get("/details", verifyToken, profileController.getDetails);

// Endpoint to update user details
router.put("/update-details", verifyToken, profileController.updateDetails);
export default router;
