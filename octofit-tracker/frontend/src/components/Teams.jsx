import ResourceTable from './ResourceTable.jsx'

export default function Teams() {
  return <ResourceTable resource="teams" title="Teams" columns={[
    ['name', 'Team'], ['description', 'Description'], ['members', 'Members'],
  ]} />
}
