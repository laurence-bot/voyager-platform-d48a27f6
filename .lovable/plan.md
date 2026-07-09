## Connexion Supabase externe (sans Lovable Cloud)

### Ce qui sera fait

1. **Installer** `@supabase/supabase-js` (déjà téléchargé lors de l'exploration).
2. **Créer `src/lib/supabase.ts`** : instancie et exporte le client Supabase avec :
   - URL : `https://kpvswztlcocvmxwuuuip.supabase.co`
   - Clé publishable : `sb_publishable_UttWEK3QtoGxNIuUy2xEKA_v3rEaNTX`
   - `persistSession: true`, `autoRefreshToken: true`
3. **Mettre à jour `src/routes/index.tsx`** : ajouter un indicateur de statut (point vert/rouge) qui appelle `supabase.auth.getSession()` au chargement pour confirmer que le client s'initialise correctement.

### Notes de sécurité

- La clé publishable est conçue pour être exposée côté navigateur : OK dans le code.
- **Toute la sécurité repose sur les RLS policies** de ta base Supabase — à configurer dans ton dashboard.
- Aucun secret `service_role` n'est utilisé ni stocké.
- Pas de server functions Supabase (impossible sans les variables `SUPABASE_*` réservées par Lovable Cloud) — tout passe par le client navigateur.

### Après validation

Approuve le plan pour que je l'implémente.
