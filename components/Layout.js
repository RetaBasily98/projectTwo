import Footer from "./Footer";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "./ProductsContext";

export default function Layout({ children }) {
  const { setSelectedProducts } = useContext(ProductsContext);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (window.location.href.includes("success")) {
      setSelectedProducts([]);
      setSuccess(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo and Website Name */}
          <div className="flex items-center">
            <img
              src="/logo.png" // Replace with your logo file path
              alt="Rubiet & Co. Logo"
              className="h-12 w-12 mr-4 rounded-full"
            />
            <h1 className="text-3xl font-extrabold tracking-wide">Rubiet & Co.</h1>
          </div>

          {/* Developer Names */}
          <div className="text-sm text-right">
            <p>Developed by: <strong>Rubiya Bushra</strong> & <strong>Meriet Basily</strong></p>
          </div>
        </div>
      </header>

      {/* Welcome Message */}
      <section className="bg-teal-100 text-teal-800 py-4">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl font-semibold">
            Welcome to <strong>Rubiet's Bazaar</strong>! Discover a modern marketplace brought to life by Rubiya and Meriet.
          </h2>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {success && (
          <div className="mb-6 bg-green-500 text-white text-lg p-4 rounded-lg shadow-md">
            🎉 <strong>Thank you for your order!</strong> We hope you enjoy your purchase.
          </div>
        )}
        <div className="bg-white p-6 rounded-lg shadow-md">{children}</div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
