# TruckNgo_Backend
This Backend Server is built on NodeJs Express and Mysql. Cors has been used for api whitewashing.
Db requirements:
MySql Database named TruckNgo;
2 Tables named user and trucks
user: id, username, email, password, name, isDriver, isOwner, isCustomer, aadhar, address, phoneNo.
trucks:LicensePlateNo, ChasisNo, MakeModel, RatePerKm, WeightClass, OwnerId, Photo, city, BookedBy, BookedUpto, DistanceBooked
