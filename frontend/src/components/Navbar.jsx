export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>🌱</span>
          <span style={styles.logoText}>Sylithe</span>
        </div>
        <div style={styles.nav}>
          <a href="#" style={{...styles.navLink, ...styles.navLinkActive}}>Dashboard</a>
          <a href="#" style={styles.navLink}>Analytics</a>
          <a href="#" style={styles.navLink}>Reports</a>
        </div>
      </div>
      <div style={styles.right}>
        <button style={styles.iconBtn}>🔔</button>
        <button style={styles.iconBtn}>⚙️</button>
        <div style={styles.avatar}>👤</div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    height: '64px',
    background: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '48px'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '700',
    fontSize: '20px'
  },
  logoIcon: {
    fontSize: '24px'
  },
  logoText: {
    background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  nav: {
    display: 'flex',
    gap: '8px'
  },
  navLink: {
    padding: '8px 16px',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#64748b',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s',
    cursor: 'pointer'
  },
  navLinkActive: {
    background: 'rgba(132,204,22,0.1)',
    color: '#84cc16',
    fontWeight: '600'
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  iconBtn: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    cursor: 'pointer'
  }
};
