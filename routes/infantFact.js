const express = require("express");
const infantFactController = require("../controllers/infantFactController");

const router = express.Router();

router
    .route("/")
    .post(infantFactController.createFact)
    .get(infantFactController.getAllFacts);

router
    .route("/:id")
    .put(infantFactController.updateFact)
    .delete(infantFactController.deleteFact);

module.exports = router;
