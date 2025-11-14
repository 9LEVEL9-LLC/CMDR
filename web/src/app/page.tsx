'use client';

import { useState } from 'react';

export default function DemoPage() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    expertise: '',
    clients: '',
    revenue: ''
  });

  return (
    <div className="min-h-screen">
      {/* Top Badge */}
      <div style={{ backgroundColor: '#00072D', padding: '1rem 0', textAlign: 'center' }}>
        <div className="section-container">
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
            2.4x Your Revenue • 35h Less Work • AI-Powered Growth
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #00072D 0%, #051650 100%)',
        padding: '6rem 0 7rem 0',
        color: 'white'
      }}>
        <div className="section-container" style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: '700',
            lineHeight: '1.15',
            marginBottom: '2rem',
            letterSpacing: '-0.02em',
            color: '#6B7280'
          }}>
            Stop Trading Time for Money.<br />
            <span style={{ color: '#6B9FFF' }}>Start Multiplying It.</span>
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            maxWidth: '900px',
            margin: '0 auto 3.5rem auto',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: '1.6'
          }}>
            The AI platform that doesn't just save you 35 hours a week—<br />
            it transforms them into <span style={{ color: '#6B9FFF', fontWeight: '700' }}>AI-powered growth engines</span> that 2-3x your revenue
          </p>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '3rem',
            maxWidth: '1100px',
            margin: '0 auto 3.5rem auto',
            padding: '0 2rem'
          }}>
            {[
              { value: '35h', label: 'Reclaimed Weekly (AI-Powered)' },
              { value: '2.4x', label: 'Revenue Multiplier Effect' },
              { value: '6x', label: 'Lead Generation Increase' },
              { value: '$420K', label: 'Avg Annual Revenue Gain' }
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: '700',
                  marginBottom: '0.75rem',
                  lineHeight: '1'
                }}>{stat.value}</div>
                <div style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: '1.4'
                }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: '1.5rem 3rem',
              fontSize: '1.25rem',
              fontWeight: '700',
              backgroundColor: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.3)';
            }}
          >
            Schedule Personalized Demo →
          </button>

          <p style={{
            marginTop: '1.5rem',
            fontSize: '0.875rem',
            opacity: 0.7
          }}>
            See your personalized transformation in real-time • No generic pitch
          </p>
        </div>
      </section>

      {/* Real Impact Section */}
      <section style={{ padding: '5rem 0', backgroundColor: '#f9fafb' }}>
        <div className="section-container">
          <div style={{
            background: 'linear-gradient(135deg, #00072D 0%, #051650 100%)',
            borderRadius: '1.5rem',
            padding: '3rem',
            color: 'white',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              But Here's the Real Impact...
            </h2>
            <p style={{
              fontSize: '1.25rem',
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto 3rem auto',
              opacity: 0.9
            }}>
              Those 29.5 hours aren't ordinary hours—they're <span style={{ color: '#6B9FFF', fontWeight: '700' }}>AI-powered hours</span>. 
              Every hour you invest is amplified by automation, intelligence, and scale.
            </p>

            {/* Two Path Comparison */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {/* Path 1: Traditional */}
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '1rem',
                padding: '2rem',
                border: '2px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '1rem',
                  opacity: 0.7
                }}>WITHOUT CMDR</div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem'
                }}>Traditional Manual Work</h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#9CA3AF' }}>5-8</div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Max Clients</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#9CA3AF' }}>$600K</div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Annual Revenue</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#9CA3AF' }}>55h</div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Work Week</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#EF4444' }}>Burned Out</div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Quality of Life</div>
                  </div>
                </div>
              </div>

              {/* Path 2: With CMDR */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                border: '3px solid #10B981',
                color: '#00072D',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: '#10B981',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '2rem',
                  fontSize: '0.75rem',
                  fontWeight: '700'
                }}>✨ AI-POWERED</div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '1rem',
                  color: '#10B981'
                }}>WITH CMDR</div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  color: '#00072D'
                }}>AI-Amplified Growth</h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#123499' }}>15-24</div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Max Clients (3x Capacity)</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#123499' }}>$2.1M</div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Annual Revenue (3.5x)</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#123499' }}>30h</div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Work Week (46% less)</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10B981' }}>Thriving</div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Scaling confidently. Premium positioning.<br/>Technology moat. Recurring platform revenue.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* The Math */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '1rem',
              padding: '2.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: '2rem'
              }}>The Exponential Effect in Action</h3>

              <p style={{
                textAlign: 'center',
                fontSize: '1.125rem',
                marginBottom: '2.5rem',
                opacity: 0.9
              }}>
                Here's how 29.5 reclaimed hours create exponential returns—not linear time savings,<br/>
                but multiplicative business growth.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                marginBottom: '2rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#6B9FFF'
                  }}>STEP 1: RECLAIM TIME</div>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem'
                  }}>29.5h</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Freed up weekly through<br/>automation</div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#6B9FFF'
                  }}>STEP 2: AI-AMPLIFY IT</div>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem'
                  }}>14.75h</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Applied to growth &<br/>automation strategy</div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#10B981'
                  }}>RESULT: SCALE REVENUE</div>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    color: '#10B981'
                  }}>+$1.5M</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Additional annual revenue<br/>potential</div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div style={{
                backgroundColor: 'white',
                color: '#00072D',
                borderRadius: '1rem',
                padding: '2rem'
              }}>
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>How AI-Backed Hours Create Exponential Returns</h4>

                <div style={{
                  display: 'grid',
                  gap: '1rem'
                }}>
                  {[
                    {
                      activity: 'AI-Powered Lead Generation',
                      traditional: '10-20',
                      aiPowered: '100-300',
                      impact: '10-20x more leads/mo'
                    },
                    {
                      activity: 'Automated Nurture Sequences',
                      traditional: '18-22%',
                      aiPowered: '40-50%',
                      impact: '2.5x close rate'
                    },
                    {
                      activity: 'AI Proposal Generation',
                      traditional: '2-5',
                      aiPowered: '20-40',
                      impact: '8x sales velocity'
                    },
                    {
                      activity: 'Client Onboarding Automation',
                      traditional: '2 weeks',
                      aiPowered: '2 days',
                      impact: '7x faster ramp'
                    }
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
                      gap: '1rem',
                      alignItems: 'center',
                      padding: '1rem',
                      backgroundColor: i % 2 === 0 ? '#F9FAFB' : 'white',
                      borderRadius: '0.5rem',
                      borderLeft: '4px solid #123499'
                    }}>
                      <div style={{ fontWeight: '600', color: '#00072D', fontSize: '0.9rem' }}>{item.activity}</div>
                      <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6B7280' }}>
                        {item.traditional}
                      </div>
                      <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#123499', fontWeight: '700' }}>
                        {item.aiPowered}
                      </div>
                      <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#10B981', fontWeight: '700' }}>
                        {item.impact}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: '1.5rem 3rem',
              fontSize: '1.25rem',
              fontWeight: '700',
              backgroundColor: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.3)';
            }}
          >
            See Your Personalized Demo →
          </button>
        </div>
      </section>

      {/* Personalization Message Section */}
      <section style={{ 
        padding: '5rem 0', 
        backgroundColor: 'white',
        borderTop: '1px solid #E5E7EB'
      }}>
        <div className="section-container">
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              backgroundColor: '#F0FDF4',
              border: '2px solid #10B981',
              borderRadius: '2rem',
              marginBottom: '2rem'
            }}>
              <span style={{
                fontSize: '0.875rem',
                fontWeight: '700',
                color: '#059669',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>⚡ Live Personalization</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              color: '#00072D',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              We Don't Do Generic Demos
            </h2>

            <p style={{
              fontSize: '1.25rem',
              color: '#374151',
              lineHeight: '1.7',
              marginBottom: '2rem'
            }}>
              Static landing pages and cookie-cutter presentations? That's not us.
            </p>

            <div style={{
              backgroundColor: '#EBF5FF',
              border: '3px solid #123499',
              borderRadius: '1rem',
              padding: '2.5rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                color: '#00072D',
                marginBottom: '1.5rem'
              }}>
                Everything We Do Is Personalized
              </h3>
              <p style={{
                fontSize: '1.125rem',
                color: '#374151',
                lineHeight: '1.7',
                marginBottom: '2rem'
              }}>
                Whether you're a <span style={{ fontWeight: '700', color: '#123499' }}>Fractional CFO</span>, 
                <span style={{ fontWeight: '700', color: '#123499' }}> Property Management Consultant</span>, 
                <span style={{ fontWeight: '700', color: '#123499' }}> Legal Practice Advisor</span>, 
                <span style={{ fontWeight: '700', color: '#123499' }}> Healthcare Consultant</span>, or any other specialized CXO—
                your demo will be built <span style={{ fontWeight: '700', color: '#00072D' }}>specifically for your vertical</span>.
              </p>

              <div style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                padding: '2rem',
                marginBottom: '2rem'
              }}>
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#00072D',
                  marginBottom: '1.5rem'
                }}>In Your Personalized Demo, You'll See:</h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem',
                  textAlign: 'left'
                }}>
                  {[
                    'Your exact client workflow automated',
                    'Industry-specific tools for your vertical',
                    'Real calculations with YOUR client data',
                    'Custom automation scenarios live',
                    'Your branded platform in action',
                    'Personalized ROI breakdown for YOUR practice'
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '1.5rem',
                        height: '1.5rem',
                        borderRadius: '50%',
                        backgroundColor: '#10B981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '0.125rem'
                      }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span style={{ color: '#374151', fontSize: '0.95rem' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#123499',
                textAlign: 'center'
              }}>
                This isn't a sales pitch. It's a preview of the very platform we're selling you.
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: '1.75rem 3.5rem',
                fontSize: '1.5rem',
                fontWeight: '700',
                backgroundColor: '#123499',
                color: 'white',
                border: 'none',
                borderRadius: '0.75rem',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(18, 52, 153, 0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(18, 52, 153, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(18, 52, 153, 0.3)';
              }}
            >
              Schedule My Personalized Demo
            </button>

            <p style={{
              marginTop: '1.5rem',
              fontSize: '0.875rem',
              color: '#6B7280'
            }}>
              Live personalization • Your vertical • Your data • Real-time ROI calculation
            </p>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}
        onClick={() => setShowModal(false)}
        >
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1.5rem',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
          }}
          onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                backgroundColor: '#F3F4F6',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: '#6B7280',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
            >
              ×
            </button>

            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #00072D 0%, #051650 100%)',
              padding: '2.5rem 2rem',
              color: 'white',
              borderRadius: '1.5rem 1.5rem 0 0'
            }}>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '0.75rem',
                textAlign: 'center'
              }}>
                Schedule Your Personalized Demo
              </h3>
              <p style={{
                fontSize: '1rem',
                opacity: 0.9,
                textAlign: 'center'
              }}>
                Tell us about your practice, and we'll customize the demo to your vertical
              </p>
            </div>

            {/* Form */}
            <div style={{ padding: '2rem' }}>
              <form onSubmit={(e) => {
                e.preventDefault();
                // Handle form submission - integrate with Calendly or your booking system
                alert('Form submitted! Redirecting to personalized calendar...');
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Name */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '1rem',
                        border: '2px solid #E5E7EB',
                        borderRadius: '0.5rem',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#123499'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                      placeholder="John Smith"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '1rem',
                        border: '2px solid #E5E7EB',
                        borderRadius: '0.5rem',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#123499'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '1rem',
                        border: '2px solid #E5E7EB',
                        borderRadius: '0.5rem',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#123499'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  {/* Expertise */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Your Expertise/Category *
                    </label>
                    <select
                      required
                      value={formData.expertise}
                      onChange={(e) => setFormData({...formData, expertise: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '1rem',
                        border: '2px solid #E5E7EB',
                        borderRadius: '0.5rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        backgroundColor: 'white'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#123499'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                    >
                      <option value="">Select your vertical...</option>
                      <option value="Fractional CFO">Fractional CFO</option>
                      <option value="Fractional CMO">Fractional CMO (Marketing)</option>
                      <option value="Fractional CSO">Fractional CSO (Sales)</option>
                      <option value="Property Management">Property Management Consultant</option>
                      <option value="Healthcare">Healthcare Practice Consultant</option>
                      <option value="Fractional CTO">Fractional CTO/CIO (Technology)</option>
                      <option value="Fractional CHRO">Fractional CHRO (HR)</option>
                      <option value="Fractional COO">Fractional COO (Operations)</option>
                      <option value="Legal">Legal Practice Management</option>
                      <option value="M&A">M&A/Business Development</option>
                      <option value="Other">Other (Please Specify)</option>
                    </select>
                  </div>

                  {/* Number of Clients */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Current Number of Clients *
                    </label>
                    <select
                      required
                      value={formData.clients}
                      onChange={(e) => setFormData({...formData, clients: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '1rem',
                        border: '2px solid #E5E7EB',
                        borderRadius: '0.5rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        backgroundColor: 'white'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#123499'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                    >
                      <option value="">Select...</option>
                      <option value="1-2">1-2 clients</option>
                      <option value="3-5">3-5 clients</option>
                      <option value="6-8">6-8 clients</option>
                      <option value="9-12">9-12 clients</option>
                      <option value="13+">13+ clients</option>
                    </select>
                  </div>

                  {/* Annual Revenue */}
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Approximate Annual Revenue *
                    </label>
                    <select
                      required
                      value={formData.revenue}
                      onChange={(e) => setFormData({...formData, revenue: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        fontSize: '1rem',
                        border: '2px solid #E5E7EB',
                        borderRadius: '0.5rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        backgroundColor: 'white'
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = '#123499'}
                      onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                    >
                      <option value="">Select range...</option>
                      <option value="<100K">Less than $100K</option>
                      <option value="100-250K">$100K - $250K</option>
                      <option value="250-500K">$250K - $500K</option>
                      <option value="500K-1M">$500K - $1M</option>
                      <option value="1M+">$1M+</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    style={{
                      padding: '1rem 2rem',
                      fontSize: '1.125rem',
                      fontWeight: '700',
                      backgroundColor: '#10B981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.75rem',
                      cursor: 'pointer',
                      marginTop: '1rem',
                      boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 6px 12px rgba(16, 185, 129, 0.3)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(16, 185, 129, 0.2)';
                    }}
                  >
                    Continue to Personalized Calendar →
                  </button>
                </div>
              </form>

              <p style={{
                marginTop: '1.5rem',
                fontSize: '0.75rem',
                color: '#9CA3AF',
                textAlign: 'center'
              }}>
                We respect your privacy. Your information is used only to personalize your demo experience.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{
        padding: '3rem 0',
        backgroundColor: '#051650',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="section-container">
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '0.5rem'
            }}>CMDR</h2>
            <p style={{
              opacity: 0.8,
              fontSize: '1.125rem'
            }}>AI Platform Development for Fractional CXOs</p>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <a href="https://mycmdr.com" style={{
              color: 'white',
              fontSize: '1.125rem',
              fontWeight: '600',
              textDecoration: 'none',
              opacity: 0.9
            }}>
              MyCMDR.com
            </a>
          </div>
          <div style={{
            opacity: 0.7,
            fontSize: '0.875rem'
          }}>
            <p style={{ marginBottom: '0.5rem' }}>2.4x Revenue • 35h Less Work • AI-Powered Multiplication</p>
            <p>© 2025 CMDR • Stop Trading Time. Start Multiplying It.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

