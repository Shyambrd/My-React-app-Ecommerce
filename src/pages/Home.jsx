



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home({ addToCart }) {
  const navigate = useNavigate();
const handleBuyNow = () => {
  const product = {
    id: slides[currentSlide].id,
    name: slides[currentSlide].title,
    category: slides[currentSlide].category,
    price: Number(
      slides[currentSlide].newPrice.replace(
        /[^0-9]/g,
        ""
      )
    ),
    quantity: 1,
    image: slides[currentSlide].image,
    status: "Available",
    description:
      slides[currentSlide].subtitle,
  };

  addToCart(product);

  navigate("/cart");
};
  const slides = [
    {
      id: 1,
      title: "iPhone Air",
      subtitle: "Starting from",
      category: "Electronics",
      oldPrice: "₹119900",
      newPrice: "₹94990",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200"
    },
    {
      id: 2,
      title: "Nike Air Jordan",
      subtitle: "Limited Edition",
      category: "Fashion",
      oldPrice: "₹14999",
      newPrice: "₹12999",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200"
    },
    {
      id: 3,
      title: "Adidas Samba",
      subtitle: "Classic Collection",
      category: "Fashion",
      oldPrice: "₹11999",
      newPrice: "₹8999",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200"
    },
    {
        id: 4,
        title: "Sony",
      subtitle: "Wireless Headphones",
      category: "Electronics",
      oldPrice: "₹21799",
      newPrice: "₹11999",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
        
      }
  ];

  const [currentSlide, setCurrentSlide] =
    useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        (prev) =>
          (prev + 1) % slides.length
      );
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev + 1) % slides.length
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        prev === 0
          ? slides.length - 1
          : prev - 1
    );
  };

  return (
    <div className="home-container">

      <div className="carousel">

        <button
          className="carousel-btn left"
          onClick={prevSlide}
        >
          ❮
        </button>

        <div className="slide">

          <div className="slide-content">

            <div className="slide-text">
              <h1>
                {
                  slides[currentSlide]
                    .title
                }
              </h1>

              <h3>
                {
                  slides[currentSlide]
                    .subtitle
                }
              </h3>

              <p className="price">
                <span className="old-price">
                  {
                    slides[currentSlide]
                      .oldPrice
                  }
                </span>

                {
                  slides[currentSlide]
                    .newPrice
                }
              </p>

              <button
  className="buy-now-home"
  onClick={handleBuyNow}
>
  Buy Now
</button>
            </div>

            <div className="slide-image">
              <img
                src={
                  slides[currentSlide]
                    .image
                }
                alt="product"
              />
            </div>

          </div>
        </div>

        <button
          className="carousel-btn right"
          onClick={nextSlide}
        >
          ❯
        </button>

      </div>

      <div className="carousel-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={
              currentSlide === index
                ? "dot active"
                : "dot"
            }
            onClick={() =>
              setCurrentSlide(index)
            }
          />
        ))}
      </div>

    </div>
  );
}

export default Home;