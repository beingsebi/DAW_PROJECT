using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Stock
{
    public class CreateStockRequestDto
    {
        [MaxLength(15, ErrorMessage ="Symbol must have at most 15 characters")]
        public string Symbol { get; set; } = string.Empty;

        [MaxLength(50, ErrorMessage ="Company name must have at most 50 characters")]
        public string CompanyName { get; set; } = string.Empty;


        [MaxLength(150, ErrorMessage ="Exchange name must have at most 150 characters")]
        public string ExchangeName { get; set; } = string.Empty;

        [MaxLength(50, ErrorMessage ="Industry name must have at most 50 characters")]
        public string Industry { get; set; } = string.Empty;

        [Range(1,10000000000000)]
        public long MarketCap { get; set; }
    }
}