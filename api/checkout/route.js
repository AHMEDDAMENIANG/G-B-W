import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { orderId, amount } = await request.json();

    const payload = {
      item_name: "Commande #" + orderId,
      item_price: amount, 
      currency: "XOF",
      ref_command: orderId,
      command_name: "Achat sur Global Business World",
      env: "test", // Changez en "live" pour la production réelle
      ipn_url: "https://vercel.app",
      success_url: "https://vercel.app",
      cancel_url: "https://vercel.app"
    };

    const response = await fetch("https://paytech.sn", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "API_KEY": process.env.PI_API_KEY
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.success === 1) {
      return NextResponse.json({ redirect_url: data.redirect_url });
    } else {
      return NextResponse.json({ error: data.errors || "Erreur PayTech" }, { status: 400 });
    }

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

