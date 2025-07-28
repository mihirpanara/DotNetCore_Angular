using API.Data;
using API.Entities;
using API.Extentions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class LikesController : BaseApiController
    {
        private readonly IUserRepository userRepository;
        private readonly ILikesRepository likesRepository;

        public LikesController(IUserRepository userRepository,ILikesRepository likesRepository) 
        {
            this.userRepository = userRepository;
            this.likesRepository = likesRepository;
        }

        [HttpPost("{username}")]
        public async Task<ActionResult> AddLike(string username)
        {
            var sourceUserId = User.GetUserId();
            var likedUser = await userRepository.GetUserByNameAsync(username);
            var sourceUser = await likesRepository.GetUserWithLike(sourceUserId);

            if(likedUser == null) return NotFound();

            if (sourceUser.UserName.ToLower() == username.ToLower()) return BadRequest("You cannot like yourself");

            var userLike = await likesRepository.GetUserLike(sourceUserId, likedUser.Id);

            if(userLike != null) return BadRequest("You already like this user");

            userLike = new UserLike
            {
                SourceUserId = sourceUserId,
                LikedUserId = likedUser.Id
            };

            sourceUser.LikedUsers.Add(userLike);

            if (await userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Faild to like user");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDTO>>> GetUserLikes([FromQuery] LikeParams likeParams)
        {
            likeParams.UserID = User.GetUserId();
            var users = await likesRepository.GetUserLikes(likeParams);

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);

            return Ok(users);
        }
    }
}
