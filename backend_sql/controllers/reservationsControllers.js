const Reservation = require("../models/Reservation");

const getAllReservations = async (req, res, next) => {
  try {
    const [reservations, _] = await Reservation.findAll();
    res.status(200).json(reservations);
    console.log("reservations shown");
  } catch (error) {
    console.log(error);
    next(error);
  }
};


const getReservationById = async (req, res, next) => {
  try {
    let reservation_id = req.params.id;
    let filter = req.params.filter;
    let [reservation, _] = await Reservation.findById(filter,reservation_id);

    res.status(200).json({ reservation });
    console.log("reservation filtered by: " + filter + ", with id:" + reservation_id, reservation);
  } catch (error) {
    console.log(error);
    next(error);
  }
};



const createNewReservation = async (req, res, next) => {
  try {
    let { date, id_clients, id_tables, id_hours } = req.body;
    let reservation = new Reservation(date, id_clients, id_tables, id_hours);
    await reservation.save();
    console.log("reservation done:", reservation);

    res.status(201).json({ mssg: "reservation done", reservation });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getAllReservations,
  createNewReservation,
  getReservationById,
};
