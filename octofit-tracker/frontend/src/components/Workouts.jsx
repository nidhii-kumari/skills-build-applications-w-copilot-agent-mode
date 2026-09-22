import ResourceTable from './ResourceTable.jsx'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

export default function Workouts() {
  return <ResourceTable resource="workouts" endpoint={endpoint} title="Workouts" columns={[
    ['title', 'Workout'], ['difficulty', 'Difficulty'], ['duration', 'Minutes'], ['target', 'Target'],
  ]} />
}
