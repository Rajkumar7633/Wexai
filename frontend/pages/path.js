import { useState } from "react";
import Layout from '../components/Layout';

export default function PathPage() {
  const [fromId, setFromId] = useState("p1");
  const [toId, setToId] = useState("p5");
  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  async function findPath() {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const response = await fetch(
        `/api/path-between-people?fromId=${encodeURIComponent(fromId)}&toId=${encodeURIComponent(toId)}`,
      );
      if (!response.ok) throw new Error("Unable to load path");
      setPath(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const renderPathVisualization = (entry) => {
    const nodes = entry.nodes || [];
    const rels = entry.relationships || [];

    return (
      <div style={{
        padding: '20px',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        marginTop: '16px'
      }}>
        <h4 style={{
          margin: '0 0 16px 0',
          fontSize: '14px',
          fontWeight: 600,
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Path Visualization
        </h4>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          alignItems: 'center'
        }}>
          {nodes.map((node, idx) => {
            const isPerson = node.labels && node.labels.includes('Person');
            const name = node.properties?.name || node.properties?.id || `Node ${idx}`;
            return (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  padding: '8px 16px',
                  backgroundColor: isPerson ? '#f3e8ff' : '#e0f2fe',
                  color: isPerson ? '#7c3aed' : '#0369a1',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: isPerson ? '1px solid #d8b4fe' : '1px solid #bae6fd'
                }}>
                  {name}
                </div>
                {idx < nodes.length - 1 && (
                  <span style={{ color: '#94a3b8', fontSize: '18px' }}>→</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Layout title="Find Collaboration Path">
      <div style={{
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        marginBottom: '24px'
      }}>
        <div style={{
          display: 'grid',
          gap: '12px',
          maxWidth: '600px'
        }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#64748b'
            }}>
              From Person ID
            </label>
            <input
              value={fromId}
              onChange={(e) => setFromId(e.target.value)}
              placeholder="e.g., p1"
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                width: '100%',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '6px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#64748b'
            }}>
              To Person ID
            </label>
            <input
              value={toId}
              onChange={(e) => setToId(e.target.value)}
              placeholder="e.g., p5"
              onKeyPress={(e) => e.key === 'Enter' && findPath()}
              style={{
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                width: '100%',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>
          <button
            onClick={findPath}
            disabled={loading}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: loading ? '#94a3b8' : '#8b5cf6',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 500,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              marginTop: '8px'
            }}
          >
            {loading ? 'Finding Path...' : 'Find Path'}
          </button>
        </div>
      </div>

      <div style={{
        padding: '16px',
        backgroundColor: '#f0f9ff',
        border: '1px solid #bae6fd',
        borderRadius: '8px',
        marginBottom: '24px',
        fontSize: '14px',
        color: '#0369a1'
      }}>
        <strong>Available Person IDs:</strong> p1, p2, p3, p4, p5
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
          Finding collaboration paths...
        </div>
      )}

      {!loading && hasSearched && path.length === 0 && !error && (
        <div style={{
          padding: '48px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          textAlign: 'center',
          color: '#64748b'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔗</div>
          <p style={{ margin: 0, fontSize: '18px' }}>
            No collaboration path found between {fromId} and {toId}
          </p>
        </div>
      )}

      {!loading && path.length > 0 && (
        <div>
          <p style={{
            color: '#64748b',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            Found {path.length} path{path.length !== 1 ? 's' : ''} between {fromId} and {toId}
          </p>
          <div style={{
            display: 'grid',
            gap: '16px'
          }}>
            {path.map((entry, index) => (
              <div
                key={index}
                style={{
                  padding: '24px',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}
              >
                <h3 style={{
                  margin: '0 0 16px 0',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#1e293b'
                }}>
                  Path {index + 1}
                </h3>
                {renderPathVisualization(entry)}
                <details style={{
                  marginTop: '16px'
                }}>
                  <summary style={{
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#64748b',
                    fontWeight: 500
                  }}>
                    View raw data
                  </summary>
                  <pre style={{
                    marginTop: '12px',
                    padding: '12px',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '6px',
                    fontSize: '12px',
                    overflow: 'auto',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}>
                    {JSON.stringify(entry, null, 2)}
                  </pre>
                </details>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}
