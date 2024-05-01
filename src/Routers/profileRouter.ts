import express from "express";
import { verifyToken } from "../Controllers/userController";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = express.Router();
import * as profileController from "../Controllers/profileController";
import { uploadImageValidator } from "../Validators/imageValidator";
import { validateAddress } from "../Validators/addressValidator";

// Endpoint to get user orders
router.get("/orders", verifyToken, profileController.getUserOrders);

// Endpoint to get user addresses
router.get("/addresses", verifyToken, profileController.getUserAddresses);

// Endpoint to change user password
router.put("/change-password", verifyToken, profileController.changePassword);

// Endpoint to upload user photo
router.post(
  "/upload-photo",
  upload.single("file"),
  uploadImageValidator,
  verifyToken,
  profileController.uploadPhoto
);

router.put('/delete-photo', verifyToken, profileController.deletePhoto)
// Endpoint to get user details
router.get("/details", verifyToken, profileController.getDetails);
router.post("/create-address", verifyToken,validateAddress, profileController.createAddress)
// Endpoint to update user details
router.put("/update-details", verifyToken, profileController.updateDetails);
export default router;
