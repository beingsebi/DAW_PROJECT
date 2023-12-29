using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using backend.Data;
using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDBContext _context;
        public CommentRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Comment>> GetAllAsync()
        {
            return await _context.Comments.ToListAsync(); 
        }

        public  async Task<Comment?> GetByIdAsync(int id)
        {
            return await _context.Comments.FindAsync(id);
        }
    }
}