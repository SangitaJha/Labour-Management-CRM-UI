// Auth Protection & Utilities
// Determine API base URL with optional override for static hosting (e.g., GitHub Pages)
const API_URL = (typeof window !== 'undefined' && window.API_BASE_URL)
  ? window.API_BASE_URL.replace(/\/$/, '')
  : ((typeof window !== 'undefined' && window.location && window.location.origin)
      ? `${window.location.origin}/api`
      : 'http://localhost:3000/api');

/**
 * Check if user is authenticated
 */
function isAuthenticated() {
  return !!localStorage.getItem('token');
}

/**
 * Get current user info
 */
function getCurrentUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

/**
 * Get auth token
 */
function getToken() {
  return localStorage.getItem('token');
}

/**
 * Make authenticated API request
 */
async function apiRequest(endpoint, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });

    // If 401, token expired - redirect to login
    if (response.status === 401) {
      logout();
      return null;
    }

    const data = await response.json();
    return response.ok ? data : { error: data.error, status: response.status };
  } catch (error) {
    console.error('API request error:', error);
    return { error: error.message };
  }
}

/**
 * Protect pages - redirect to login if not authenticated
 * DISABLED: Allow anyone to access (development mode)
 */
function protectPage() {
  // Allow access without authentication
  initializeUserMenu();
}

/**
 * Initialize user menu with current user info
 */
function initializeUserMenu() {
  const user = getCurrentUser();
  if (user && document.getElementById('userNameDisplay')) {
    document.getElementById('userNameDisplay').textContent = user.name || user.email;
    const roleDisplay = document.getElementById('userRoleDisplay');
    if (roleDisplay) {
      const roleMap = {
        'admin': '👨‍💼 Admin',
        'manager': '👷 Manager',
        'supervisor': '⚙️ Supervisor',
        'accounts': '💰 Accounts'
      };
      roleDisplay.textContent = roleMap[user.role] || user.role;
    }
  }
}

/**
 * Toggle user dropdown menu
 */
function toggleUserMenu() {
  const dropdown = document.getElementById('userDropdown');
  if (dropdown) {
    dropdown.classList.toggle('show');
  }
}

/**
 * Close dropdown when clicking outside
 */
document.addEventListener('click', function(event) {
  const userMenu = document.querySelector('.user-profile-menu');
  const dropdown = document.getElementById('userDropdown');
  
  if (userMenu && dropdown && !userMenu.contains(event.target)) {
    dropdown.classList.remove('show');
  }
});

/**
 * Logout user
 */
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/dashboard.html';
}

/**
 * Go to user profile page
 */
function goToProfile() {
  window.location.href = '/profile.html';
}

/**
 * Go to settings page
 */
function goToSettings() {
  window.location.href = '/settings.html';
}

/**
 * Check role-based access
 */
function hasRole(...roles) {
  const user = getCurrentUser();
  return user && roles.includes(user.role);
}

/**
 * Show role-based UI elements
 */
function showForRoles(...roles) {
  document.querySelectorAll('[data-require-role]').forEach(el => {
    const requiredRoles = el.getAttribute('data-require-role').split(',');
    const userRole = getCurrentUser()?.role;
    el.style.display = requiredRoles.includes(userRole) ? '' : 'none';
  });
}

// Protect page on load
window.addEventListener('load', () => {
  // Don't protect login page
  if (!window.location.pathname.includes('/login.html')) {
    protectPage();
    showForRoles();
  }
});
