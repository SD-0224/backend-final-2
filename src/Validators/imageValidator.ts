import { body, param, query, ValidationChain } from "express-validator";

export const uploadImageValidator: ValidationChain[] = [
  body("image").custom((value, { req }) => {
    if (!value || !req.file) {
      throw new Error("Image is required");
    }
    const allowedExtensions = [
      "jpg",
      "jpeg",
      "png",
      "gif",
      "bmp",
      "webp",
      "svg",
      "tiff",
      "ico",
    ];
    const fileExtension = req.file.originalname.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      throw new Error("File must be an image (jpg, jpeg, png, gif)");
    }
    return true;
  }),
];
