using HotelManagementApi.DTOs;

namespace HotelManagementApi.Interfaces
{
    public interface IBookingService
    {
        Task<BookingDto> BookRoom(BookingDto bookingDto, string userId);
        Task<List<BookingDto>> GetAllBookings(); // New method for all bookings
        Task<List<BookingDto>> GetUserBookings(string userId); // New method for user-specific bookings
    }
}