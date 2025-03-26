using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using HotelManagementApi.DTOs;
using HotelManagementApi.Interfaces;
using HotelManagementApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HotelManagementApi.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly ITokenBlacklistService _blacklistService; // Inject blacklist service

        public AuthService(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            ITokenBlacklistService blacklistService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _blacklistService = blacklistService;
        }

        // Register a new user with a role
        public async Task<string> Register(RegisterDto registerDto)
        {
            var user = new ApplicationUser
            {
                UserName = registerDto.Email,
                Email = registerDto.Email,
                FullName = registerDto.FullName
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return null;

            if (!await _roleManager.RoleExistsAsync(registerDto.Role))
                await _roleManager.CreateAsync(new IdentityRole(registerDto.Role));

            await _userManager.AddToRoleAsync(user, registerDto.Role);
            return await GenerateJwtToken(user);
        }

        // Login and return JWT token
        public async Task<string> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, loginDto.Password))
            {
                return await GenerateJwtToken(user);
            }
            return null;
        }

        // Logout by blacklisting the token
        public async Task<bool> Logout(string token)
        {
            await _blacklistService.BlacklistToken(token);
            return true;
        }

        // Helper method to generate JWT token
        private async Task<string> GenerateJwtToken(ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var roles = await _userManager.GetRolesAsync(user);
            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<List<ApplicationUser>> GetAllUsers()
        {
            return await _userManager.Users.ToListAsync();
        }

        public async Task<ApplicationUser> GetUserById(string id)
        {
            return await _userManager.FindByIdAsync(id);
        }

        public async Task<bool> UpdateUser(string id, UpdateUserDto updateUserDto)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return false;

            user.FullName = updateUserDto.FullName ?? user.FullName;
            user.Email = updateUserDto.Email ?? user.Email;
            user.UserName = updateUserDto.Email ?? user.Email;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded) return false;

            if (!string.IsNullOrEmpty(updateUserDto.Role))
            {
                var currentRoles = await _userManager.GetRolesAsync(user);
                await _userManager.RemoveFromRolesAsync(user, currentRoles);
                await _userManager.AddToRoleAsync(user, updateUserDto.Role);
            }

            return true;
        }

        public async Task<bool> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) return false;

            var result = await _userManager.DeleteAsync(user);
            return result.Succeeded;
        }
    }
}