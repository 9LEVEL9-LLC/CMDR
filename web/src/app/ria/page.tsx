'use client';

import { useState } from 'react';

export default function RIALandingPage() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    firm: '',
    aum: '',
    teamSize: ''
  });

  return (
    <div style={{ minHeight: '100vh', margin: 0, padding: 0 }}>
      {/* Top Badge + Login */}
      <div style={{ backgroundColor: '#00072D', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.75rem',
          padding: '0.5rem 1.5rem',
          borderRadius: '2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          fontSize: '0.95rem',
          fontWeight: '500'
        }}>
          <span style={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            backgroundColor: '#10B981',
            borderRadius: '50%',
            animation: 'pulse 2s infinite'
          }}></span>
          Built for RIAs • Save 20-40hrs/week • Focus on Clients, Not Chaos
        </div>
        
        <a 
          href="/login" 
          style={{
            color: 'white',
            textDecoration: 'none',
            padding: '0.5rem 1.5rem',
            borderRadius: '0.5rem',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            fontSize: '0.95rem',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          }}
        >
          Platform Login →
        </a>
      </div>

      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #00072D 0%, #051650 100%)',
        padding: '6rem 2rem 7rem 2rem',
        color: 'white',
        margin: 0
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1.5rem',
            borderRadius: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            color: 'white',
            fontSize: '0.9rem',
            fontWeight: '600',
            marginBottom: '2rem',
            letterSpacing: '0.5px'
          }}>
            CMD R FOR RIAs
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: '700',
            lineHeight: '1.15',
            marginBottom: '2rem',
            letterSpacing: '-0.02em'
          }}>
            Recovery Mode for<br />
            <span style={{ color: '#6B9FFF' }}>Your Back Office</span>
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            maxWidth: '900px',
            margin: '0 auto 3.5rem auto',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: '1.6'
          }}>
            Turn compliance, operations, and admin chaos into an always-on,<br />
            AI-assisted back office so you can get back to <span style={{ color: '#6B9FFF', fontWeight: '600' }}>clients, growth, and sleep</span>
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <button 
              onClick={() => setShowModal(true)}
              style={{
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                borderRadius: '0.75rem',
                background: '#6B9FFF',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 14px rgba(107, 159, 255, 0.4)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(107, 159, 255, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(107, 159, 255, 0.4)';
              }}
            >
              Activate Recovery Mode
            </button>
            
            <a 
              href="#how-it-works"
              style={{
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                borderRadius: '0.75rem',
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'white';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
            >
              See How It Fits Your Firm
            </a>
          </div>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {[
              { number: '20-40hrs', label: 'Reclaimed Weekly', sublabel: 'Focus on clients & growth' },
              { number: '3-5x', label: 'Faster Workflows', sublabel: 'Compliance, ops & billing' },
              { number: '100%', label: 'Audit-Ready', sublabel: 'Documentation & processes' },
              { number: '$0', label: 'Key-Person Risk', sublabel: 'Knowledge lives in system' }
            ].map((stat, i) => (
              <div key={i} style={{
                padding: '2rem 1.5rem',
                borderRadius: '1rem',
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#6B9FFF', marginBottom: '0.5rem' }}>
                  {stat.number}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section style={{ 
        padding: '5rem 2rem',
        background: '#F9FAFB'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '700',
              color: '#00072D',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              Your Back Office Is<br />
              <span style={{ color: '#123499' }}>Stealing Your Alpha</span>
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#374151',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              Every independent firm hits the same wall: the more you grow, the more your calendar fills with tasks that have nothing to do with advice
            </p>
          </div>

          {/* Problem Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {[
              {
                title: 'Compliance Load',
                hours: '15-20 hrs/week',
                description: 'Filings, marketing reviews, documentation, and ever-changing rules consume a disproportionate share of time and attention',
                pain: 'High'
              },
              {
                title: 'Operational Drag',
                hours: '10-15 hrs/week',
                description: 'Account opening, money movement, reporting, billing, and custodial workflows are slow, error-prone, and overly manual',
                pain: 'Critical'
              },
              {
                title: 'Tech Sprawl',
                hours: '5-8 hrs/week',
                description: 'Multiple overlapping tools that do not integrate well, creating duplicate data entry, gaps, and confusion',
                pain: 'High'
              },
              {
                title: 'Staffing & Role Clarity',
                hours: '8-12 hrs/week',
                description: 'Overreliance on a few key people, turnover, and unclear responsibilities create bottlenecks and burnout',
                pain: 'Critical'
              },
              {
                title: 'Calendar Pressure',
                hours: '10-15 hrs/week',
                description: 'Too many low-value tasks and interruptions, not enough deep work time for clients, strategy, or business development',
                pain: 'High'
              },
              {
                title: 'Manual Workflows',
                hours: '12-18 hrs/week',
                description: 'Follow-ups, meeting prep, client communication, and review prep all handled manually with no standardization',
                pain: 'Critical'
              }
            ].map((problem, i) => (
              <div key={i} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '1rem',
                border: '1px solid #E5E7EB',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#00072D', margin: 0 }}>
                    {problem.title}
                  </h3>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '1rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backgroundColor: problem.pain === 'Critical' ? '#FEE2E2' : '#FEF3C7',
                    color: problem.pain === 'Critical' ? '#991B1B' : '#92400E'
                  }}>
                    {problem.pain}
                  </span>
                </div>
                <div style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  color: '#EF4444',
                  marginBottom: '1rem'
                }}>
                  {problem.hours}
                </div>
                <p style={{ 
                  color: '#6B7280', 
                  lineHeight: '1.6',
                  margin: 0,
                  fontSize: '1rem'
                }}>
                  {problem.description}
                </p>
              </div>
            ))}
          </div>

          {/* Quote Box */}
          <div style={{
            background: 'linear-gradient(135deg, #00072D 0%, #051650 100%)',
            padding: '3rem',
            borderRadius: '1rem',
            border: '1px solid #123499',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <div style={{ fontSize: '3rem', color: '#6B9FFF', marginBottom: '1rem', lineHeight: 1 }}>"</div>
            <p style={{
              fontSize: '1.35rem',
              color: 'white',
              lineHeight: '1.7',
              fontStyle: 'italic',
              margin: '0 0 1.5rem 0'
            }}>
              Your tech stack was supposed to help, but now you're juggling logins, spreadsheets, and half-integrated tools while still relying on the same overextended people to hold it all together. One staff change, one exam notice, or one big market event and the wheels start to wobble.
            </p>
            <div style={{ color: '#6B9FFF', fontWeight: '600', fontSize: '1.1rem' }}>
              — Every RIA Principal We've Talked To
            </div>
          </div>
        </div>
      </section>

      {/* Solution/Positioning Section */}
      <section style={{
        padding: '5rem 2rem',
        background: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              borderRadius: '2rem',
              backgroundColor: '#E6EAF5',
              color: '#123499',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              letterSpacing: '0.5px'
            }}>
              THE SOLUTION
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '700',
              color: '#00072D',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              CMD R: Your AI-Assisted<br />
              <span style={{ color: '#123499' }}>Back Office OS</span>
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#374151',
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              CMD R is a back-office operating system for RIAs and advisors that behaves like <strong style={{ color: '#123499' }}>Recovery Mode</strong> for your practice: a central place where critical workflows, knowledge, and communication are captured, organized, and executed with AI assistance.
            </p>
          </div>

          <div style={{
            background: '#F9FAFB',
            padding: '3rem',
            borderRadius: '1rem',
            marginBottom: '3rem'
          }}>
            <p style={{
              fontSize: '1.2rem',
              color: '#374151',
              lineHeight: '1.8',
              margin: '0 0 1.5rem 0'
            }}>
              Instead of adding "one more app," CMD R wraps around your existing stack and processes to make them lighter, faster, and more reliable.
            </p>
            <p style={{
              fontSize: '1.2rem',
              color: '#374151',
              lineHeight: '1.8',
              margin: 0
            }}>
              The result is simple: <strong style={{ color: '#123499' }}>fewer dropped balls, fewer late nights in your inbox, and fewer high-value hours wasted on low-value work.</strong> You reclaim time for clients, strategy, and growth while increasing consistency and reducing key-person risk.
            </p>
          </div>

          {/* Benefits Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                icon: '✓',
                title: 'Reclaim Time',
                desc: 'More hours for clients and business development each week—not just "more efficient" admin'
              },
              {
                icon: '✓',
                title: 'Sleep Better',
                desc: 'Confidence that compliance, ops, and follow-through are handled even when you\'re not in the office'
              },
              {
                icon: '✓',
                title: 'Build Value',
                desc: 'A practice that\'s easier to value, sell, or transition because core processes live in a system'
              },
              {
                icon: '✓',
                title: 'Clarity & Calm',
                desc: 'Team knows who does what, when, and to what standard—fewer scrambles, more predictability'
              }
            ].map((benefit, i) => (
              <div key={i} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '1rem',
                border: '2px solid #E6EAF5',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #123499 0%, #6B9FFF 100%)',
                  color: 'white',
                  fontSize: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  fontWeight: '700'
                }}>
                  {benefit.icon}
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#00072D', marginBottom: '1rem' }}>
                  {benefit.title}
                </h3>
                <p style={{ color: '#6B7280', lineHeight: '1.6', margin: 0 }}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Outcomes Section */}
      <section style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, #00072D 0%, #051650 100%)',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '700',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              From Operational Drag to<br />
              <span style={{ color: '#6B9FFF' }}>Repeatable Flow</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gap: '2rem'
          }}>
            {[
              {
                title: 'Reduce Compliance Friction',
                description: 'Turn recurring compliance tasks into guided workflows with checklists, templates, and audit-ready documentation, so your team knows what "right" looks like every time'
              },
              {
                title: 'Tame Tech Sprawl',
                description: 'Create a single command center that surfaces what matters from your CRM, planning, custodial, and communication tools instead of bouncing between tabs and re-keying data'
              },
              {
                title: 'Standardize Billing & Critical Processes',
                description: 'Codify how your firm handles billing, onboarding, reviews, and money movement so it becomes a process, not a person-dependent art project'
              },
              {
                title: 'Protect Capacity & Calendar',
                description: 'Gatekeep your time with structured intake, triage, and automated follow-up so that only the right work hits your desk and meetings actually move the ball forward'
              },
              {
                title: 'Make Turnover Survivable',
                description: 'Capture institutional knowledge, checklists, and workflows in the platform so new team members can ramp quickly and your practice is no longer at the mercy of any one person'
              }
            ].map((outcome, i) => (
              <div key={i} style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                padding: '2.5rem',
                borderRadius: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.borderColor = '#6B9FFF';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
              }}>
                <h3 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: '700', 
                  marginBottom: '1rem',
                  color: '#6B9FFF'
                }}>
                  {outcome.title}
                </h3>
                <p style={{ 
                  fontSize: '1.1rem', 
                  lineHeight: '1.7',
                  margin: 0,
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  {outcome.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" style={{
        padding: '5rem 2rem',
        background: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              borderRadius: '2rem',
              backgroundColor: '#E6EAF5',
              color: '#123499',
              fontSize: '0.9rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
              letterSpacing: '0.5px'
            }}>
              UNDER THE HOOD
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '700',
              color: '#00072D',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              What CMD R Does<br />
              <span style={{ color: '#123499' }}>Behind the Scenes</span>
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#374151',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.7'
            }}>
              Built to feel light on top while doing heavy lifting underneath. Each layer is designed around the realities of an advisory practice—not generic SaaS.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gap: '3rem'
          }}>
            {[
              {
                number: '01',
                title: 'Workflow Engine for Advisory Work',
                description: 'Map the steps for onboarding, reviews, transfers, document collection, and more into reusable workflows with clear owners, SLAs, and status',
                features: [
                  'Client onboarding templates',
                  'Quarterly review checklists',
                  'Account transfer workflows',
                  'Compliance documentation flows'
                ]
              },
              {
                number: '02',
                title: 'Smart Intake & Triage',
                description: 'Route requests from email, forms, or internal notes into a consistent queue, automatically tagging by client, urgency, and task type so nothing gets lost in someone\'s inbox',
                features: [
                  'Unified request queue',
                  'Auto-categorization by client',
                  'Priority-based routing',
                  'SLA tracking & alerts'
                ]
              },
              {
                number: '03',
                title: 'Knowledge & Playbook Hub',
                description: 'House your firm\'s policies, checklists, and "how we do it here" in one place, linked directly to tasks and workflows so your team doesn\'t have to hunt for answers',
                features: [
                  'Firm policy repository',
                  'Process documentation',
                  'Template library',
                  'Context-aware help'
                ]
              },
              {
                number: '04',
                title: 'AI Assistance Where It Saves Time',
                description: 'Use AI to draft emails, summarize meetings, prepare agendas and follow-ups, and prep review packets from existing data—always with human sign-off where it matters',
                features: [
                  'Meeting summarization',
                  'Email draft assistance',
                  'Review packet preparation',
                  'Client communication templates'
                ]
              },
              {
                number: '05',
                title: 'Signals, Not Noise',
                description: 'Dashboards that highlight stuck work, at-risk commitments, and capacity constraints so you can intervene before something becomes a fire drill',
                features: [
                  'Real-time workflow status',
                  'At-risk commitment alerts',
                  'Team capacity dashboard',
                  'Compliance deadline tracking'
                ]
              }
            ].map((item, i) => (
              <div key={i} className="how-it-works-item" style={{
                display: 'grid',
                gap: '2rem',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  fontSize: '4rem',
                  fontWeight: '700',
                  color: '#E6EAF5',
                  lineHeight: 1
                }}>
                  {item.number}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#00072D',
                    marginBottom: '1rem'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '1.15rem',
                    color: '#374151',
                    lineHeight: '1.7',
                    marginBottom: '1.5rem'
                  }}>
                    {item.description}
                  </p>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '0.75rem'
                  }}>
                    {item.features.map((feature, j) => (
                      <div key={j} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        background: '#F9FAFB',
                        borderRadius: '0.5rem',
                        border: '1px solid #E5E7EB'
                      }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#123499',
                          flexShrink: 0
                        }} />
                        <span style={{ fontSize: '0.95rem', color: '#374151' }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Whom Section */}
      <section style={{
        padding: '5rem 2rem',
        background: '#F9FAFB'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '700',
            color: '#00072D',
            marginBottom: '2rem',
            lineHeight: '1.2'
          }}>
            Built for Growing<br />
            <span style={{ color: '#123499' }}>Independent Firms</span>
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#374151',
            lineHeight: '1.8',
            marginBottom: '2rem'
          }}>
            CMD R is designed for RIAs, hybrid firms, and independent advisors who have moved past the solo spreadsheet stage but are not interested in becoming full-time COOs.
          </p>
          <p style={{
            fontSize: '1.25rem',
            color: '#374151',
            lineHeight: '1.8',
            marginBottom: '3rem'
          }}>
            Whether you're at <strong style={{ color: '#123499' }}>$75M or $750M in AUM</strong>, the patterns are the same: more people, more tools, more regulation—and less time to think.
          </p>

          <div style={{
            background: 'white',
            padding: '3rem',
            borderRadius: '1rem',
            border: '2px solid #123499',
            textAlign: 'left'
          }}>
            <p style={{
              fontSize: '1.3rem',
              color: '#00072D',
              lineHeight: '1.8',
              margin: 0,
              fontWeight: '500'
            }}>
              If you're feeling <strong style={{ color: '#123499' }}>constant pressure around compliance, staff capacity, or inconsistent client experience</strong> as you grow, CMD R gives you a way to scale your back office without scaling your headaches.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Split Section */}
      <section style={{
        padding: '5rem 2rem',
        background: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '700',
              color: '#00072D',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              What Changes When You<br />
              <span style={{ color: '#123499' }}>Run in Recovery Mode</span>
            </h2>
          </div>

          <div className="benefits-grid" style={{
            display: 'grid',
            gap: '3rem'
          }}>
            {/* For Firm Owners/Lead Advisors */}
            <div style={{
              background: 'linear-gradient(135deg, #00072D 0%, #051650 100%)',
              padding: '3rem',
              borderRadius: '1rem',
              color: 'white'
            }}>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#6B9FFF'
              }}>
                For Firm Owners &<br />Lead Advisors
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                {[
                  'More hours for clients and business development each week—not just "more efficient" admin',
                  'Confidence that compliance, ops, and follow-through are handled even when you\'re not in the office',
                  'A practice that\'s easier to value, sell, or transition because core processes live in a system, not just in people\'s heads'
                ].map((benefit, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#6B9FFF',
                      color: '#00072D',
                      fontSize: '1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      flexShrink: 0,
                      marginTop: '0.2rem'
                    }}>
                      ✓
                    </div>
                    <p style={{
                      fontSize: '1.1rem',
                      lineHeight: '1.6',
                      margin: 0,
                      color: 'rgba(255, 255, 255, 0.95)'
                    }}>
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* For Your Team */}
            <div style={{
              background: '#F9FAFB',
              padding: '3rem',
              borderRadius: '1rem',
              border: '2px solid #E6EAF5'
            }}>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#123499'
              }}>
                For Your Team
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                {[
                  'Clarity on who does what, when, and to what standard',
                  'Less swivel-chair work between systems and fewer "where is this at?" internal pings',
                  'A calmer, more predictable workday with fewer last-minute scrambles'
                ].map((benefit, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#123499',
                      color: 'white',
                      fontSize: '1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      flexShrink: 0,
                      marginTop: '0.2rem'
                    }}>
                      ✓
                    </div>
                    <p style={{
                      fontSize: '1.1rem',
                      lineHeight: '1.6',
                      margin: 0,
                      color: '#374151'
                    }}>
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy/Why Now Section */}
      <section style={{
        padding: '5rem 2rem',
        background: '#00072D',
        color: 'white'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '700',
            marginBottom: '2rem',
            lineHeight: '1.2'
          }}>
            Why This Matters<br />
            <span style={{ color: '#6B9FFF' }}>Now</span>
          </h2>
          <p style={{
            fontSize: '1.3rem',
            lineHeight: '1.8',
            marginBottom: '2rem',
            color: 'rgba(255, 255, 255, 0.9)'
          }}>
            Regulation, client expectations, and competition are all rising; operational complexity is not going away on its own.
          </p>
          <p style={{
            fontSize: '1.3rem',
            lineHeight: '1.8',
            marginBottom: '2rem',
            color: 'rgba(255, 255, 255, 0.9)'
          }}>
            <strong style={{ color: '#6B9FFF' }}>The firms that win in the next cycle</strong> will not be the ones that add the most software—they will be the ones that turn their back office into a strategic asset, not a drag on capacity.
          </p>
          <div style={{
            background: 'rgba(255, 255, 255, 0.08)',
            padding: '2.5rem',
            borderRadius: '1rem',
            border: '1px solid rgba(107, 159, 255, 0.3)',
            marginTop: '3rem'
          }}>
            <p style={{
              fontSize: '1.4rem',
              lineHeight: '1.8',
              margin: 0,
              fontWeight: '500'
            }}>
              CMD R exists to give independent advisors that edge: a disciplined, AI-assisted operating system that quietly runs in the background so you can step fully into the roles only you can play—<span style={{ color: '#6B9FFF' }}>trusted guide, strategist, and architect of your clients' financial lives.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{
        padding: '5rem 2rem',
        background: 'white'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '700',
            color: '#00072D',
            marginBottom: '2rem',
            lineHeight: '1.2'
          }}>
            Ready to Put Your Practice in<br />
            <span style={{ color: '#123499' }}>Recovery Mode?</span>
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#374151',
            lineHeight: '1.7',
            marginBottom: '3rem'
          }}>
            See what CMD R looks like inside a firm like yours and where it can immediately give you time, revenue, and peace of mind back.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setShowModal(true)}
              style={{
                padding: '1.25rem 3rem',
                fontSize: '1.2rem',
                fontWeight: '600',
                borderRadius: '0.75rem',
                background: '#123499',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 14px rgba(18, 52, 153, 0.4)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = '#0A2472';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(18, 52, 153, 0.5)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = '#123499';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(18, 52, 153, 0.4)';
              }}
            >
              Schedule a Discovery Call
            </button>
            
            <button 
              onClick={() => setShowModal(true)}
              style={{
                padding: '1.25rem 3rem',
                fontSize: '1.2rem',
                fontWeight: '600',
                borderRadius: '0.75rem',
                background: 'white',
                color: '#123499',
                border: '2px solid #123499',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#E6EAF5';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'white';
              }}
            >
              Get the RIA Back Office Playbook
            </button>
          </div>

          {/* Trust Indicators */}
          <div style={{
            marginTop: '4rem',
            padding: '2rem',
            background: '#F9FAFB',
            borderRadius: '1rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#123499', marginBottom: '0.5rem' }}>
                  No
                </div>
                <div style={{ fontSize: '1rem', color: '#6B7280' }}>
                  Long-term Contracts
                </div>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#123499', marginBottom: '0.5rem' }}>
                  30-Day
                </div>
                <div style={{ fontSize: '1rem', color: '#6B7280' }}>
                  Risk-Free Trial
                </div>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#123499', marginBottom: '0.5rem' }}>
                  White-Label
                </div>
                <div style={{ fontSize: '1rem', color: '#6B7280' }}>
                  Your Brand, Not Ours
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#00072D',
        padding: '3rem 2rem',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div className="footer-grid" style={{
            display: 'grid',
            gap: '2rem',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            <div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: '#6B9FFF' }}>
                CMD R for RIAs
              </h4>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}>
                Recovery mode for your back office. Reclaim time for what matters.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: '#6B9FFF' }}>
                Quick Links
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="/" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  Main Platform
                </a>
                <a href="/login" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  Login
                </a>
                <a href="/privacy" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  Privacy
                </a>
                <a href="/terms" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'none' }}>
                  Terms
                </a>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem', color: '#6B9FFF' }}>
                Contact
              </h4>
              <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}>
                Questions about CMD R for RIAs?<br />
                <a href="mailto:ria@mycmdr.com" style={{ color: '#6B9FFF', textDecoration: 'none' }}>
                  ria@mycmdr.com
                </a>
              </p>
            </div>
          </div>
          <div style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '0.9rem'
          }}>
            © 2025 CMD R. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}
        onClick={() => setShowModal(false)}>
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '3rem',
            maxWidth: '500px',
            width: '100%',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#6B7280'
              }}
            >
              ×
            </button>

            <h3 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#00072D',
              marginBottom: '1rem'
            }}>
              Activate Recovery Mode
            </h3>
            <p style={{
              fontSize: '1rem',
              color: '#6B7280',
              marginBottom: '2rem'
            }}>
              Tell us about your firm and we'll show you how CMD R can give you your time back.
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Thank you! We\'ll be in touch soon.');
              setShowModal(false);
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #D1D5DB',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #D1D5DB',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #D1D5DB',
                    fontSize: '1rem'
                  }}
                />
                <input
                  type="text"
                  placeholder="Firm Name"
                  value={formData.firm}
                  onChange={(e) => setFormData({...formData, firm: e.target.value})}
                  required
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #D1D5DB',
                    fontSize: '1rem'
                  }}
                />
                <select
                  value={formData.aum}
                  onChange={(e) => setFormData({...formData, aum: e.target.value})}
                  required
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #D1D5DB',
                    fontSize: '1rem',
                    color: formData.aum ? '#000' : '#9CA3AF'
                  }}
                >
                  <option value="">Assets Under Management</option>
                  <option value="under-50m">Under $50M</option>
                  <option value="50m-100m">$50M - $100M</option>
                  <option value="100m-250m">$100M - $250M</option>
                  <option value="250m-500m">$250M - $500M</option>
                  <option value="500m-1b">$500M - $1B</option>
                  <option value="over-1b">Over $1B</option>
                </select>
                <select
                  value={formData.teamSize}
                  onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                  required
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #D1D5DB',
                    fontSize: '1rem',
                    color: formData.teamSize ? '#000' : '#9CA3AF'
                  }}
                >
                  <option value="">Team Size</option>
                  <option value="1-2">Solo / 1-2 people</option>
                  <option value="3-5">3-5 people</option>
                  <option value="6-10">6-10 people</option>
                  <option value="11-25">11-25 people</option>
                  <option value="25+">25+ people</option>
                </select>

                <button
                  type="submit"
                  style={{
                    padding: '1rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    borderRadius: '0.5rem',
                    background: '#123499',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '1rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#0A2472';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#123499';
                  }}
                >
                  Schedule Discovery Call
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @media (min-width: 768px) {
          .how-it-works-item {
            grid-template-columns: 100px 1fr !important;
          }
          .benefits-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}

