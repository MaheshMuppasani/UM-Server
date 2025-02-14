import express from 'express';
import { upload } from '../database/database.js';
import { addNewFile, getFile } from '../database/filesTable.js';

const files_router = express.Router();

files_router.post('/file', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const { originalname, mimetype, size, buffer } = req.file; // File buffer contains binary data

    const result = await addNewFile({ file_name: originalname, file_type: mimetype, file_size: size, file_data: buffer })

    res.status(201).send({
        message: 'File uploaded successfully',
        fileId: result.insertId,
        fileName: originalname,
    });
});

files_router.get("/getFile/:id", async (req, res) => {
    const fileId = req.params.id;
    const [file] = await getFile(fileId);
    res.setHeader('Content-Disposition', `attachment; filename=${file.file_name}`);
    res.setHeader('Content-Type', file.file_type);
    res.send(file.file_data);
})

export default files_router;