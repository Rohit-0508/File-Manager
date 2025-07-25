const express= require('express');
const cors = require('cors');
const connectDB= require('./config/db');
const authRoutes= require('./routes/authRoutes');
const uploadRouter = require('./routes/upload');
const folderRoutes= require('./routes/folderRoutes');
const fileRoutes= require('./routes/fileRoutes')
const fetchFiles = require('./routes/fetchFiles');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRouter);
app.use('/api/folder', folderRoutes);
app.use('/api/image', fileRoutes);
app.use('/api/file', fetchFiles);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});