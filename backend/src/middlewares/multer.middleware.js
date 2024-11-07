import multer from 'multer';

// Ensure the temp directory exists
const tempDirectory = path.join(__dirname, 'public', 'temp');

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