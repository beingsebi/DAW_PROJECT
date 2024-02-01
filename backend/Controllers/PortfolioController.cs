using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using backend.Dtos.Account;
using System.IdentityModel.Tokens.Jwt;
using backend.Dtos.Portfolio;


namespace backend.Controllers
{
    [Route("api/portfolio")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IStockRepository _stockRepo;

        private readonly IPortfolioRepository _portfolioRepo;
        public PortfolioController(UserManager<AppUser> userManager,
        IStockRepository stockRepo ,IPortfolioRepository portfolioRepo)
        {
            _userManager = userManager;
            _stockRepo = stockRepo;
            _portfolioRepo = portfolioRepo;
        }
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPortfolio()
        {

            var handler = new JwtSecurityTokenHandler();
            
            var jwtSecurityToken = handler.ReadJwtToken(Request.Cookies["jwtToken"]);
            var jwtname = jwtSecurityToken.Payload["given_name"];
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == jwtname.ToString());

            if(user == null)
            {
                return Unauthorized("You are not authorized to view this portfolio");
            }

           var stocks = await _portfolioRepo.GetStocksByUserIdAsync(user.Id);

           return Ok(stocks);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> InsertStockToPortfolio( PortfolioDto portfolioDto)
        {
            var stockId = int.Parse(portfolioDto.StockId);
            Console.WriteLine("-----  \nstockId: " + stockId);
            var handler = new JwtSecurityTokenHandler();
            
            var jwtSecurityToken = handler.ReadJwtToken(Request.Cookies["jwtToken"]);
            var jwtname = jwtSecurityToken.Payload["given_name"];
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == jwtname.ToString());
            Console.WriteLine(user);
            if(user == null)
            {
                return Unauthorized("You are not authorized to view this portfolio");
            }

            var stock = await _stockRepo.GetByIdAsync(stockId);
            if(stock == null)
            {
                return NotFound("Stock not found");
            }

            var portfolio = new Portfolio
            {
                AppUserId = user.Id,
                StockId = stock.Id
            };

            await _portfolioRepo.CreateAsync(portfolio);

            return Ok();
        }

        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteStockToPortfolio( PortfolioDeleteDto portfolioDto)
        {
            var stockSymbol = portfolioDto.StockSymbol;

            var handler = new JwtSecurityTokenHandler();
            
            var jwtSecurityToken = handler.ReadJwtToken(Request.Cookies["jwtToken"]);
            var jwtname = jwtSecurityToken.Payload["given_name"];
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == jwtname.ToString());
            Console.WriteLine(user);
            if(user == null)
            {
                return Unauthorized("You are not authorized to view this portfolio");
            }

            var stock = await _stockRepo.GetBySymbolAsync(stockSymbol);
            if(stock == null)
            {
                return NotFound("Stock not found");
            }

            var portfolio = new Portfolio
            {
                AppUserId = user.Id,
                StockId = stock.Id
            };

            await _portfolioRepo.DeleteAsync(portfolio);

            return Ok();
        }
    }


    

}