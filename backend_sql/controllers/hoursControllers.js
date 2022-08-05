const Hour = require("../models/Hour");

const getAllHours = async (req, res, next) => {
  try {
    const [hours, _] = await Hour.findAll();
    res.status(200).json(hours);
    console.log("hours shown", hours);
  } catch (error) {
    console.log(error);
    next(error);
  }
};


module.exports = {
  getAllHours,
  
};
