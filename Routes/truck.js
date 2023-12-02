import express from 'express';
import multer from 'multer';
import { addTruck, getAllTrucks, updateTruck, bookTruck, getOwnedTruck,getRentTruck} from '../Handlers/truck.js';
const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../client/public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
const upload = multer({ storage: storage });
router.put("/updateTruck", upload.single("file"),updateTruck);
router.post('/addTruck',  addTruck);
router.get('/getAllTrucks', getAllTrucks);
router.get('/getOwnedTruck', getOwnedTruck);
router.get('/getRentTruck', getRentTruck);
router.put('/bookTruck', bookTruck);
export default router;
