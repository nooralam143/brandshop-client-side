
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
        <div className="slide">
          <img className="w-full" src="https://i.ibb.co/QKS4gGq/home1-slider1.jpg" alt="Product 1" />
          <div className="slider-content">
            <h2 className="text-5xl font-bold pb-5 text-black">New Range Of<br></br><span className="text-pink-600"> Samsung Camera</span></h2>
            <p>Samsung EOS600D/Kiss X5</p>
            <a href="/products" className="shop-button">
              Shop Now
            </a>
          </div>
        </div>
        <div className="slide">
          <img className="w-full" src="https://i.ibb.co/PN2gPxc/home1-slider2.jpg" alt="Product 2" />
          <div className="slider-content">
            <h2 className="text-5xl font-bold pb-5 text-black">Game, Consoles &<br></br><span className="text-pink-600">Much More!</span></h2>
            <p>Sega Saturn Disc Dribve Replacement</p>
            <a href="/products" className="shop-button">
              Shop Now
            </a>
          </div>
        </div>
        {/* Add more slides as needed */}
      </Slider>
    </div>
  );
};

export default HomeSlider;
