const { validationResult } = require("express-validator");

const controller = {};

controller.index = (req, res) => {
    res.json({
        message: "Reto técnico!"
    });
}

controller.getCustomers = (req, res, connection) => {
    const sql = "SELECT * FROM customers";
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.status(404).json({
            message: "Not result"
        });
      }
    });
}

controller.getCustomer = (req, res, connection) => {
    const { id } = req.params;
    const sql = `SELECT * FROM customers WHERE id = ${id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;

      if (result.length > 0) {
        res.json(result);
      } else {
        res.status(404).json({
            message: "Not result"
        });
      }
    });
}

controller.getAverage = (req, res, connection) => {
  const sql = "SELECT ROUND(AVG(YEAR(NOW()) - YEAR(birthdate)), 2) as average FROM customers";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json({
        average: results[0].average
      });
    } else {
      res.status(404).json({
          message: "Not result"
      });
    }
  });
}

controller.add = (req, res, connection) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const sql = "INSERT INTO customers SET ?";
    const customerObj = {
        name: req.body.name,
        lastname: req.body.lastname,
        birthdate: req.body.birthdate,
    };

    connection.query(sql, customerObj, (error) => {
        if (error) throw error;
        res.json({
            message: "Customer created!",
            success: true
        });
    });
}

module.exports = controller;