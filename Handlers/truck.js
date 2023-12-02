import { database } from "../conn.js";
console
export const addTruck = (req, res) => {
  const insertQuery =
    "INSERT INTO trucks (LicensePlateNo, ChasisNo, MakeModel, RatePerKm, WeightClass, OwnerId, photo, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.LicensePlateNo,
    req.body.ChasisNo,
    req.body.MakeModel,
    req.body.RatePerKm,
    req.body.WeightClass,
    req.body.OwnerId,
    req.body.photo,
    req.body.city // Assuming req.body.photo contains the binary data of the photo
  ];

  database.query(insertQuery, values, (insertErr, insertData) => {
    if (insertErr) {
      console.error(insertErr);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: insertErr.message });
    }
    return res.status(200).json("Truck has been added successfully.");
  });
};
export const updateTruck = (req, res) => {
  const image = req.file;
  // console.log(image);
  const updateQuery = "UPDATE trucks SET photo=? WHERE LicensePlateNo=?";
  database.query(
    updateQuery,
    [
      req.body.image, // Use the appropriate property based on multer configuration
      req.body.LicensePlateNo,
    ],
    (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      if (data.affectedRows > 0) {
        return res.json("Photo Updated!");
      }
      return res.status(403).json("You can update only your post!");
    }
  );
  // console.log(req.body.image);
};

export const bookTruck = (req, res) => {
  const updateQuery =
    "UPDATE trucks SET BookedBy=?, BookedUpto=?, DistanceBooked=? WHERE LicensePlateNo=?";

  database.query(
    updateQuery,
    [req.body.BookedBy, req.body.BookedUpto, req.body.DistanceBooked, req.body.LicensePlateNo],
    (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.json("No change happened");
      if (data.affectedRows > 0) return res.json("Truck booked successfully!");
      return res.status(403).json("You can update only your post!");
    }
  );
};


export const getAllTrucks = (req, res) => {
  const getQuery = "SELECT * FROM trucks";

  database.query(getQuery, (getErr, getData) => {
    if (getErr) {
      console.error(getErr);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: getErr.message });
    }
    // console.log(getData)
    return res.status(200).json(getData);
  });
};
export const getOwnedTruck = (req, res) => {
  const getQuery = "SELECT * FROM trucks WHERE OwnerId=?";
  // console.log(req.query.OwnerId)
  // Use req.query.OwnerId to access the parameter from the URL
  database.query(getQuery, [req.query.OwnerId], (getErr, getData) => {
    if (getErr) {
      console.error(getErr);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: getErr.message });
    }
    // console.log(getData)
    return res.status(200).json(getData);
  });
};
// Add a new API endpoint for fetching rented trucks
export const getRentTruck = (req, res) => {
  const getQuery = "SELECT * FROM trucks WHERE BookedBy=?";
  // Use req.query.RenterId to access the parameter from the URL
  // console.log(req.query.RenterId)
  database.query(getQuery, [req.query.RenterId], (getErr, getData) => {
    if (getErr) {
      console.error(getErr);
      return res
        .status(500)
        .json({ error: "Internal Server Error", details: getErr.message });
    }
    return res.status(200).json(getData);
  });
};

