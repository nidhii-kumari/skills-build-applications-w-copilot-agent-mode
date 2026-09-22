import ResourceTable from './ResourceTable.jsx'

export default function Activities() {
  return <ResourceTable resource="activities" title="Activities" columns={[
    ['type', 'Type'], ['user', 'User'], ['duration', 'Minutes'], ['calories', 'Calories'], ['date', 'Date'],
  ]} />
}
