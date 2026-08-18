import { NextResponse } from 'next/server'
import { getSupabaseAdminClient } from '@/lib/supabase/admin'

// Ping périodique déclenché par un cron Vercel (voir vercel.json) — une
// simple requête en lecture suffit à générer de l'activité et empêcher
// Supabase de mettre le projet en pause pour inactivité (plan gratuit).
export async function GET() {
  try {
    const supabase = getSupabaseAdminClient()
    const { error } = await supabase.from('profiles').select('id').limit(1)
    if (error) throw error
    return NextResponse.json({ ok: true, pinged_at: new Date().toISOString() })
  } catch (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }
}
