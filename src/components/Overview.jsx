// Overview.jsx

import React from 'react';
import { CgProfile } from 'react-icons/cg';
import './Overview.css';

const Overview = () => (
  <div className="space-y-6 animate-fadeIn">
  <nav className="text-black py-6 px-6 flex items-center justify-end">
    {/* Profile logo in top-right corner */}
    <div className="relative">
      <CgProfile className="w-12 h-12 rounded-full border border-gray-300 shadow-lg" />
    </div>
  </nav>
  <div className="space-y animate-fadeIn">
    <h2 className="text-4xl font-bold text-center mb-9 text-gray-800">📊 Dashboard Overview</h2>
    <div className="grid grid-cols-3 gap-4">
      <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold">Total Orders</h3>
        <p className="text-4xl font-bold text-blue-600 ">150</p>
      </div>
      <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold">Delivery Orders</h3>
        <p className="text-4xl font-bold text-green-600">30</p>
      </div>
      <div className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold">Available Tables</h3>
        <p className="text-4xl font-bold text-red-600">15</p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-6 mt-6 items-stretch h-full">
      <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 flex flex-col justify-between">
        <h3 className="text-lg font-semibold">Popular Menu Items</h3>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <span>Pizza</span>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm">🔥 50 orders</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Burger</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-sm">⭐ 40 orders</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Pasta</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">👍 30 orders</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Salad</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">🥗 25 orders</span>
          </li>
          <li className="flex justify-between items-center">
            <span>Sushi</span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-sm">🍣 20 orders</span>
          </li>
        </ul>
      </div>

      <div className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 flex flex-col justify-between">
        <h3 className="text-lg font-semibold">Monthly Sales Overview</h3>
        <div className="space-y-2">
          <p className="text-4xl font-bold text-blue-600 ">$25,000</p>
          <p className="text-sm text-gray-600">Compared to last month: <span className="text-green-600">+15%</span></p>
          <p className="text-xs text-gray-500">Peak Sales Day: Saturday</p>
          <p className="text-xs text-gray-500">Lowest Sales Day: Monday</p>
        </div>
        <ul className="space-y-2">
          <li className="flex justify-between items-center">
            <span>January</span>
            <span className="text-blue-600 font-bold">$20,000</span>
          </li>
          <li className="flex justify-between items-center">
            <span>February</span>
            <span className="text-blue-600 font-bold">$25,000</span>
          </li>
          <li className="flex justify-between items-center">
            <span>March</span>
            <span className="text-blue-600 font-bold">$30,000</span>
          </li>
        </ul>
      </div>
    </div>



  </div>
</div>
);

export default Overview;
