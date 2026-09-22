import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function displayValue(value) {
  if (Array.isArray(value)) return value.map(displayValue).filter(Boolean).join(', ') || '—'
  if (value && typeof value === 'object') return value.name || value.title || value.email || value._id
  return value ?? '—'
}

export default function ResourceTable({ resource, endpoint, title, columns }) {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetchCollection(resource, endpoint)
      .then((data) => active && setRows(data))
      .catch((requestError) => active && setError(requestError.message))
      .finally(() => active && setLoading(false))
    return () => { active = false }
  }, [resource, endpoint])

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h2 mb-0">{title}</h1>
        {!loading && !error && <span className="badge text-bg-primary">{rows.length} records</span>}
      </div>
      {loading && <div className="alert alert-info">Loading {title.toLowerCase()}…</div>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive card shadow-sm">
          <table className="table table-striped table-hover mb-0">
            <thead><tr>{columns.map(([key, label]) => <th key={key}>{label}</th>)}</tr></thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row._id || row.id || JSON.stringify(row)}>
                  {columns.map(([key]) => <td key={key}>{displayValue(row[key])}</td>)}
                </tr>
              ))}
              {rows.length === 0 && <tr><td className="text-center text-secondary" colSpan={columns.length}>No records found.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
