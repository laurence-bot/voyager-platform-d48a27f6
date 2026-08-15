import { createFileRoute } from '@tanstack/react-router'
import { createClient } from '@supabase/supabase-js'

const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (rateLimitMap.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  )
  if (timestamps.length >= RATE_LIMIT_MAX) return true
  timestamps.push(now)
  rateLimitMap.set(ip, timestamps)
  return false
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const Route = createFileRoute('/api/public/contact')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const ip =
            request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            'unknown'
          if (isRateLimited(ip)) {
            return Response.json(
              { error: 'Trop de demandes. Réessayez dans quelques minutes.' },
              { status: 429 }
            )
          }

          const body = await request.json()

          if (body.website) {
            return Response.json({ success: true }, { status: 200 })
          }

          const nom = typeof body.nom === 'string' ? body.nom.trim() : ''
          const email =
            typeof body.email === 'string' ? body.email.trim() : ''
          const message =
            typeof body.message === 'string' ? body.message.trim() : ''

          if (!nom || nom.length < 2) {
            return Response.json(
              { error: 'Le nom est requis.' },
              { status: 400 }
            )
          }
          if (!email || !EMAIL_REGEX.test(email)) {
            return Response.json(
              { error: 'Une adresse email valide est requise.' },
              { status: 400 }
            )
          }

          const telephone =
            typeof body.telephone === 'string' && body.telephone.trim()
              ? body.telephone.trim()
              : null

          const supabaseAdmin = createClient(
            process.env['SB_URL']!,
            process.env['SERVICE_ROLE_KEY']!
          )

          const { data, error } = await supabaseAdmin
            .from('demandes')
            .insert({
              client_nom: nom,
              client_email: email,
              client_telephone: telephone,
              message_client: message || null,
              canal: 'site_web',
              agence_id: 'e1c8fd7a-c645-42de-9625-f6185dd22cd6',
            })
            .select('id')
            .single()

          if (error) {
            console.error('Supabase insert error:', error)
            return Response.json(
              { error: "Erreur lors de l'enregistrement de la demande." },
              { status: 500 }
            )
          }

          return Response.json({ success: true, id: data.id }, { status: 200 })
        } catch (err) {
          console.error('Contact route error:', err)
          return Response.json(
            { error: 'Erreur serveur.' },
            { status: 500 }
          )
        }
      },
    },
  },
})
