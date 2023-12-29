using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Comment
{
    public class UpdateCommentRequestDto
    {
        [Required]
        [MinLength(5, ErrorMessage = "Title must have at least 5 characters")]
        [MaxLength(128, ErrorMessage = "Title must have at most 128 characters")]
        public string Title { get; set; } = string.Empty;

        [Required]
        [MinLength(10, ErrorMessage = "Content must have at least 10 characters")]
        [MaxLength(512, ErrorMessage = "Content must have at most 512 characters")]
        public string Content { get; set; } = string.Empty;
    }
}