using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BasketController : ControllerBase
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasket()
        {
            var basket = await FindBasket();

            if (basket == null) return NotFound();

            return basket;
        }

        [HttpPost] // api/basket?productId=3&quantity=2
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            // Check if there is a basket for a given buyerId
            // If not, 1) Create buyerId 2) Add to response Cookies 3) Create a new basket and save to DB
            var basket = await FindBasket();
            
            if(basket == null) basket = CreateBasket();

            var productToBeAdded = await _context.Products.FirstOrDefaultAsync(p => p.Id == productId);
            if(productToBeAdded == null) return NotFound();
            
            basket.AddItem(productToBeAdded, quantity);
            
            var checkIfSaved = await _context.SaveChangesAsync() > 0;
            
            if(checkIfSaved) return StatusCode(201);
            
            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }

        private async Task<Basket> FindBasket()
        {
            return await _context.Baskets
                            .Include(i => i.Items)
                            .ThenInclude(p => p.Product)
                            .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            string buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}