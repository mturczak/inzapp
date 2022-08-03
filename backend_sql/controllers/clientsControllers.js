const Client = require("../models/Client");

const getAllClients = async (req, res, next) => {
  try {
    const [clients, _] = await Client.findAll();
    res.status(200).json(clients);
    console.log("clients shown");
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
      let [client, _] = await Client.findByFilter(filter,value);
  
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
      let client = new Client(name, phone, email);
      data  = await client.save();
      console.log("client saved:", data);
  
      res.status(201).json({ mssg: "client saved", data });
      return data;
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
  createNewClient
};
