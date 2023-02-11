import multer from 'multer';
import path from 'path'
const __dirname = path.resolve();


const audioStorage = multer.diskStorage({
    destination: `${__dirname}/uploads/${process.env.AUDIO_PATH}/`,
    filename: function (req, file, cb) {
      cb(null, Date.now() + ".webm");
    },
  });
  
export const audioUpload = multer({
    storage: audioStorage,
    limits: { fileSize: 1000000 },
  }).single("track");

  const imageMsgFileStorage = multer.diskStorage({
    destination: `uploads/${process.env.IMAGE_MSG_PATH}/`,
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
export const imageMsgFileUpload = multer({
  storage: imageMsgFileStorage,
  limits: { fileSize: 1000000 },
}).single("imageMsg");