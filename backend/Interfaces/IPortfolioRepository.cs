using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Interfaces
{
    public interface IPortfolioRepository
    {
        Task<List<Stock>> GetStocksByUserIdAsync(string userId);

        Task<Portfolio> CreateAsync(Portfolio portfolio);
    }
}