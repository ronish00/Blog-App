import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Ensure the temp directory exists
const tempDirectory = path.join(
    path.dirname(new URL(import.meta.url).pathname), 
    'public', 
    'temp'
);

if (!fs.existsSync(tempDirectory)) {
    fs.mkdirSync(tempDirectory, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Use the pre-checked directory
      cb(null, tempDirectory);
    },
    filename: function (req, file, cb) {
      // You can change how the file name is generated if you want
      cb(null, file.originalname); // Keep original filename
    }
  });

export const upload = multer({
    storage
})