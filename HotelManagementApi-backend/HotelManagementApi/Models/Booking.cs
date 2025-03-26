using System.ComponentModel.DataAnnotations.Schema;

namespace HotelManagementApi.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public string UserId { get; set; } // Foreign key to ApplicationUser
        public int RoomId { get; set; }   // Foreign key to Room
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }

        // Navigation properties
        public ApplicationUser User { get; set; }
        public Room Room { get; set; }
    }
}