const API_BASE = 'http://localhost/event_ticketing_api';

const getToken = () => localStorage.getItem('token');
const getUser  = () => JSON.parse(localStorage.getItem('user') || 'null');

async function apiRequest(endpoint, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.message || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

const api = {
  get:    (e)    => apiRequest(e),
  post:   (e,b)  => apiRequest(e, { method: 'POST',   body: JSON.stringify(b) }),
  put:    (e,b)  => apiRequest(e, { method: 'PUT',    body: JSON.stringify(b) }),
  delete: (e)    => apiRequest(e, { method: 'DELETE' }),

  login:  (email, password) => api.post('/auth/login.php', { email, password }),
  logout: () => api.post('/auth/logout.php', {}),

  getUsers:    ()       => api.get('/api/users/'),
  getUser:     (id)     => api.get(`/api/users/?id=${id}`),
  createUser:  (d)      => api.post('/api/users/index.php', d),
  updateUser:  (id, d)  => api.put(`/api/users/index.php?id=${id}`, d),
  deleteUser:  (id)     => api.delete(`/api/users/index.php?id=${id}`),

  getEvents:   (q='')   => api.get(`/api/events/${q}`),
  getEvent:    (id)     => api.get(`/api/events/?id=${id}`),
  createEvent: (d)      => api.post('/api/events/index.php', d),
  updateEvent: (id, d)  => api.put(`/api/events/index.php?id=${id}`, d),
  deleteEvent: (id)     => api.delete(`/api/events/index.php?id=${id}`),

  getVenues:   ()       => api.get('/api/venues/'),
  createVenue: (d)      => api.post('/api/venues/index.php', d),
  updateVenue: (id, d)  => api.put(`/api/venues/index.php?id=${id}`, d),
  deleteVenue: (id)     => api.delete(`/api/venues/index.php?id=${id}`),

  getBookings:  (q='')  => api.get(`/api/bookings/${q}`),
  createBooking:(d)     => api.post('/api/bookings/index.php', d),
  updateBooking:(id,d)  => api.put(`/api/bookings/index.php?id=${id}`, d),
  deleteBooking:(id)    => api.delete(`/api/bookings/index.php?id=${id}`),

  getWeather:  (eventId) => api.get(`/api/weather/?event_id=${eventId}`),
};

async function login(email, password) {
  const data = await api.login(email, password);
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
}

async function logout() {
  try { await api.logout(); } catch (e) { }
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

function requireAuth() {
  if (!getToken()) { window.location.href = 'index.html'; return false; }
  return true;
}

function requireRole(...roles) {
  const u = getUser();
  if (!u || !roles.includes(u.role)) {
    alert('Access denied. You do not have permission to view this page.');
    window.location.href = 'dashboard.html';
    return false;
  }
  return true;
}

function renderSidebar(activePage) {
  const user = getUser();
  const links = [
    { href: 'dashboard.html', icon: '📊', label: 'Dashboard', page: 'dashboard', roles: ['admin','staff','customer'] },
    { href: 'events.html',    icon: '📅', label: 'Events',    page: 'events',    roles: ['admin','staff','customer'] },
    { href: 'venues.html',    icon: '🏛️', label: 'Venues',    page: 'venues',    roles: ['admin'] },
    { href: 'bookings.html',  icon: '🎟️', label: 'Bookings',  page: 'bookings',  roles: ['admin','staff','customer'] },
    { href: 'users.html',     icon: '👥', label: 'Users',     page: 'users',     roles: ['admin'] },
  ];
  const role = user?.role || 'guest';

  return `
    <aside class="sidebar">
      <div class="brand">🎫 Event Ticketing Portal</div>
      <nav>
        ${links.filter(l => l.roles.includes(role)).map(l =>
          `<a href="${l.href}" class="${activePage === l.page ? 'active' : ''}">${l.icon} ${l.label}</a>`
        ).join('')}
      </nav>
      <div class="user-box">
        <div class="user-name">${user?.name || 'Guest'}</div>
        <div class="user-role">${role}</div>
      </div>
      <button onclick="logout()" class="logout-btn">Logout</button>
    </aside>
  `;
}