"use client"
import { useEffect, useState } from "react";
import { IconBadge } from "@/components/IconBadge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PublicIdeationChat } from "@/components/PublicIdeationChat";
import { AdvisorRequestDialog } from "@/components/AdvisorRequestDialog";
import TopWebinarBanner from "@/components/TopWebinarBanner";
import { ClientSignupDialog } from "@/components/ClientSignupDialog";
import Link from "next/link";
import { Users, PackageCheck, Rocket, Building2, Pentagon, Scale, Headset, Handshake, Globe, Sparkles, Settings2, Cpu, MessageSquare, ClipboardList, PlayCircle, LogIn, Star, DollarSign, Shield } from "lucide-react";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const bannerText = "Live Webinar: Learn How To Use AI to Create AI — October 15, 2025"
  
  const IMAGES = {
    hero: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=60",
    accordion: "https://images.unsplash.com/photo-1559027615-5def3621f98f?auto=format&fit=crop&w=1400&q=60",
    splits: [
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1400&q=60",
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1400&q=60",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=60",
    ],
    cases: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1506765515384-028b60a970df?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&q=60",
      "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?auto=format&fit=crop&w=1200&q=60",
    ],
  } as const
  return (
    <main>
      {/* Top navigation */}
      <TopWebinarBanner text={bannerText} />
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold text-[var(--color-primary)]">CMDR</div>
          <nav className="flex items-center gap-6 text-sm font-semibold text-[var(--color-text)]">
            <a href="#benefits" className="hover:text-[var(--color-primary)]">Benefits</a>
            <a href="#process" className="hover:text-[var(--color-primary)]">Our Process</a>
            <a href="#work-together" className="hover:text-[var(--color-primary)]">Working With Us</a>
            <a href="#examples" className="hover:text-[var(--color-primary)]">Project Examples</a>
            <Link href="/login" aria-label="Login" title="Login" className="ml-2 inline-flex items-center rounded-full border border-[var(--color-border)] p-2 hover:bg-[var(--color-surface-alt)]">
              <LogIn className="size-4" />
            </Link>
          </nav>
        </div>
      </header>
      {/* Hero */}
      <section className="relative bg-white">
        <div className="container mx-auto grid grid-cols-1 gap-6 px-6 py-20 md:grid-cols-2 md:items-center md:gap-8 xl:gap-10">
          <div>
          <div className="inline-block rounded-md bg-[var(--color-primary-50)] px-3 py-1 text-sm font-semibold text-[var(--color-primary)]">Build Your AI Business Brain</div>
          <h1 className="mt-4 max-w-[680px] text-[clamp(18px,2.4vw,40px)] font-semibold leading-tight text-[var(--color-text)]">
            <span className="block">Stop Renting AI.</span>
            <span className="block">Start Owning It.</span>
          </h1>
          <div className="mt-4 max-w-[560px]">
            <p className="text-lg text-[var(--color-text-muted)]">Build your unified AI brain once, then rapidly iterate AI modules on top of it. Own your intelligence. Control your data. Build solutions in days, not months.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* AI Ideation Agent modal */}
            <Dialog open={chatOpen} onOpenChange={setChatOpen}>
              <DialogTrigger asChild>
                <button className="btn-primary">Try Our AI Ideation Agent</button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-3xl p-0">
                <DialogHeader className="sr-only">
                  <DialogTitle>AI Ideation Agent</DialogTitle>
                </DialogHeader>
                <PublicIdeationChat onClose={() => setChatOpen(false)} onRequestSignup={() => { setSelectedPlan(null); setSignupOpen(true); }} />
              </DialogContent>
            </Dialog>

            {/* Talk to an Advisor modal */}
            <AdvisorRequestDialog />

            {/* Client Signup modal instance stays mounted for membership section triggers */}
            <ClientSignupDialog open={signupOpen} onOpenChange={setSignupOpen} initialPlan={selectedPlan} />
            </div>
          </div>
          </div>
          {/* close left column wrapper */}
          
          <div className="hidden self-stretch md:block md:justify-self-end md:pl-6 lg:pl-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/hero-image-2.png" alt="Hero" className="w-full h-auto max-w-[480px] lg:max-w-[520px] rounded-md border border-[var(--color-border)]" />
          </div>
        </div>
      </section>

      {/* The Proof - Asa Hutchinson Story */}
      <section className="bg-gradient-to-br from-[var(--color-primary-50)] to-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block rounded-md bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white mb-4">Real-World Proof</div>
            <h2 className="text-4xl font-semibold text-[var(--color-text)]">How a Presidential Campaign Proved the Concept</h2>
            <p className="mt-3 text-lg text-[var(--color-text-muted)] max-w-3xl mx-auto">Before we built this for businesses, we proved it worked under extreme pressure.</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-semibold text-[var(--color-text)] mb-3">Governor Asa Hutchinson's Digital Twin</h3>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">We built an AI brain for a presidential campaign. Trained exclusively on verified speeches, emails, policy documents, and approved media.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <div className="font-semibold text-[var(--color-text)]">8,000 questions per hour</div>
                      <div className="text-sm text-[var(--color-text-muted)]">People trying to trick it, catch it in errors. Zero hallucinations.</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <div className="font-semibold text-[var(--color-text)]">Swapped LLMs in 24 hours</div>
                      <div className="text-sm text-[var(--color-text-muted)]">Moved from one AI model to another with zero disruption. LLM-agnostic architecture.</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <div className="font-semibold text-[var(--color-text)]">The epiphany</div>
                      <div className="text-sm text-[var(--color-text-muted)]">This is how EVERY business should operate with AI. The brain is the asset, not the engine.</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border-2 border-[var(--color-primary)] bg-white p-8 shadow-xl">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-[var(--color-primary)]">Why It Matters</div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-[var(--color-primary-50)] rounded-lg">
                    <PackageCheck className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0" />
                    <span className="text-sm font-medium text-[var(--color-text)]">Can't be wrong - trained only on verified data</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[var(--color-primary-50)] rounded-lg">
                    <Shield className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0" />
                    <span className="text-sm font-medium text-[var(--color-text)]">Can't hallucinate - controlled outputs</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[var(--color-primary-50)] rounded-lg">
                    <Globe className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0" />
                    <span className="text-sm font-medium text-[var(--color-text)]">Portable - not locked to one vendor</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[var(--color-primary-50)] rounded-lg">
                    <Sparkles className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0" />
                    <span className="text-sm font-medium text-[var(--color-text)]">Scalable - handles massive demand</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center p-6 bg-white rounded-xl border border-[var(--color-border)] shadow-lg">
              <p className="text-xl font-semibold text-[var(--color-text)] italic">"If this architecture can handle a presidential campaign, it can handle your business."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Projects (auto-scrolling) */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-semibold text-[var(--color-text)]">AI Modules Built on Our Clients' Brains</h2>
            <p className="mt-2 text-[var(--color-text-muted)]">Real modules rapidly deployed on top of unified AI brain foundations. Each one makes the whole system smarter.</p>
          </div>

          {/* Marquee wrapper */}
          <div className="relative overflow-hidden">
            {/* gradient fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />

            <div className="marquee-track">
              {[...Array(2)].map((loop, loopIdx) => (
                <div key={loopIdx} className="marquee-row">
                  {([
                    { title: 'Weekly KPI Deck Generator', desc: 'Auto-pulls metrics, commentary, and charts into a client-ready deck.' },
                    { title: 'Lead Enrichment Agent', desc: 'Fills missing firmographics and intent data in your CRM.' },
                    { title: 'Competitor Monitoring Bot', desc: 'Tracks pricing, messaging, and launches with alerts in Slack.' },
                    { title: 'Social Variations Engine', desc: 'Turns one hero post into 25 platform‑specific variants.' },
                    { title: 'Support Triage Assistant', desc: 'Reads inbound tickets, drafts replies, and routes to the right owner.' },
                    { title: 'SEO Brief Builder', desc: 'Generates briefs with outlines, entities, and interlinking suggestions.' },
                    { title: 'Sales Call Notes → CRM', desc: 'Transcribes calls, extracts next steps, updates opportunities.' },
                    { title: 'QA for Data Pipelines', desc: 'Validates daily jobs and flags anomalies with suggested fixes.' },
                    { title: 'Campaign Asset Factory', desc: 'Batch creates ad copy, images prompts, and landing sections.' },
                    { title: 'Product Catalog Normalizer', desc: 'Cleans and standardizes attributes across marketplaces.' },
                    { title: 'Invoice Reconciliation', desc: 'Matches vendor invoices to POs, flags discrepancies for review.' },
                    { title: 'Weekly News Summarizer', desc: 'Monitors sources and emails exec-ready summaries by topic.' },
                    { title: 'Onboarding Checklist Agent', desc: 'Assembles steps and nudges owners to keep implementations moving.' },
                    { title: 'Research Dossier Builder', desc: 'Compiles company + market profiles with cited sources.' },
                    { title: 'NPS Comment Classifier', desc: 'Groups feedback by theme and suggests top actions.' },
                    { title: 'Churn Risk Signals', desc: 'Surfaces accounts at risk using usage + ticket signals.' },
                    { title: 'Data Room Organizer', desc: 'Auto-sorts files, extracts key facts, builds a quick index.' },
                    { title: 'SOW Drafting Assistant', desc: 'Turns discovery notes into a structured scope draft.' },
                    { title: 'Performance Alerts', desc: 'Watches KPIs and pings owners when thresholds are crossed.' },
                    { title: 'Recruiting Screener', desc: 'Scores applicants, drafts outreach, and schedules screens.' },
                  ] as const).map((p, i) => (
                    <div key={`${loopIdx}-${i}`} className="marquee-card">
                      <div className="text-sm font-semibold text-[var(--color-text)]">{p.title}</div>
                      <div className="mt-1 text-xs text-[var(--color-text-muted)]">{p.desc}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      {/* Core Value Props */}
      <section id="benefits" className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold leading-tight text-[var(--color-text)]">Why an AI Brain Changes Everything</h2>
          <p className="mx-auto mt-3 max-w-3xl text-[var(--color-text-muted)]">A unified, private intelligence system that captures your company data, knowledge, and brand voice. Build the foundation once, then rapidly iterate modules on top. Each module makes your entire system smarter.</p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {([
              { icon: Rocket, title: 'The LEGO Principle', desc: 'Build your AI brain foundation once. Stack AI modules on top. Each module launches in days and makes the whole system smarter.' },
              { icon: Cpu, title: 'Own Your Intelligence', desc: 'Stop renting from vendors. Capture your company data, knowledge, brand voice in a private system that learns from every interaction.' },
              { icon: Settings2, title: 'LLM Agnostic & Future-Proof', desc: 'Swap AI models (GPT, Claude, Gemini, Llama) in 24 hours with zero disruption. The brain is the asset, not the engine.' },
            ] as const).map((item, i) => (
              <div key={i} className="rounded-xl border border-[var(--color-border)] bg-white p-8 text-center shadow-card hover:shadow-xl transition-shadow">
                <div className="mx-auto mb-4">
                  <IconBadge icon={item.icon} size={64} boxed />
                </div>
                <div className="text-lg font-semibold text-[var(--color-text)]">{item.title}</div>
                <p className="mt-2 text-[var(--color-text-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Secondary Benefits - 4 across */}
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {([
              { icon: PackageCheck, title: 'Compounding Intelligence', desc: 'Each module you add multiplies value. Every interaction teaches the whole system. Knowledge stays when people leave.' },
              { icon: Shield, title: 'Private & Controlled', desc: 'You control what it learns and says. Your data stays private. Train on verified content only—no hallucinations.' },
              { icon: Globe, title: 'Vendor Independent', desc: 'Not locked into one AI provider. Switch models anytime. Your brain is portable, resilient, and truly yours.' },
              { icon: Sparkles, title: 'Built to Scale', desc: 'Start with one high-value module. Prove ROI in 90 days. Then replicate wins across departments.' },
            ] as const).map((item, i) => (
              <div key={i} className="flex flex-col items-center rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-card hover:shadow-lg transition-shadow">
                <div className="mb-3">
                  <IconBadge icon={item.icon as any} size={56} />
                </div>
                <div className="text-base font-semibold text-[var(--color-text)] text-center">{item.title}</div>
                <p className="mt-2 text-sm text-[var(--color-text-muted)] text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rent vs Own - Real Examples */}
      <section className="bg-[var(--color-surface-alt)] py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-[var(--color-text)]">The Cost of Renting Your Intelligence</h2>
            <p className="mt-3 text-lg text-[var(--color-text-muted)] max-w-3xl mx-auto">Real examples of what happens when you don't own your AI.</p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl border-2 border-red-200 bg-white p-8 shadow-lg">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xl">X</div>
                <div>
                  <div className="text-xl font-semibold text-[var(--color-text)] mb-2">Renting: The Vendor Lock-In Trap</div>
                  <div className="text-sm text-[var(--color-text-muted)]">Supermetrics Example</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm text-[var(--color-text)]">Original Cost</span>
                  <span className="font-bold text-red-600">$500/mo</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-100 rounded-lg">
                  <span className="text-sm text-[var(--color-text)]">Wanted to use their own data for AI</span>
                  <span className="font-bold text-red-600">$20K + 2-year contract</span>
                </div>
                <div className="mt-4 p-4 bg-red-600 text-white rounded-lg text-center">
                  <div className="text-2xl font-bold">40x price increase</div>
                  <div className="text-sm mt-1">When they wanted to own their data</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border-2 border-green-200 bg-white p-8 shadow-lg">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl">✓</div>
                <div>
                  <div className="text-xl font-semibold text-[var(--color-text)] mb-2">Owning: The AI Brain Approach</div>
                  <div className="text-sm text-[var(--color-text-muted)]">Salesforce Replacement Example</div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <span className="text-sm text-[var(--color-text)]">Salesforce Cost</span>
                  <span className="font-bold text-red-600">$300K/year</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm text-[var(--color-text)]">Custom AI Brain Built</span>
                  <span className="font-bold text-green-600">$37.5K</span>
                </div>
                <div className="mt-4 p-4 bg-green-600 text-white rounded-lg text-center">
                  <div className="text-2xl font-bold">1/8th the cost</div>
                  <div className="text-sm mt-1">Plus they own it forever</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-3xl mx-auto text-center p-8 bg-white rounded-xl border-2 border-[var(--color-primary)] shadow-xl">
            <h3 className="text-2xl font-semibold text-[var(--color-text)] mb-3">The Question Every Leader Should Ask:</h3>
            <p className="text-xl text-[var(--color-primary)] font-semibold italic">"Are we renting our intelligence from vendors or owning it?"</p>
          </div>
        </div>
      </section>

      

      {/* (Removed) Member Benefits grid here to avoid duplication; now shown lower on the page */}

      {/* Single testimonial band with background (moved above How Our Members Get To Work) */}
      <section
        className="relative py-16 text-center"
        style={{
          backgroundImage: 'url(/outsourcing_background.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative mx-auto max-w-4xl px-6">
          <p className="text-2xl font-semibold leading-relaxed text-white">
            “It’s like a Costco membership for senior level production of everything — 90% less cost, 500% faster, and 2× better quality.”
          </p>
          <div className="mt-4 text-white/90">— Debbie Tetz<br />Ad TV Media</div>
        </div>
      </section>

      {/* Engagement Process */}
      <section id="process" className="relative bg-[var(--color-surface-alt)] py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-[var(--color-text)]">How We Build Your AI Brain</h2>
            <p className="mt-2 text-[var(--color-text-muted)]">From scattered tools to unified intelligence in 90 days</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {([
              { 
                step: 'Day 1-14', 
                title: 'Strategy & Data Discovery',
                desc: 'We identify your highest-value AI opportunity and map the data sources that will fuel your brain. No assumptions—just strategy aligned with measurable outcomes.',
                bullets: ['Pinpoint your AI hotspot with clear ROI potential', 'Map existing data sources and knowledge repositories', 'Define success metrics and governance structure']
              },
              { 
                step: 'Day 15-30',
                title: 'Build the Brain Foundation',
                desc: 'We architect your unified, private AI brain—LLM-agnostic, scalable, and owned by you. This becomes the foundation for every module you build from here on.',
                bullets: ['Build your LLM-agnostic brain architecture', 'Connect your data sources and knowledge systems', 'Establish governance, security, and learning loops']
              },
              { 
                step: 'Day 31-60',
                title: 'Launch Your First Module',
                desc: 'We build and deploy your first AI module on top of your brain. Fast, focused, and measurable—proving value before scaling.',
                bullets: ['Develop your first high-value AI module', 'Train your brain on verified, specific data', 'Deploy and train your team to use it']
              },
              { 
                step: 'Day 61-90',
                title: 'Measure, Learn & Stack',
                desc: 'We measure results, gather feedback, and identify your next module. The brain learns from every interaction. Now you can rapidly iterate new modules on top.',
                bullets: ['Track outcomes and refine based on feedback', 'Plan your next module (faster this time)', 'Build momentum with compounding intelligence']
              },
            ] as const).map((item, i) => (
              <div key={i} className="rounded-xl border border-[var(--color-border)] bg-white p-6 shadow-card hover:shadow-xl transition-shadow">
                <div className="mb-3 inline-block rounded-full bg-[var(--color-primary-50)] px-3 py-1 text-xs font-bold text-[var(--color-primary)]">{item.step}</div>
                <div className="text-lg font-semibold text-[var(--color-text)] mb-3">{item.title}</div>
                <p className="text-sm text-[var(--color-text-muted)] mb-4">{item.desc}</p>
                <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                  {item.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways We Can Work Together */}
      <section id="work-together" className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-[var(--color-text)]">Three Ways to Build Your AI Brain</h2>
          </div>
          
          <div className="space-y-10">
        {([
          {
            number: '01',
            title: 'Start with a Quick Win (90-Day Pilot)',
            desc: 'We build your AI brain foundation and deploy one high-value module in 90 days. Prove ROI fast with measurable outcomes. Show your team what is possible before scaling. Perfect for testing the AI brain approach without a full transformation commitment.',
          },
          {
            number: '02',
            title: 'AI Strategy Workshop (Learn the Framework)',
            desc: 'Our team runs hands-on workshops teaching you the 7-step framework to build AI brains. You identify your AI hotspot, map your 90-day pilot, and leave with a concrete 30-60-90 roadmap. Great for leaders who want to own the strategy before building.',
          },
          {
            number: '03',
            title: 'Full AI Brain Platform (Build & Scale)',
            desc: 'We architect your unified AI brain, deploy your first module, then rapidly iterate new modules on top. Each module makes the whole system smarter. This is the compounding intelligence approach—not scattered tools, but one cohesive brain that learns from every interaction.',
          },
        ] as const).map((step, row) => (
          <div
            key={step.title}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-8 shadow-card"
          >
            <div className="flex items-start gap-6">
              <div className="text-6xl font-bold text-[var(--color-primary)] opacity-20">{step.number}</div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-[var(--color-text)]">{step.title}</h3>
                <p className="mt-3 text-[var(--color-text-muted)] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          </div>
        ))}
          </div>
        </div>
      </section>

      {/* Testimonial placeholder */}
      <section className="container mx-auto grid grid-cols-1 gap-8 px-6 py-16 md:grid-cols-2">
        <div className="card p-6">
          <p className="text-lg italic text-[var(--color-text)]">“Our reporting process went from days to hours. Costs dropped by 85%, and the quality of insights actually improved.”</p>
        </div>
        <div className="card p-6">
          <p className="text-lg italic text-[var(--color-text)]">“Managed AI made us rethink how we get work done.”</p>
        </div>
      </section>

      

      {/* Capabilities lists - removed per request */}

      {/* Our Recent Custom AI Builds */}
      <section id="examples" className="bg-[var(--color-surface-alt)] py-16" style={{ backgroundColor: 'var(--color-surface-alt)' }}>
        <div className="container mx-auto px-6">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold text-[var(--color-text)]">Our Recent Custom AI Builds</h2>
            <p className="mt-2 text-[var(--color-text-muted)]">Real-world AI solutions we've built for clients across industries.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Social Media Automation",
                client: "Retail Brand",
                desc: "Built a content pipeline and posting agent that scaled to 200 campaigns.",
                our: { hours: 48, cost: "$3,600" },
                traditional: { hours: 320, cost: "$48,000" },
              },
              {
                title: "Client Reporting at Scale",
                client: "Agency",
                desc: "Automated data pulls, insights, and formatted decks across portfolios.",
                our: { hours: 36, cost: "$2,700" },
                traditional: { hours: 180, cost: "$18,000" },
              },
              {
                title: "CRM Data Enrichment",
                client: "SaaS",
                desc: "Real‑time lead enrichment and alerts, improving follow‑up and win rates.",
                our: { hours: 30, cost: "$2,250" },
                traditional: { hours: 140, cost: "$14,000" },
              },
              {
                title: "Ops Workflow Automation",
                client: "E‑commerce",
                desc: "Replaced manual ops handoffs with multi‑agent workflows and QA gates.",
                our: { hours: 60, cost: "$4,500" },
                traditional: { hours: 400, cost: "$60,000" },
              },
              // New additional case studies
              {
                title: "Email Personalization",
                client: "Fintech",
                desc: "Dynamic content and scoring increased CTR by 28%.",
                our: { hours: 24, cost: "$1,800" },
                traditional: { hours: 110, cost: "$11,000" },
              },
              {
                title: "Forecasting Dashboard",
                client: "Logistics",
                desc: "Unified demand signals and predictive ETAs for planners.",
                our: { hours: 44, cost: "$3,300" },
                traditional: { hours: 260, cost: "$26,000" },
              },
              {
                title: "Knowledge Base Assistant",
                client: "Support",
                desc: "Auto‑drafted answers cut handle time by 35%.",
                our: { hours: 32, cost: "$2,400" },
                traditional: { hours: 180, cost: "$18,000" },
              },
            ].map((c, i) => (
              <div key={i} className="flex flex-col overflow-hidden rounded-xl bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMAGES.cases[i]} alt="Case study" className="h-40 w-full object-cover shadow-lg" />
                <div className="flex flex-1 flex-col p-5">
                  <div className="text-sm text-[var(--color-text-muted)]">{c.client}</div>
                  <div className="mt-1 min-h-[48px] text-[var(--color-text)] font-semibold">{c.title}</div>
                  <p className="mt-2 min-h-[60px] text-sm text-[var(--color-text-muted)]">{c.desc}</p>

                  <div className="mt-auto pt-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex flex-col items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-center">
                        <div className="text-[var(--color-text)] font-semibold">Our way</div>
                        <div className="mt-1 text-[var(--color-text-muted)]">{c.our.hours} hrs</div>
                        <div className="text-[var(--color-text)]">{c.our.cost}</div>
                      </div>
                      <div className="flex flex-col items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-center">
                        <div className="text-[var(--color-text)] font-semibold">Traditional</div>
                        <div className="mt-1 text-[var(--color-text-muted)]">{c.traditional.hours} hrs</div>
                        <div className="text-[var(--color-text)]">{c.traditional.cost}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Large embedded form moved to last section before footer */}

      {/* Why Work With Us */}
      <section id="why-work-with-us" className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold text-[var(--color-text)]">Why Work With Us</h2>
            <p className="mt-2 text-[var(--color-text-muted)]">The benefits of partnering with CMDR for your AI transformation</p>
          </div>
          
          <div className="mx-auto max-w-6xl">
            <MemberBenefitsGrid />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-primary-50)] py-16">
        <div className="container mx-auto px-6">
          <div className="card mx-auto max-w-2xl p-6">
            <h3 className="text-2xl font-semibold text-[var(--color-text)]">Discover a faster, cheaper, smarter way to work.</h3>
            <p className="mt-2 text-[var(--color-text-muted)]">Start today — share your email and we’ll send details, examples, and pricing.</p>
            <form className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input className="flex-1 rounded-md border border-[var(--color-border)] px-3 py-2" placeholder="Your work email" />
              <button className="btn-primary">Get Details by Email</button>
            </form>
          </div>
        </div>
      </section>

      

      {/* Footer */}
      <footer className="border-t bg-[var(--color-navy)] py-12 text-white">
        <div className="container mx-auto px-6">
          {/* Top section with logo and main navigation */}
          <div className="flex flex-col items-center justify-between gap-8 pb-8 md:flex-row">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            {/* Logo */}
            <div className="text-2xl font-bold text-white">CMDR</div>
              
              {/* Main navigation links */}
              <nav className="flex flex-wrap items-center justify-center gap-6 text-sm md:justify-start">
                <a href="#benefits" className="text-white/80 hover:text-white">Benefits</a>
                <a href="#process" className="text-white/80 hover:text-white">Our Process</a>
                <a href="#work-together" className="text-white/80 hover:text-white">Working With Us</a>
                <a href="#examples" className="text-white/80 hover:text-white">Project Examples</a>
              </nav>
            </div>
            
            {/* Contact info */}
            <div className="text-sm">
              <a href="mailto:danny@nbrain.ai" className="text-white/80 hover:text-white">danny@nbrain.ai</a>
            </div>
          </div>
          
          {/* Divider */}
          <div className="border-t border-white/20"></div>
          
          {/* Bottom section with copyright */}
          <div className="flex flex-col items-center justify-between gap-4 pt-8 text-sm md:flex-row">
            <div className="text-white/60">© {new Date().getFullYear()} CMDR. All rights reserved.</div>
            <div className="flex items-center gap-6 text-white/60">
              <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ComparisonGrid() {
  const [rows, setRows] = useState<Array<string[]>>([])
  useEffect(() => {
    ;(async () => {
      try {
        const r = await fetch('/compare.csv', { cache: 'no-store' })
        const text = await r.text()
        const lines = text.replace(/^\uFEFF/, '').trim().split(/\r?\n/)
        const parseLine = (line: string): string[] => {
          const out: string[] = []
          let cur = ''
          let inQuotes = false
          for (let i = 0; i < line.length; i++) {
            const ch = line[i]
            if (ch === '"') {
              if (inQuotes && line[i+1] === '"') { cur += '"'; i++; continue }
              inQuotes = !inQuotes; continue
            }
            if (ch === ',' && !inQuotes) { out.push(cur.trim()); cur = ''; continue }
            cur += ch
          }
        out.push(cur.trim());
        return out.map(s => s.replace(/^\"|\"$/g,'').trim())
        }
        const parsed = lines.map(parseLine)
        setRows(parsed)
      } catch {}
    })()
  }, [])

  if (rows.length === 0) return null
  const [rawHeader, ...data] = rows
  const columns = rawHeader.map((h, i) => (h.toLowerCase() === 'consistency' ? 'Quality' : h))

  const renderBars = (cell: string) => {
    const muted = 'text-[var(--color-border)]'
    const active = 'text-[var(--color-primary)]'
    const cap = 4
    if (!cell) return <span className={muted}>—</span>
    const ch = cell.trim()[0]
    if (ch !== '*' && ch !== '$') return <span className="text-[var(--color-text)]">{cell}</span>
    const count = Math.min(cap, cell.trim().length)
    const symbol = ch
    const Icon = symbol === '*' ? Star : DollarSign
    return (
      <span className="inline-flex gap-0.5">
        {Array.from({ length: cap }).map((_, i) => (
          <Icon key={i} className={`h-4 w-4 ${i < count ? active : muted}`} />
        ))}
      </span>
    )
  }

  return (
    <div className="mx-auto mt-10 max-w-6xl overflow-x-auto rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-card text-left">
      <div className="mb-3 text-left text-lg font-semibold text-[var(--color-text)]">How We Compare</div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[var(--color-text-muted)]">
            {columns.map((c, i) => (
              <th key={i} className={`py-2 ${i===0?'min-w-[160px] pr-2':''} ${i>0 && i<columns.length-1 ? 'pr-6' : ''}`}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((r, ri) => (
            <tr key={ri} className="border-t border-[var(--color-border)]">
              {r.map((cell, ci) => {
                const cellClass = `py-3 ${ci===0 ? 'pr-2' : ci<columns.length-1 ? (ci===1 ? 'pl-1 pr-6' : 'pr-6') : 'pl-2'} align-top text-[var(--color-text)]`
                return (
                  <td key={ci} className={cellClass}>
                    {ci === 0 ? <span className="font-medium">{cell}</span> : renderBars(cell)}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PricingGridFromCSV() {
  const [rows, setRows] = useState<Array<string[]>>([])
  useEffect(()=>{
    ;(async()=>{
      try{
        const r = await fetch('/services-new-2.csv', { cache: 'no-store' })
        const text = await r.text()
        const lines = text.replace(/^\uFEFF/, '').trim().split(/\r?\n/)
        const parseLine = (line: string): string[] => {
          const out: string[] = []
          let cur = ''
          let inQ = false
          for (let i=0;i<line.length;i++){
            const ch = line[i]
            if (ch==='"') { if (inQ && line[i+1]==='"'){ cur+='"'; i++; continue } inQ=!inQ; continue }
            if (ch===',' && !inQ) { out.push(cur.trim()); cur=''; continue }
            cur += ch
          }
          out.push(cur.trim());
          return out.map(s=>s.replace(/^\"|\"$/g,'').trim())
        }
        const parsed = lines.map(parseLine).filter(r=>r.length>0)
        setRows(parsed)
      } catch {}
    })()
  },[])

  if (rows.length < 3) return null
  // Expecting three columns: header row (plan names), price row, and subsequent feature rows
  const [headerRow, priceRow, ...featureRows] = rows
  const planNames = headerRow
  const prices = priceRow

  // Build tiers: index 0 is empty label; columns 1..n are plans
  const tiers = planNames.slice(0, 3).map((_v, i) => {
    const name = planNames[i] || ''
    const price = (prices[i] || '').replace('/Yearly','/Year').replace('/Lifetime','/lifetime')
    const period = price.includes('/Year') || price.includes('/year') ? '/year' : (price.toLowerCase().includes('lifetime') ? '/lifetime' : '')
    const priceOnly = price.replace('/year','').replace('/lifetime','')
    const bullets: string[] = []
    for (const fr of featureRows) {
      const cell = fr[i] || ''
      if (cell) bullets.push(cell)
    }
    return { name, price: priceOnly || name, period, bullets }
  })

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
      {tiers.map((tier, idx)=> (
        <div key={idx} className={`flex h-full flex-col rounded-xl border bg-white p-6 shadow-card ${idx===1 ? 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]' : 'border-[var(--color-border)]'}`}>
          <div className="mb-3 h-6">
            {idx===1 && (
              <div className="inline-block rounded-full bg-[var(--color-primary-50)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">Most popular</div>
            )}
            {idx===2 && (
              <div className="inline-block rounded-full bg-[var(--color-primary-50)] px-3 py-1 text-xs font-semibold text-[var(--color-primary)]">Only 12 Spots Left</div>
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-semibold text-[var(--color-text)]">{tier.price}</div>
            <div className="text-[var(--color-text-muted)]">{tier.period}</div>
          </div>
          <ul className="mt-4 flex-1 space-y-2 text-[var(--color-text)]">
            {tier.bullets.map((b, bi)=> (
              <li key={bi} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                <span className="text-[var(--color-text-muted)]">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function MemberBenefitsGrid() {
  const [items, setItems] = useState<Array<{ title: string; desc: string }>>([])
  useEffect(()=>{
    ;(async()=>{
      try{
        const r = await fetch('/member-benefits.csv', { cache: 'no-store' })
        const text = await r.text()
        const lines = text.replace(/^\uFEFF/, '').trim().split(/\r?\n/)
        const parseLine = (line: string): string[] => {
          const out: string[] = []
          let cur = ''
          let inQ = false
          for (let i=0;i<line.length;i++){
            const ch = line[i]
            if (ch==='"') { if (inQ && line[i+1]==='"'){ cur+='"'; i++; continue } inQ=!inQ; continue }
            if (ch===',' && !inQ) { out.push(cur.trim()); cur=''; continue }
            cur += ch
          }
          out.push(cur.trim());
          return out
        }
        const parsed = lines.map(parseLine).map(([title, desc])=>({ title, desc }))
        setItems(parsed)
      } catch {}
    })()
  },[])

  // map benefit titles to icons (fallback Sparkles)
  const pickIcon = (title: string) => {
    const t = title.toLowerCase()
    if (t.includes('instant') || t.includes('adoption')) return Rocket
    if (t.includes('cost') || t.includes('savings') || t.includes('pay')) return Scale
    if (t.includes('human') || t.includes('advisor') || t.includes('partnership') || t.includes('collaboration')) return Headset
    if (t.includes('quality')) return PackageCheck
    if (t.includes('scalable') || t.includes('infinitely')) return Users
    if (t.includes('learn') || t.includes('by doing')) return Sparkles
    if (t.includes('private') || t.includes('secure') || t.includes('own')) return ShieldIcon
    if (t.includes('advanced')) return Cpu
    if (t.includes('always up to date') || t.includes('updated')) return Settings2
    if (t.includes('works') || t.includes('projects') || t.includes('task-agnostic') || t.includes('simple') || t.includes('complex')) return Building2
    return Sparkles
  }

  // lightweight Shield icon using lucide classes via inline svg to avoid extra import
  const ShieldIcon = (props: any) => (<svg viewBox="0 0 24 24" className={props.className || 'h-6 w-6'} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>)

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {items.map((it, idx)=>{
        const Icon = pickIcon(it.title)
        return (
          <div key={idx} className="flex items-start gap-4 rounded-lg border border-[var(--color-border)] bg-white p-6">
            <IconBadge icon={Icon as any} size={56} boxed />
            <div>
              <div className="text-[var(--color-text)] font-semibold">{it.title}</div>
              <p className="mt-1 text-[var(--color-text-muted)]">{it.desc}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
