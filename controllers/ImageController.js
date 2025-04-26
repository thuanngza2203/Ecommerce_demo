import multer from "multer";
import path from "path";

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// File filter to check file type
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"));
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: fileFilter,
}).array("images", 10); // Allow up to 10 images

// Controller function to handle image upload
export function uploadImages(req, res) {
  upload(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        // Multer-specific errors
        return res.status(400).json({ error: err.message });
      } else {
        // Other errors
        return res.status(400).json({ error: err.message });
      }
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded!" });
    }

    res.status(200).json({
      message: "Images uploaded successfully!",
      files: req.files.map((file) => ({
        filename: file.filename,
        path: file.path,
      })),
    });
  });
}
