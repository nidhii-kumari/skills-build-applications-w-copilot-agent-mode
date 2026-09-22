import ResourceTable from './ResourceTable.jsx'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

export default function Leaderboard() {
  return <ResourceTable resource="leaderboard" endpoint={endpoint} title="Leaderboard" columns={[
    ['rank', 'Rank'], ['user', 'User'], ['points', 'Points'], ['period', 'Period'],
  ]} />
}
