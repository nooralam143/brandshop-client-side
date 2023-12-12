import { FaRocket,FaLaptopCode, FaRegCreditCard,FaMoneyBillAlt,FaTrain } from "react-icons/fa";

const FreeShipping = () => {
    return (
        <div className="hidden lg:flex flex-row justify-evenly text-xl border m-3 p-5">
            <div className="flex justify-center items-center">
                <div className="p-5 text-5xl">
                    <h1><FaRocket /></h1>
                </div>
                <div>
                    <h1 className=" font-medium">Free Shipping</h1>
                    <p className="text-base">Free shipping on all US order</p>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="p-5 text-5xl border-l">
                    <h1><FaLaptopCode /></h1>
                </div>
                <div>
                    <h1 className="font-medium">Support 24/7</h1>
                    <p className="text-base">Contact us 24 hours a day</p>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="p-5 text-5xl border-l">
                    <h1><FaMoneyBillAlt /></h1>
                </div>
                <div>
                    <h1 className="font-medium">100% Money Back</h1>
                    <p className="text-base">You have 30 days to Return</p>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="p-5 text-5xl border-l">
                    <h1><FaTrain /></h1>
                </div>
                <div>
                    <h1 className="font-medium">90 Days Return</h1>
                    <p className="text-base">If goods have problems</p>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="p-5 text-5xl border-l">
                    <h1><FaRegCreditCard /></h1>
                </div>
                <div>
                    <h1 className="font-medium">Payment Secure</h1>
                    <p className="text-base">We ensure secure payment</p>
                </div>
            </div>
        </div>
    );
};

export default FreeShipping;