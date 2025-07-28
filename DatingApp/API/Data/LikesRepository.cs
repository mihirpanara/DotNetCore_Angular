using API.Entities;
using API.Extentions;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LikesRepository : ILikesRepository
    {
        private readonly DataContext _context;

        public LikesRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<UserLike> GetUserLike(int sourceId, int likedUserId)
        {
            return await _context.Likes.FindAsync(sourceId, likedUserId);
        }

        public async Task<PagedList<LikeDTO>> GetUserLikes(LikeParams likeParams)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var likes = _context.Likes.AsQueryable();

            if (likeParams.Predicate == "liked")
            {
                likes = likes.Where(like => like.SourceUserId == likeParams.UserID);
                users = likes.Select(like => like.LikedUser);
            }

            if (likeParams.Predicate == "likedBy")
            {
                likes = likes.Where(like => like.LikedUserId == likeParams.UserID);
                users = likes.Select(like => like.SourceUser);
            }

            var likedUsers = users.Select(user => new LikeDTO
            {
                Username = user.UserName,
                KnownAs = user.KnownAs,
                Age = user.DateOfBirth.CalculateAge(),
                PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain).Url,
                City = user.City,
                Id = user.Id
            }); 

            return await PagedList<LikeDTO>.CreateAsync(likedUsers, likeParams.PageNumber, likeParams.PageSize);
        }

        public async Task<AppUser> GetUserWithLike(int userId)
        {
            return await _context.Users
                .Include(x => x.LikedUsers)
                .FirstOrDefaultAsync(x => x.Id == userId);
        }
    }
}
