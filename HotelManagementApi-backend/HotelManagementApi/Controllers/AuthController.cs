using Microsoft.AspNetCore.Mvc;
using HotelManagementApi.DTOs;
using HotelManagementApi.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace HotelManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var token = await _authService.Register(registerDto);
            if (token == null) return BadRequest("Registration failed");
            return Ok(new { Token = token });
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var token = await _authService.Login(loginDto);
            if (token == null) return Unauthorized("Invalid credentials");
            return Ok(new { Token = token });
        }
        [HttpGet("users")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _authService.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("users/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _authService.GetUserById(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        [HttpPut("users/{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UpdateUserDto updateUserDto)
        {
            var result = await _authService.UpdateUser(id, updateUserDto);
            if (!result) return BadRequest("Update failed");
            return Ok("User updated successfully");
        }

        [HttpDelete("users/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var result = await _authService.DeleteUser(id);
            if (!result) return BadRequest("Deletion failed");
            return Ok("User deleted successfully");
        }
        [HttpPost("logout")]
        [Authorize] // Requires authentication
        public async Task<IActionResult> Logout()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var result = await _authService.Logout(token);
            if (!result) return BadRequest("Logout failed");
            return Ok("Logged out successfully");
        }
    }
}