const express = require("express");
const Reservation = require("../models/reservationModel");
const mongoose = require ('mongoose')

const router = express.Router();

// GET all reservations
router.get("/", async (req, res) => {
  const reservations = await Reservation.find({});

  res.status(200).json(reservations);
});

// GET a single reservation
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such reservation" });
  }

  const reservation = await Reservation.findById(id);

  if (!reservation) {
    return res.status(404).json({ error: "No such reservation" });
  }

  res.status(200).json(reservation);
});

// POST a new reservation
router.post("/", async (req, res) => {
  const { name, phone, email } = req.body;

  try {
    const reservation = await Reservation.create({ name, phone, email });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a reservation
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such reservation" });
  }

  const reservation = await Reservation.findOneAndDelete({ _id: id });

  if (!reservation) {
    return res.status(404).json({ error: "No such reservation" });
  }

  res.status(200).json(reservation);
});

// UPDATE a reservation
router.patch("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such reservation" });
  }

  const reservation = await Reservation.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!reservation) {
    return res.status(404).json({ error: "No such reservation" });
  }

  res.status(200).json(reservation);
});

module.exports = router;
