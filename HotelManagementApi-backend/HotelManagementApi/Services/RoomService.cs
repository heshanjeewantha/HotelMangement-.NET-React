using Microsoft.EntityFrameworkCore;
using HotelManagementApi.Data;
using HotelManagementApi.DTOs;
using HotelManagementApi.Interfaces;
using HotelManagementApi.Models;

namespace HotelManagementApi.Services
{
    public class RoomService : IRoomService
    {
        private readonly ApplicationDbContext _context;

        public RoomService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<RoomDto>> GetAllRooms()
        {
            return await _context.Rooms
                .Select(r => new RoomDto
                {
                    Id = r.Id,
                    RoomNumber = r.RoomNumber,
                    Type = r.Type,
                    Price = r.Price,
                    IsAvailable = r.IsAvailable
                })
                .ToListAsync();
        }

        public async Task<List<RoomDto>> GetAvailableRooms()
        {
            return await _context.Rooms
                .Where(r => r.IsAvailable)
                .Select(r => new RoomDto
                {
                    Id = r.Id,
                    RoomNumber = r.RoomNumber,
                    Type = r.Type,
                    Price = r.Price,
                    IsAvailable = r.IsAvailable
                })
                .ToListAsync();
        }

        public async Task<RoomDto> AddRoom(RoomDto roomDto)
        {
            var room = new Room
            {
                RoomNumber = roomDto.RoomNumber,
                Type = roomDto.Type,
                Price = roomDto.Price,
                IsAvailable = roomDto.IsAvailable
            };
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();
            roomDto.Id = room.Id;
            return roomDto;
        }

        public async Task<RoomDto> UpdateRoom(int id, RoomDto roomDto)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null) return null;

            room.RoomNumber = roomDto.RoomNumber;
            room.Type = roomDto.Type;
            room.Price = roomDto.Price;
            room.IsAvailable = roomDto.IsAvailable;

            _context.Rooms.Update(room);
            await _context.SaveChangesAsync();
            return roomDto;
        }

        public async Task<bool> DeleteRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null) return false;

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}