import ResourceTable from './ResourceTable.jsx'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

export default function Users() {
  return <ResourceTable resource="users" endpoint={endpoint} title="Users" columns={[
    ['name', 'Name'], ['email', 'Email'], ['createdAt', 'Joined'],
  ]} />
}
