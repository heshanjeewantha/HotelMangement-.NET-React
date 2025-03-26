using HotelManagementApi.DTOs;
using HotelManagementApi.Models;

namespace HotelManagementApi.Interfaces
{
    public interface IAuthService
    {
        Task<string> Register(RegisterDto registerDto);
        Task<string> Login(LoginDto loginDto);
        Task<List<ApplicationUser>> GetAllUsers();
        Task<ApplicationUser> GetUserById(string id);
        Task<bool> UpdateUser(string id, UpdateUserDto updateUserDto);
        Task<bool> DeleteUser(string id);
        Task<bool> Logout(string token);
    }
}