using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Interfaces;
using backend.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commRepo;
        
        public CommentController (ICommentRepository commRepo)
        {
            _commRepo = commRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var comments = await _commRepo.GetAllAsync();
            var commentDtos = comments.Select(s => s.ToCommentDto());
            return Ok(commentDtos);
        }
    }
}