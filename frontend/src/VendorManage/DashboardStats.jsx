import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const DashboardStats = ({ vendorData }) => {
  return (
    <div className="p-6 bg-white/40 backdrop-blur-md min-h-screen rounded-lg shadow-lg w-1/2">
      <h1 className="text-3xl font-bold text-yellow-900 text-center mb-4">Vendor Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-white/30 backdrop-blur-md rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-yellow-900">Months with Us</h2>
          <p className="text-2xl font-bold text-gray-800">{vendorData.monthsWithUs} months</p>
        </div>
        <div className="p-4 bg-white/30 backdrop-blur-md rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-yellow-900">Total Markets Sold</h2>
          <p className="text-2xl font-bold text-gray-800">{vendorData.totalMarketsSold}</p>
        </div>
      </div>

      <div className="mt-6 bg-white/30 backdrop-blur-md p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-yellow-900 mb-2">Recent Products Added</h2>
        <ul>
          {vendorData.recentProducts.map((item, index) => (
            <li key={index} className="border-b border-gray-300 py-2 text-gray-800">
              {item.name} - <span className="text-gray-500">{item.addedOn}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 bg-white/30 backdrop-blur-md p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-yellow-900 mb-2">Top Selling Products</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={vendorData.topSellingProducts}>
            <XAxis dataKey="name" stroke="#333" />
            <YAxis stroke="#333" />
            <Tooltip />
            <Bar dataKey="sales" fill="#DAA520" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 bg-white/30 backdrop-blur-md p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-yellow-900">Customer Engagement</h2>
        <p className="text-2xl font-bold text-gray-800">{vendorData.customerEngagement} interactions</p>
      </div>
    </div>
  );
};

export default DashboardStats;