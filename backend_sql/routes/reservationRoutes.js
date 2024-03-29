const express = require("express");

const reservationsControllers = require("../controllers/reservationsControllers.js");
const clientsControllers = require("../controllers/clientsControllers");
const tablesControllers = require("../controllers/tablesControllers");
const hoursControllers = require("../controllers/hoursControllers");
const { validateToken } = require("../middleware/AuthMiddleware.js");

const router = express.Router();
// @route GET && POST - /posts/

// router
//   .route("/")
//   .get(postControllers.getAllPosts)
//   .post(postControllers.createNewPost);
// router.route("/:id").get(postControllers.getPostBy);

router.get("/", reservationsControllers.getAllReservations);
router.get("/allbyclient",validateToken,  reservationsControllers.getAllReservationsWithInfoById)
router.get("/info",validateToken, reservationsControllers.getAllReservationsWithInfo);
router.get("/:filter&:id", reservationsControllers.getReservationById);
router.get("/reserved", reservationsControllers.getReservedReservations);
router.get("/reservedbydate/:date", reservationsControllers.getReservedReservationsByDate);
router.post("/", validateToken, reservationsControllers.createNewReservation);
router.post("/withoutaccount", reservationsControllers.createNewReservation);
router.delete("/deletereservations", validateToken, reservationsControllers.deleteReservations)


router.get("/clients", clientsControllers.getAllClients);
router.get("/clientsVT",validateToken, clientsControllers.getAllClients);
router.get("/clients/:id", clientsControllers.getClientById);
router.get("/clients/:filter/:value", clientsControllers.getClientByFilter);
router.post("/clients", clientsControllers.createNewClient);
router.post("/createuser", clientsControllers.createUser);
router.post("/login", clientsControllers.login);
router.get("/auth", validateToken, clientsControllers.auth)
router.delete("/deleteclients",validateToken, clientsControllers.deleteUser);


router.get("/tables", tablesControllers.getAllTables);
router.get("/tables/:id", tablesControllers.getTableById);
router.get("/tables/:filter/:value", tablesControllers.getTableByFilter);
router.post("/tables", tablesControllers.createNewTable);

router.get("/hours", hoursControllers.getAllHours);

module.exports = router;
