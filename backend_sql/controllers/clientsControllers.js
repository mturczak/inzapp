require("dotenv").config();
const Client = require("../models/Client");
const { Sequelize, DataTypes, Op } = require("sequelize");
// var initModels = require("../models_seq/init-models");
const { clients } = require("../models_seq");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
// const db = require("../models_seq")
// const sequelize = new Sequelize('mysql::memory:');

// var models = initModels(db.sequelize);
const getAllClients = async (req, res, next) => {
  try {
    // const [clients, _] = await Client.findAll();
    const clientsRes = await clients.findAll();
    res.status(200).json(clientsRes);
    console.log("clients shown", JSON.stringify(clientsRes, null, 2));
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getClientById = async (req, res, next) => {
  try {
    let client_id = req.params.id;

    let [client, _] = await Client.findById(client_id);

    res.status(200).json({ client });
    console.log("Client with id: " + client_id);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getClientByFilter = async (req, res, next) => {
  try {
    let value = req.params.value;
    let filter = req.params.filter;
    let [client, _] = await Client.findByFilter(filter, value);

    res.status(200).json({ client });
    console.log("Client filtered by: " + filter + ", " + value, client);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createNewClient = async (req, res, next) => {
  try {
    let { name, phone, email } = req.body;
    // let client = new Client(name, phone, email);
    // let data = await client.save();
    let client_res = await clients.create({ name, phone, email });
    console.log(client_res.dataValues);

    res.status(201).json({ mssg: "client saved", client_res });
    return client_res.dataValues;
  } catch (error) {
    console.log(error);
    next(error);
    return null;
  }
};
const createUser = async (req, res, next) => {
  try {
    const { name, phone, email, password } = req.body;
    let checkIfExists = await clients.findOne({
      where: { [Op.or]: [{ email: email }, { phone: phone }] },
    });

    if (checkIfExists) {
      if (checkIfExists.hasAccount) {
        res.status(400).json({ error: "Email or Phone is already registered" });
        console.error("Email or Phone is already registered");
        return;
      }
      const hashed = await bcrypt.hash(password, 10);
      let updatedUser = await clients.update(
        {
          name: name,
          email: email,
          phone: phone,
          hasAccount: 1,
          password: hashed,
          role: "user",
        },
        {
          where: { id_clients: checkIfExists.id_clients },
        }
      );
      res.status(201).json({ mssg: "user updated", updatedUser });
    } else {
      const hashed = await bcrypt.hash(password, 10);
      if (hashed) {
        let user = await clients.create({
          name,
          email,
          phone,
          hasAccount: 1,
          password: hashed,
          role: "user",
        });
        res.status(201).json({ mssg: "user saved", user });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await clients.findOne({ where: { email: email } });
    if (!user) {
      res.json({ error: "Użytkownik nie istnieje" });
      console.error("User doesn't exists");
      return;
    }

    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "Niepoprawny email lub hasło" });
        console.error("Wrong Email and Password combination");
        return;
      }
      const accessToken = sign(
        {
          email: user.email,
          id_clients: user.id_clients,
          name: user.name,
          role: user.role,
        },
        process.env.JWT_KEY
      );
      res.json({
        mssg: "logged in",
        token: accessToken,
        email: user.email,
        id_clients: user.id_clients,
        name: user.name,
        role: user.role,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const role = req.user.role;
    console.log(role);
    if (role === "admin") {
      const idArray = req.body;
      const response = clients.destroy({
        where: { id_clients: idArray },
      });
      res.status(200).json(response);
      console.log(response);
    } else {
      res.status(401).json({ error: "Acces denied from clientsControllers" });
    }
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const auth = (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(400).json(error);
  }
};
module.exports = {
  getAllClients,
  getClientById,
  getClientByFilter,
  createNewClient,
  createUser,
  login,
  auth,
  deleteUser,
};
