using HotelManagementApi.Interfaces;

namespace HotelManagementApi.Interfaces
{
    public interface ITokenBlacklistService
    {
        Task<bool> IsTokenBlacklisted(string token);
        Task BlacklistToken(string token);
    }
}

namespace HotelManagementApi.Services
{
    public class TokenBlacklistService : ITokenBlacklistService
    {
        private readonly HashSet<string> _blacklistedTokens = new HashSet<string>(); // In-memory store (replace with DB for production)

        public Task<bool> IsTokenBlacklisted(string token)
        {
            return Task.FromResult(_blacklistedTokens.Contains(token));
        }

        public Task BlacklistToken(string token)
        {
            _blacklistedTokens.Add(token);
            return Task.CompletedTask;
        }
    }
}