import React, { useState } from 'react';
import { X, PlusCircle, Package, MapPin, DollarSign, Calendar, Truck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function NewOrderModal({ isOpen, onClose, onCreateOrder }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    customer: '',
    originCity: '',
    originState: '',
    originAddress: '',
    pickupDate: '',
    destCity: '',
    destState: '',
    destAddress: '',
    deliveryDate: '',
    cargo: '',
    weight: '',
    equipment: "53' Dry Van",
    rate: '',
    miles: '',
    priority: 'normal',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.originCity || !formData.destCity || !formData.customer) return;

    const newOrder = {
      id: `LD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: formData.customer,
      origin: {
        city: formData.originCity,
        state: formData.originState.toUpperCase(),
        address: formData.originAddress || `${formData.originCity} Logistics Center`,
        pickupDate: formData.pickupDate || 'Tomorrow 08:00 AM'
      },
      destination: {
        city: formData.destCity,
        state: formData.destState.toUpperCase(),
        address: formData.destAddress || `${formData.destCity} Receiving Terminal`,
        deliveryDate: formData.deliveryDate || 'Sep 26 04:00 PM'
      },
      status: 'unassigned',
      cargo: formData.cargo || 'General Freight',
      weight: formData.weight ? `${formData.weight} lbs` : '35,000 lbs',
      equipment: formData.equipment,
      miles: Number(formData.miles) || 540,
      rate: Number(formData.rate) || 2100,
      priority: formData.priority,
      carrierId: null,
      carrierName: null,
      driverName: null,
      driverPhone: null,
      lastUpdate: 'Just now',
      etaStatus: 'Awaiting Carrier Assignment',
      notes: formData.notes
    };

    onCreateOrder(newOrder);
    onClose();
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
          maxWidth: '680px',
          boxShadow: '0 20px 40px -10px rgba(14, 165, 233, 0.2), 0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          border: '1px solid #bae6fd',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh'
        }}
        onClick={e => e.stopPropagation()}
      >
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
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
              {t('createNewOrder')}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>
              {t('postNewShipmentSubtitle')}
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

        <form onSubmit={handleSubmit} style={{ overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '6px' }}>
              {t('shipperCustomerName')} *
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Apex Distribution Corp"
              value={formData.customer}
              onChange={e => setFormData({ ...formData, customer: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
            />
          </div>

          {/* Origin & Destination Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0284c7', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                <MapPin size={14} /> {t('pickupOrigin')}
              </span>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  required
                  placeholder={t('cityPlaceholder')}
                  value={formData.originCity}
                  onChange={e => setFormData({ ...formData, originCity: e.target.value })}
                  style={{ flex: 2, padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
                <input
                  required
                  maxLength={2}
                  placeholder={t('statePlaceholder')}
                  value={formData.originState}
                  onChange={e => setFormData({ ...formData, originState: e.target.value })}
                  style={{ flex: 1, padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>
              <input
                placeholder={t('pickupDateTime')}
                value={formData.pickupDate}
                onChange={e => setFormData({ ...formData, pickupDate: e.target.value })}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                <MapPin size={14} /> {t('dropoffDestination')}
              </span>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  required
                  placeholder={t('destCityPlaceholder')}
                  value={formData.destCity}
                  onChange={e => setFormData({ ...formData, destCity: e.target.value })}
                  style={{ flex: 2, padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
                <input
                  required
                  maxLength={2}
                  placeholder={t('statePlaceholder')}
                  value={formData.destState}
                  onChange={e => setFormData({ ...formData, destState: e.target.value })}
                  style={{ flex: 1, padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>
              <input
                placeholder={t('deliveryDateTime')}
                value={formData.deliveryDate}
                onChange={e => setFormData({ ...formData, deliveryDate: e.target.value })}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>
          </div>

          {/* Cargo, Weight, Equipment */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>{t('cargoType')}</label>
              <input
                placeholder="e.g. Auto Parts"
                value={formData.cargo}
                onChange={e => setFormData({ ...formData, cargo: e.target.value })}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>{t('weightLbs')}</label>
              <input
                placeholder="e.g. 42,000"
                value={formData.weight}
                onChange={e => setFormData({ ...formData, weight: e.target.value })}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>Equipment</label>
              <select
                value={formData.equipment}
                onChange={e => setFormData({ ...formData, equipment: e.target.value })}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              >
                <option value="53' Dry Van">53' Dry Van</option>
                <option value="53' Reefer">53' Reefer</option>
                <option value="Flatbed">Flatbed</option>
                <option value="Box Truck">Box Truck</option>
              </select>
            </div>
          </div>

          {/* Rate, Miles, Priority */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>{t('rateUSD')} *</label>
              <input
                required
                type="number"
                placeholder="2400"
                value={formData.rate}
                onChange={e => setFormData({ ...formData, rate: e.target.value })}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>{t('estimatedMiles')}</label>
              <input
                type="number"
                placeholder="680"
                value={formData.miles}
                onChange={e => setFormData({ ...formData, miles: e.target.value })}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>{t('priorityLevel')}</label>
              <select
                value={formData.priority}
                onChange={e => setFormData({ ...formData, priority: e.target.value })}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              >
                <option value="normal">{t('priorityNormal')}</option>
                <option value="high">{t('priorityHigh')}</option>
                <option value="critical">{t('priorityCritical')}</option>
              </select>
            </div>
          </div>

          <div
            style={{
              paddingTop: '16px',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '12px'
            }}
          >
            <button
              type="button"
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
              type="submit"
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
              <PlusCircle size={16} /> {t('createAndPostOrder')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
