import multer from "multer";
//creating multer middleware for form data

const storage = multer.diskStorage({
    filename: function(re,file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({ storage });

export default upload;