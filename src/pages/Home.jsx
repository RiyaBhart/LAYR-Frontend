import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import { fetchProducts } from "../api/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   fetchProducts(8, 0)
  //     .then((res) => {
  //       const raw = res.data ?? [];

  //       // 🔥 Manual images stored in public/products/
  //       const images = [
  //         "product1.png",
  //         "product2.png",
  //         "product3.png",
  //         "product4.png",
  //         "product5.png",
  //         "product6.png",
  //         "product7.png",
  //         "product8.png"
  //       ];

  //       // 🔥 Attach image to each product
  //       const mapped = raw.map((p, i) => ({
  //         ...p,
  //         image: images[i % images.length], // rotate images
  //       }));

  //       console.log("Products with images:", mapped);

  //       setProducts(mapped);
  //     })
  //     .catch(() => setProducts([]));
  // }, []);

  useEffect(() => {
  const tempProducts = [
    {
      article_id: 1,
      prod_name: "Black Minimal Jacket",
      price: 120,
      image: "product1.png",
    },
    {
      article_id: 2,
      prod_name: "Grey Urban Hoodie",
      price: 90,
      image: "product2.png",
    },
    {
      article_id: 3,
      prod_name: "Olive Overshirt",
      price: 110,
      image: "product3.png",
    },
    {
      article_id: 4,
      prod_name: "Classic Denim Jacket",
      price: 150,
      image: "product4.png",
    },
    {
      article_id: 5,
      prod_name: "Stone Cargo Jacket",
      price: 160,
      image: "product5.png",
    },
    {
      article_id: 6,
      prod_name: "Ember",
      price: 40,
      image: "beanie1.jpg",
    },
    {
      article_id: 7,
      prod_name: "Obsidian",
      price: 190,
      image: "beanie2.jpg",
    },
    {
      article_id: 8,
      prod_name: "Ecru",
      price: 80,
      image: "beanie3.jpg",
    },
  ];

  setProducts(tempProducts);
}, []);


  return (
    <div>
      {/* HERO */}
      <section className="w-full">
        <div className="w-full relative overflow-hidden bg-gray-200">
          <img 
            src="/hero.jpg" 
            alt="hero" 
            className="w-full h-auto object-contain" 
          />
          <div className="absolute inset-0 hero-overlay flex items-center justify-center">
            <div className="text-center text-white px-4">
              <p className="uppercase tracking-wider text-sm mb-4">STRATA</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Outerwear for the
                <span className="block">Modern You</span>
              </h1>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">Discover Now</Button>
            </div>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="app-container mt-16">
        <h2 className="text-3xl font-semibold text-gray-900 text-center">New Arrivals</h2>
        <div className="flex justify-center mt-6 text-sm text-gray-500 space-x-6">
          <button className="border-b-2 border-gray-900 pb-1">Women</button>
          <button>Men</button>
          <button>Accessories</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
          {products.length
            ? products.map((p) => (
                <ProductCard key={p.article_id} product={p} />
              ))
            : Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="card-neutral p-4">
                  <div className="h-44 bg-gray-50 animate-pulse rounded-md"></div>
                </div>
              ))}
        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section className="app-container mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div 
          className="bg-gray-50 rounded-xl p-6 md:p-8 flex flex-col justify-between aspect-[4/3] min-h-[250px]"
          style={{ 
            backgroundImage: "url('/products/men.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white drop-shadow-lg">Where Men Meet Luxury</h3>
            <p className="text-gray-100 drop-shadow-md mb-4">Layer Up for Winter.</p>
          </div>
          <Button className="bg-white text-black self-start">Shop Now</Button>
        </div>

        <div
          className="bg-gray-50 rounded-xl p-6 md:p-8 flex flex-col justify-between aspect-[4/3] min-h-[250px]"
          style={{ 
            backgroundImage: "url('/products/women.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white drop-shadow-lg">Layers Made for Her</h3>
            <p className="text-gray-100 drop-shadow-md mb-4">Winter essentials, reimagined.</p>
          </div>
          <Button className="bg-white text-black self-start">Shop Now</Button>
        </div>
      </section>
    </div>
  );
}
