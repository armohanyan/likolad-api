import {NextFunction, Request, Response} from 'express';
import multer, {StorageEngine} from 'multer';
import path from 'path';
import fs from 'fs';

``

// Define the paths for the upload directories
const UPLOAD_DIR = path.join(process.cwd(), 'upload'); // Pointing to root/upload
const IMAGES_DIR = path.join(UPLOAD_DIR, 'images');
const VIDEOS_DIR = path.join(UPLOAD_DIR, 'videos');

// Ensure the directories exist
const ensureDirExists = (dir: string) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

ensureDirExists(IMAGES_DIR);
ensureDirExists(VIDEOS_DIR);

// Define storage options
const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        const uploadType = req.body.type; // Assuming the client sends a 'type' field to specify 'image' or 'video'
        let uploadPath = '';

        if (file.mimetype.includes('image')) {
            uploadPath = IMAGES_DIR;
        } else if (file.mimetype.includes('video')) {
            uploadPath = VIDEOS_DIR;
        } else {
            uploadPath = UPLOAD_DIR;
        }

        cb(null, uploadPath);
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp + original extension
    },
});

// File filter to allow only specific types
const fileFilter = (req: Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
    const fileTypes = /jpeg|jpg|png|gif|mp4|avi|mkv/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        // @ts-ignore
        cb(new Error('Invalid file type'));
    }
};

const upload = multer({
    storage: storage,
    // @ts-ignore
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 50 }, // Limit file size to 50MB per file
}).array('files', 10); // Allow up to 10 files at once

// Middleware function to handle the upload
const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err: any) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: err.message });
        } else if (err) {
            return res.status(400).json({ error: err.message });
        }
        console.log(req.files, 'req.files')
        const imagePaths: string[] = [];
        const videoPaths: string[] = [];

        if (req.files) {
            (req.files as Express.Multer.File[]).forEach((file) => {
                const relativePath = path.relative(process.cwd(), file.path);
                if (file.mimetype.startsWith('image/')) {
                    imagePaths.push(relativePath);
                } else if (file.mimetype.startsWith('video/')) {
                    videoPaths.push(relativePath);
                }
            });
        }
        req.body.imagePaths = imagePaths;
        req.body.videoPaths = videoPaths;


        // If everything went well, proceed to the next middleware or route handler
        next();
    });
};

export default uploadMiddleware;