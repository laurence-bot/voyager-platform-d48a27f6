import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/public/_cols')({
  server: {
    handlers: {
      GET: async () => {
        const url = process.env['SB_URL']!
        const key = process.env['SERVICE_ROLE_KEY']!
        const res = await fetch(`${url}/rest/v1/demandes?select=*&limit=1`, {
          headers: { apikey: key, Authorization: `Bearer ${key}` },
        })
        const text = await res.text()
        return Response.json({ status: res.status, url, body: text.slice(0, 3000) })
      },
    },
  },
})
