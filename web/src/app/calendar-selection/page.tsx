'use client';

import { useState, useEffect } from 'react';

function generateTimeSlots(): Array<{ date: string; time: string; formatted: string }> {
  const slots: Array<{ date: string; time: string; formatted: string }> = [];
  const now = new Date();
  
  // Start from tomorrow
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() + 1);
  
  // Generate 12 time slots over the next 2 weeks
  let slotsAdded = 0;
  const currentDate = new Date(startDate);
  
  while (slotsAdded < 12 && currentDate < new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)) {
    const dayOfWeek = currentDate.getDay();
    
    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek];
      const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][currentDate.getMonth()];
      const date = currentDate.getDate();
      const year = currentDate.getFullYear();
      
      // Add morning and afternoon slots for each day
      const times = ['10:00 AM PT', '2:00 PM PT', '4:00 PM PT'];
      
      times.forEach((time) => {
        if (slotsAdded < 12) {
          slots.push({
            date: `${year}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`,
            time: time,
            formatted: `${dayName}, ${month} ${date} — ${time}`
          });
          slotsAdded++;
        }
      });
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return slots;
}

export default function CalendarSelectionPage() {
  const [formData, setFormData] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [timeSlots] = useState(generateTimeSlots());

  useEffect(() => {
    // Retrieve form data from localStorage
    const savedData = localStorage.getItem('demoFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    } else {
      // Redirect back if no form data
      window.location.href = '/';
    }
  }, []);

  const handleSubmit = async () => {
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }

    setSubmitting(true);

    try {
      const api = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      
      // Create a demo schedule request (no auth required for public demo requests)
      const response = await fetch(`${api}/public/demo-schedule-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          time_slot: selectedSlot,
          meeting_description: `Demo request from ${formData.expertise} consultant`
        })
      });

      const data = await response.json();

      if (data.ok) {
        // Clear saved data
        localStorage.removeItem('demoFormData');
        
        // Redirect to confirmation page
        window.location.href = '/demo-confirmation';
      } else {
        alert(data.error || 'Failed to schedule demo. Please try again.');
        setSubmitting(false);
      }
    } catch (error) {
      console.error('Error scheduling demo:', error);
      alert('Failed to schedule demo. Please try again.');
      setSubmitting(false);
    }
  };

  if (!formData) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#F9FAFB'
      }}>
        <p style={{ color: '#6B7280' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB', padding: '2rem' }}>
      {/* Header */}
      <div style={{ 
        maxWidth: '900px', 
        margin: '0 auto 3rem auto',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: '700',
          color: '#00072D',
          marginBottom: '1rem'
        }}>
          Select Your Preferred Time
        </h1>
        <p style={{
          fontSize: '1.125rem',
          color: '#374151',
          marginBottom: '0.5rem'
        }}>
          Welcome, <span style={{ fontWeight: '600', color: '#123499' }}>{formData.name}</span>!
        </p>
        <p style={{
          fontSize: '1rem',
          color: '#6B7280'
        }}>
          Choose a time for your personalized {formData.expertise} demo
        </p>
      </div>

      {/* Calendar Grid */}
      <div style={{ 
        maxWidth: '1100px', 
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '1.5rem',
        padding: '3rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #E5E7EB'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#00072D',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Available Time Slots
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '2.5rem'
        }}>
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              onClick={() => setSelectedSlot(slot.formatted)}
              disabled={submitting}
              style={{
                padding: '1.25rem 1.5rem',
                backgroundColor: selectedSlot === slot.formatted ? '#EBF5FF' : 'white',
                border: selectedSlot === slot.formatted ? '3px solid #123499' : '2px solid #E5E7EB',
                borderRadius: '0.75rem',
                cursor: submitting ? 'not-allowed' : 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
                opacity: submitting ? 0.6 : 1
              }}
              onMouseOver={(e) => {
                if (!submitting && selectedSlot !== slot.formatted) {
                  e.currentTarget.style.borderColor = '#123499';
                  e.currentTarget.style.backgroundColor = '#F9FAFB';
                }
              }}
              onMouseOut={(e) => {
                if (!submitting && selectedSlot !== slot.formatted) {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.backgroundColor = 'white';
                }
              }}
            >
              <div style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: '#00072D',
                marginBottom: '0.25rem'
              }}>
                {slot.formatted.split(' — ')[0]}
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: selectedSlot === slot.formatted ? '#123499' : '#6B7280',
                fontWeight: selectedSlot === slot.formatted ? '600' : '400'
              }}>
                {slot.formatted.split(' — ')[1]}
              </div>
              {selectedSlot === slot.formatted && (
                <div style={{
                  marginTop: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#10B981',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Selected
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Confirm Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleSubmit}
            disabled={!selectedSlot || submitting}
            style={{
              padding: '1.25rem 3rem',
              fontSize: '1.125rem',
              fontWeight: '700',
              backgroundColor: !selectedSlot || submitting ? '#9CA3AF' : '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '0.75rem',
              cursor: !selectedSlot || submitting ? 'not-allowed' : 'pointer',
              boxShadow: !selectedSlot || submitting ? 'none' : '0 10px 30px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.2s',
              opacity: !selectedSlot || submitting ? 0.6 : 1
            }}
            onMouseOver={(e) => {
              if (selectedSlot && !submitting) {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.4)';
              }
            }}
            onMouseOut={(e) => {
              if (selectedSlot && !submitting) {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.3)';
              }
            }}
          >
            {submitting ? 'Scheduling...' : 'Confirm My Demo Time →'}
          </button>
          
          <p style={{
            marginTop: '1.5rem',
            fontSize: '0.875rem',
            color: '#6B7280'
          }}>
            You'll receive a confirmation email with calendar invite and Zoom link
          </p>
        </div>
      </div>

      {/* Back Link */}
      <div style={{ 
        maxWidth: '900px', 
        margin: '2rem auto 0 auto',
        textAlign: 'center'
      }}>
        <a
          href="/"
          style={{
            color: '#123499',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}
        >
          ← Back to homepage
        </a>
      </div>
    </div>
  );
}





