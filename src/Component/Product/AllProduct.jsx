import Sidebar from "../Sidebar/Sidebar";


const AllProduct = () => {
    return (

        <div className="flex">
  {/* Sidebar */}
  <Sidebar></Sidebar>
  {/* Main content */}
  <div className="w-12/12 bg-white p-4 mx-auto shadow-md rounded-lg">
  <div className="max-w-md mx-auto my-8">
    <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
    <div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src="http://sinrato.mallthemes.com/wp-content/uploads/2018/12/product11-400x400.jpg" alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
</div>
  </div>
</div>
    );
};

export default AllProduct;