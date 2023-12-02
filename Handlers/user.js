import { database } from "../conn.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.username;
  const q = "SELECT * FROM user WHERE username=?";

  database.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(404).json("User not found");
    }

    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const getUserById = (req, res) => {
  const userId = req.query.userId;
  // console.log(userId);
  const q = "SELECT * FROM user WHERE id=?";

  database.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);

    if (data.length === 0) {
      return res.status(404).json("User not found");
    }

    const { password, ...info } = data[0];
    return res.json(info);
  });
};
// export const getOwnedTruck = (req, res) => {
//   const getQuery = "SELECT * FROM trucks WHERE OwnerId=?";
//   // console.log(req.query.OwnerId)
//   // Use req.query.OwnerId to access the parameter from the URL
//   database.query(getQuery, [req.query.OwnerId], (getErr, getData) => {
//     if (getErr) {
//       console.error(getErr);
//       return res
//         .status(500)
//         .json({ error: "Internal Server Error", details: getErr.message });
//     }
//     // console.log(getData)
//     return res.status(200).json(getData);
//   });
// };
export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  // if (!token) {
  //   console.log(token)
  //   console.log("yes")
  //   return res.status(401).json("Not authenticated!");
  // }

  // jwt.verify(token, "secretkey", (err, userInfo) => {
  //   if (err) return res.status(403).json("Token is not valid!");
    const q = "UPDATE user SET `phoneNo.`=?, `address`=?, `aadhar`=?, `isOwner`=? WHERE username=?";
    // console.log(req.body.phone);
    // console.log(req.body.address);
    // console.log(req.body.isOwner);
    // console.log(req.body.aadhar);
    database.query(
      q,
      [
        req.body.phone,
        req.body.address,
        req.body.aadhar,
        req.body.isOwner,
        req.body.username,
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        if(data.length===0) return res.json("No change happend");
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
  // });
};
