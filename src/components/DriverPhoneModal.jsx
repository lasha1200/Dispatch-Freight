import React, { useState } from 'react';
import { 
  X, Smartphone, Clock, MapPin, Truck, AlertTriangle, 
  CheckCircle2, Navigation, Phone, Shield, ArrowRight, RefreshCw, Send
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function DriverPhoneModal({ isOpen, onClose, orders, carriers, onUpdateOrder }) {
  const { t } = useLanguage();
  const activeAssignedOrders = orders.filter(o => o.status !== 'delivered' && o.carrierId);
  const [selectedOrderId, setSelectedOrderId] = useState(activeAssignedOrders[0]?.id || orders[0]?.id);
  
  const currentOrder = orders.find(o => o.id === selectedOrderId) || activeAssignedOrders[0] || orders[0];
  const currentCarrier = carriers.find(c => c.id === currentOrder?.carrierId);

  const [etaStatusInput, setEtaStatusInput] = useState('');
  const [delayMinutes, setDelayMinutes] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  if (!isOpen) return null;

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleUpdateETA = (additionalMinutes, reasonText) => {
    if (!currentOrder) return;
    const newReason = additionalMinutes > 0 
      ? `Delayed +${additionalMinutes}m (${reasonText || 'Traffic & Highway Delay'})` 
      : `On Schedule - Verified by Driver`;

    onUpdateOrder(currentOrder.id, {
      etaStatus: newReason,
      status: additionalMinutes > 30 ? 'delayed' : currentOrder.status,
      lastUpdate: 'Just now from Mobile'
    });

    showToast(`ETA updated: ${newReason}`);
  };

  const handleStatusChange = (newStatus, statusLabel) => {
    if (!currentOrder) return;
    onUpdateOrder(currentOrder.id, {
      status: newStatus,
      etaStatus: statusLabel,
      lastUpdate: 'Just now (Mobile GPS Check-in)'
    });
    showToast(`Status updated to: ${statusLabel}`);
  };

  const handleCustomNote = (e) => {
    e.preventDefault();
    if (!statusMessage.trim() || !currentOrder) return;
    onUpdateOrder(currentOrder.id, {
      notes: `${currentOrder.notes ? currentOrder.notes + ' | ' : ''}Driver Note: ${statusMessage}`,
      lastUpdate: 'Just now (Driver message)'
    });
    setStatusMessage('');
    showToast('Driver note sent to Dispatcher!');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top Info Bar */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '8px 20px',
            borderRadius: '999px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            border: '1px solid #bae6fd'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Smartphone size={16} color="#0284c7" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
              {t('driverMobileCompanion')}
            </span>
          </div>
          <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
            {t('changesSyncAuto')}
          </span>
          <button
            onClick={onClose}
            style={{
              background: '#e0f2fe',
              color: '#0284c7',
              borderRadius: '999px',
              padding: '4px 10px',
              fontSize: '0.75rem',
              fontWeight: 700
            }}
          >
            {t('closeView')}
          </button>
        </div>

        {/* Realistic Mobile Device Container */}
        <div
          style={{
            width: '380px',
            height: '740px',
            backgroundColor: '#0f172a',
            borderRadius: '44px',
            padding: '12px',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Hardware Screen Bezel */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '34px',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {/* Phone Notch */}
            <div
              style={{
                height: '24px',
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 24px',
                fontSize: '0.7rem',
                fontWeight: 700,
                color: '#1e293b'
              }}
            >
              <span>9:41</span>
              <div
                style={{
                  width: '90px',
                  height: '16px',
                  backgroundColor: '#0f172a',
                  borderRadius: '0 0 12px 12px'
                }}
              />
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.65rem' }}>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* Mobile App Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
                color: '#ffffff',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Truck size={18} color="#ffffff" />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 800, lineHeight: 1.1 }}>AeroRoute Driver</h4>
                  <span style={{ fontSize: '0.7rem', opacity: 0.85 }}>
                    {currentOrder?.driverName || t('driverPortal')} • {currentOrder?.id}
                  </span>
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.25)', padding: '3px 8px', borderRadius: '999px', fontSize: '0.65rem', fontWeight: 700 }}>
                {t('online')}
              </div>
            </div>

            {/* Toast Alert */}
            {toastMessage && (
              <div
                style={{
                  background: '#0f172a',
                  color: '#ffffff',
                  padding: '8px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  animation: 'fadeIn 0.2s ease-in'
                }}
              >
                ✓ {toastMessage}
              </div>
            )}

            {/* Mobile Screen Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Order Selector */}
              <div>
                <label style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {t('switchAssignedLoad')}
                </label>
                <select
                  value={selectedOrderId}
                  onChange={e => setSelectedOrderId(e.target.value)}
                  style={{
                    width: '100%',
                    marginTop: '4px',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.8rem',
                    backgroundColor: '#f8fafc',
                    fontWeight: 600
                  }}
                >
                  {orders.map(o => (
                    <option key={o.id} value={o.id}>
                      {o.id}: {o.origin.city} → {o.destination.city} ({o.status})
                    </option>
                  ))}
                </select>
              </div>

              {/* Active Route Card */}
              {currentOrder ? (
                <div
                  style={{
                    backgroundColor: '#f0f9ff',
                    border: '1px solid #bae6fd',
                    borderRadius: '14px',
                    padding: '14px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase' }}>
                      {t('currentRoute')} • {currentOrder.miles} mi
                    </span>
                    <span style={{ fontSize: '0.72rem', background: '#d1fae5', color: '#065f46', fontWeight: 700, padding: '2px 8px', borderRadius: '999px' }}>
                      ${currentOrder.rate}
                    </span>
                  </div>

                  {/* Route Steps */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0284c7', marginTop: '4px', flexShrink: 0 }} />
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#64748b', display: 'block' }}>{t('pickup').toUpperCase()}</span>
                        <strong style={{ fontSize: '0.82rem', color: '#0f172a' }}>{currentOrder.origin.city}, {currentOrder.origin.state}</strong>
                        <span style={{ fontSize: '0.72rem', color: '#475569', display: 'block' }}>{currentOrder.origin.address}</span>
                      </div>
                    </div>

                    <div style={{ height: '14px', borderLeft: '2px dashed #94a3b8', marginLeft: '4px' }} />

                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#059669', marginTop: '4px', flexShrink: 0 }} />
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#64748b', display: 'block' }}>{t('delivery').toUpperCase()}</span>
                        <strong style={{ fontSize: '0.82rem', color: '#0f172a' }}>{currentOrder.destination.city}, {currentOrder.destination.state}</strong>
                        <span style={{ fontSize: '0.72rem', color: '#475569', display: 'block' }}>{currentOrder.destination.address}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #e0f2fe', fontSize: '0.75rem', color: '#0369a1', fontWeight: 600 }}>
                    ETA: {currentOrder.etaStatus}
                  </div>
                </div>
              ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>{t('noOrderSelected')}</div>
              )}

              {/* Delivery Time & Delay Updates (Core Feature) */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '14px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <Clock size={16} color="#0284c7" />
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                    {t('quickDeliveryTimeUpdates')}
                  </span>
                </div>
                <p style={{ fontSize: '0.72rem', color: '#64748b', marginBottom: '10px' }}>
                  {t('tapBelowToInform')}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    onClick={() => handleUpdateETA(0, 'On Schedule')}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '8px',
                      background: '#f0fdf4',
                      border: '1px solid #bbf7d0',
                      color: '#15803d',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textAlign: 'center'
                    }}
                  >
                    {t('onSchedule')}
                  </button>

                  <button
                    onClick={() => handleUpdateETA(30, 'Traffic Congestion')}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '8px',
                      background: '#fffbeb',
                      border: '1px solid #fde68a',
                      color: '#b45309',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textAlign: 'center'
                    }}
                  >
                    {t('traffic30m')}
                  </button>

                  <button
                    onClick={() => handleUpdateETA(60, 'Heavy Roadwork / Weather')}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '8px',
                      background: '#fff1f2',
                      border: '1px solid #fecdd3',
                      color: '#be123c',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textAlign: 'center'
                    }}
                  >
                    {t('roadwork1h')}
                  </button>

                  <button
                    onClick={() => handleUpdateETA(120, 'Mechanical Inspection')}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '8px',
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      color: '#334155',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textAlign: 'center'
                    }}
                  >
                    {t('inspection2h')}
                  </button>
                </div>
              </div>

              {/* Step Status Tracker */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '14px',
                  padding: '14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                  <Navigation size={16} color="#0284c7" />
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
                    {t('currentTripProgress')}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <button
                    onClick={() => handleStatusChange('assigned', 'At Shipper - Checking in Dock')}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: currentOrder?.status === 'assigned' ? '#e0f2fe' : '#f8fafc',
                      border: '1px solid #cbd5e1',
                      color: '#0f172a',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{t('step1Shipper')}</span>
                    {currentOrder?.status === 'assigned' && <CheckCircle2 size={14} color="#0284c7" />}
                  </button>

                  <button
                    onClick={() => handleStatusChange('in_transit', 'Loaded & In Transit on Highway')}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: currentOrder?.status === 'in_transit' ? '#e0f2fe' : '#f8fafc',
                      border: '1px solid #cbd5e1',
                      color: '#0f172a',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{t('step2Transit')}</span>
                    {currentOrder?.status === 'in_transit' && <CheckCircle2 size={14} color="#0284c7" />}
                  </button>

                  <button
                    onClick={() => handleStatusChange('delivered', 'Delivered & BOL Signed')}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: currentOrder?.status === 'delivered' ? '#d1fae5' : '#f8fafc',
                      border: '1px solid #cbd5e1',
                      color: '#0f172a',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{t('step3Delivered')}</span>
                    {currentOrder?.status === 'delivered' && <CheckCircle2 size={14} color="#059669" />}
                  </button>
                </div>
              </div>

              {/* Message to Dispatcher */}
              <form onSubmit={handleCustomNote} style={{ display: 'flex', gap: '6px' }}>
                <input
                  type="text"
                  placeholder={t('sendNotePlaceholder')}
                  value={statusMessage}
                  onChange={e => setStatusMessage(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.76rem'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#0284c7',
                    color: '#ffffff',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Send size={14} />
                </button>
              </form>

            </div>

            {/* Phone Bottom Home Bar */}
            <div style={{ height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff' }}>
              <div style={{ width: '110px', height: '4px', background: '#cbd5e1', borderRadius: '999px' }} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
