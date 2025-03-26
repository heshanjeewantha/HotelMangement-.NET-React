using Microsoft.AspNetCore.Identity;

namespace HotelManagementApi.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }
    }
}
