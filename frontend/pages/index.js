import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout title="Welcome">
      <div style={{
        marginBottom: '32px',
        padding: '24px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
      }}>
        <p style={{
          margin: 0,
          fontSize: '18px',
          color: '#64748b',
          lineHeight: 1.6
        }}>
          Explore professional networks, skills, and company connections powered by CognoDB graph database.
          Discover career paths, find experts by skill, and visualize company talent networks.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gap: '24px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
      }}>
        <a href="/skill" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{
            padding: '32px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            transition: 'all 0.2s',
            cursor: 'pointer',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#dbeafe',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              fontSize: '24px'
            }}>
              🔍
            </div>
            <h3 style={{
              margin: '0 0 12px 0',
              fontSize: '20px',
              fontWeight: 600,
              color: '#1e293b'
            }}>
              Search by Skill
            </h3>
            <p style={{
              margin: 0,
              color: '#64748b',
              lineHeight: 1.5
            }}>
              Find professionals who share specific skills, along with their companies and roles.
            </p>
          </div>
        </a>

        <a href="/company" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{
            padding: '32px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            transition: 'all 0.2s',
            cursor: 'pointer',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#dcfce7',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              fontSize: '24px'
            }}>
              🏢
            </div>
            <h3 style={{
              margin: '0 0 12px 0',
              fontSize: '20px',
              fontWeight: 600,
              color: '#1e293b'
            }}>
              Company Network
            </h3>
            <p style={{
              margin: 0,
              color: '#64748b',
              lineHeight: 1.5
            }}>
              Discover companies connected through talent that shares specific skills.
            </p>
          </div>
        </a>

        <a href="/path" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{
            padding: '32px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            transition: 'all 0.2s',
            cursor: 'pointer',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#f3e8ff',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              fontSize: '24px'
            }}>
              🔗
            </div>
            <h3 style={{
              margin: '0 0 12px 0',
              fontSize: '20px',
              fontWeight: 600,
              color: '#1e293b'
            }}>
              Find Path
            </h3>
            <p style={{
              margin: 0,
              color: '#64748b',
              lineHeight: 1.5
            }}>
              Explore collaboration paths and connections between professionals.
            </p>
          </div>
        </a>
      </div>
    </Layout>
  );
}
