import React, { useState } from "react";
import AdminCard from "../components/AdminCard";
import ChartCard from "../components/ChartCard";

export default function AdminDashboard() {
  const [stats] = useState({
    dailySales: "$1,500",
    monthlySales: "$45,000",
    inventoryAlerts: 5,
    trendingProducts: ["T-Shirt", "Sneakers", "Jeans"],
    loyalCustomers: ["C101", "C102", "C103"]
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <AdminCard title="Daily Sales" value={stats.dailySales} />
        <AdminCard title="Monthly Sales" value={stats.monthlySales} />
        <ChartCard title="Trending Products" chart={<ul>{stats.trendingProducts.map(p => <li key={p}>{p}</li>)}</ul>} />
        <AdminCard title="Inventory Alerts" value={stats.inventoryAlerts} />
        <ChartCard title="Loyal Customers" chart={<ul>{stats.loyalCustomers.map(c => <li key={c}>{c}</li>)}</ul>} />
      </div>
    </div>
  );
}
