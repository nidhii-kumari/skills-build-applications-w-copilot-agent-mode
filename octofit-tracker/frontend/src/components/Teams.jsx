import ResourceTable from './ResourceTable.jsx'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

export default function Teams() {
  return <ResourceTable resource="teams" endpoint={endpoint} title="Teams" columns={[
    ['name', 'Team'], ['description', 'Description'], ['members', 'Members'],
  ]} />
}
