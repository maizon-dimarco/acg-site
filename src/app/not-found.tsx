import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "@/styles/home.css";
import "@/styles/practice.css";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <Nav current="" ink="on-dark" />
      <main className="doc">
        <section className="d wrap" style={{ minHeight: "100lvh", display: "flex", alignItems: "center", borderTop: 0 }}>
          <div>
            <div className="pkick" style={{ color: "var(--muted)" }}>404</div>
            <h1 className="phl" style={{ maxWidth: "16ch" }}><span className="ln on">This page isn&apos;t here.</span><span className="ln on">The firm is.</span></h1>
            <p className="lead" style={{ marginTop: 28, maxWidth: "48ch" }}>The address may have changed. Start from the home page, or call and a managing director will pick up.</p>
            <p style={{ marginTop: 36, display: "flex", gap: 32, flexWrap: "wrap" }}>
              <a className="go mag" href="/">Home</a>
              <a className="go mag" href="tel:+14048803381">+1 (404) 880-3381</a>
            </p>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
