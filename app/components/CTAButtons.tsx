'use client';

export function CTAButtons() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      maxWidth: '700px',
      margin: '0 auto 3rem auto'
    }}>
      <a href="#contact" style={{
        display: 'block',
        padding: '1.25rem 2rem',
        borderRadius: '0.75rem',
        backgroundColor: '#123499',
        color: 'white',
        fontWeight: '700',
        fontSize: '1.125rem',
        textDecoration: 'none',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        Become a Solo Commander
      </a>
      <a href="#contact" style={{
        display: 'block',
        padding: '1.25rem 2rem',
        borderRadius: '0.75rem',
        backgroundColor: 'transparent',
        color: 'white',
        fontWeight: '700',
        fontSize: '1.125rem',
        textDecoration: 'none',
        border: '2px solid white',
        transition: 'transform 0.2s, background-color 0.2s',
        textAlign: 'center'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
      >
        Become a Master Commander
      </a>
    </div>
  );
}







