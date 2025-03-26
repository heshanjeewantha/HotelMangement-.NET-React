namespace HotelManagementApi.DTOs
{
    public class BookingDto
    {
        public int Id { get; set; }
        public string? UserId { get; set; } // Add this back
        public int RoomId { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
        public decimal TotalPrice { get; set; }
    }
}