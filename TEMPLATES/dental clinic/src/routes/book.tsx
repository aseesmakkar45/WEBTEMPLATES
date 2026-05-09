import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { addDays, format, isSameDay, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book an Appointment — LuminaDental" },
      {
        name: "description",
        content:
          "Reserve your visit at LuminaDental online. Choose a reason, pick a date and time, and share your details — it takes about a minute.",
      },
      { property: "og:title", content: "Book an Appointment — LuminaDental" },
      {
        property: "og:description",
        content: "Online appointment booking for LuminaDental in San Francisco.",
      },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: BookPage,
});

type Reason =
  | "New patient exam"
  | "Cleaning"
  | "Cosmetic consultation"
  | "Implant consultation"
  | "Emergency / pain";

const REASONS: { label: Reason; duration: string; description: string }[] = [
  { label: "New patient exam", duration: "60 min", description: "Full evaluation, x-rays, and care plan." },
  { label: "Cleaning", duration: "45 min", description: "Routine hygiene visit with a dental hygienist." },
  { label: "Cosmetic consultation", duration: "30 min", description: "Whitening, veneers, smile design." },
  { label: "Implant consultation", duration: "45 min", description: "3D imaging and restorative planning." },
  { label: "Emergency / pain", duration: "30 min", description: "Same-week urgent care when possible." },
];

// Clinic hours: Mon–Thu 8–18, Fri 8–15, Sat by appointment (10–13), Sun closed.
function slotsForDate(date: Date): string[] {
  const day = date.getDay(); // 0 Sun … 6 Sat
  if (day === 0) return [];
  let startHour = 8;
  let endHour = 18;
  if (day === 5) endHour = 15;
  if (day === 6) {
    startHour = 10;
    endHour = 13;
  }
  const slots: string[] = [];
  for (let h = startHour; h < endHour; h++) {
    slots.push(`${h.toString().padStart(2, "0")}:00`);
    if (h + 0.5 < endHour) slots.push(`${h.toString().padStart(2, "0")}:30`);
  }
  return slots;
}

function formatSlot(slot: string): string {
  const [h, m] = slot.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const display = ((h + 11) % 12) + 1;
  return `${display}:${m.toString().padStart(2, "0")} ${suffix}`;
}

type StepKey = "reason" | "datetime" | "details" | "confirm";
const STEPS: { key: StepKey; label: string }[] = [
  { key: "reason", label: "Reason" },
  { key: "datetime", label: "Date & time" },
  { key: "details", label: "Your details" },
  { key: "confirm", label: "Confirm" },
];

function BookPage() {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [step, setStep] = useState<StepKey>("reason");
  const [reason, setReason] = useState<Reason | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | null>(null);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
    newPatient: true,
  });
  const [submitted, setSubmitted] = useState(false);

  const slots = date ? slotsForDate(date) : [];
  const stepIndex = STEPS.findIndex((s) => s.key === step);

  const canNext =
    (step === "reason" && reason) ||
    (step === "datetime" && date && time) ||
    (step === "details" &&
      details.name.trim() &&
      details.email.trim() &&
      details.phone.trim()) ||
    step === "confirm";

  function next() {
    const i = STEPS.findIndex((s) => s.key === step);
    if (i < STEPS.length - 1) setStep(STEPS[i + 1].key);
  }
  function back() {
    const i = STEPS.findIndex((s) => s.key === step);
    if (i > 0) setStep(STEPS[i - 1].key);
  }

  return (
    <main>
      <section className="bg-brand-50 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-600">
            Online booking
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-brand-900 md:text-5xl">
            Reserve your visit in about a minute.
          </h1>
          <p className="mt-4 max-w-2xl text-ink-muted">
            We'll confirm your time by phone or email within one business day.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          {/* Stepper */}
          <ol className="mb-12 flex items-center justify-between gap-2">
            {STEPS.map((s, i) => {
              const active = i === stepIndex;
              const done = i < stepIndex || submitted;
              return (
                <li key={s.key} className="flex flex-1 items-center gap-3">
                  <div
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                      done
                        ? "bg-brand-600 text-primary-foreground"
                        : active
                          ? "bg-brand-900 text-primary-foreground"
                          : "bg-muted text-ink-muted",
                    )}
                  >
                    {done ? "✓" : i + 1}
                  </div>
                  <span
                    className={cn(
                      "hidden text-xs font-bold uppercase tracking-widest sm:inline",
                      active || done ? "text-brand-900" : "text-ink-muted",
                    )}
                  >
                    {s.label}
                  </span>
                  {i < STEPS.length - 1 && (
                    <div
                      className={cn(
                        "ml-2 hidden h-px flex-1 sm:block",
                        done ? "bg-brand-600" : "bg-border",
                      )}
                    />
                  )}
                </li>
              );
            })}
          </ol>

          {submitted ? (
            <Confirmation
              reason={reason!}
              date={date!}
              time={time!}
              name={details.name}
              email={details.email}
            />
          ) : (
            <div className="rounded-3xl border border-border p-6 md:p-10">
              {step === "reason" && (
                <ReasonStep selected={reason} onSelect={setReason} />
              )}

              {step === "datetime" && (
                <DateTimeStep
                  today={today}
                  date={date}
                  setDate={(d) => {
                    setDate(d);
                    setTime(null);
                  }}
                  slots={slots}
                  time={time}
                  setTime={setTime}
                />
              )}

              {step === "details" && (
                <DetailsStep details={details} setDetails={setDetails} />
              )}

              {step === "confirm" && (
                <ConfirmStep
                  reason={reason!}
                  date={date!}
                  time={time!}
                  details={details}
                />
              )}

              <div className="mt-10 flex items-center justify-between gap-4 border-t border-border pt-6">
                <button
                  type="button"
                  onClick={back}
                  disabled={stepIndex === 0}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-ink-muted disabled:opacity-40 enabled:hover:text-brand-900"
                >
                  ← Back
                </button>
                {step === "confirm" ? (
                  <button
                    type="button"
                    onClick={() => setSubmitted(true)}
                    className="rounded-full bg-brand-600 px-8 py-3 text-sm font-bold text-primary-foreground shadow-brand transition-all hover:-translate-y-0.5 hover:bg-brand-900"
                  >
                    Request Appointment
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={next}
                    disabled={!canNext}
                    className="rounded-full bg-brand-900 px-8 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Continue →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function ReasonStep({
  selected,
  onSelect,
}: {
  selected: Reason | null;
  onSelect: (r: Reason) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-brand-900">
        What brings you in?
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        Choose the visit type that best fits your needs.
      </p>
      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {REASONS.map((r) => {
          const active = selected === r.label;
          return (
            <button
              key={r.label}
              type="button"
              onClick={() => onSelect(r.label)}
              className={cn(
                "rounded-2xl border p-5 text-left transition-all",
                active
                  ? "border-brand-600 bg-brand-50 shadow-brand"
                  : "border-border hover:border-brand-600",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-base font-bold text-brand-900">
                  {r.label}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
                  {r.duration}
                </span>
              </div>
              <p className="mt-2 text-sm text-ink-muted">{r.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DateTimeStep({
  today,
  date,
  setDate,
  slots,
  time,
  setTime,
}: {
  today: Date;
  date: Date | undefined;
  setDate: (d: Date | undefined) => void;
  slots: string[];
  time: string | null;
  setTime: (t: string) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-brand-900">
        Pick a date and time
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        Clinic hours: Mon–Thu 8am–6pm · Fri 8am–3pm · Sat by appointment.
      </p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[auto_1fr]">
        <div className="rounded-2xl border border-border p-3">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(d) => d < today || d > addDays(today, 60) || d.getDay() === 0}
            initialFocus
            className={cn("pointer-events-auto p-2")}
          />
        </div>

        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-ink-muted">
            {date ? format(date, "EEEE, MMMM d") : "Select a date to see times"}
          </div>

          {date && slots.length === 0 && (
            <p className="mt-4 text-sm text-ink-muted">
              No openings on this day — please choose another.
            </p>
          )}

          {date && slots.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {slots.map((s) => {
                const active = time === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setTime(s)}
                    className={cn(
                      "rounded-xl border px-2 py-2.5 text-sm font-semibold transition-all",
                      active
                        ? "border-brand-600 bg-brand-600 text-primary-foreground"
                        : "border-border text-brand-900 hover:border-brand-600",
                    )}
                  >
                    {formatSlot(s)}
                  </button>
                );
              })}
            </div>
          )}

          {date && time && (
            <p className="mt-6 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-900">
              <span className="font-bold">Selected:</span>{" "}
              {format(date, "EEE, MMM d")} at {formatSlot(time)}
              {isSameDay(date, today) && " (today)"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailsStep({
  details,
  setDetails,
}: {
  details: {
    name: string;
    email: string;
    phone: string;
    notes: string;
    newPatient: boolean;
  };
  setDetails: (
    d: {
      name: string;
      email: string;
      phone: string;
      notes: string;
      newPatient: boolean;
    },
  ) => void;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-brand-900">
        Your details
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        We'll use these to confirm your visit. We never share your info.
      </p>

      <div className="mt-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Field
            label="Full name"
            value={details.name}
            onChange={(v) => setDetails({ ...details, name: v })}
            placeholder="Jane Doe"
            required
          />
          <Field
            label="Phone"
            type="tel"
            value={details.phone}
            onChange={(v) => setDetails({ ...details, phone: v })}
            placeholder="(555) 123-4567"
            required
          />
        </div>
        <Field
          label="Email"
          type="email"
          value={details.email}
          onChange={(v) => setDetails({ ...details, email: v })}
          placeholder="you@example.com"
          required
        />
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-ink-muted">
            Anything we should know?
          </label>
          <textarea
            rows={4}
            value={details.notes}
            onChange={(e) => setDetails({ ...details, notes: e.target.value })}
            placeholder="Insurance, accessibility needs, etc."
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-600 focus:outline-none"
          />
        </div>
        <label className="flex items-center gap-3 text-sm text-ink-muted">
          <input
            type="checkbox"
            checked={details.newPatient}
            onChange={(e) =>
              setDetails({ ...details, newPatient: e.target.checked })
            }
            className="size-4 rounded border-border text-brand-600 focus:ring-brand-600"
          />
          I'm a new patient at LuminaDental.
        </label>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-ink-muted">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-brand-600 focus:outline-none"
      />
    </div>
  );
}

function ConfirmStep({
  reason,
  date,
  time,
  details,
}: {
  reason: Reason;
  date: Date;
  time: string;
  details: { name: string; email: string; phone: string; notes: string; newPatient: boolean };
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-brand-900">
        Confirm your appointment
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        Review the details and submit your request.
      </p>

      <dl className="mt-8 divide-y divide-border rounded-2xl border border-border">
        <Row label="Reason" value={reason} />
        <Row label="Date" value={format(date, "EEEE, MMMM d, yyyy")} />
        <Row label="Time" value={formatSlot(time)} />
        <Row label="Name" value={details.name} />
        <Row label="Phone" value={details.phone} />
        <Row label="Email" value={details.email} />
        <Row label="New patient" value={details.newPatient ? "Yes" : "No"} />
        {details.notes && <Row label="Notes" value={details.notes} />}
      </dl>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-4 px-5 py-4 text-sm">
      <dt className="text-xs font-bold uppercase tracking-widest text-ink-muted">
        {label}
      </dt>
      <dd className="text-brand-900">{value}</dd>
    </div>
  );
}

function Confirmation({
  reason,
  date,
  time,
  name,
  email,
}: {
  reason: Reason;
  date: Date;
  time: string;
  name: string;
  email: string;
}) {
  return (
    <div className="rounded-3xl border border-border p-10 text-center md:p-16">
      <div className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-brand-50 text-2xl text-brand-600">
        ✓
      </div>
      <h2 className="mt-6 font-display text-3xl font-bold text-brand-900">
        Request received, {name.split(" ")[0]}!
      </h2>
      <p className="mx-auto mt-4 max-w-md text-ink-muted">
        We've got your request for a{" "}
        <span className="font-semibold text-brand-900">{reason.toLowerCase()}</span> on{" "}
        <span className="font-semibold text-brand-900">
          {format(date, "EEE, MMM d")} at {formatSlot(time)}
        </span>
        . A team member will confirm with you at{" "}
        <span className="font-semibold text-brand-900">{email}</span> within one business
        day.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          to="/"
          className="rounded-full bg-brand-900 px-8 py-3 text-sm font-bold text-primary-foreground hover:bg-brand-600"
        >
          Back to home
        </Link>
        <a
          href="tel:+15552349000"
          className="rounded-full border border-border px-8 py-3 text-sm font-bold text-brand-900 hover:border-brand-600"
        >
          Call (555) 234-9000
        </a>
      </div>
    </div>
  );
}
