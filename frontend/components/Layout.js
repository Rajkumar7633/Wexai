import Link from 'next/link';

export default function Layout({ children, title }) {
  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    }}>
      <nav style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: 700,
              color: '#1e293b'
            }}>
              Wexa Graph Explorer
            </h1>
          </Link>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="/skill" style={{
              textDecoration: 'none',
              color: '#64748b',
              fontWeight: 500,
              transition: 'color 0.2s'
            }}>
              Search by Skill
            </Link>
            <Link href="/company" style={{
              textDecoration: 'none',
              color: '#64748b',
              fontWeight: 500,
              transition: 'color 0.2s'
            }}>
              Company Network
            </Link>
            <Link href="/path" style={{
              textDecoration: 'none',
              color: '#64748b',
              fontWeight: 500,
              transition: 'color 0.2s'
            }}>
              Find Path
            </Link>
          </div>
        </div>
      </nav>

      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '32px 24px'
      }}>
        {title && (
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              margin: 0,
              fontSize: '32px',
              fontWeight: 700,
              color: '#1e293b'
            }}>
              {title}
            </h2>
          </div>
        )}
        {children}
      </main>

      <footer style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        padding: '24px',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '14px'
      }}>
        <p style={{ margin: 0 }}>
          Powered by CognoDB Graph Database
        </p>
      </footer>
    </div>
  );
}
