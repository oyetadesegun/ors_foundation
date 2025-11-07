import React from "react";

function Hero() {
  return (
    <section className="relative h-[400px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={"/background.jpg"}
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      <div className="relative flex h-full justify-center items-center text-white text-6xl font-extrabold">
        About Us
      </div>
      <div className="absolute right-0 bottom-0 w-1/3 bg-secondary p-4 text-white ">
        Home / About Us
      </div>
    </section>
  );
}

export default Hero;
