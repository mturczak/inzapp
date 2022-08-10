const Reservation = require("../models/Reservation");
const { Sequelize, DataTypes } = require("sequelize");
var initModels = require("../models_seq/init-models");
const reservations = require("../models_seq/reservations");
const sequelize = new Sequelize("mysql::memory:");
const db = require("../models_seq");

var models = initModels(db.sequelize);
const getAllReservations = async (req, res, next) => {
  try {
    const reservations = await models.reservations.findAll();
    // const [reservations, _] = await Reservation.findAll();
    res.status(200).json(reservations);
    console.log("reservations shown");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getAllReservationsWithInfo = async (req, res, next) => {
  try {
    const role = req.user.role;
    const id = req.user.id_clients;
    console.log("role");
    if (role === "admin") {
      const [reservations, _] = await Reservation.findAllWithInfo();
      res.status(200).json(reservations);
      console.log("reservations shown");
    } else if (role === "user" || role === "client") {
      const [reservations, _] = await Reservation.findAllWithInfoById(id);
      res.status(200).json(reservations);
      console.log("reservations shown");
    } else if (!role) {
      return res.status(401).json({ error: "User is not logged in" });
    }
  } catch (error) {
    console.log("role", role, "id", id);
    console.log(error);
    next(error);
  }
};

const getAllReservationsWithInfoById = async (req, res, next) => {
  try {
    const id = req.user.id_clients;
    const [reservations, _] = await Reservation.findAllWithInfoById(id);

    res.status(200).json(reservations);
    console.log("reservations shown", reservations);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getReservationById = async (req, res, next) => {
  try {
    let reservation_id = req.params.id;
    let filter = req.params.filter;
    let [reservation, _] = await Reservation.findById(filter, reservation_id);

    res.status(200).json({ reservation });
    console.log(
      "reservation filtered by: " + filter + ", with id:" + reservation_id,
      reservation
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getReservedReservations = async (req, res, next) => {
  try {
    let { date, id_tables, id_hours } = req.body;
    let [reservations, _] = await Reservation.findReserved(
      date,
      id_tables,
      id_hours
    );

    res.status(200).json({ reservations });
    console.log("reserved reservations: ", reservations);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getReservedReservationsByDate = async (req, res, next) => {
  try {
    let date = req.params.date;
    let [reservations, _] = await Reservation.findAllReservedFromDate(date);

    res.status(200).json({ reservations });
    console.log("reserved reservations on date: " + date, reservations);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createNewReservation = async (req, res, next) => {
  try {
    let { date, id_tables, id_hours } = req.body;
    let id_clients;
    if (req.user) {
      id_clients = req.user.id_clients;
    } else {
      id_clients = req.body.id_clients;
    }
    let reservation = new Reservation(date, id_clients, id_tables, id_hours);
    await reservation.save();
    console.log("reservation done:", reservation);

    res.status(201).json({ mssg: "reservation done", reservation });
  } catch (error) {
    res.status(400).json(error);
    console.error(error);
    next(error);
  }
};

const deleteReservations = async (req, res, next) => {
  try {
    const role = req.user.role;
    console.log(role);
    if (role !== "admin") {
      const idArray = req.body;
      const response = models.reservations.destroy({
        where: { id_reservation: idArray, id_clients: req.user.id_clients },
      });
      res.status(200).json(response);
      console.log(response);
    }
    else {
      const idArray = req.body;
      const response = models.reservations.destroy({
        where: { id_reservation: idArray },
      });
      res.status(200).json(response);
      console.log(response);
    }
  } catch (error) {
    console.log(error);

    next(error);
  }
};

module.exports = {
  getAllReservations,
  createNewReservation,
  getReservationById,
  getReservedReservations,
  getReservedReservationsByDate,
  getAllReservationsWithInfo,
  getAllReservationsWithInfoById,
  deleteReservations,
};
