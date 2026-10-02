import React, { useState } from 'react';
import Logo from '../components/Logo';
import { Truck, Shield, KeyRound, User, ArrowRight, CheckCircle2, Sparkles, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { GeorgiaFlag, USFlag } from '../components/Flags';

export default function Login({ onLogin }) {
  const [role, setRole] = useState('dispatcher'); // dispatcher | carrier
  const [email, setEmail] = useState('dispatcher@aeroroute.io');
  const [password, setPassword] = useState('••••••••••');
  const { language, setLanguage, t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(role, email);
  };

  const handleRoleSelect = (newRole) => {
    setRole(newRole);
    if (newRole === 'dispatcher') {
      setEmail('dispatcher@aeroroute.io');
    } else {
      setEmail('marcus.vance@apexfreight.com');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 40%, #e0f2fe 100%)',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top Language Switcher Bar on Login */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(8px)',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid #bae6fd',
          boxShadow: '0 4px 12px rgba(2, 132, 199, 0.08)',
          zIndex: 10,
          gap: '4px'
        }}
      >
        <button
          onClick={() => setLanguage('en')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 700,
            backgroundColor: language === 'en' ? '#0284c7' : 'transparent',
            color: language === 'en' ? '#ffffff' : '#475569',
            border: 'none',
            transition: 'all 0.15s ease'
          }}
        >
          <USFlag size={18} />
          <span>English</span>
        </button>

        <button
          onClick={() => setLanguage('ka')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: 700,
            backgroundColor: language === 'ka' ? '#0284c7' : 'transparent',
            color: language === 'ka' ? '#ffffff' : '#475569',
            border: 'none',
            transition: 'all 0.15s ease'
          }}
        >
          <GeorgiaFlag size={18} />
          <span>ქართული</span>
        </button>
      </div>

      {/* Decorative Background Blobs */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(2, 132, 199, 0.03) 70%, transparent 100%)',
          top: '-100px',
          left: '-100px',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(224, 242, 254, 0.05) 70%, transparent 100%)',
          bottom: '-120px',
          right: '-100px',
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          width: '100%',
          maxWidth: '470px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(2, 132, 199, 0.18), 0 0 0 1px rgba(186, 230, 253, 0.6)',
          padding: '36px 32px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Brand Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '28px' }}>
          <Logo size="lg" />
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '12px' }}>
            {t('loginTitle')}
          </p>
        </div>

        {/* Role Toggle Selector */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: '#f1f5f9',
            padding: '4px',
            borderRadius: '12px',
            marginBottom: '24px'
          }}
        >
          <button
            type="button"
            onClick={() => handleRoleSelect('dispatcher')}
            style={{
              padding: '10px 14px',
              borderRadius: '9px',
              fontSize: '0.85rem',
              fontWeight: 700,
              backgroundColor: role === 'dispatcher' ? '#ffffff' : 'transparent',
              color: role === 'dispatcher' ? '#0284c7' : '#64748b',
              boxShadow: role === 'dispatcher' ? '0 2px 8px rgba(0, 0, 0, 0.06)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Shield size={16} />
            {t('dispatcherPortal')}
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('carrier')}
            style={{
              padding: '10px 14px',
              borderRadius: '9px',
              fontSize: '0.85rem',
              fontWeight: 700,
              backgroundColor: role === 'carrier' ? '#ffffff' : 'transparent',
              color: role === 'carrier' ? '#0284c7' : '#64748b',
              boxShadow: role === 'carrier' ? '0 2px 8px rgba(0, 0, 0, 0.06)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <Truck size={16} />
            {t('carrierDriver')}
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              {t('workEmail')}
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 38px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#f8fafc',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <User size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '15px' }} />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }}>
                {t('passwordPin')}
              </label>
              <a href="#reset" onClick={e => e.preventDefault()} style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 600 }}>
                {t('forgotPin')}
              </a>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 38px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#f8fafc',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <KeyRound size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '15px' }} />
            </div>
          </div>

          <button
            type="submit"
            style={{
              marginTop: '8px',
              padding: '13px',
              borderRadius: '12px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontWeight: 700,
              boxShadow: '0 8px 20px -4px rgba(2, 132, 199, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <span>{t('signInTo')} {role === 'dispatcher' ? t('dispatchConsole') : t('carrierHub')}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Quick Demo Access Pills */}
        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <Sparkles size={14} color="#0284c7" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              {t('instantDemoLogin')}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => {
                setRole('dispatcher');
                onLogin('dispatcher', 'dispatcher@aeroroute.io');
              }}
              style={{
                padding: '9px 12px',
                borderRadius: '8px',
                backgroundColor: '#f0f9ff',
                border: '1px solid #bae6fd',
                color: '#0369a1',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>{t('demoAsLeadDispatcher')}</span>
              <span style={{ fontSize: '0.72rem', background: '#e0f2fe', padding: '2px 8px', borderRadius: '4px' }}>
                {t('fullControl')} →
              </span>
            </button>

            <button
              onClick={() => {
                setRole('carrier');
                onLogin('carrier', 'dispatch@apexfreight.com');
              }}
              style={{
                padding: '9px 12px',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                color: '#334155',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>{t('demoAsCarrier')}</span>
              <span style={{ fontSize: '0.72rem', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>
                {t('carrierView')} →
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
