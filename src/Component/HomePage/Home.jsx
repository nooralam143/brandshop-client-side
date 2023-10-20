
import OurBrand from "../OurBrand/OurBrand";
import AllProduct from "../Product/AllProduct";
import FreeShipping from "../Section/FreeShipping";
import HomeSlider from "./Slidder/HomeSlider";



const Home = () => {
    return (
        <div>
            <HomeSlider></HomeSlider>
            <FreeShipping></FreeShipping>
            <AllProduct></AllProduct>
            <OurBrand></OurBrand>
        </div>
    );
};

export default Home;