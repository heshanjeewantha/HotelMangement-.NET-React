import { Link } from 'react-router-dom';

function Sidebar({ userRole }) {
  const sidebarStyle = {
    width: '100%',
    maxWidth: '250px',
    backgroundColor: '#f3f4f6',
    padding: '16px',
    boxSizing: 'border-box',
    height: '100vh',
  };

  const headingStyle = {
    fontSize: '1.125rem',
    fontWeight: 'bold',
    marginBottom: '16px',
  };

  const linkStyle = {
    display: 'block',
    padding: '8px 0',
    textDecoration: 'none',
    color: '#333',
    transition: 'background-color 0.2s',
  };

  const linkHoverStyle = {
    backgroundColor: '#e5e7eb',
  };

  const responsiveStyle = {
    '@media (max-width: 768px)': {
      width: '100%',
      maxWidth: '100%',
      height: 'auto',
    },
  };

  const links = [
    { to: '/admin-dashboard', text: 'Dashboard', roles: ['Admin', 'User'] },
    { to: '/admin-dashboard#rooms', text: 'Manage Rooms', roles: ['Admin'] },
    { to: '/admin-dashboard#bookings', text: 'View Bookings', roles: ['Admin'] },
    { to: '/admin-dashboard#users', text: 'Manage Users', roles: ['Admin'] },
    { to: '/user-dashboard', text: 'Rooms', roles: ['User'] },
    { to: '/user-dashboard#book-room', text: 'Book Room', roles: ['User'] },
    { to: '/user-dashboard#my-bookings', text: 'My Bookings', roles: ['User'] },
  ];

  return (
    <aside style={{ ...sidebarStyle, ...responsiveStyle }}>
      <h2 style={headingStyle}>{userRole} Menu</h2>
      <ul>
        {links
          .filter((link) => link.roles.includes(userRole))
          .map((link, index) => (
            <li key={index}>
              <Link
                to={link.to}
                style={linkStyle}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#e5e7eb')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '')}
              >
                {link.text}
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
