import express from 'express';
import { uploadFile } from '../controllers/uploadController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), uploadFile);

export default router;