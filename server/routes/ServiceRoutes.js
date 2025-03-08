const express = require("express");
const {
  createService,
  getAllServices,
  updateService,
  deleteService,
  getServiceById,
} = require("../controllers/ServiceController");
const { authenticate, authorize } = require("../middlewares/AuthMiddleware");

const router = express.Router();

// Public route: Get all services
router.get("/", getAllServices);

// Public route: Get a specific service by ID
router.get("/:id", getServiceById);

// Protected routes: Only Manager can create, update, and delete services
router.post("/", authenticate, authorize(["Manager"]), createService);
router.put("/:id", authenticate, authorize(["Manager"]), updateService);
router.delete("/:id", authenticate, authorize(["Manager"]), deleteService);

module.exports = router;
