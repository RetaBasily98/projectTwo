import Layout from "../components/Layout";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../components/ProductsContext";

export default function CheckoutPage() {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const [productsInfos, setProductsInfos] = useState([]);
  const [formDetails, setFormDetails] = useState({
    address: "",
    city: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    if (selectedProducts.length > 0) {
      const uniqueIds = [...new Set(selectedProducts)];
      fetch(`/api/products?ids=${uniqueIds.join(",")}`)
        .then((response) => response.json())
        .then((data) => setProductsInfos(data));
    }
  }, [selectedProducts]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [name]: value }));
  };

  const adjustProductQuantity = (id, action) => {
    setSelectedProducts((prev) => {
      if (action === "add") return [...prev, id];
      if (action === "remove") return prev.filter((_, index) => index !== prev.indexOf(id));
      return prev;
    });
  };

  const calculateSubtotal = () =>
    selectedProducts.reduce((total, id) => {
      const product = productsInfos.find((p) => p._id === id);
      return total + (product?.price || 0);
    }, 0);

  const deliveryPrice = 5;
  const subtotal = calculateSubtotal();
  const total = subtotal + deliveryPrice;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {productsInfos.length === 0 && (
        <div className="text-gray-500 text-center py-10">Your shopping cart is empty.</div>
      )}

      {productsInfos.length > 0 &&
        [...new Set(selectedProducts)].map((productId) => {
          const product = productsInfos.find((p) => p._id === productId);
          const quantity = selectedProducts.filter((id) => id === productId).length;

          if (!product) return null;

          return (
            <div className="flex items-center mb-6" key={product._id}>
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <img className="w-24 h-24 object-contain" src={product.picture} alt={product.name} />
              </div>
              <div className="ml-4 flex-grow">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.description}</p>
                <div className="flex items-center mt-2">
                  <span className="text-lg font-bold">${product.price}</span>
                  <div className="ml-auto flex items-center">
                    <button
                      onClick={() => adjustProductQuantity(product._id, "remove")}
                      className="border border-red-500 text-red-500 px-3 py-1 rounded-lg hover:bg-red-50"
                    >
                      -
                    </button>
                    <span className="px-4">{quantity}</span>
                    <button
                      onClick={() => adjustProductQuantity(product._id, "add")}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      <form action="/api/checkout" method="POST" className="mt-8">
        <div className="space-y-4">
          <input
            type="text"
            name="address"
            value={formDetails.address}
            onChange={handleFormChange}
            placeholder="Street Address"
            className="w-full bg-gray-100 rounded-lg px-4 py-2 border focus:border-green-500"
          />
          <input
            type="text"
            name="city"
            value={formDetails.city}
            onChange={handleFormChange}
            placeholder="City"
            className="w-full bg-gray-100 rounded-lg px-4 py-2 border focus:border-green-500"
          />
          <input
            type="text"
            name="name"
            value={formDetails.name}
            onChange={handleFormChange}
            placeholder="Your Name"
            className="w-full bg-gray-100 rounded-lg px-4 py-2 border focus:border-green-500"
          />
          <input
            type="email"
            name="email"
            value={formDetails.email}
            onChange={handleFormChange}
            placeholder="Email Address"
            className="w-full bg-gray-100 rounded-lg px-4 py-2 border focus:border-green-500"
          />
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Delivery:</span>
            <span className="font-bold">${deliveryPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg border-t pt-4">
            <span className="font-semibold">Total:</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
        </div>

        <input type="hidden" name="products" value={selectedProducts.join(",")} />
        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-3 rounded-lg mt-6 hover:bg-green-600 transition-shadow"
        >
          Pay ${total.toFixed(2)}
        </button>
      </form>
    </Layout>
  );
}
