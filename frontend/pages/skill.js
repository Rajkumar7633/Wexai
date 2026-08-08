import { useState } from "react";
import Layout from '../components/Layout';

export default function SkillPage() {
  const [skill, setSkill] = useState("Graph Databases");
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  async function search() {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const response = await fetch(
        `/api/people-by-skill?skill=${encodeURIComponent(skill)}`,
      );
      if (!response.ok) throw new Error("Unable to load people");
      setPeople(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout title="Search by Skill">
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
            placeholder="Enter skill name (e.g., Graph Databases)"
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
              background: loading ? '#94a3b8' : '#2563eb',
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
          Loading professionals...
        </div>
      )}

      {!loading && hasSearched && people.length === 0 && !error && (
        <div style={{
          padding: '48px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          textAlign: 'center',
          color: '#64748b'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
          <p style={{ margin: 0, fontSize: '18px' }}>
            No professionals found with skill "{skill}"
          </p>
        </div>
      )}

      {!loading && people.length > 0 && (
        <div>
          <p style={{
            color: '#64748b',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            Found {people.length} professional{people.length !== 1 ? 's' : ''} with "{skill}"
          </p>
          <div style={{
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
          }}>
            {people.map((person) => (
              <div
                key={person.id}
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
                  margin: '0 0 8px 0',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#1e293b'
                }}>
                  {person.name}
                </h3>
                <p style={{
                  margin: '0 0 12px 0',
                  color: '#64748b',
                  fontSize: '14px'
                }}>
                  {person.title}
                  {person.company && (
                    <span style={{ color: '#2563eb' }}>
                      {' '}@ {person.company}
                    </span>
                  )}
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px'
                }}>
                  {person.skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        padding: '4px 10px',
                        backgroundColor: '#dbeafe',
                        color: '#1e40af',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 500
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}
