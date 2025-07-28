using API.Data;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int sourceId, int likedUserId);
        Task<AppUser> GetUserWithLike(int userId);
        Task<PagedList<LikeDTO>> GetUserLikes(LikeParams likeParams);
    }
}
