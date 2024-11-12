using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context)
        {
            // if(context.Products.Any()) return;

            // Remove all existing products
            if (context.Products.Any())
            {
                context.Products.RemoveRange(context.Products);
                Console.WriteLine("Data cleared");
            }

            // Reset the identity column (auto-increment) for SQLite
            context.Database.ExecuteSqlRaw("DELETE FROM sqlite_sequence WHERE name='Products'");

            var products = new List<Product> 
            {
                new Product
                {
                    Name = "Kuru Baklava",
                    Description ="كورو بقلاوة",
                    Price = 70000,
                    PictureUrl = "/fistikli-kuru-baklava.jpg",
                    Brand = "Turkey To Door",
                    Type = "Baklava",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Sarı Burma",
                    Description = "بقلاوة بورما بعين الجمل",
                    Price = 75000,
                    PictureUrl = "/sarma-burma.jpg",
                    Brand = "Turkey To Door",
                    Type = "Baklava",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Hasır Kadayıf",
                    Description ="كنافة مربعات بالفسدق الكامل",
                    Price = 80000,
                    PictureUrl = "/hasir-kadayif.jpg",
                    Brand = "Turkey To Door",
                    Type = "Kunefe",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Cevizli Baklava",
                    Description =
                        "بقلاوة طبقات مقرمشة متحمرة و محشية عين جمل تركي مميز",
                    Price = 65000,
                    PictureUrl = "/cevizli-baklava.jpg",
                    Brand = "Turkey To Door",
                    Type = "Baklava",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Karadut Fıstıklı Halep Türk Lokumu",
                    Description =
                        "حلقوم اصابع بالتوت و الفسدق",
                    Price = 25000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
            };
            
            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
            
        }
    }
}