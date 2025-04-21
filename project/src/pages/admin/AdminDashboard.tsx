import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
          <p className="text-gray-500">5 new orders today</p>
          <div className="mt-4">
            <a href="/admin/orders" className="text-blue-600 hover:underline">View all orders</a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <p className="text-gray-500">24 products in inventory</p>
          <div className="mt-4">
            <a href="/admin/products" className="text-blue-600 hover:underline">Manage products</a>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Revenue</h2>
          <p className="text-2xl font-bold">$2,458.30</p>
          <p className="text-green-500 text-sm">↑ 12% from last month</p>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <p className="font-medium">New order #1089</p>
            <p className="text-gray-500 text-sm">2 minutes ago</p>
          </div>
          <div className="border-b pb-4">
            <p className="font-medium">Product "Wireless Headphones" updated</p>
            <p className="text-gray-500 text-sm">45 minutes ago</p>
          </div>
          <div className="border-b pb-4">
            <p className="font-medium">New customer registered</p>
            <p className="text-gray-500 text-sm">1 hour ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;