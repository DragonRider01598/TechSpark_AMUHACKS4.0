import React from 'react';

const TableView = ({ products, vendorId, marketId }) => {
  return (
    <div className="w-full max-w-4xl bg-white/40 backdrop-blur-md rounded-lg shadow-lg p-6 relative">
      <h2 className="text-2xl font-semibold text-yellow-900 mb-4 text-center">Inventory Table</h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-yellow-500 text-white">
            <th className="p-2 border border-gray-300">Product</th>
            <th className="p-2 border border-gray-300">Price</th>
            <th className="p-2 border border-gray-300">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((product) => product.vendorId === vendorId && product.marketId === marketId)
            .map((product) => (
              <tr key={product._id} className="text-yellow-900">
                <td className="p-2 border border-gray-300">{product.name}</td>
                <td className="p-2 border border-gray-300">₹{product.price} / {product.unit}</td>
                <td className={`p-2 border border-gray-300 font-semibold 
                  ${product.stock === "in stock" ? "text-green-600" :
                    product.stock === "low stock" ? "text-yellow-500" :
                    "text-red-600"}`}
                >
                  {product.stock.charAt(0).toUpperCase() + product.stock.slice(1)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;