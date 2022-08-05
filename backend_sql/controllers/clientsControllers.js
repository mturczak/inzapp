const Client = require("../models/Client");
const { Sequelize, DataTypes } = require('sequelize');
// var initModels = require("../models_seq/init-models");
const {clients} = require("../models_seq")
// const db = require("../models_seq")
// const sequelize = new Sequelize('mysql::memory:');

// var models = initModels(db.sequelize);
const getAllClients = async (req, res, next) => {
  try {
    // const [clients, _] = await Client.findAll();
    const clientsRes = await clients.findAll()
    res.status(200).json(clientsRes);
    console.log("clients shown", JSON.stringify(clientsRes,null,2));
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
    let client_res = await clients.create(req.body);
    console.log(client_res.dataValues);

    res.status(201).json({ mssg: "client saved", client_res });
    return client_res.dataValues;
  } catch (error) {
    console.log(error);
    next(error);
    return null;
  }
};

module.exports = {
  getAllClients,
  getClientById,
  getClientByFilter,
  createNewClient,
};
