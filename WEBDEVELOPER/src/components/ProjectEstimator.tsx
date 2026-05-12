"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2 } from "lucide-react";

type ProjectType = "landing" | "portfolio" | "business" | "ecommerce" | "custom";
type PageRange = "1-5" | "5-10" | "10-20" | "20+";

export default function ProjectEstimator() {
  const [projectType, setProjectType] = useState<ProjectType>("business");
  const [pages, setPages] = useState<PageRange>("5-10");
  const [hasEcommerce, setHasEcommerce] = useState(false);
  const [hasBlog, setHasBlog] = useState(false);
  const [seoTier, setSeoTier] = useState<"standard" | "premium">("standard");
  const [customFeatures, setCustomFeatures] = useState<string[]>([]);

  const [complexity, setComplexity] = useState<string>("Standard");
  const [featureCount, setFeatureCount] = useState<number>(0);
  const [timeline, setTimeline] = useState("3-4 Weeks");

  const toggleFeature = (feature: string) => {
    if (customFeatures.includes(feature)) {
      setCustomFeatures(customFeatures.filter((f) => f !== feature));
    } else {
      setCustomFeatures([...customFeatures, feature]);
    }
  };

  useEffect(() => {
    let score = 0;
    let time = "2 Weeks";

    // Project Type base score
    switch (projectType) {
      case "landing":  score = 1; time = "1-2 Weeks"; break;
      case "portfolio": score = 2; time = "2 Weeks"; break;
      case "business":  score = 3; time = "3-4 Weeks"; break;
      case "ecommerce": score = 5; time = "4-6 Weeks"; break;
      case "custom":    score = 8; time = "6-8 Weeks"; break;
    }

    // Page count modifier
    switch (pages) {
      case "5-10": score += 1; break;
      case "10-20": score += 2; break;
      case "20+": score += 3; break;
    }

    if (hasEcommerce && projectType !== "ecommerce") score += 2;
    if (hasBlog) score += 1;
    if (seoTier === "premium") score += 1;
    score += customFeatures.length;

    // Derive complexity label
    let label = "Starter";
    if (score >= 4 && score < 7) label = "Standard";
    else if (score >= 7 && score < 11) label = "Advanced";
    else if (score >= 11) label = "Enterprise";

    setComplexity(label);
    setFeatureCount(score);
    setTimeline(time);
  }, [projectType, pages, hasEcommerce, hasBlog, seoTier, customFeatures]);

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 max-w-4xl mx-auto border-white/[0.08] relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-indigo-accent/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-emerald-accent/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-lg bg-indigo-accent/10 text-indigo-accent">
          <Calculator className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold font-display tracking-tight text-white">Project Cost Estimator</h3>
          <p className="text-sm text-zinc-400">Configure your website needs to get an instant scope assessment.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left inputs column */}
        <div className="lg:col-span-3 space-y-6">
          {/* Project Type */}
          <div>
            <label className="text-sm font-semibold tracking-wide text-zinc-300 block mb-3">Website Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: "landing", label: "Landing Page" },
                { id: "portfolio", label: "Portfolio" },
                { id: "business", label: "Corporate" },
                { id: "ecommerce", label: "E-Commerce" },
                { id: "custom", label: "Custom App" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setProjectType(t.id as ProjectType)}
                  type="button"
                  className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                    projectType === t.id
                      ? "bg-indigo-accent/20 border-indigo-accent text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                      : "bg-[#111116] border-white/[0.04] text-zinc-400 hover:border-white/10 hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Page scale */}
          <div>
            <label className="text-sm font-semibold tracking-wide text-zinc-300 block mb-3">Scale (Pages)</label>
            <div className="grid grid-cols-4 gap-2">
              {(["1-5", "5-10", "10-20", "20+"] as PageRange[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setPages(r)}
                  type="button"
                  className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                    pages === r
                      ? "bg-indigo-accent/20 border-indigo-accent text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                      : "bg-[#111116] border-white/[0.04] text-zinc-400 hover:border-white/10 hover:text-white"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons toggle options */}
          <div className="space-y-3">
            <label className="text-sm font-semibold tracking-wide text-zinc-300 block">Required Functionality</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-3 p-3 rounded-lg bg-[#111116] border border-white/[0.04] cursor-pointer hover:border-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={hasEcommerce}
                  onChange={(e) => setHasEcommerce(e.target.checked)}
                  disabled={projectType === "ecommerce"}
                  className="rounded border-zinc-700 text-indigo-600 focus:ring-indigo-accent/50 bg-black/40 h-4.5 w-4.5"
                />
                <div>
                  <span className="text-xs font-medium text-white block">E-Commerce functionality</span>
                  <span className="text-[10px] text-zinc-500">Shopping cart & checkout</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-lg bg-[#111116] border border-white/[0.04] cursor-pointer hover:border-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={hasBlog}
                  onChange={(e) => setHasBlog(e.target.checked)}
                  className="rounded border-zinc-700 text-indigo-600 focus:ring-indigo-accent/50 bg-black/40 h-4.5 w-4.5"
                />
                <div>
                  <span className="text-xs font-medium text-white block">Blog / CMS setup</span>
                  <span className="text-[10px] text-zinc-500">Post articles & manage content</span>
                </div>
              </label>
            </div>
          </div>

          {/* Advanced Integrations & Custom Features */}
          <div>
            <label className="text-sm font-semibold tracking-wide text-zinc-300 block mb-3">Integrations</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "payments", label: "Payment Gateways (Stripe/PayPal)" },
                { id: "auth", label: "User Accounts & Authentication" },
                { id: "cms", label: "Headless Content Management System" },
                { id: "crm", label: "CRM / Newsletter (Mailchimp/Hubspot)" },
              ].map((f) => {
                const active = customFeatures.includes(f.id);
                return (
                  <button
                    key={f.id}
                    onClick={() => toggleFeature(f.id)}
                    type="button"
                    className={`py-2 px-3 text-[11px] font-medium rounded-lg border transition-all text-left flex items-start gap-2 ${
                      active
                        ? "bg-indigo-accent/20 border-indigo-accent text-indigo-300"
                        : "bg-[#111116] border-white/[0.04] text-zinc-400 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    <CheckCircle2 className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${active ? "text-indigo-400" : "text-zinc-600"}`} />
                    <span>{f.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SEO Setup Selection */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#111116] border border-white/[0.04]">
            <div>
              <span className="text-xs font-medium text-white block">Search Engine Optimization (SEO)</span>
              <span className="text-[10px] text-zinc-500">Premium includes schema markup & site audit ready</span>
            </div>
            <div className="flex gap-1 bg-black/40 p-0.5 rounded-lg border border-white/[0.02]">
              <button
                type="button"
                onClick={() => setSeoTier("standard")}
                className={`py-1 px-3 text-[10px] font-semibold rounded-md transition-all ${
                  seoTier === "standard" ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Standard
              </button>
              <button
                type="button"
                onClick={() => setSeoTier("premium")}
                className={`py-1 px-3 text-[10px] font-semibold rounded-md transition-all ${
                  seoTier === "premium" ? "bg-emerald-accent/20 border border-emerald-accent/30 text-emerald-400" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Premium
              </button>
            </div>
          </div>
        </div>

        {/* Right scope summary column */}
        <div className="lg:col-span-2 flex flex-col justify-between p-6 rounded-xl bg-gradient-to-b from-[#121218] to-[#0d0d12] border border-white/[0.05] relative overflow-hidden">
          <div className="space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Project Scope Summary</h4>

            {/* Complexity Badge */}
            <div className="space-y-1">
              <span className="text-4xl md:text-5xl font-black font-display tracking-tight text-white block">
                {complexity}
              </span>
              <span className="text-xs text-zinc-400">Complexity Level</span>
            </div>

            <div className="border-t border-white/[0.04] pt-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Estimated Timeline:</span>
                <span className="font-semibold text-white">{timeline}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Features Selected:</span>
                <span className="font-semibold text-white">{featureCount} modules</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Tech Stack:</span>
                <span className="font-semibold text-white">Next.js &amp; Tailwind</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">Design Process:</span>
                <span className="font-semibold text-white">Custom Figma Mockups</span>
              </div>
            </div>

            <div className="bg-black/30 border border-white/[0.02] p-3 rounded-lg">
              <p className="text-[10px] leading-relaxed text-zinc-500">
                Pricing is customised for every project. Share these selections with me and I&apos;ll send a detailed proposal within 24 hours.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href={`/contact?type=${projectType}`}
              className="w-full py-3 px-4 rounded-lg bg-indigo-accent hover:bg-indigo-600 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] group"
            >
              <span>Get a Custom Quote</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
