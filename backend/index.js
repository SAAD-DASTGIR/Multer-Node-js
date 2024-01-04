const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const cors=require('cors');
const uploadRoutes = require('./routes/uploadRoutes');


const app = express();
const port = 5000;
app.use(cors());
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the actual origin of your React app
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mongosaad")
.then(()=>{
    console.log("server is connected to database")
    
}).catch((error)=>{
    console.log(error);

})

// Middleware to parse JSON and handle URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/',(req,res)=>{
  
})
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Specify the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage});


// Define the file upload route
app.post('/upload', upload.single('file'),(req,res)=>{
  res.json({ message: 'File uploaded successfully!'})})

// Use the file upload route
// app.use(uploadRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
