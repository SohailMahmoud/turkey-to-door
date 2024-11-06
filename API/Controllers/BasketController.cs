using API.Data;
using API.DTOs;
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
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await FindBasket();

            if (basket == null) return NotFound();

            return MapBasketToDto(basket);
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

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            var basket = await FindBasket();
            if (basket == null) return NotFound();

            var itemToBeRemoved = basket.Items.FirstOrDefault(item => item.ProductId == productId);
            if(itemToBeRemoved == null) return BadRequest();

            itemToBeRemoved.Quantity -= quantity;
            if(itemToBeRemoved.Quantity == 0) basket.Items.Remove(itemToBeRemoved);

            var checkIfSaved = await _context.SaveChangesAsync() > 0;
            if(checkIfSaved) return Ok();

            return BadRequest(new ProblemDetails{Title = "Problem removing an item from the basket"});
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

        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Type = item.Product.Type,
                    Brand = item.Product.Brand,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}