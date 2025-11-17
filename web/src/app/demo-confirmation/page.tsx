'use client';

export default function DemoConfirmationPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#F9FAFB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '1.5rem',
        padding: '3rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E5E7EB',
        textAlign: 'center'
      }}>
        {/* Success Icon */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#D1FAE5',
          marginBottom: '2rem'
        }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M33.3333 10L15 28.3333L6.66667 20" stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Success Message */}
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#00072D',
          marginBottom: '1rem'
        }}>
          Demo Scheduled Successfully!
        </h1>

        <p style={{
          fontSize: '1.125rem',
          color: '#374151',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          Thank you for your interest in CMDR! We're excited to show you how our AI platform can transform your practice.
        </p>

        {/* What's Next */}
        <div style={{
          backgroundColor: '#F9FAFB',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem',
          textAlign: 'left',
          border: '1px solid #E5E7EB'
        }}>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#00072D',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            What Happens Next?
          </h2>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#123499',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '0.875rem',
                flexShrink: 0
              }}>1</div>
              <div>
                <div style={{ fontWeight: '600', color: '#00072D', marginBottom: '0.25rem' }}>
                  Confirmation Email
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                  You'll receive an email confirmation with a calendar invite and Zoom link within the next few minutes.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#123499',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '0.875rem',
                flexShrink: 0
              }}>2</div>
              <div>
                <div style={{ fontWeight: '600', color: '#00072D', marginBottom: '0.25rem' }}>
                  We'll Prepare Your Demo
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                  Our team will customize the demo specifically for your vertical and use cases.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#123499',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '0.875rem',
                flexShrink: 0
              }}>3</div>
              <div>
                <div style={{ fontWeight: '600', color: '#00072D', marginBottom: '0.25rem' }}>
                  Join the Demo
                </div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                  Click the Zoom link at your scheduled time to see your personalized platform in action.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <a
            href="/"
            style={{
              display: 'block',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: '700',
              backgroundColor: '#123499',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              textDecoration: 'none',
              transition: 'all 0.2s',
              boxShadow: '0 4px 6px rgba(18, 52, 153, 0.2)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(18, 52, 153, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(18, 52, 153, 0.2)';
            }}
          >
            Return to Homepage
          </a>
          
          <p style={{
            fontSize: '0.75rem',
            color: '#9CA3AF',
            margin: 0
          }}>
            Check your email for your calendar invite and demo details
          </p>
        </div>
      </div>
    </div>
  );
}

