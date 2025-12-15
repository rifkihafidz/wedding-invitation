import { useState, useEffect } from 'react';

interface GuestStats {
  total: number;
  confirmed: number;
  declined: number;
  pending: number;
  confirmationRate: string;
}

interface Guest {
  _id: string;
  name: string;
  phone?: string;
  rsvpStatus: 'pending' | 'confirmed' | 'declined';
  message?: string;
  respondedAt?: string;
  createdAt?: string;
}

interface DashboardData {
  stats: GuestStats;
  recentResponses: Array<{
    _id: string;
    name: string;
    rsvpStatus: string;
    respondedAt: string;
  }>;
}

export const AdminPage = () => {
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'declined' | 'pending'>('all');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'guests' | 'export'>('dashboard');

  const adminApiUrl = 'http://localhost:3000/api/admin';

  const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${adminApiUrl}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        'x-admin-key': adminKey,
      },
    });
    return response;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetchWithAuth('/dashboard');

      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('adminKey', adminKey);
      } else {
        const data = await response.json();
        setError(data.message || 'Invalid admin key');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboard = async () => {
    try {
      const response = await fetchWithAuth('/dashboard');
      const data = await response.json();
      setDashboard(data.data);
    } catch (err) {
      console.error('Failed to fetch dashboard', err);
    }
  };

  const fetchAllGuests = async () => {
    try {
      const response = await fetchWithAuth('/guests');
      const data = await response.json();
      setGuests(data.data);
    } catch (err) {
      console.error('Failed to fetch guests', err);
    }
  };

  const fetchGuestsByStatus = async (status: string) => {
    try {
      const response = await fetchWithAuth(`/guests/${status}`);
      const data = await response.json();
      setGuests(data.data);
    } catch (err) {
      console.error('Failed to fetch guests', err);
    }
  };

  const handleStatusFilter = (status: 'all' | 'confirmed' | 'declined' | 'pending') => {
    setFilterStatus(status);
    if (status === 'all') {
      fetchAllGuests();
    } else {
      fetchGuestsByStatus(status);
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await fetchWithAuth('/export/csv');
      const csvText = await response.text();

      // Create blob and download
      const blob = new Blob([csvText], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'rsvp-responses.csv';
      a.click();
    } catch (err) {
      console.error('Failed to export CSV', err);
    }
  };

  const handleDeleteGuest = async (guestId: string, guestName: string) => {
    if (confirm(`Delete guest "${guestName}" entirely?`)) {
      try {
        await fetchWithAuth(`/guests/${guestId}`, { method: 'DELETE' });
        // Refresh guest list
        if (filterStatus === 'all') {
          fetchAllGuests();
        } else {
          fetchGuestsByStatus(filterStatus);
        }
        fetchDashboard();
      } catch (err) {
        console.error('Failed to delete guest', err);
      }
    }
  };

  const handleDeleteAllGuests = async () => {
    if (confirm('Are you SURE? This will delete ALL guests permanently!')) {
      if (confirm('This action CANNOT be undone. Delete all guests?')) {
        try {
          await fetchWithAuth('/guests-all/delete', { method: 'DELETE' });
          // Refresh all data
          fetchAllGuests();
          fetchDashboard();
        } catch (err) {
          console.error('Failed to delete all guests', err);
        }
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminKey('');
    localStorage.removeItem('adminKey');
    setDashboard(null);
    setGuests([]);
  };

  useEffect(() => {
    const savedKey = localStorage.getItem('adminKey');
    if (savedKey) {
      setAdminKey(savedKey);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboard();
      fetchAllGuests();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2 text-pink-600">Admin Dashboard</h1>
          <p className="text-center text-gray-600 mb-8">Masukkan kunci admin untuk akses</p>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Admin Key"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 disabled:opacity-50 transition"
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-indigo-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-300">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'dashboard'
                ? 'text-pink-600 border-b-2 border-pink-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveTab('guests')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'guests'
                ? 'text-pink-600 border-b-2 border-pink-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            👥 Guests
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`px-6 py-3 font-semibold transition ${
              activeTab === 'export'
                ? 'text-pink-600 border-b-2 border-pink-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📥 Export
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && dashboard && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm font-semibold mb-2">Total Undangan</p>
                <p className="text-4xl font-bold text-gray-800">{dashboard.stats.total}</p>
              </div>
              <div className="bg-green-100 rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm font-semibold mb-2">Confirmed</p>
                <p className="text-4xl font-bold text-green-600">{dashboard.stats.confirmed}</p>
              </div>
              <div className="bg-red-100 rounded-lg shadow p-6">
                <p className="text-gray-600 text-sm font-semibold mb-2">Declined</p>
                <p className="text-4xl font-bold text-red-600">{dashboard.stats.declined}</p>
              </div>
            </div>

            {/* Confirmation Rate */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <p className="text-gray-600 font-semibold mb-4">Confirmation Rate</p>
              <div className="w-full bg-gray-200 rounded-full h-8">
                <div
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-8 rounded-full flex items-center justify-center text-white font-bold transition-all duration-500"
                  style={{ width: `${parseFloat(dashboard.stats.confirmationRate)}%` }}
                >
                  {dashboard.stats.confirmationRate}%
                </div>
              </div>
            </div>

            {/* Recent Responses */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Recent Responses</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Responded</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.recentResponses.map((guest) => (
                      <tr key={guest._id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-800">{guest.name}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              guest.rsvpStatus === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : guest.rsvpStatus === 'declined'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {guest.rsvpStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-xs">
                          {new Date(guest.respondedAt).toLocaleDateString('id-ID')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Guests Tab */}
        {activeTab === 'guests' && (
          <div>
            {/* Filter Buttons */}
            <div className="flex gap-2 mb-6 flex-wrap justify-between items-center">
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => handleStatusFilter('all')}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    filterStatus === 'all'
                      ? 'bg-pink-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  All ({guests.length})
                </button>
                <button
                  onClick={() => handleStatusFilter('confirmed')}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    filterStatus === 'confirmed'
                      ? 'bg-green-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Confirmed ({guests.filter(g => g.rsvpStatus === 'confirmed').length})
                </button>
                <button
                  onClick={() => handleStatusFilter('declined')}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    filterStatus === 'declined'
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Declined ({guests.filter(g => g.rsvpStatus === 'declined').length})
                </button>
              </div>
              <button
                onClick={handleDeleteAllGuests}
                className="px-4 py-2 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 transition"
              >
                🗑️ Delete All
              </button>
            </div>

            {/* Guests Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b border-gray-300">
                    <tr>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Message</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Responded</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guests.map((guest) => (
                      <tr key={guest._id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 font-semibold text-gray-800">{guest.name}</td>
                        <td className="py-3 px-4 text-gray-600">{guest.phone || '-'}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              guest.rsvpStatus === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : guest.rsvpStatus === 'declined'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {guest.rsvpStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-xs max-w-xs truncate">{guest.message || '-'}</td>
                        <td className="py-3 px-4 text-gray-600 text-xs">
                          {guest.respondedAt ? new Date(guest.respondedAt).toLocaleDateString('id-ID') : '-'}
                        </td>
                        <td className="py-3 px-4 text-xs">
                          <button
                            onClick={() => handleDeleteGuest(guest._id, guest.name)}
                            className="text-red-600 hover:text-red-800 font-semibold transition"
                            title="Delete guest"
                          >
                            ❌ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Export Tab */}
        {activeTab === 'export' && (
          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Export Data</h3>
            <p className="text-gray-600 mb-6">Export semua RSVP responses ke format CSV untuk data analysis</p>

            <button
              onClick={handleExportCSV}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
            >
              📥 Download as CSV
            </button>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>File mencakup:</strong> Name, Phone, RSVP Status, Message, Responded At
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
