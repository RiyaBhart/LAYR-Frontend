import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCustomerById } from "../api/api";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    const userId = localStorage.getItem('userId');
    
    if (loggedInUser && userId) {
      // Fetch user data from API
      fetchCustomerById(userId)
        .then(res => {
          const customerData = res.data;
          // Set user data with default values if not available
          setUser({
            name: `${customerData.first_name || ''} ${customerData.last_name || ''}`.trim() || 'User',
            email: customerData.email || '',
            loyaltyScore: customerData.loyalty_score || 0,
            ordersCount: 0, // Would need to fetch from orders
            rfm: {
              recency: customerData.rfm_recency || 0,
              frequency: customerData.rfm_frequency || 0,
              monetary: customerData.rfm_monetary || 0
            }
          });
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching user data:', err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const getLoyaltyTier = (score) => {
    if (score >= 2000) return { tier: "Platinum", color: "text-purple-600", bgColor: "bg-purple-100" };
    if (score >= 1000) return { tier: "Gold", color: "text-yellow-600", bgColor: "bg-yellow-100" };
    if (score >= 500) return { tier: "Silver", color: "text-gray-600", bgColor: "bg-gray-100" };
    return { tier: "Bronze", color: "text-orange-600", bgColor: "bg-orange-100" };
  };

  if (loading) {
    return (
      <div className="app-container py-8 md:py-12 min-h-[60vh]">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">My Profile</h1>

        {/* Profile Header Card Skeleton */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 mb-8 animate-pulse">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar Skeleton */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 flex-shrink-0"></div>

            {/* User Info Skeleton */}
            <div className="flex-1 w-full text-center sm:text-left">
              <div className="h-8 bg-gray-200 rounded w-48 mx-auto sm:mx-0 mb-3"></div>
              <div className="h-5 bg-gray-200 rounded w-64 mx-auto sm:mx-0 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-32 mx-auto sm:mx-0"></div>
            </div>
          </div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gray-200 rounded-lg w-12 h-12"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-32"></div>
            </div>
          ))}
        </div>

        {/* RFM Analysis Card Skeleton */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 mb-8 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border-l-4 border-gray-200 pl-4">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-40"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Skeleton */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className="w-6 h-6 bg-gray-200 rounded mr-3"></div>
                <div className="h-5 bg-gray-200 rounded w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="app-container py-8 md:py-12 min-h-[60vh]">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">My Profile</h1>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 md:p-12 text-center">
          <svg
            className="mx-auto h-24 w-24 text-gray-300 mb-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Please Log In</h2>
          <p className="text-gray-600 mb-8">You need to be logged in to view your profile.</p>
          <button
            onClick={() => navigate('/login')}
            className="btn-soft px-6 py-3 text-base"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const loyaltyTier = getLoyaltyTier(user.loyaltyScore);

  return (
    <div className="app-container py-8 md:py-12 min-h-[60vh]">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">My Profile</h1>

      {/* Profile Header Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl md:text-4xl font-bold flex-shrink-0">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{user.name}</h2>
            <p className="text-gray-600 mb-4">{user.email}</p>
            <div className={`inline-flex items-center px-4 py-2 rounded-full ${loyaltyTier.bgColor} ${loyaltyTier.color} font-semibold`}>
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {loyaltyTier.tier} Member
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Loyalty Score Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Loyalty Score</h3>
          <p className="text-2xl font-bold text-gray-900">{user.loyaltyScore.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">Points accumulated</p>
        </div>

        {/* Orders Count Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-900">{user.ordersCount}</p>
          <p className="text-xs text-gray-500 mt-2">Orders placed</p>
        </div>

        {/* RFM Recency Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Recency</h3>
          <p className="text-2xl font-bold text-gray-900">{user.rfm.recency}</p>
          <p className="text-xs text-gray-500 mt-2">Days since last order</p>
        </div>

        {/* RFM Frequency Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">Frequency</h3>
          <p className="text-2xl font-bold text-gray-900">{user.rfm.frequency}</p>
          <p className="text-xs text-gray-500 mt-2">Order frequency score</p>
        </div>
      </div>

      {/* RFM Analysis Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">RFM Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Recency</h4>
            <p className="text-3xl font-bold text-gray-900 mb-1">{user.rfm.recency}</p>
            <p className="text-xs text-gray-500">Days since last purchase</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Frequency</h4>
            <p className="text-3xl font-bold text-gray-900 mb-1">{user.rfm.frequency}</p>
            <p className="text-xs text-gray-500">Total number of purchases</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Monetary</h4>
            <p className="text-3xl font-bold text-gray-900 mb-1">${user.rfm.monetary}</p>
            <p className="text-xs text-gray-500">Total money spent</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 md:p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/orders')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors text-left"
          >
            <svg className="w-6 h-6 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="font-medium text-gray-900">View Orders</span>
          </button>
          <button
            onClick={() => navigate('/wishlist')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors text-left"
          >
            <svg className="w-6 h-6 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="font-medium text-gray-900">My Wishlist</span>
          </button>
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors text-left"
          >
            <svg className="w-6 h-6 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="font-medium text-gray-900">Shopping Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
