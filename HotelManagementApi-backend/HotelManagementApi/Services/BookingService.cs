using Microsoft.EntityFrameworkCore;
using HotelManagementApi.Data;
using HotelManagementApi.DTOs;
using HotelManagementApi.Interfaces;
using HotelManagementApi.Models;

namespace HotelManagementApi.Services
{
    public class BookingService : IBookingService
    {
        private readonly ApplicationDbContext _context;

        public BookingService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<BookingDto> BookRoom(BookingDto bookingDto, string userId)
        {
            var room = await _context.Rooms.FindAsync(bookingDto.RoomId);
            if (room == null || !room.IsAvailable)
            {
                return null;
            }

            var days = (bookingDto.CheckOutDate - bookingDto.CheckInDate).Days;
            if (days <= 0) return null;

            var totalPrice = room.Price * days;

            var booking = new Booking
            {
                UserId = userId,
                RoomId = bookingDto.RoomId,
                CheckInDate = bookingDto.CheckInDate,
                CheckOutDate = bookingDto.CheckOutDate,
                TotalPrice = totalPrice
            };

            room.IsAvailable = false;

            _context.Bookings.Add(booking);
            _context.Rooms.Update(room);
            await _context.SaveChangesAsync();

            bookingDto.Id = booking.Id;
            bookingDto.TotalPrice = totalPrice;
            bookingDto.UserId = userId; // Add this to populate UserId in the response
            return bookingDto;
        }

        public async Task<List<BookingDto>> GetAllBookings()
        {
            return await _context.Bookings
                .Select(b => new BookingDto
                {
                    Id = b.Id,
                    UserId = b.UserId, // Now valid
                    RoomId = b.RoomId,
                    CheckInDate = b.CheckInDate,
                    CheckOutDate = b.CheckOutDate,
                    TotalPrice = b.TotalPrice
                })
                .ToListAsync();
        }

        public async Task<List<BookingDto>> GetUserBookings(string userId)
        {
            return await _context.Bookings
                .Where(b => b.UserId == userId)
                .Select(b => new BookingDto
                {
                    Id = b.Id,
                    UserId = b.UserId, // Now valid
                    RoomId = b.RoomId,
                    CheckInDate = b.CheckInDate,
                    CheckOutDate = b.CheckOutDate,
                    TotalPrice = b.TotalPrice
                })
                .ToListAsync();
        }
    }
}