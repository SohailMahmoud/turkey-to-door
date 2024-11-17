using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context)
        {
            if(context.Products.Any()) return;

            // Remove all existing products
            // if (context.Products.Any())
            // {
            //     context.Products.RemoveRange(context.Products);
            //     Console.WriteLine("Data cleared");
            // }

            // Reset the identity column (auto-increment) for SQLite
            // context.Database.ExecuteSqlRaw("DELETE FROM sqlite_sequence WHERE name='Products'");

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
                    Type = "Kadayif",
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
                    Name = "Limon Aromalı Türk Lokumu",
                    Description =
                        "حلقوم سادة بنكهة الليمون متغطي بسكر بودرة",
                    Price = 30000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Nar Aromalı Türk Lokumu",
                    Description =
                        "حلقوم بالرمان سادة و متغطي بسكر بودرة",
                    Price = 30000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Kivi Aromalı Türk Lokumu",
                    Description ="",
                    Price = 30000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Damla Sakızlı Aromalı Türk Lokumu",
                    Description ="",
                    Price = 30000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Pirinç Fıstıklı Sultan Parmak Türk Lokumu",
                    Description ="",
                    Price = 62000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Kadayıf Fıstıklı Parmak Türk Lokumu",
                    Description ="",
                    Price = 47000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Pirinç Narlı Fıstıklı Parmak Türk Lokumu",
                    Description ="",
                    Price = 64000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Gülyaprak Narlı Fıstıklı Parmak Türk Lokumu",
                    Description ="",
                    Price = 52000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Pudralı Sultan Fıstıklı Parmak Türk Lokumu",
                    Description ="",
                    Price = 48000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Pudralı Fıstıklı Duble Parmak Türk Lokumu",
                    Description ="",
                    Price = 45000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Hindistan Cevizli Sultan Fıstıklı Duble Türk Lokumu",
                    Description ="",
                    Price = 45000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Hindistan Cevizli Duble Türk Lokumu",
                    Description ="",
                    Price = 38000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Hindistan Cevizli Fındıklı Duble Türk Lokumu",
                    Description ="",
                    Price = 40000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Hindistan Cevizli Fıstıklı Duble Türk Lokumu",
                    Description ="",
                    Price = 45000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Pudralı Narlı Fıstıklı Duble Türk Lokumu",
                    Description ="",
                    Price = 45000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Kadayıflı Narlı Fıstıklı Duble Türk Lokumu",
                    Description ="",
                    Price = 45000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Hindistan Cevizli Narlı Fıstıklı Duble Türk Lokumu",
                    Description ="",
                    Price = 45000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Vali Fıstıklı Türk Lokumu",
                    Description ="",
                    Price = 47000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Sultan Fındık Türk Lokumu",
                    Description ="",
                    Price = 36000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Zeliş Narlı Duble Fıstıklı Türk Lokumu",
                    Description ="",
                    Price = 50000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Kadayıflı Fıstıklı Duble Türk Lokumu",
                    Description ="",
                    Price = 55000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Fındıklı Türk Lokumu",
                    Description ="",
                    Price = 50000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Sultan Fıstıklı Türk Lokumu",
                    Description ="",
                    Price = 55000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "File Fıstıklı Sultan Narlı Halep Türk Lokumu",
                    Description ="",
                    Price = 60000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Kadayıf Çikolatalı Fıstıklı Türk Lokumu",
                    Description ="",
                    Price = 55000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Karadut Fıstıklı Halep Türk Lokumu",
                    Description ="",
                    Price = 60000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Hindistan Cevizli Sultan Narlı Fıstıklı Halep Türk Lokumu",
                    Description ="",
                    Price = 57000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Lokum",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Cevizli Saray Sarma",
                    Description ="",
                    Price = 70000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Baklava",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Cevizli Ev Baklavası",
                    Description ="",
                    Price = 69000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Baklava",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Fıstıklı Baklavası",
                    Description ="",
                    Price = 77000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Baklava",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Fıstıklı Şobiyet",
                    Description ="",
                    Price = 70000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Baklava",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Fıstıklı Midye",
                    Description ="",
                    Price = 66000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Baklava",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Fıstıklı Kadayıf",
                    Description ="",
                    Price = 80000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Kadayif",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Cevizli Kadayıf",
                    Description ="",
                    Price = 66000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Kadayif",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Fındıkzade",
                    Description ="",
                    Price = 79000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Kadayif",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Cevizli Bülbül Yuvası",
                    Description ="",
                    Price = 80000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Baklava",
                    QuantityInStock = 100
                },
                new Product
                {
                    Name = "Havuç Dilim Baklava",
                    Description ="",
                    Price = 66000,
                    PictureUrl = "/images/products/sb-react1.png",
                    Brand = "Turkey To Door",
                    Type = "Baklava",
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