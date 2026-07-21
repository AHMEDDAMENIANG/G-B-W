import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    const formData = await request.formData();
    const type_event = formData.get('type_event');
    const ref_command = formData.get('ref_command');

    if (type_event === 'sale_complete') {
      const { error } = await supabase
        .from('orders') 
        .update({ status: 'paid', updated_at: new Date() })
        .eq('id', ref_command);

      if (error) {
        return NextResponse.json({ error: "Erreur Supabase: " + error.message }, { status: 500 });
      }
      return NextResponse.json({ message: "Statut mis à jour avec succès" }, { status: 200 });
    }

    return NextResponse.json({ message: "Événement ignoré" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

