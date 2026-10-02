import React, { useState } from 'react';
import { X, Truck, ShieldCheck, Star, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AssignCarrierModal({ order, carriers, onClose, onAssign }) {
  const { t } = useLanguage();
  const [selectedCarrierId, setSelectedCarrierId] = useState(carriers[0]?.id || '');
  const [selectedDriverName, setSelectedDriverName] = useState('');
  const [notes, setNotes] = useState('');

  if (!order) return null;

  const currentCarrier = carriers.find(c => c.id === selectedCarrierId);

  // Auto-select first driver when carrier changes
  React.useEffect(() => {
    if (currentCarrier && currentCarrier.drivers && currentCarrier.drivers.length > 0) {
      setSelectedDriverName(currentCarrier.drivers[0].name);
    } else if (currentCarrier) {
      setSelectedDriverName(currentCarrier.primaryDriver);
    }
  }, [selectedCarrierId]);

  const handleConfirm = () => {
    if (!currentCarrier) return;
    const driverObj = currentCarrier.drivers?.find(d => d.name === selectedDriverName);
    const driverPhone = driverObj ? driverObj.phone : currentCarrier.phone;

    onAssign({
      orderId: order.id,
      carrierId: currentCarrier.id,
      carrierName: currentCarrier.name,
      driverName: selectedDriverName || currentCarrier.primaryDriver,
      driverPhone: driverPhone,
      notes: notes
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(5px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '640px',
          boxShadow: '0 20px 40px -10px rgba(14, 165, 233, 0.2), 0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          border: '1px solid #bae6fd',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0284c7', background: '#e0f2fe', padding: '3px 8px', borderRadius: '6px' }}>
                {order.id}
              </span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
                {t('assignCarrierToLoad')}
              </h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
              {t('pairShipmentSubtitle')}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '8px',
              borderRadius: '8px',
              color: '#64748b',
              background: '#f1f5f9'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Load Summary Pill */}
        <div style={{ padding: '16px 24px', background: '#f8fbff', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', fontSize: '0.82rem' }}>
            <div>
              <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 600 }}>{t('route')}</span>
              <strong style={{ color: '#0f172a' }}>{order.origin.city}, {order.origin.state} → {order.destination.city}, {order.destination.state}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 600 }}>Equipment</span>
              <strong style={{ color: '#0284c7' }}>{order.equipment}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 600 }}>{t('cargo')} / Wt</span>
              <strong style={{ color: '#0f172a' }}>{order.weight}</strong>
            </div>
            <div>
              <span style={{ color: '#64748b', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 600 }}>{t('payoutRate')}</span>
              <strong style={{ color: '#059669', fontSize: '0.95rem' }}>${order.rate.toLocaleString()}</strong>
            </div>
          </div>
        </div>

        {/* Body Selection */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Select Carrier */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>
              {t('selectCarrierCompany')}
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {carriers.map(carrier => {
                const isSelected = carrier.id === selectedCarrierId;
                const matchesEquipment = carrier.equipment.includes(order.equipment) || carrier.equipment.some(e => e.includes(order.equipment));

                return (
                  <div
                    key={carrier.id}
                    onClick={() => setSelectedCarrierId(carrier.id)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: isSelected ? '2px solid #0284c7' : '1px solid #e2e8f0',
                      backgroundColor: isSelected ? '#f0f9ff' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '8px',
                          background: carrier.avatarBg || '#0284c7',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.9rem'
                        }}
                      >
                        {carrier.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.92rem' }}>{carrier.name}</span>
                          <span style={{ fontSize: '0.72rem', background: '#f1f5f9', color: '#475569', padding: '1px 6px', borderRadius: '4px' }}>
                            {carrier.mcNumber}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.76rem', color: '#64748b', marginTop: '2px' }}>
                          <span>{t('base')}: {carrier.baseCity}</span>
                          <span>•</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#f59e0b', fontWeight: 600 }}>
                            <Star size={12} fill="#f59e0b" /> {carrier.rating}
                          </span>
                          <span>•</span>
                          <span>{carrier.fleetSize} Power Units</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      {matchesEquipment ? (
                        <span style={{ fontSize: '0.72rem', color: '#059669', background: '#d1fae5', padding: '3px 8px', borderRadius: '999px', fontWeight: 600 }}>
                          {t('equipmentMatch')}
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.72rem', color: '#64748b', background: '#f1f5f9', padding: '3px 8px', borderRadius: '999px' }}>
                          {carrier.equipment[0]}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Assigned Driver Selection */}
          {currentCarrier && currentCarrier.drivers && (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>
                {t('selectAssignedDriver')} ({currentCarrier.name})
              </label>
              <select
                value={selectedDriverName}
                onChange={e => setSelectedDriverName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  backgroundColor: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              >
                {currentCarrier.drivers.map(driver => (
                  <option key={driver.name} value={driver.name}>
                    {driver.name} ({driver.truckNumber}) - {driver.status}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Dispatch Instructions */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>
              {t('dispatchInstructions')}
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Call shipper 1 hr prior to arrival. Gate code #4928. Collect scale ticket."
              rows={2}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.85rem',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: '16px 24px',
            background: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px'
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              color: '#475569',
              fontWeight: 600,
              fontSize: '0.88rem',
              backgroundColor: '#ffffff'
            }}
          >
            {t('cancel')}
          </button>
          <button
            onClick={handleConfirm}
            style={{
              padding: '10px 22px',
              borderRadius: '8px',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.88rem',
              boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <CheckCircle size={16} /> {t('confirmAssignment')}
          </button>
        </div>
      </div>
    </div>
  );
}
