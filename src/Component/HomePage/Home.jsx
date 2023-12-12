
import OurBrand from "../OurBrand/OurBrand";
import Products from "../Product/Products";
import FreeShipping from "../Section/FreeShipping";
import HomeSlider from "./Slidder/HomeSlider";


const Home = () => {
    
    return (
        <div>
            <HomeSlider></HomeSlider>
            <FreeShipping></FreeShipping>
            <div className="mt-10 text-center">
            <h1 className="font-extrabold text-center text-3xl">Featured Products</h1>
            <p>Check & Get Your Desired Product!</p>
            </div>
            <hr></hr>
            <Products></Products>
            <OurBrand></OurBrand>
        </div>
    );
};

export default Home;