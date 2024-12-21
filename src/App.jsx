import { useState } from "react";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Phone", price: 700 },
    { id: 3, name: "Headphones", price: 150 },
  ]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const getUniqueProductNames = () => {
    return [...new Set(products.map((product) => product.name))];
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!productName || !productPrice) return;

    setProducts([
      ...products,
      { id: Date.now(), name: productName, price: Number(productPrice) },
    ]);
    setProductName("");
    setProductPrice("");
  };

  const handleIncreasePrice = (id) => {
    setProducts(
      products.map((product) => {
        if (product.id === id) {
          return { ...product, price: product.price + 50 };
        }
        return product;
      })
    );
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen flex flex-col items-center justify-center">
      <form
        onSubmit={handleAddProduct}
        className="space-y-4 mb-8 w-full max-w-md"
      >
        <div>
          <label className="block text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            list="product-suggestions"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            placeholder="Enter product name"
            required
          />

          {!productName && (
            <p className="text-red-500 text-sm mt-1">الاسم من فضلك</p>
          )}

          <datalist id="product-suggestions">
            {getUniqueProductNames().map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Price</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            placeholder="Enter product price"
          />

          {!productPrice && (
            <p className="text-red-500 text-sm mt-1">السعر يا حجي</p>
          )}
        </div>

        <button
          type="submit"
          className=" bg-sky-700 text-white py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors  "
        >
          Add Product
        </button>
      </form>

      <div className="space-y-6 w-full ">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            <span className="text-lg ">
              {product.name} - ${product.price}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => handleIncreasePrice(product.id)}
                className="bg-amber-800 px-4 text-white rounded hover:bg-blue-300 transition-colors"
              >
                Increase Price
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-amber-500 py-2 px-4 text-white rounded hover:bg-red-300 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
