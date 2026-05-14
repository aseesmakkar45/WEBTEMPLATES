import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — LuminaDental" },
      {
        name: "description",
        content:
          "Book your visit at LuminaDental in San Francisco. Hours, location, phone, and online appointment request.",
      },
      { property: "og:title", content: "Book an Appointment — LuminaDental" },
      {
        property: "og:description",
        content: "Schedule your visit at LuminaDental — accepting new patients.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main>
      <section className="bg-brand-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
            Book a visit
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-bold text-brand-900 md:text-6xl">
            We'd love to meet you.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            Tell us a little about what you need. We'll reach out within one business day to
            confirm a time.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_400px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-6 rounded-3xl border border-border p-8 md:p-12"
          >
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-6 inline-flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  ✓
                </div>
                <h2 className="font-display text-2xl font-bold text-brand-900">
                  Request received
                </h2>
                <p className="mt-3 text-ink-muted">
                  Thank you — we'll be in touch within one business day.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Full name" name="name" placeholder="Jane Doe" required />
                  <Field label="Phone" name="phone" type="tel" placeholder="(555) 123-4567" required />
                </div>
                <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-ink-muted">
                    Reason for visit
                  </label>
                  <select className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-600 focus:outline-none">
                    <option>New patient exam</option>
                    <option>Cleaning</option>
                    <option>Cosmetic consultation</option>
                    <option>Implant consultation</option>
                    <option>Emergency / pain</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-ink-muted">
                    Anything else?
                  </label>
                  <textarea
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-600 focus:outline-none"
                    placeholder="Insurance, scheduling preferences, etc."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-brand-600 px-8 py-4 font-bold text-primary-foreground shadow-brand transition-all hover:-translate-y-0.5 hover:bg-brand-900"
                >
                  Request Appointment
                </button>
              </>
            )}
          </form>

          <aside className="space-y-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">
                Visit
              </h3>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=1200+Medical+Plaza+Suite+400+San+Francisco+CA+94103"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-sm leading-relaxed text-ink-muted hover:text-brand-600"
              >
                1200 Medical Plaza, Suite 400
                <br />
                San Francisco, CA 94103
                <span className="mt-1 block text-xs font-bold uppercase tracking-widest text-brand-600">
                  Get directions →
                </span>
              </a>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">
                Call
              </h3>
              <a
                href="tel:+15552349000"
                className="mt-4 block font-display text-2xl font-bold text-brand-600 hover:text-brand-900"
              >
                (555) 234-9000
              </a>
              <a
                href="sms:+15552349000"
                className="mt-2 block text-sm text-ink-muted hover:text-brand-600"
              >
                Or send us a text
              </a>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-foreground">
                Hours
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                <li>Mon – Thu: 8am – 6pm</li>
                <li>Fri: 8am – 3pm</li>
                <li>Sat: By Appointment</li>
                <li>Sun: Closed</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-brand-50 p-6 text-sm text-brand-900">
              <p className="font-bold">Dental emergency?</p>
              <p className="mt-2 text-ink-muted">
                Call us directly — we reserve same-day slots for urgent care.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
            <iframe
              title="LuminaDental location map"
              src="https://www.google.com/maps?q=1200+Medical+Plaza+San+Francisco+CA+94103&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-bold uppercase tracking-widest text-ink-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-600 focus:outline-none"
      />
    </div>
  );
}
