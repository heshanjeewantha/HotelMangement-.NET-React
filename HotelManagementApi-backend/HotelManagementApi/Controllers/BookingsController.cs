using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HotelManagementApi.DTOs;
using HotelManagementApi.Interfaces;

namespace HotelManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingsController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> BookRoom([FromBody] BookingDto bookingDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized("User not authenticated");

            var bookedRoom = await _bookingService.BookRoom(bookingDto, userId);
            if (bookedRoom == null) return BadRequest("Room not available or invalid booking details");

            return CreatedAtAction(nameof(BookRoom), new { id = bookedRoom.Id }, bookedRoom);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllBookings()
        {
            var bookings = await _bookingService.GetAllBookings();
            return Ok(bookings);
        }

        [HttpGet("mybookings")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetMyBookings()
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId)) return Unauthorized("User not authenticated");

            var bookings = await _bookingService.GetUserBookings(userId);
            return Ok(bookings);
        }
    }
}