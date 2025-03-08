const express = require('express');
const {
  createBookingRequest,
  getAllBookingRequests,
  assignConsultant,
  updateBookingRequestStatus,
  getBookingsByConsultantAndDate,
  getConsultantBookings,
  getCustomerBookings,
  cancelBookingRequest
} = require('../controllers/BookingRequestController');
const { authenticate, authorize } = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.post('/', createBookingRequest);
router.get('/', getAllBookingRequests);
router.put('/:id/assign-consultant', assignConsultant); 
router.put('/:id/status', updateBookingRequestStatus);
router.get('/booked-times', getBookingsByConsultantAndDate);
router.get("/my-bookings",authenticate, authorize(["Consultant"]),getConsultantBookings);
router.get("/history-bookings",authenticate, authorize(["Customer"]),getCustomerBookings);
router.put("/:id/cancel", authenticate, authorize(["Customer"]), cancelBookingRequest);




module.exports = router;
