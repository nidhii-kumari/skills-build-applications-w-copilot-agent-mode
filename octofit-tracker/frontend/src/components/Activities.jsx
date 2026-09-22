import ResourceTable from './ResourceTable.jsx'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

export default function Activities() {
  return <ResourceTable resource="activities" endpoint={endpoint} title="Activities" columns={[
    ['type', 'Type'], ['user', 'User'], ['duration', 'Minutes'], ['calories', 'Calories'], ['date', 'Date'],
  ]} />
}
