import React from "react";

export default function Profile() {
  const user = {
    name: "John Doe",
    loyaltyScore: 1200,
    ordersCount: 15,
    rfm: { recency: 10, frequency: 15, monetary: 750 }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>Name: {user.name}</p>
      <p>Loyalty Score: {user.loyaltyScore}</p>
      <p>Orders Count: {user.ordersCount}</p>
      <p>RFM: Recency {user.rfm.recency}, Frequency {user.rfm.frequency}, Monetary ${user.rfm.monetary}</p>
    </div>
  );
}
