import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { serverURL } from "../../config";


const OurBrand = () => {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("this call from brands usestate,Brand Length:",brands.length);

  useEffect(() => {
    fetch(`${serverURL}/brands`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setBrands(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        console.log("Error in fetching brands:", error);
      });
  }, []);


  return (
    <div>
  
      <div className="text-center">
      <h1 className="text-center text-4xl font-extrabold">Our Brand</h1>
      <p className="text-center">Reliability, Quality, and Customer Satisfaction Every Time.</p>
      </div>
  <div className="flex">
    <div className="w-10/12 bg-white p-4 mx-auto shadow-md rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {isLoading ? (
          <div className="text-center">
          <span className="loading loading-spinner text-center loading-xs"></span>
      </div>
        ) : brands.length === 0 ? (
          <div className="text-center font-bold">No Brand found.</div>
        ) : (
          brands.map((brand) => (
            <div key={brand?._id} className="product-card">
              <Link to={`/brands/${brand?._id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={brand?.brandImageURL} alt={brand?.brandName} className="w-full max-h-36 object-contain" />
                <div className="p-4 flex-shrink flex-grow h-full flex flex-col">
                  <div className="text-center">
                    <h2 className="text-xl font-bold mb-2">{brand?.brandName}</h2>
                  </div>
                </div>
              </div>
              </Link>
             
            </div>
          ))
        )}
      </div>
    </div>
  </div>
      
</div>
  );
};

export default OurBrand;