using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Stock
{
    public class UpdateStockRequestDto
    {
        public string Symbol { get; set; } = string.Empty;
        public string CompanyName { get; set; } = string.Empty;
        public string ExchangeName { get; set; } = string.Empty;

        public string Industry { get; set; } = string.Empty;

        public long MarketCap { get; set; }
    }
}