import { CTAButtons } from '../components/CTAButtons';

export default function Home() {
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
              backgroundColor: 'white',
              borderRadius: '50%'
            }}></span>
            2.4x Your Revenue • 35h Less Work • AI-Powered Growth
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #00072D 0%, #051650 100%)',
        padding: '5rem 0 6rem 0',
        color: 'white'
      }}>
        <div className="section-container" style={{ textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '700',
            lineHeight: '1.1',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em'
          }}>
            Stop Trading Time for Money.<br />
            <span style={{ color: '#6B9FFF' }}>Start Multiplying It.</span>
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            maxWidth: '900px',
            margin: '0 auto 3rem auto',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: '1.6'
          }}>
            The AI platform that doesn't just save you 35 hours a week—<br className="hidden md:block" />
            it transforms them into <span style={{ color: '#6B9FFF', fontWeight: '700' }}>AI-powered growth engines</span> that 2-3x your revenue
          </p>

          {/* Stats Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {[
              { value: '35h', label: 'Reclaimed Weekly (AI-Powered)' },
              { value: '2.4x', label: 'Revenue Multiplier Effect' },
              { value: '6x', label: 'Lead Generation Increase' },
              { value: '$420K', label: 'Avg Annual Revenue Gain' }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontWeight: '700',
                  marginBottom: '0.5rem'
                }}>{stat.value}</div>
                <div style={{
                  fontSize: '0.875rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section style={{ 
        padding: '5rem 0',
        backgroundColor: '#f9fafb'
      }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              color: '#00072D',
              marginBottom: '1rem'
            }}>
              The Problem
            </h2>
            <h3 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: '600',
              color: '#051650',
              marginBottom: '1.5rem'
            }}>
              The Hidden Revenue Ceiling: When More Work ≠ More Money
            </h3>
            <p style={{
              fontSize: '1.125rem',
              maxWidth: '800px',
              margin: '0 auto',
              color: '#4B5563',
              lineHeight: '1.7'
            }}>
              You're trapped in a time-for-money model. At 55 hours/week with 5-8 clients, you've hit your ceiling. 
              The only way to grow is to work more hours (burnout) or raise prices (lose clients). <span style={{ fontWeight: '700', color: '#00072D' }}>You can't scale, you can't multiply, you can't grow.</span>
            </p>
          </div>

          {/* Problem Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {[
              {
                icon: '⏱️',
                title: 'Multi-Client Chaos',
                stat: '20-40 hrs',
                description: 'Wasted monthly switching between 5-10 different client systems, platforms, and tools. Zero unified view.',
                quote: '"I spend half my day just logging into different systems to check status across my clients."',
                color: '#051650'
              },
              {
                icon: '📊',
                title: 'Manual Reporting Hell',
                stat: '15-30 hrs',
                description: 'Spent monthly creating custom reports, dashboards, and updates for each client. All manual. All repetitive.',
                quote: '"I have 6 clients. That\'s 6 different report formats I create from scratch every month."',
                color: '#0A2472'
              },
              {
                icon: '👥',
                title: 'Zero Differentiation',
                stat: '18K-52K',
                description: 'Competitors per vertical fighting for the same clients. No technology edge. Price becomes the only differentiator.',
                quote: '"When clients ask what makes me different, I struggle to answer beyond \'experience.\'"',
                color: '#123499'
              },
              {
                icon: '📈',
                title: 'Scalability Ceiling',
                stat: '5-8',
                description: 'Maximum clients before quality drops. Linear time-for-money model. Can\'t grow without burning out.',
                quote: '"I\'m maxed out at 6 clients. To grow revenue, I\'d need to raise prices or hire—both risky."',
                color: '#1A43BF'
              },
              {
                icon: '🎯',
                title: 'Client Acquisition Struggles',
                stat: '$5K-15K',
                description: 'Cost per client acquired through referrals and networking. No systematic lead generation or nurture.',
                quote: '"My pipeline is feast or famine. I rely on word-of-mouth and hope someone refers me."',
                color: '#051650'
              },
              {
                icon: '💼',
                title: 'Unprofessional Tech Stack',
                stat: '$500-2K',
                description: 'Monthly spent on disconnected consumer tools (Calendly, QuickBooks, Notion, etc.). Looks amateur to $10M+ clients.',
                quote: '"I advise C-suite executives but use the same scheduling tool as a solopreneur."',
                color: '#0A2472'
              }
            ].map((problem, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.05)',
                borderTop: `4px solid ${problem.color}`
              }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  borderRadius: '50%',
                  backgroundColor: problem.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  marginBottom: '1.5rem'
                }}>
                  {problem.icon}
                </div>
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#00072D',
                  marginBottom: '1rem'
                }}>{problem.title}</h4>
                <div style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#123499',
                  marginBottom: '1rem'
                }}>{problem.stat}</div>
                <p style={{
                  color: '#4B5563',
                  marginBottom: '1rem',
                  lineHeight: '1.6'
                }}>{problem.description}</p>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#6B7280',
                  fontStyle: 'italic'
                }}>{problem.quote}</p>
              </div>
            ))}
          </div>

          {/* Quote Block */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '2.5rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            borderLeft: `6px solid #123499`,
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <p style={{
              fontSize: '1.5rem',
              fontWeight: '500',
              color: '#1F2937',
              marginBottom: '1.5rem',
              lineHeight: '1.6'
            }}>
              "I'm billing $12,000 a month per client, but I spend 30+ hours on admin work that doesn't generate revenue. 
              I can't take on more clients without sacrificing quality, and I have no technology differentiation from the 
              hundreds of other fractional CFOs competing for the same clients."
            </p>
            <p style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#051650'
            }}>
              — Fractional CFO, 6 clients, $720K annual revenue, considering hiring staff just to manage admin
            </p>
          </div>
        </div>
      </section>

      {/* Time Breakdown Section */}
      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              color: '#00072D',
              marginBottom: '1rem'
            }}>
              Where Does the Time Go?
            </h2>
            <h3 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: '600',
              color: '#051650',
              marginBottom: '1.5rem'
            }}>
              Weekly Time Breakdown: Solo CXO with 5-8 Clients
            </h3>
            <p style={{
              fontSize: '1.125rem',
              maxWidth: '800px',
              margin: '0 auto',
              color: '#4B5563',
              lineHeight: '1.7'
            }}>
              The average fractional CXO works 50-60 hours per week, but less than 40% is spent on actual client value delivery. 
              The rest? Administrative overhead that AI can eliminate.
            </p>
          </div>

          {/* Total Hours Summary */}
          <div style={{
            background: 'linear-gradient(135deg, #00072D 0%, #051650 100%)',
            borderRadius: '1.5rem',
            padding: '2.5rem',
            marginBottom: '3rem',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem'
            }}>
              <div>
                <div style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>55</div>
                <div style={{ fontSize: '1rem', opacity: 0.9 }}>Total Hours/Week</div>
              </div>
              <div>
                <div style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '0.5rem', color: '#6B9FFF' }}>35</div>
                <div style={{ fontSize: '1rem', opacity: 0.9 }}>Manual/Admin Hours</div>
              </div>
              <div>
                <div style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '0.5rem', color: '#1A43BF' }}>20</div>
                <div style={{ fontSize: '1rem', opacity: 0.9 }}>Client Value Hours</div>
              </div>
            </div>
          </div>

          {/* Time Breakdown Grid */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '1.5rem', 
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            marginBottom: '3rem'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                minWidth: '800px'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#00072D', color: 'white' }}>
                    <th style={{ 
                      padding: '1.25rem 1.5rem', 
                      textAlign: 'left', 
                      fontWeight: '700',
                      width: '25%'
                    }}>Category</th>
                    <th style={{ 
                      padding: '1.25rem 1.5rem', 
                      textAlign: 'left', 
                      fontWeight: '700',
                      width: '35%'
                    }}>Tasks</th>
                    <th style={{ 
                      padding: '1.25rem 1rem', 
                      textAlign: 'center', 
                      fontWeight: '700',
                      width: '15%'
                    }}>Before CMDR</th>
                    <th style={{ 
                      padding: '1.25rem 1rem', 
                      textAlign: 'center', 
                      fontWeight: '700',
                      width: '15%',
                      backgroundColor: '#123499'
                    }}>After CMDR</th>
                    <th style={{ 
                      padding: '1.25rem 1rem', 
                      textAlign: 'center', 
                      fontWeight: '700',
                      width: '10%'
                    }}>Saved</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      category: 'Client Communication',
                      tasks: ['Email management', 'Status updates', 'Meeting scheduling'],
                      before: '8h',
                      after: '3h',
                      saved: '5h',
                      color: '#051650'
                    },
                    {
                      category: 'Reporting & Analytics',
                      tasks: ['Creating reports', 'Data gathering', 'Dashboard updates'],
                      before: '7h',
                      after: '1h',
                      saved: '6h',
                      color: '#0A2472'
                    },
                    {
                      category: 'Business Management',
                      tasks: ['Invoicing & billing', 'Scheduling', 'Admin tasks'],
                      before: '6h',
                      after: '0.5h',
                      saved: '5.5h',
                      color: '#123499'
                    },
                    {
                      category: 'Marketing & Sales',
                      tasks: ['Lead follow-up', 'Content creation', 'Lead nurture'],
                      before: '5h',
                      after: '2h',
                      saved: '3h',
                      color: '#1A43BF'
                    },
                    {
                      category: 'Proposal Creation',
                      tasks: ['Writing proposals', 'Pricing analysis', 'Follow-ups'],
                      before: '4h',
                      after: '1h',
                      saved: '3h',
                      color: '#051650'
                    },
                    {
                      category: 'Client Onboarding',
                      tasks: ['Setup & documentation', 'System access', 'Training materials'],
                      before: '3h',
                      after: '1h',
                      saved: '2h',
                      color: '#0A2472'
                    },
                    {
                      category: 'Research & Planning',
                      tasks: ['Industry research', 'Strategy development', 'Competitive analysis'],
                      before: '4h',
                      after: '2.5h',
                      saved: '1.5h',
                      color: '#123499'
                    },
                    {
                      category: 'Finance & Accounting',
                      tasks: ['Expense tracking', 'Financial planning', 'Tax preparation'],
                      before: '3h',
                      after: '0.5h',
                      saved: '2.5h',
                      color: '#1A43BF'
                    },
                    {
                      category: 'Client Project Work',
                      tasks: ['Strategic consulting', 'Problem-solving', 'Implementation'],
                      before: '12h',
                      after: '12h',
                      saved: '0h',
                      color: '#051650',
                      highlight: true
                    },
                    {
                      category: 'Professional Development',
                      tasks: ['Learning & training', 'Certifications', 'Industry events'],
                      before: '3h',
                      after: '2h',
                      saved: '1h',
                      color: '#0A2472'
                    }
                  ].map((item, i) => (
                    <tr key={i} style={{
                      borderBottom: '1px solid #E5E7EB',
                      backgroundColor: item.highlight ? '#F0FDF4' : (i % 2 === 0 ? 'white' : '#F9FAFB')
                    }}>
                      <td style={{ 
                        padding: '1.25rem 1.5rem',
                        borderLeft: `4px solid ${item.color}`
                      }}>
                        <div style={{
                          fontWeight: '700',
                          color: '#00072D',
                          fontSize: '1rem',
                          marginBottom: '0.25rem'
                        }}>{item.category}</div>
                        {item.highlight && (
                          <div style={{
                            fontSize: '0.75rem',
                            color: '#059669',
                            fontWeight: '600',
                            marginTop: '0.25rem'
                          }}>✓ Core Value Work</div>
                        )}
                      </td>
                      <td style={{ padding: '1.25rem 1.5rem' }}>
                        <ul style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.25rem'
                        }}>
                          {item.tasks.map((task, j) => (
                            <li key={j} style={{
                              fontSize: '0.875rem',
                              color: '#6B7280',
                              paddingLeft: '1rem',
                              position: 'relative'
                            }}>
                              <span style={{
                                position: 'absolute',
                                left: '0',
                                color: item.color
                              }}>•</span>
                              {task}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td style={{ 
                        padding: '1.25rem 1rem', 
                        textAlign: 'center'
                      }}>
                        <div style={{
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          color: '#6B7280'
                        }}>{item.before}</div>
                      </td>
                      <td style={{ 
                        padding: '1.25rem 1rem', 
                        textAlign: 'center',
                        backgroundColor: item.highlight ? '#DBEAFE' : '#F0F9FF'
                      }}>
                        <div style={{
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          color: '#123499'
                        }}>{item.after}</div>
                      </td>
                      <td style={{ 
                        padding: '1.25rem 1rem', 
                        textAlign: 'center'
                      }}>
                        <div style={{
                          fontSize: '1.25rem',
                          fontWeight: '700',
                          color: item.saved === '0h' ? '#9CA3AF' : '#10B981'
                        }}>{item.saved}</div>
                      </td>
                    </tr>
                  ))}
                  <tr style={{
                    backgroundColor: '#123499',
                    color: 'white',
                    fontWeight: '700'
                  }}>
                    <td style={{ padding: '1.25rem 1.5rem', fontSize: '1.125rem' }}>
                      TOTAL WEEKLY HOURS
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}></td>
                    <td style={{ 
                      padding: '1.25rem 1rem', 
                      textAlign: 'center',
                      fontSize: '1.75rem',
                      fontWeight: '700'
                    }}>55h</td>
                    <td style={{ 
                      padding: '1.25rem 1rem', 
                      textAlign: 'center',
                      fontSize: '1.75rem',
                      fontWeight: '700',
                      backgroundColor: '#0A2472'
                    }}>20h</td>
                    <td style={{ 
                      padding: '1.25rem 1rem', 
                      textAlign: 'center',
                      fontSize: '1.75rem',
                      fontWeight: '700'
                    }}>35h</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* The Real Impact - Exponential Growth */}
          <div style={{
            background: 'linear-gradient(135deg, #00072D 0%, #051650 100%)',
            borderRadius: '1.5rem',
            padding: '3rem',
            color: 'white',
            marginBottom: '3rem'
          }}>
            <h4 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              But Here's the Real Impact...
            </h4>
            <p style={{
              fontSize: '1.25rem',
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto 3rem auto',
              opacity: 0.9
            }}>
              Those 35 hours aren't ordinary hours—they're <span style={{ color: '#6B9FFF', fontWeight: '700' }}>AI-powered hours</span>. 
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
                }}>Without CMDR</div>
                <h5 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem'
                }}>Traditional Manual Work</h5>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#6B7280' }}>5-8</div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Max Clients</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#6B7280' }}>$300K</div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Annual Revenue</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#6B7280' }}>55h</div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Work Week</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#6B7280' }}>Burned Out</div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Quality of Life</div>
                  </div>
                </div>
              </div>

              {/* Path 2: With CMDR */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                border: '3px solid #1A43BF',
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
                  color: '#123499'
                }}>With CMDR</div>
                <h5 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  color: '#00072D'
                }}>AI-Amplified Growth</h5>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#123499' }}>12-18</div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Max Clients (2-3x)</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#123499' }}>$720K</div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Annual Revenue (2.4x)</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#123499' }}>35h</div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Work Week (36% less)</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10B981' }}>Thriving</div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Quality of Life</div>
                  </div>
                </div>
              </div>
            </div>

            {/* The Math Behind the Magic */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '1rem',
              padding: '2.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h5 style={{
                fontSize: '1.75rem',
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: '2rem'
              }}>The Exponential Effect in Action</h5>

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
                  }}>STEP 1: Reclaim Time</div>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem'
                  }}>35h</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Freed up weekly</div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#6B9FFF'
                  }}>STEP 2: AI-Amplify It</div>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem'
                  }}>17.5h</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Applied to AI sales/marketing</div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#10B981'
                  }}>RESULT: Scale Revenue</div>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    color: '#10B981'
                  }}>+$420K</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Additional annual revenue</div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div style={{
                backgroundColor: 'white',
                color: '#00072D',
                borderRadius: '1rem',
                padding: '2rem'
              }}>
                <h6 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  textAlign: 'center'
                }}>How AI-Backed Hours Create Exponential Returns</h6>

                <div style={{
                  display: 'grid',
                  gap: '1.5rem'
                }}>
                  {[
                    {
                      activity: 'AI-Powered Lead Generation',
                      traditional: '2-3 leads/week',
                      aiPowered: '15-20 leads/week',
                      impact: '6x more pipeline'
                    },
                    {
                      activity: 'Automated Nurture Sequences',
                      traditional: '20% conversion',
                      aiPowered: '45% conversion',
                      impact: '2.25x close rate'
                    },
                    {
                      activity: 'AI Proposal Generation',
                      traditional: '2 proposals/week',
                      aiPowered: '10 proposals/week',
                      impact: '5x sales velocity'
                    },
                    {
                      activity: 'Client Onboarding Automation',
                      traditional: '2 weeks per client',
                      aiPowered: '2 days per client',
                      impact: '7x faster ramp'
                    }
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 1fr 1fr',
                      gap: '1rem',
                      alignItems: 'center',
                      padding: '1rem',
                      backgroundColor: i % 2 === 0 ? '#F9FAFB' : 'white',
                      borderRadius: '0.5rem',
                      borderLeft: '4px solid #123499'
                    }}>
                      <div style={{ fontWeight: '600', color: '#00072D' }}>{item.activity}</div>
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

                <div style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  backgroundColor: '#EBF5FF',
                  borderRadius: '0.5rem',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>Combined Effect on Revenue</div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#6B7280' }}>
                      6 clients @ $5K/mo
                    </span>
                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#123499' }}>→</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#123499' }}>
                      15 clients @ $4K/mo
                    </span>
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#6B7280',
                    marginTop: '0.5rem'
                  }}>
                    ($360K/year → $720K/year) = <span style={{ color: '#10B981', fontWeight: '700' }}>$360K increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Insight Box */}
          <div style={{
            backgroundColor: '#F0FDF4',
            border: '3px solid #10B981',
            borderRadius: '1rem',
            padding: '2.5rem',
            marginBottom: '3rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1.5rem'
            }}>
              <div style={{
                fontSize: '3rem',
                flexShrink: 0
              }}>💡</div>
              <div>
                <h5 style={{
                  fontSize: '1.75rem',
                  fontWeight: '700',
                  color: '#00072D',
                  marginBottom: '1rem'
                }}>The Multiplication Factor</h5>
                <p style={{
                  fontSize: '1.125rem',
                  color: '#374151',
                  lineHeight: '1.7',
                  marginBottom: '1rem'
                }}>
                  This isn't just about "saving time"—it's about <span style={{ fontWeight: '700', color: '#123499' }}>transforming every hour into a growth engine</span>. 
                  When you apply AI-backed hours to sales and marketing, you don't get linear results. You get exponential growth.
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.5rem',
                  marginTop: '1.5rem'
                }}>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#123499' }}>6x</div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Lead generation multiplier</div>
                  </div>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#123499' }}>2.4x</div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Revenue increase potential</div>
                  </div>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: 'white',
                    borderRadius: '0.5rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10B981' }}>∞</div>
                    <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>Your growth ceiling</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section style={{ padding: '5rem 0', backgroundColor: 'white' }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              color: '#00072D',
              marginBottom: '1rem'
            }}>
              The Solution
            </h2>
            <h3 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: '600',
              color: '#051650',
              marginBottom: '1.5rem'
            }}>
              Break the Ceiling. Multiply Your Revenue Without Multiplying Your Hours.
            </h3>
            <p style={{
              fontSize: '1.125rem',
              maxWidth: '800px',
              margin: '0 auto',
              color: '#4B5563',
              lineHeight: '1.7'
            }}>
              CMDR doesn't just automate tasks—it <span style={{ fontWeight: '700', color: '#123499' }}>transforms every hour you work into an AI-amplified growth engine</span>. 
              Reclaim 35 hours weekly, then reinvest them into AI-powered sales and marketing that generates 6x more leads and 2.4x more revenue.
            </p>
          </div>

          {/* Platform Vision Box */}
          <div style={{
            background: 'linear-gradient(135deg, #EBF5FF 0%, #E0E7FF 100%)',
            borderRadius: '1.5rem',
            padding: '3rem',
            marginBottom: '3rem'
          }}>
              <h4 style={{
                fontSize: '2rem',
                fontWeight: '700',
                textAlign: 'center',
                color: '#00072D',
                marginBottom: '1.5rem'
              }}>
                The 2-Step Multiplication System
              </h4>
              <p style={{
                fontSize: '1.25rem',
                textAlign: 'center',
                maxWidth: '800px',
                margin: '0 auto 2.5rem auto',
                color: '#374151',
                lineHeight: '1.7'
              }}>
                <span style={{ fontWeight: '700', color: '#123499' }}>Step 1:</span> AI eliminates 35 hours of manual work weekly. 
                <span style={{ fontWeight: '700', color: '#123499' }}> Step 2:</span> Those aren't ordinary hours—they're AI-powered. 
                Apply half to automated lead gen and sales, and watch your revenue multiply while your hours shrink.
              </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                { icon: '🛡️', title: 'Unified Command Center', desc: 'Single pane of glass for all clients' },
                { icon: '⚡', title: 'AI Automation Engine', desc: 'Learns from vertical best practices' },
                { icon: '🎨', title: 'White-Label Branding', desc: '100% your brand—clients never know we exist' },
                { icon: '🔮', title: 'Predictive Analytics', desc: 'Help clients before they ask' },
                { icon: '👥', title: 'Client Portal Access', desc: 'Secure 24/7 access for clients' },
                { icon: '🧰', title: 'Industry-Specific Tools', desc: 'Custom modules for your vertical' }
              ].map((feature, i) => (
                <div key={i} style={{
                  backgroundColor: 'white',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}>
                  <div style={{
                    fontSize: '2rem',
                    marginBottom: '0.75rem'
                  }}>{feature.icon}</div>
                  <h5 style={{
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    color: '#00072D',
                    marginBottom: '0.5rem'
                  }}>{feature.title}</h5>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#6B7280'
                  }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem'
          }}>
            {/* Solo Commander Benefits */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  fontSize: '2rem'
                }}>🛡️</div>
                <h4 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#00072D'
                }}>For Solo Commanders</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  'Save 20-40 hours monthly on admin and reporting',
                  'Manage 2-3x more clients without quality loss',
                  'Differentiate with AI-powered platform',
                  'Generate leads automatically with built-in funnels',
                  'White-label your own branded platform',
                  'Access vertical-specific automation libraries',
                  'Predictive insights that wow clients',
                  'Professional client portal and dashboards'
                ].map((benefit, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      borderRadius: '50%',
                      backgroundColor: '#123499',
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
                    <span style={{ color: '#374151', lineHeight: '1.5' }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Master Commander Benefits */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  fontSize: '2rem'
                }}>📈</div>
                <h4 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#00072D'
                }}>For Master Commanders</h4>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  'Earn 25% commission on every license sold ($6,250 per)',
                  'Recurring revenue share (5% of first $1.5M tier)',
                  'Build a network of Sub-Commanders in your vertical',
                  'Leverage existing relationships in your industry',
                  'Passive income from network growth',
                  'Access to exclusive training and support',
                  'Priority feature requests for your vertical',
                  'Co-branding opportunities for your network'
                ].map((benefit, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      borderRadius: '50%',
                      backgroundColor: '#051650',
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
                    <span style={{ color: '#374151', lineHeight: '1.5' }}>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why Now */}
          <div style={{
            marginTop: '3rem',
            backgroundColor: 'white',
            borderRadius: '1rem',
            padding: '2.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            borderTop: '4px solid #123499'
          }}>
            <h4 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              textAlign: 'center',
              color: '#00072D',
              marginBottom: '2rem'
            }}>
              🎯 Why This Works Now
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              {[
                { title: 'AI is Mature', desc: 'LLMs, agents, and automation are production-ready and proven' },
                { title: 'Market Desperation', desc: '336K CXOs need differentiation—competition is fierce' },
                { title: 'No Competition', desc: 'Zero AI-native platforms built for fractional CXOs' }
              ].map((reason, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '50%',
                    backgroundColor: ['#051650', '#0A2472', '#123499'][i],
                    margin: '0 auto 1rem auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    {['📈', '💰', '🚀'][i]}
                  </div>
                  <h5 style={{
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    color: '#00072D',
                    marginBottom: '0.5rem'
                  }}>{reason.title}</h5>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#6B7280'
                  }}>{reason.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Market Opportunity Section */}
      <section style={{ 
        padding: '5rem 0',
        backgroundColor: '#f9fafb'
      }}>
        <div className="section-container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: '700',
              color: '#00072D',
              marginBottom: '1rem'
            }}>
              Market Opportunity
            </h2>
            <h3 style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: '600',
              color: '#051650',
              marginBottom: '1.5rem'
            }}>
              A $40B+ Market Hiding in Plain Sight
            </h3>
            <p style={{
              fontSize: '1.125rem',
              maxWidth: '800px',
              margin: '0 auto',
              color: '#4B5563',
              lineHeight: '1.7'
            }}>
              336,000 fractional CXOs across 10 major verticals, all with identical pain points and high willingness to pay for survival
            </p>
          </div>

          {/* Market Table */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            marginBottom: '3rem'
          }}>
            <div style={{
              overflowX: 'auto'
            }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse'
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: '#00072D',
                    color: 'white'
                  }}>
                    <th style={{ padding: '1.25rem 1.5rem', textAlign: 'left', fontWeight: '700', fontSize: '0.95rem' }}>Market Segment</th>
                    <th style={{ padding: '1.25rem 1rem', textAlign: 'center', fontWeight: '700', fontSize: '0.95rem' }}>CXO Count</th>
                    <th style={{ padding: '1.25rem 1rem', textAlign: 'center', fontWeight: '700', fontSize: '0.95rem' }}>Avg Revenue</th>
                    <th style={{ padding: '1.25rem 1rem', textAlign: 'center', fontWeight: '700', fontSize: '0.95rem' }}>Pain Level</th>
                    <th style={{ padding: '1.25rem 1rem', textAlign: 'center', fontWeight: '700', fontSize: '0.95rem' }}>Willingness</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { segment: 'Fractional CFO Services', count: '45,000', revenue: '$180K-720K', pain: 5, will: 5 },
                    { segment: 'Marketing/CMO Services', count: '52,000', revenue: '$72K-360K', pain: 5, will: 5 },
                    { segment: 'Sales/CSO Services', count: '41,000', revenue: '$84K-336K', pain: 5, will: 5 },
                    { segment: 'Property Management', count: '38,000', revenue: '$120K-480K', pain: 4, will: 4 },
                    { segment: 'Healthcare Practice', count: '35,000', revenue: '$126K-588K', pain: 5, will: 5 },
                    { segment: 'IT/CTO/CIO Services', count: '31,000', revenue: '$120K-480K', pain: 5, will: 5 },
                    { segment: 'HR/CHRO Services', count: '28,000', revenue: '$144K-540K', pain: 4, will: 4 },
                    { segment: 'Operations/COO', count: '26,000', revenue: '$108K-480K', pain: 4, will: 4 },
                    { segment: 'Legal Practice Mgmt', count: '22,000', revenue: '$144K-432K', pain: 5, will: 5 },
                    { segment: 'M&A/Biz Development', count: '18,000', revenue: '$180K-900K', pain: 5, will: 5 }
                  ].map((row, i) => (
                    <tr key={i} style={{
                      borderBottom: '1px solid #E5E7EB',
                      backgroundColor: i % 2 === 0 ? 'white' : '#F9FAFB'
                    }}>
                      <td style={{ padding: '1.25rem 1.5rem', fontWeight: '600', color: '#00072D' }}>{row.segment}</td>
                      <td style={{ padding: '1.25rem 1rem', textAlign: 'center', fontWeight: '700', color: '#123499', fontSize: '1.1rem' }}>{row.count}</td>
                      <td style={{ padding: '1.25rem 1rem', textAlign: 'center', color: '#374151' }}>{row.revenue}</td>
                      <td style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem' }}>
                          {Array(row.pain).fill(0).map((_, j) => (
                            <div key={j} style={{
                              width: '0.75rem',
                              height: '0.75rem',
                              borderRadius: '50%',
                              backgroundColor: '#123499'
                            }}></div>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem' }}>
                          {Array(row.will).fill(0).map((_, j) => (
                            <div key={j} style={{
                              width: '0.75rem',
                              height: '0.75rem',
                              borderRadius: '50%',
                              backgroundColor: '#051650'
                            }}></div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr style={{
                    backgroundColor: '#123499',
                    color: 'white',
                    fontWeight: '700'
                  }}>
                    <td style={{ padding: '1.25rem 1.5rem' }}>TOTAL ADDRESSABLE MARKET</td>
                    <td style={{ padding: '1.25rem 1rem', textAlign: 'center', fontSize: '1.1rem' }}>336,000</td>
                    <td style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>$120K-550K avg</td>
                    <td style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>—</td>
                    <td style={{ padding: '1.25rem 1rem', textAlign: 'center' }}>—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* TAM Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {[
              { stat: '336K', label: 'Total Practitioners', sub: 'Across 10 major CXO segments', color: '#051650' },
              { stat: '$40B+', label: 'Annual Market Size', sub: 'In consulting services revenue', color: '#0A2472' },
              { stat: '$104M+', label: 'CMDR Opportunity', sub: 'At just 1% market penetration', color: '#123499' }
            ].map((item, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                textAlign: 'center',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                borderTop: `4px solid ${item.color}`
              }}>
                <div style={{
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontWeight: '700',
                  color: '#123499',
                  marginBottom: '0.75rem'
                }}>{item.stat}</div>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#00072D',
                  marginBottom: '0.5rem'
                }}>{item.label}</div>
                <p style={{
                  color: '#6B7280'
                }}>{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Market Validation Box */}
          <div style={{
            background: 'linear-gradient(135deg, #051650 0%, #0A2472 100%)',
            borderRadius: '1.5rem',
            padding: '3rem',
            color: 'white'
          }}>
            <h4 style={{
              fontSize: '2rem',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '2.5rem'
            }}>
              📊 Market Validation: Why CXOs Will Pay
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '3rem'
            }}>
              <div>
                <h5 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem'
                }}>What Every CXO Struggles With:</h5>
                <ul style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  {[
                    'Multi-client system chaos (switching 20+ times daily)',
                    'Manual reporting hell (15-30 hours monthly)',
                    'Zero systematic lead generation',
                    'No technology differentiation',
                    'Scalability ceiling (5-8 client max)',
                    'Unprofessional consumer tools'
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0 }}>✓</span>
                      <span style={{ opacity: 0.9 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem'
                }}>What CXOs Will Pay For:</h5>
                <ul style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  {[
                    'Time liberation (20-40 hours monthly)',
                    'Capacity expansion (2-3x more clients)',
                    'Revenue growth (1-2 additional clients = $36K-360K)',
                    'Technology differentiation (win more deals)',
                    'Professional platform (impress $10M+ clients)',
                    'Predictive insights (wow existing clients)'
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <span style={{ flexShrink: 0 }}>✓</span>
                      <span style={{ opacity: 0.9 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #00072D 0%, #051650 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="section-container">
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: '700',
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            Ready to Transform Your<br />Consulting Practice?
          </h2>
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            maxWidth: '800px',
            margin: '0 auto 3rem auto',
            opacity: 0.9,
            lineHeight: '1.6'
          }}>
            Stop hitting the revenue ceiling. Start multiplying every hour into exponential growth. 
            Join 100+ fractional CXOs who've already 2-3x'd their revenue without burning out.
          </p>

          <CTAButtons />

          {/* What Happens Next */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '1rem',
            padding: '2.5rem',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <h4 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              marginBottom: '2rem'
            }}>
              What Happens Next
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              textAlign: 'left'
            }}>
              {[
                { num: '1', title: 'Discovery Call', desc: '45-minute consultation to understand your vertical, client base, and goals' },
                { num: '2', title: 'Platform Demo', desc: 'Live walkthrough of platform capabilities tailored to your industry' },
                { num: '3', title: 'Onboarding', desc: '30-day white-label setup, branding, and training—ready to launch' }
              ].map((step, i) => (
                <div key={i}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    backgroundColor: '#123499',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '1.5rem',
                    marginBottom: '1rem'
                  }}>{step.num}</div>
                  <h5 style={{
                    fontWeight: '700',
                    fontSize: '1.125rem',
                    marginBottom: '0.5rem'
                  }}>{step.title}</h5>
                  <p style={{
                    fontSize: '0.875rem',
                    opacity: 0.9,
                    lineHeight: '1.5'
                  }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            marginTop: '3rem',
            opacity: 0.8
          }}>
            <p style={{
              marginBottom: '1rem',
              fontSize: '1.125rem'
            }}>Limited to 100 initial partners across all verticals</p>
            <p style={{
              fontSize: '0.875rem'
            }}>First-movers get priority vertical selection and grandfathered pricing</p>
          </div>
        </div>
      </section>

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
            <p style={{ marginBottom: '0.5rem' }}>Partnership Opportunity • $25K License • 20% Revenue Share</p>
            <p>© 2025 CMDR • AI-Native Operating Systems for Professional Consultants</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
