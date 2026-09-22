# OctoFit Tracker frontend

For Codespaces development, create `frontend/.env.local` and define:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend calls `https://your-codespace-name-8000.app.github.dev/api/[component]/`
when this variable is set. When it is unset, requests safely use
`http://localhost:8000/api/[component]/`.
