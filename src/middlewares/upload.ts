import multer, { StorageEngine } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';

// Define the storage engine with proper typing
const storage: StorageEngine = multer.diskStorage({
  destination: './uploads',
  filename: (req: Request, file: Express.Multer.File, cb: Function): void => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

// Initialize multer with the storage engine
const upload = multer({ storage });

export default upload;