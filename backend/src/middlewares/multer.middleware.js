import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to a proper file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        // Use the original file name for simplicity
        cb(null, file.originalname);
    }
});

export const upload = multer({
    storage
});
