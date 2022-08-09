const Table = require("../models/Table");

const getAllTables = async (req, res, next) => {
  try {
    const [tables, _] = await Table.findAll();
    res.status(200).json(tables);
    // console.log("tables shown");
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getTableById = async (req, res, next) => {
  try {
    let table_id = req.params.id;

    let [table, _] = await Table.findById(table_id);

    res.status(200).json({ table });
    console.log("Table with id: " + table_id);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getTableByFilter = async (req, res, next) => {
    try {
      let value = req.params.value;
      let filter = req.params.filter;
      let [table, _] = await Table.findByFilter(filter,value);
  
      res.status(200).json({ table });
      console.log("Table filtered by: " + filter + ", " + value, table);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  const createNewTable = async (req, res, next) => {
    try {
      let { name, size, location } = req.body;
      let table = new Table(name, size, location);
      await table.save();
      console.log("table saved:", table);
  
      res.status(201).json({ mssg: "table saved", table });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

module.exports = {
  getAllTables,
  getTableById,
  getTableByFilter,
  createNewTable
};
