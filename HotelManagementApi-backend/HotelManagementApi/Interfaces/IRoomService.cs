using HotelManagementApi.DTOs;

namespace HotelManagementApi.Interfaces
{
    public interface IRoomService
    {
        Task<List<RoomDto>> GetAllRooms();
        Task<List<RoomDto>> GetAvailableRooms();
        Task<RoomDto> AddRoom(RoomDto roomDto);
        Task<RoomDto> UpdateRoom(int id, RoomDto roomDto);
        Task<bool> DeleteRoom(int id);
    }
}