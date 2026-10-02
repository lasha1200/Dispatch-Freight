import React from 'react';
import Logo from './Logo';
import { 
  LayoutDashboard, Truck, PlusCircle, Smartphone, 
  LogOut, Shield, Bell, Search, Globe 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { GeorgiaFlag, USFlag } from './Flags';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  onOpenNewOrder, 
  onOpenDriverPhone, 
  userRole, 
  onLogout,
  unassignedCount
}) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 2px 10px rgba(2, 132, 199, 0.04)'
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 24px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentTab('orders')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}
        >
          <Logo size="md" />
        </div>

        {/* Center Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setCurrentTab('orders')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '0.9rem',
              fontWeight: 600,
              backgroundColor: currentTab === 'orders' ? '#f0f9ff' : 'transparent',
              color: currentTab === 'orders' ? '#0284c7' : '#475569',
              border: currentTab === 'orders' ? '1px solid #bae6fd' : '1px solid transparent',
              transition: 'all 0.15s ease'
            }}
          >
            <LayoutDashboard size={18} />
            <span>{t('ordersBoard')}</span>
            {unassignedCount > 0 && (
              <span
                style={{
                  background: '#fef3c7',
                  color: '#b45309',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: '999px',
                  marginLeft: '2px'
                }}
              >
                {unassignedCount} {t('unassigned')}
              </span>
            )}
          </button>

          <button
            onClick={() => setCurrentTab('carriers')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '0.9rem',
              fontWeight: 600,
              backgroundColor: currentTab === 'carriers' || currentTab === 'carrier_detail' ? '#f0f9ff' : 'transparent',
              color: currentTab === 'carriers' || currentTab === 'carrier_detail' ? '#0284c7' : '#475569',
              border: currentTab === 'carriers' || currentTab === 'carrier_detail' ? '1px solid #bae6fd' : '1px solid transparent',
              transition: 'all 0.15s ease'
            }}
          >
            <Truck size={18} />
            <span>{t('carriersDirectory')}</span>
          </button>
        </nav>

        {/* Right Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Language Switcher with Georgian and US Flags */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#f1f5f9',
              padding: '3px',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              gap: '2px'
            }}
            title={t('switchLanguage')}
          >
            <button
              onClick={() => setLanguage('en')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 9px',
                borderRadius: '7px',
                fontSize: '0.78rem',
                fontWeight: 700,
                backgroundColor: language === 'en' ? '#ffffff' : 'transparent',
                color: language === 'en' ? '#0284c7' : '#64748b',
                boxShadow: language === 'en' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                border: language === 'en' ? '1px solid #bae6fd' : '1px solid transparent',
                transition: 'all 0.15s ease'
              }}
            >
              <USFlag size={18} />
              <span>EN</span>
            </button>

            <button
              onClick={() => setLanguage('ka')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 9px',
                borderRadius: '7px',
                fontSize: '0.78rem',
                fontWeight: 700,
                backgroundColor: language === 'ka' ? '#ffffff' : 'transparent',
                color: language === 'ka' ? '#0284c7' : '#64748b',
                boxShadow: language === 'ka' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                border: language === 'ka' ? '1px solid #bae6fd' : '1px solid transparent',
                transition: 'all 0.15s ease'
              }}
            >
              <GeorgiaFlag size={18} />
              <span>GE</span>
            </button>
          </div>

          {/* Driver Mobile Phone Simulator Trigger */}
          <button
            onClick={onOpenDriverPhone}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '8px 13px',
              borderRadius: '10px',
              backgroundColor: '#ffffff',
              border: '1px solid #bae6fd',
              color: '#0284c7',
              fontSize: '0.84rem',
              fontWeight: 700,
              boxShadow: '0 2px 6px rgba(2, 132, 199, 0.08)'
            }}
            title="Open live interactive phone screen simulation for drivers"
          >
            <Smartphone size={16} />
            <span style={{ whiteSpace: 'nowrap' }}>{t('driverPhoneApp')}</span>
          </button>

          {/* New Order Button */}
          <button
            onClick={onOpenNewOrder}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '8px 15px',
              borderRadius: '10px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              fontSize: '0.86rem',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.28)',
              whiteSpace: 'nowrap'
            }}
          >
            <PlusCircle size={16} />
            <span>{t('newOrder')}</span>
          </button>

          {/* User Profile Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              paddingLeft: '10px',
              borderLeft: '1px solid #e2e8f0'
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#e0f2fe',
                border: '2px solid #bae6fd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: '#0284c7',
                fontSize: '0.85rem',
                flexShrink: 0
              }}
            >
              {userRole === 'dispatcher' ? 'DP' : 'CR'}
            </div>

            <div style={{ display: 'none', flexDirection: 'column' }} className="user-info-text">
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                {userRole === 'dispatcher' ? t('leadDispatcher') : t('carrierOperator')}
              </span>
              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                {userRole === 'dispatcher' ? t('chicagoHQ') : t('fleetActive')}
              </span>
            </div>

            <button
              onClick={onLogout}
              style={{
                padding: '8px',
                borderRadius: '8px',
                color: '#94a3b8',
                backgroundColor: 'transparent'
              }}
              title={t('logout')}
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
