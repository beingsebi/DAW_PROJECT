using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Dtos.Portfolio
{
    public class PortfolioDto
    {
        
        [Required]
        public string StockId{ get; set; }
    }
}
