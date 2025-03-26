using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HotelManagementApi.DTOs;
using HotelManagementApi.Interfaces;

namespace HotelManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly IRoomService _roomService;

        public RoomsController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        // GET: api/rooms
        [HttpGet]
        public async Task<IActionResult> GetAllRooms()
        {
            var rooms = await _roomService.GetAllRooms();
            return Ok(rooms);
        }

        // GET: api/rooms/available
        [HttpGet("available")]
        public async Task<IActionResult> GetAvailableRooms()
        {
            var availableRooms = await _roomService.GetAvailableRooms();
            return Ok(availableRooms);
        }

        // POST: api/rooms
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddRoom([FromBody] RoomDto roomDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var room = await _roomService.AddRoom(roomDto);
            return CreatedAtAction(nameof(GetAllRooms), new { id = room.Id }, room);
        }

        // PUT: api/rooms/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateRoom(int id, [FromBody] RoomDto roomDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (id != roomDto.Id) return BadRequest("Room ID mismatch");

            var updatedRoom = await _roomService.UpdateRoom(id, roomDto);
            if (updatedRoom == null) return NotFound($"Room with ID {id} not found");

            return Ok(updatedRoom);
        }

        // DELETE: api/rooms/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var result = await _roomService.DeleteRoom(id);
            if (!result) return NotFound($"Room with ID {id} not found");

            return NoContent();
        }
    }
}