import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OurBrand = () => {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Make an HTTP request to fetch brand data from the API
    fetch("http://localhost:5000/brands")
      .then((response) => response.json())
      .then((data) => {
        setBrands(data); // Set the fetched data in the state
        setIsLoading(false); // Data loading is complete
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false); // Handle errors and set isLoading to false
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
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          brands.map((brand) => (
            <div key={brand._id} className="product-card">
              <Link to={`/brands/${brand._id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={brand.brandImageURL} alt={brand.brandName} className="w-full max-h-36 object-contain" />
                <div className="p-4 flex-shrink flex-grow h-full flex flex-col">
                  <div className="text-center">
                    <h2 className="text-xl font-bold mb-2">{brand.brandName}</h2>
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