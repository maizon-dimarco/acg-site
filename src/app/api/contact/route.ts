import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Contact form handler. Sends the enquiry by email through Resend.
 * Needs RESEND_API_KEY and CONTACT_TO in the environment (set in Vercel → Settings → Environment
 * Variables). Until they exist the route answers 503 and the form shows the phone and email instead.
 */
export async function POST(req: Request) {
  let body: { name?: string; email?: string; situation?: string; company?: string } = {};
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 }); }
  const name = (body.name || "").trim().slice(0, 200);
  const email = (body.email || "").trim().slice(0, 200);
  const situation = (body.situation || "").trim().slice(0, 4000);
  if (body.company) return NextResponse.json({ ok: true }); // honeypot: bots fill the hidden field
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !situation) {
    return NextResponse.json({ ok: false, error: "missing" }, { status: 422 });
  }
  const key = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO;
  if (!key || !to) return NextResponse.json({ ok: false, error: "not configured" }, { status: 503 });
  try {
    const resend = new Resend(key);
    await resend.emails.send({
      from: process.env.CONTACT_FROM || "ACG website <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      replyTo: email,
      subject: `Website enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${situation}\n`,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "send failed" }, { status: 502 });
  }
}
