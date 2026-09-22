import ResourceTable from './ResourceTable.jsx'

export default function Users() {
  return <ResourceTable resource="users" title="Users" columns={[
    ['name', 'Name'], ['email', 'Email'], ['createdAt', 'Joined'],
  ]} />
}
