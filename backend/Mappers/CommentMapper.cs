using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Comment;
using backend.Models;
using Npgsql.Replication;

namespace backend.Mappers
{
    public static class CommentMapper
    {
        public static CommentDto ToCommentDto (this Comment commentModel)
        {
            return new CommentDto
            {
                Id = commentModel.Id,
                Title = commentModel.Title,
                Content = commentModel.Content,
                CreatedOn = (commentModel.CreatedOn.Kind == DateTimeKind.Utc) ? commentModel.CreatedOn : DateTime.SpecifyKind(commentModel.CreatedOn, DateTimeKind.Utc),
                StockId = commentModel.StockId
            };
        }

        public static Comment ToCommentFromCreate (this CreateCommentDto commentDto, int stockId)
        {
            return new Comment
            {
                Title = commentDto.Title,
                Content = commentDto.Content,
                StockId = stockId
            };
        }
    }
}