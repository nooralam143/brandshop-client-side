
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css'; 

const HomeSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,       // Enable auto slide
    autoplaySpeed: 3000,  // Slide every 3 seconds
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        <div className="slide h-auto">
          <img className="w-full" src="https://i.ibb.co/QKS4gGq/home1-slider1.jpg" alt="Product 1" />
          <div className="slider-content left-5 md:left-20 lg:left-40">
            <h2 className="text-sm md:text-3xl lg:text-5xl font-bold mt-1 text-black leading-5">New Range Of<br></br><span className="text-pink-600 leading-5"> Samsung Camera</span></h2>
            <p className="text-sm leading-5">Samsung EOS600D/Kiss X5</p>
            <div>
           <a href="/products" className="shop-button leading-5">
              Shop Now
            </a>
           </div>
          </div>
        </div>
        <div className="slide">
          <img className="w-full" src="https://i.ibb.co/PN2gPxc/home1-slider2.jpg" alt="Product 2" />
          <div className="slider-content left-5 md:left-20 lg:left-40 leading-5">
            <h2 className="text-sm md:text-3xl lg:text-5xl font-bold  mt-1  text-black">Game, Consoles &<br></br><span className="text-pink-600">Much More!</span></h2>
            <p className="text-sm">Sega Saturn Disc Dribve Replacement</p>
           <div>
           <a href="/products" className="shop-button text-xs">
              Shop Now
            </a>
           </div>
          </div>
        </div>
        <div className="slide">
          <img className="w-full" src="https://i.ibb.co/PN2gPxc/home1-slider2.jpg" alt="Product 2" />
          <div className="slider-content left-5 md:left-20 lg:left-40 leading-5">
            <h2 className="text-sm md:text-3xl lg:text-5xl font-bold  mt-1  text-black">Game, Consoles &<br></br><span className="text-pink-600">Much More!</span></h2>
            <p className="text-sm">Sega Saturn Disc Dribve Replacement</p>
            <div>
           <a href="/products" className="shop-button ">
              Shop Now
            </a>
           </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default HomeSlider;
