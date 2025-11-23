"use client";

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`https://cmdr-backend.onrender.com/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Login failed");
      if (data.token) {
        try {
          localStorage.setItem("xsourcing_token", data.token as string);
          document.cookie = `xsourcing_token=${data.token}; Max-Age=${7 * 24 * 60 * 60}; Path=/; SameSite=Lax;`;
        } catch (_) { /* ignore */ }
      }
      const role = data.user.role as string;
      if (role === "admin") window.location.href = "/admin";
      else if (role === "advisor") window.location.href = "/advisor";
      else window.location.href = "/dashboard";
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("An unexpected error occurred.");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F3F4F6',
      padding: '2rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '3rem 2rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        border: '1px solid #E5E7EB'
      }}>
        <div style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#123499',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>CMDR</div>
        
        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: '600',
          color: '#00072D',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>Sign in to Platform</h1>
        
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>Username</label>
            <input
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                border: '2px solid #D1D5DB',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={(e) => e.currentTarget.style.borderColor = '#123499'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
            />
          </div>
          
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>Password</label>
            <input
              type="password"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                fontSize: '1rem',
                border: '2px solid #D1D5DB',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => e.currentTarget.style.borderColor = '#123499'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#D1D5DB'}
            />
          </div>
          
          {error && (
            <div style={{
              padding: '0.75rem',
              backgroundColor: '#FEE2E2',
              border: '1px solid #FCA5A5',
              borderRadius: '8px',
              color: '#DC2626',
              fontSize: '0.875rem'
            }}>
              {error}
            </div>
          )}
          
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.875rem',
              fontSize: '1rem',
              fontWeight: '700',
              backgroundColor: '#123499',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '0.5rem',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0A2472'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#123499'}
          >
            Continue
          </button>
        </form>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '1.5rem',
          fontSize: '0.875rem'
        }}>
          <a href="/reset" style={{ color: '#123499', textDecoration: 'underline' }}>
            Forgot Password?
          </a>
          <a href="/" style={{ color: '#123499', textDecoration: 'underline' }}>
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}






