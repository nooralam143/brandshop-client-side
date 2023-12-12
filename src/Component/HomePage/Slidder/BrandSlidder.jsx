import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';  

// eslint-disable-next-line react/prop-types
const BrandSlidder = ({brandName}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,       
        autoplaySpeed: 3000,  
      };
      const brand = brandName;
      console.log(brand);


    

    return (
        <div className="w-full">
        <Slider {...settings}>
          <div className="slide">
            <img className="w-full" src="https://i.ibb.co/QKS4gGq/home1-slider1.jpg" alt="Product 1" />
            <div className="slider-content left-2 md:left-20 lg:left-40">
              <h2 className="text-xl md:text-3xl lg:text-5xl font-bold  mb-2  text-black">New Range Of<br></br><span className="text-pink-600"> Samsung Camera</span></h2>
              <p>Samsung EOS600D/Kiss X5</p>
              <a href="/products" className="shop-button md:py-10 md:px-20 md:mt-20 lg:mt-20 lg:py-10 lg:px-20">
                Shop Now
              </a>
            </div>
          </div>
          <div className="slide">
            <img className="w-full" src="https://i.ibb.co/PN2gPxc/home1-slider2.jpg" alt="Product 2" />
            <div className="slider-content left-5 md:left-20 lg:left-40">
              <h2 className="text-xl md:text-3xl lg:text-5xl font-bold mb-2 text-black">Game, Consoles &<br></br><span className="text-pink-600">Much More!</span></h2>
              <p>Sega Saturn Disc Dribve Replacement</p>
              <a href="/products" className="shop-button">
                Shop Now
              </a>
            </div>
          </div>
          <div className="slide">
            <img className="w-full" src="https://i.ibb.co/PN2gPxc/home1-slider2.jpg" alt="Product 2" />
            <div className="slider-content left-5 md:left-20 lg:left-40">
              <h2 className="text-xl md:text-3xl lg:text-5xl font-bold mb-2 text-black">Game, Consoles &<br></br><span className="text-pink-600">Much More!</span></h2>
              <p>Sega Saturn Disc Dribve Replacement</p>
              <a href="/products" className="shop-button">
                Shop Now
              </a>
            </div>
          </div>
        </Slider>
      </div>
    );
  };
export default BrandSlidder;