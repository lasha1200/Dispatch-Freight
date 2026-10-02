import React, { useState, useMemo } from 'react';
import { 
  Truck, Star, ShieldCheck, Phone, Mail, MapPin, Search, 
  Filter, PlusCircle, CheckCircle, ChevronRight, Users, Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CarriersList({ carriers, orders, onSelectCarrier, onAddCarrier }) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Carrier Form State
  const [newCarrierForm, setNewCarrierForm] = useState({
    name: '',
    mcNumber: '',
    dotNumber: '',
    primaryDriver: '',
    phone: '',
    email: '',
    equipment: "53' Dry Van",
    baseCity: '',
    fleetSize: 10
  });

  // Calculate live metrics for carriers
  const metrics = useMemo(() => {
    const total = carriers.length;
    const available = carriers.filter(c => c.status === 'available').length;
    const onRoute = carriers.filter(c => c.status === 'on_route').length;
    const avgRating = (carriers.reduce((acc, c) => acc + c.rating, 0) / (carriers.length || 1)).toFixed(2);
    const totalFleet = carriers.reduce((acc, c) => acc + (c.fleetSize || 0), 0);

    return { total, available, onRoute, avgRating, totalFleet };
  }, [carriers]);

  // Filter carriers
  const filteredCarriers = useMemo(() => {
    return carriers.filter(carrier => {
      if (statusFilter !== 'all' && carrier.status !== statusFilter) return false;
      if (equipmentFilter !== 'all' && !carrier.equipment.includes(equipmentFilter)) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = carrier.name.toLowerCase().includes(q);
        const matchesMc = carrier.mcNumber.toLowerCase().includes(q);
        const matchesDriver = carrier.primaryDriver?.toLowerCase().includes(q);
        const matchesCity = carrier.baseCity?.toLowerCase().includes(q);

        if (!matchesName && !matchesMc && !matchesDriver && !matchesCity) return false;
      }

      return true;
    });
  }, [carriers, statusFilter, equipmentFilter, searchQuery]);

  const handleCreateCarrier = (e) => {
    e.preventDefault();
    if (!newCarrierForm.name || !newCarrierForm.phone) return;

    const newObj = {
      id: `carr-${Math.floor(100 + Math.random() * 900)}`,
      name: newCarrierForm.name,
      mcNumber: newCarrierForm.mcNumber || `MC-${Math.floor(100000 + Math.random() * 900000)}`,
      dotNumber: newCarrierForm.dotNumber || `DOT-${Math.floor(1000000 + Math.random() * 9000000)}`,
      primaryDriver: newCarrierForm.primaryDriver || 'Lead Driver',
      phone: newCarrierForm.phone,
      email: newCarrierForm.email || 'dispatch@carrier.com',
      rating: 4.85,
      status: 'available',
      equipment: [newCarrierForm.equipment],
      baseCity: newCarrierForm.baseCity || 'Chicago, IL',
      activeLoadsCount: 0,
      completedLoadsCount: 0,
      onTimeRate: '100%',
      insuranceVerified: true,
      insuranceExpiry: '2027-12-31',
      fleetSize: Number(newCarrierForm.fleetSize) || 6,
      avatarBg: '#0284c7',
      drivers: [
        { name: newCarrierForm.primaryDriver || 'Lead Driver', phone: newCarrierForm.phone, truckNumber: 'TRK-101', status: 'Available' }
      ],
      notes: 'New verified carrier enrolled in dispatch network.'
    };

    onAddCarrier(newObj);
    setShowAddModal(false);
    setNewCarrierForm({
      name: '',
      mcNumber: '',
      dotNumber: '',
      primaryDriver: '',
      phone: '',
      email: '',
      equipment: "53' Dry Van",
      baseCity: '',
      fleetSize: 10
    });
  };

  return (
    <div className="main-content animate-fade-in">
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            {t('carrierDirectoryTitle')}
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#64748b', marginTop: '4px' }}>
            {t('carrierDirectorySubtitle')}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '10px',
            backgroundColor: '#0284c7',
            color: '#ffffff',
            fontSize: '0.88rem',
            fontWeight: 700,
            boxShadow: '0 4px 14px rgba(2, 132, 199, 0.25)'
          }}
        >
          <PlusCircle size={17} />
          <span>{t('addApprovedCarrier')}</span>
        </button>
      </div>

      {/* Carrier Top Metrics */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
          marginBottom: '26px'
        }}
      >
        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>{t('totalCarriers')}</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>{metrics.total}</span>
            <span style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 600 }}>{t('activePartners')}</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#047857', textTransform: 'uppercase' }}>{t('availableNow')}</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#047857' }}>{metrics.available}</span>
            <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>{t('readyForLoads')}</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0369a1', textTransform: 'uppercase' }}>{t('onRoute')}</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0284c7' }}>{metrics.onRoute}</span>
            <span style={{ fontSize: '0.78rem', color: '#0ea5e9', fontWeight: 600 }}>{t('inTransit')}</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>{t('totalPowerUnits')}</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>{metrics.totalFleet}</span>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>{t('trucksTractors')}</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>{t('averageRating')}</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Star size={20} fill="#f59e0b" /> {metrics.avgRating}
            </span>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>/ 5.0 {t('score')}</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '16px 20px',
          marginBottom: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          flexWrap: 'wrap',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ position: 'relative', flex: '1 1 320px' }}>
          <input
            type="text"
            placeholder={t('searchCarriersPlaceholder')}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 14px 9px 38px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '0.88rem',
              backgroundColor: '#f8fafc',
              outline: 'none'
            }}
          />
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <select
            value={equipmentFilter}
            onChange={e => setEquipmentFilter(e.target.value)}
            style={{
              padding: '9px 12px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '0.84rem',
              backgroundColor: '#ffffff',
              fontWeight: 600,
              color: '#334155',
              outline: 'none'
            }}
          >
            <option value="all">{t('allEquipment')}</option>
            <option value="53' Dry Van">{t('dryVan53')}</option>
            <option value="53' Reefer">{t('reefer53')}</option>
            <option value="Flatbed">{t('flatbed')}</option>
            <option value="Box Truck">{t('boxTruck')}</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{
              padding: '9px 12px',
              borderRadius: '10px',
              border: '1px solid #cbd5e1',
              fontSize: '0.84rem',
              backgroundColor: '#ffffff',
              fontWeight: 600,
              color: '#334155',
              outline: 'none'
            }}
          >
            <option value="all">{t('allStatuses')}</option>
            <option value="available">{t('available')}</option>
            <option value="on_route">{t('onRoute')}</option>
          </select>
        </div>
      </div>

      {/* Carriers Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(390px, 1fr))',
          gap: '20px'
        }}
      >
        {filteredCarriers.map(carrier => {
          const carrierOrders = orders.filter(o => o.carrierId === carrier.id);
          const activeOrders = carrierOrders.filter(o => o.status !== 'delivered');

          return (
            <div
              key={carrier.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 3px 12px rgba(15, 23, 42, 0.04)',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              <div>
                {/* Header with Avatar & Name */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        background: carrier.avatarBg || '#0284c7',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        boxShadow: '0 4px 10px rgba(2, 132, 199, 0.25)'
                      }}
                    >
                      {carrier.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                        {carrier.name}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                        <span style={{ fontSize: '0.72rem', background: '#f1f5f9', color: '#475569', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                          {carrier.mcNumber}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                          {carrier.dotNumber}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: '#fef3c7',
                      color: '#b45309',
                      padding: '4px 8px',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}
                  >
                    <Star size={13} fill="#f59e0b" color="#f59e0b" />
                    <span>{carrier.rating}</span>
                  </div>
                </div>

                {/* Contact and Base Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: '#475569', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} color="#0284c7" />
                    <span>{t('base')}: <strong>{carrier.baseCity}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14} color="#0284c7" />
                    <span>{t('dispatch')}: <strong>{carrier.phone}</strong> ({carrier.primaryDriver})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={14} color="#059669" />
                    <span style={{ color: '#059669', fontWeight: 600 }}>
                      {t('verifiedInsured')} (Exp: {carrier.insuranceExpiry})
                    </span>
                  </div>
                </div>

                {/* Equipment Badges */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {carrier.equipment.map((eq, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        background: '#e0f2fe',
                        color: '#0369a1',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        border: '1px solid #bae6fd'
                      }}
                    >
                      {eq}
                    </span>
                  ))}
                  <span style={{ fontSize: '0.74rem', color: '#64748b', padding: '3px 6px' }}>
                    Fleet: {carrier.fleetSize} units
                  </span>
                </div>

                {/* Stats Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px',
                    padding: '12px',
                    background: '#f8fbff',
                    borderRadius: '10px',
                    border: '1px solid #e0f2fe',
                    textAlign: 'center',
                    marginBottom: '16px'
                  }}
                >
                  <div>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>{t('activeLoads')}</span>
                    <strong style={{ fontSize: '1rem', color: '#0284c7' }}>{activeOrders.length}</strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>{t('completed')}</span>
                    <strong style={{ fontSize: '1rem', color: '#0f172a' }}>{carrier.completedLoadsCount}</strong>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>On-Time</span>
                    <strong style={{ fontSize: '1rem', color: '#059669' }}>{carrier.onTimeRate}</strong>
                  </div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <button
                onClick={() => onSelectCarrier(carrier.id)}
                style={{
                  width: '100%',
                  padding: '11px',
                  borderRadius: '10px',
                  backgroundColor: '#f0f9ff',
                  border: '1px solid #bae6fd',
                  color: '#0284c7',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#0284c7';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = '#f0f9ff';
                  e.currentTarget.style.color = '#0284c7';
                }}
              >
                <span>{t('viewCarrierProfile')}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Carrier Modal */}
      {showAddModal && (
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
          onClick={() => setShowAddModal(false)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '560px',
              boxShadow: '0 20px 40px -10px rgba(14, 165, 233, 0.2)',
              border: '1px solid #bae6fd',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ padding: '20px 24px', background: 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%)', borderBottom: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>{t('enrollNewCarrier')}</h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>{t('enrollSubtitle')}</p>
            </div>

            <form onSubmit={handleCreateCarrier} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>{t('carrierBusinessName')} *</label>
                <input
                  required
                  placeholder="e.g. Apex Express Freight LLC"
                  value={newCarrierForm.name}
                  onChange={e => setNewCarrierForm({ ...newCarrierForm, name: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>{t('mcNumber')}</label>
                  <input
                    placeholder="MC-948123"
                    value={newCarrierForm.mcNumber}
                    onChange={e => setNewCarrierForm({ ...newCarrierForm, mcNumber: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>{t('dotNumber')}</label>
                  <input
                    placeholder="DOT-318492"
                    value={newCarrierForm.dotNumber}
                    onChange={e => setNewCarrierForm({ ...newCarrierForm, dotNumber: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>{t('primaryDriver')}</label>
                  <input
                    placeholder="Driver Name"
                    value={newCarrierForm.primaryDriver}
                    onChange={e => setNewCarrierForm({ ...newCarrierForm, primaryDriver: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>{t('phoneNumber')} *</label>
                  <input
                    required
                    placeholder="(555) 000-0000"
                    value={newCarrierForm.phone}
                    onChange={e => setNewCarrierForm({ ...newCarrierForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>{t('primaryEquipment')}</label>
                  <select
                    value={newCarrierForm.equipment}
                    onChange={e => setNewCarrierForm({ ...newCarrierForm, equipment: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem' }}
                  >
                    <option value="53' Dry Van">{t('dryVan53')}</option>
                    <option value="53' Reefer">{t('reefer53')}</option>
                    <option value="Flatbed">{t('flatbed')}</option>
                    <option value="Box Truck">{t('boxTruck')}</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '4px' }}>{t('baseCityState')}</label>
                  <input
                    placeholder="e.g. Dallas, TX"
                    value={newCarrierForm.baseCity}
                    onChange={e => setNewCarrierForm({ ...newCarrierForm, baseCity: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #cbd5e1', color: '#475569', fontWeight: 600 }}
                >
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  style={{ padding: '9px 20px', borderRadius: '8px', backgroundColor: '#0284c7', color: '#ffffff', fontWeight: 700 }}
                >
                  {t('saveCarrier')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
