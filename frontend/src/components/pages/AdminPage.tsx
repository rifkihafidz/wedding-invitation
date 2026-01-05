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
    return fetch(`${adminApiUrl}${endpoint}`, {
      ...options,
      headers: { ...options.headers, 'x-admin-key': adminKey },
    });
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
    } catch {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboard = async () => {
    try {
      const res = await fetchWithAuth('/dashboard');
      const data = await res.json();
      setDashboard(data.data);
    } catch (e) { console.error(e); }
  };

  const fetchGuests = async (status?: string) => {
    try {
      const endpoint = status && status !== 'all' ? `/guests/${status}` : '/guests';
      const res = await fetchWithAuth(endpoint);
      const data = await res.json();
      setGuests(data.data || []);
    } catch (e) { console.error(e); }
  };

  const handleFilter = (status: typeof filterStatus) => {
    setFilterStatus(status);
    fetchGuests(status);
  };

  const handleExport = async () => {
    try {
      const res = await fetchWithAuth('/export/csv');
      const text = await res.text();
      const blob = new Blob([text], { type: 'text/csv' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'rsvp.csv';
      a.click();
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus "${name}"?`)) return;
    await fetchWithAuth(`/guests/${id}`, { method: 'DELETE' });
    fetchGuests(filterStatus);
    fetchDashboard();
  };

  const handleDeleteAll = async () => {
    if (!confirm('Hapus SEMUA tamu?')) return;
    if (!confirm('Yakin? Tidak bisa dibatalkan!')) return;
    await fetchWithAuth('/guests-all/delete', { method: 'DELETE' });
    fetchGuests();
    fetchDashboard();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminKey('');
    localStorage.removeItem('adminKey');
  };

  useEffect(() => {
    const key = localStorage.getItem('adminKey');
    if (key) { setAdminKey(key); setIsAuthenticated(true); }
  }, []);

  useEffect(() => {
    if (isAuthenticated) { fetchDashboard(); fetchGuests(); }
  }, [isAuthenticated]);

  const StatusBadge = ({ status }: { status: string }) => {
    const config: Record<string, { bg: string; text: string; label: string }> = {
      confirmed: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Hadir' },
      declined: { bg: 'bg-rose-500/20', text: 'text-rose-400', label: 'Tidak' },
      pending: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Pending' },
    };
    const c = config[status] || config.pending;
    return <span className={`${c.bg} ${c.text} px-2 py-0.5 rounded text-[10px] font-medium`}>{c.label}</span>;
  };

  // Login
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-[#1a1714] overflow-auto">
        <div className="min-h-full flex items-center justify-center p-6">
          <div className="w-full max-w-sm">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8 text-amber-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h1 className="text-xl text-amber-50 font-light">Admin Dashboard</h1>
              <p className="text-xs text-amber-100/40 mt-1">Masukkan kunci admin</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Admin Key"
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-amber-50 placeholder-amber-100/30 focus:outline-none focus:border-amber-400/50"
              />
              {error && <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm">{error}</div>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-amber-950 rounded-xl font-medium disabled:opacity-50 transition-colors"
              >
                {loading ? '...' : 'Masuk'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="fixed inset-0 bg-[#1a1714] flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 h-14 px-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-amber-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
            </svg>
          </div>
          <span className="text-amber-50 font-light">Admin</span>
        </div>
        <button onClick={handleLogout} className="text-xs text-rose-400 hover:text-rose-300">Logout</button>
      </header>

      {/* Tabs */}
      <nav className="flex-shrink-0 h-12 px-4 flex items-center gap-1 border-b border-white/5">
        {(['dashboard', 'guests', 'export'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${activeTab === tab ? 'bg-amber-500/20 text-amber-400' : 'text-amber-100/40 hover:text-amber-100/60'
              }`}
          >
            {tab === 'dashboard' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>}
            {tab === 'guests' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>}
            {tab === 'export' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>}
            {tab === 'dashboard' ? 'Stats' : tab === 'guests' ? 'Tamu' : 'Export'}
          </button>
        ))}
      </nav>

      {/* Content - Scrollable */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 max-w-4xl mx-auto">
          {/* Dashboard */}
          {activeTab === 'dashboard' && dashboard && (
            <div className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-[10px] text-amber-400/60 uppercase tracking-wide">Total</p>
                  <p className="text-3xl text-amber-50 font-light mt-1">{dashboard.stats.total}</p>
                </div>
                <div className="bg-emerald-500/10 rounded-xl p-4">
                  <p className="text-[10px] text-emerald-400/60 uppercase tracking-wide">Hadir</p>
                  <p className="text-3xl text-emerald-400 font-light mt-1">{dashboard.stats.confirmed}</p>
                </div>
                <div className="bg-rose-500/10 rounded-xl p-4">
                  <p className="text-[10px] text-rose-400/60 uppercase tracking-wide">Tidak Hadir</p>
                  <p className="text-3xl text-rose-400 font-light mt-1">{dashboard.stats.declined}</p>
                </div>
                <div className="bg-amber-500/10 rounded-xl p-4">
                  <p className="text-[10px] text-amber-400/60 uppercase tracking-wide">Pending</p>
                  <p className="text-3xl text-amber-400 font-light mt-1">{dashboard.stats.pending}</p>
                </div>
              </div>

              {/* Rate */}
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] text-amber-400/60 uppercase tracking-wide">Konfirmasi</p>
                  <p className="text-lg text-amber-50 font-light">{dashboard.stats.confirmationRate}%</p>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${dashboard.stats.confirmationRate}%` }} />
                </div>
              </div>

              {/* Recent */}
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-[10px] text-amber-400/60 uppercase tracking-wide mb-3">Terbaru</p>
                <div className="space-y-2">
                  {dashboard.recentResponses.map((g) => (
                    <div key={g._id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <div>
                        <p className="text-sm text-amber-50">{g.name}</p>
                        <p className="text-[10px] text-amber-100/30">{new Date(g.respondedAt).toLocaleDateString('id-ID')}</p>
                      </div>
                      <StatusBadge status={g.rsvpStatus} />
                    </div>
                  ))}
                  {!dashboard.recentResponses.length && <p className="text-xs text-amber-100/30 text-center py-2">Kosong</p>}
                </div>
              </div>
            </div>
          )}

          {/* Guests */}
          {activeTab === 'guests' && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-wrap gap-2">
                {(['all', 'confirmed', 'declined'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => handleFilter(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filterStatus === s
                      ? s === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400' :
                        s === 'declined' ? 'bg-rose-500/20 text-rose-400' :
                          'bg-amber-500/20 text-amber-400'
                      : 'bg-white/5 text-amber-100/40'
                      }`}
                  >
                    {s === 'all' ? `Semua (${guests.length})` : s === 'confirmed' ? 'Hadir' : 'Tidak'}
                  </button>
                ))}
                <button onClick={handleDeleteAll} className="px-3 py-1.5 rounded-lg text-xs text-rose-400 bg-rose-500/10 ml-auto">
                  Hapus Semua
                </button>
              </div>

              {/* List */}
              <div className="space-y-2">
                {guests.map((g) => (
                  <div key={g._id} className="bg-white/5 rounded-xl p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-amber-50 truncate">{g.name}</p>
                        <p className="text-[10px] text-amber-100/30">{g.phone || '-'}</p>
                      </div>
                      <StatusBadge status={g.rsvpStatus} />
                    </div>
                    {g.message && <p className="text-xs text-amber-100/50 mt-2 line-clamp-2">"{g.message}"</p>}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                      <p className="text-[10px] text-amber-100/20">{g.respondedAt ? new Date(g.respondedAt).toLocaleDateString('id-ID') : '-'}</p>
                      <button onClick={() => handleDelete(g._id, g.name)} className="text-[10px] text-rose-400">Hapus</button>
                    </div>
                  </div>
                ))}
                {!guests.length && <div className="bg-white/5 rounded-xl p-8 text-center text-amber-100/30 text-sm">Tidak ada data</div>}
              </div>
            </div>
          )}

          {/* Export */}
          {activeTab === 'export' && (
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7 text-amber-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </div>
              <h2 className="text-lg text-amber-50 font-light mb-1">Export Data</h2>
              <p className="text-xs text-amber-100/40 mb-6">Download data RSVP dalam format CSV</p>
              <button onClick={handleExport} className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-amber-950 rounded-xl font-medium transition-colors">
                Download CSV
              </button>
              <div className="mt-6 p-3 bg-white/5 rounded-lg text-left">
                <p className="text-[10px] text-amber-400/60 uppercase tracking-wide mb-1">Termasuk:</p>
                <p className="text-xs text-amber-100/40">Nama, Telepon, Status, Pesan, Tanggal</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
