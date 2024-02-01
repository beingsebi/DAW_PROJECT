using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using Microsoft.AspNetCore.Http;

using backend.Interfaces;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repository
{
    public class PortfolioRepository : IPortfolioRepository
    {
        private readonly ApplicationDBContext _context;

        public PortfolioRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Portfolio> CreateAsync(Portfolio portfolio)
        {
            await _context.Portfolios.AddAsync(portfolio);
            await _context.SaveChangesAsync();

            return portfolio;}

        public async Task<List<Stock>> GetStocksByUserIdAsync(string userId)
        {
            var ax = _context.Portfolios
                .Where(p => p.AppUserId == userId)
                .Select(p => p.Stock)
                .AsQueryable();

            return await ax.ToListAsync();
        }

        public async Task<Portfolio?> DeleteAsync (Portfolio portfolio)
        {
            var portfolioModel = await _context.Portfolios.FirstOrDefaultAsync(x => x.StockId == portfolio.StockId && x.AppUserId == portfolio.AppUserId);

            if(portfolioModel == null)
            {
                return null;
            }

            _context.Portfolios.Remove(portfolioModel);
            await _context.SaveChangesAsync();

            return portfolioModel;
        }
    }
}