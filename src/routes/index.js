const router = require("express").Router();
const { check } = require("express-validator");

const customerController = require("../components/customers/controller.js");
const { PREFIX } = require("../config");

function getRoutes(connection) {
  // Route Index
  router.get(`${PREFIX}/`, customerController.index);

  // All customers
  router.get(`${PREFIX}/customers`, (req, res) =>
    customerController.getCustomers(req, res, connection)
  );

  // Average
  router.get(`${PREFIX}/average`, (req, res) =>
    customerController.getAverage(req, res, connection)
  );

  // Show customer by id
  router.get(`${PREFIX}/customers/:id`, (req, res) =>
    customerController.getCustomer(req, res, connection)
  );

  router.post(
    `${PREFIX}/add`,
    check("name").exists(),
    check("lastname").exists(),
    check("birthdate").exists(),
    (req, res) => customerController.add(req, res, connection)
  );

  // Avarage age

  return router;
}

module.exports = {
  getRoutes,
};
