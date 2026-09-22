import ResourceTable from './ResourceTable.jsx'

export default function Leaderboard() {
  return <ResourceTable resource="leaderboard" title="Leaderboard" columns={[
    ['rank', 'Rank'], ['user', 'User'], ['points', 'Points'], ['period', 'Period'],
  ]} />
}
