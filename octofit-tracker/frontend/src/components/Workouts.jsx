import ResourceTable from './ResourceTable.jsx'

export default function Workouts() {
  return <ResourceTable resource="workouts" title="Workouts" columns={[
    ['title', 'Workout'], ['difficulty', 'Difficulty'], ['duration', 'Minutes'], ['target', 'Target'],
  ]} />
}
