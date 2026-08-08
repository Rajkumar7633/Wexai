import { useState } from "react";
import Layout from '../components/Layout';

export default function CompanyPage() {
  const [skill, setSkill] = useState("AI Strategy");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  async function search() {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const response = await fetch(
        `/api/company-skill-network?skill=${encodeURIComponent(skill)}`,
      );
      if (!response.ok) throw new Error("Unable to load companies");
      setCompanies(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout title="Company Skill Network">
      <div style={{
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <input
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            placeholder="Enter skill name (e.g., AI Strategy)"
            onKeyPress={(e) => e.key === 'Enter' && search()}
            style={{
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              flex: 1,
              minWidth: '200px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
          <button
            onClick={search}
            disabled={loading}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: loading ? '#94a3b8' : '#10b981',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          padding: '16px',
          backgroundColor: '#fee2e2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          color: '#dc2626',
          marginBottom: '24px'
        }}>
          {error}
        </div>
      )}

      {loading && (
        <div style={{
          padding: '24px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          textAlign: 'center',
          color: '#64748b'
        }}>
          Loading companies...
        </div>
      )}

      {!loading && hasSearched && companies.length === 0 && !error && (
        <div style={{
          padding: '48px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          textAlign: 'center',
          color: '#64748b'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏢</div>
          <p style={{ margin: 0, fontSize: '18px' }}>
            No companies found with professionals skilled in "{skill}"
          </p>
        </div>
      )}

      {!loading && companies.length > 0 && (
        <div>
          <p style={{
            color: '#64748b',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            Found {companies.length} compan{companies.length !== 1 ? 'ies' : 'y'} with "{skill}" talent
          </p>
          <div style={{
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'
          }}>
            {companies.map((company) => (
              <div
                key={company.name}
                style={{
                  padding: '24px',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  transition: 'box-shadow 0.2s'
                }}
              >
                <h3 style={{
                  margin: '0 0 12px 0',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '20px' }}>🏢</span>
                  {company.name}
                </h3>
                <div style={{
                  marginTop: '16px'
                }}>
                  <p style={{
                    margin: '0 0 8px 0',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#64748b'
                  }}>
                    Professionals with this skill:
                  </p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {company.people.map((person) => (
                      <span
                        key={person}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#dcfce7',
                          color: '#166534',
                          borderRadius: '16px',
                          fontSize: '13px',
                          fontWeight: 500
                        }}
                      >
                        {person}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}
