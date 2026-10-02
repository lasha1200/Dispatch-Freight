import React, { useState } from 'react';
import { 
  ArrowLeft, Truck, Star, ShieldCheck, Phone, Mail, 
  MapPin, Calendar, Clock, DollarSign, CheckCircle2, 
  AlertTriangle, PlusCircle, Smartphone, ExternalLink, UserCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CarrierDetail({ 
  carrierId, 
  carriers, 
  orders, 
  onBack, 
  onOpenDriverPhone,
  onAssignLoadToCarrier,
  onUpdateOrderStatus
}) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('active_loads'); // active_loads | drivers | history | assign_new

  const carrier = carriers.find(c => c.id === carrierId) || carriers[0];
  if (!carrier) return <div style={{ padding: '40px', textAlign: 'center' }}>Carrier not found</div>;

  // Filter orders for this carrier
  const carrierOrders = orders.filter(o => o.carrierId === carrier.id);
  const activeLoads = carrierOrders.filter(o => o.status !== 'delivered');
  const pastLoads = carrierOrders.filter(o => o.status === 'delivered');

  // Find unassigned loads that match this carrier's equipment
  const unassignedLoads = orders.filter(o => !o.carrierId || o.status === 'unassigned');

  return (
    <div className="main-content animate-fade-in">
      {/* Breadcrumb Navigation */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.88rem',
            fontWeight: 600,
            color: '#0284c7',
            padding: '6px 12px',
            borderRadius: '8px',
            backgroundColor: '#f0f9ff',
            border: '1px solid #bae6fd'
          }}
        >
          <ArrowLeft size={16} />
          <span>{t('backToPrevious')}</span>
        </button>
      </div>

      {/* Hero Carrier Profile Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
          padding: '28px',
          marginBottom: '26px',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          {/* Left Avatar & Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '16px',
                background: carrier.avatarBg || '#0284c7',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.6rem',
                boxShadow: '0 8px 20px rgba(2, 132, 199, 0.28)'
              }}
            >
              {carrier.name.substring(0, 2).toUpperCase()}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>
                  {carrier.name}
                </h1>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '999px',
                    backgroundColor: carrier.status === 'available' ? '#d1fae5' : '#e0f2fe',
                    color: carrier.status === 'available' ? '#047857' : '#0369a1',
                    border: carrier.status === 'available' ? '1px solid #a7f3d0' : '1px solid #bae6fd'
                  }}
                >
                  {carrier.status === 'available' ? `● ${t('availableForLoads')}` : `● ${t('activeOnRoute')}`}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px', fontSize: '0.84rem', color: '#64748b' }}>
                <span style={{ background: '#f1f5f9', color: '#334155', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                  {carrier.mcNumber}
                </span>
                <span>{carrier.dotNumber}</span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontWeight: 700 }}>
                  <Star size={14} fill="#f59e0b" /> {carrier.rating} {t('starRating')}
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={onOpenDriverPhone}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '10px',
                backgroundColor: '#f0f9ff',
                border: '1px solid #bae6fd',
                color: '#0284c7',
                fontSize: '0.86rem',
                fontWeight: 700
              }}
            >
              <Smartphone size={16} />
              <span>{t('simulateDriverApp')}</span>
            </button>

            <a
              href={`tel:${carrier.phone}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '10px',
                backgroundColor: '#0284c7',
                color: '#ffffff',
                fontSize: '0.86rem',
                fontWeight: 700,
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.25)'
              }}
            >
              <Phone size={16} />
              <span>{t('callDispatch')} ({carrier.phone})</span>
            </a>
          </div>
        </div>

        {/* Detailed Metadata Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid #f1f5f9'
          }}
        >
          <div>
            <span style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
              {t('primaryDriver')}
            </span>
            <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>{carrier.primaryDriver}</strong>
            <span style={{ display: 'block', fontSize: '0.78rem', color: '#475569' }}>{carrier.email}</span>
          </div>

          <div>
            <span style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
              {t('operatingBase')}
            </span>
            <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>{carrier.baseCity}</strong>
            <span style={{ display: 'block', fontSize: '0.78rem', color: '#475569' }}>Fleet: {carrier.fleetSize} Power Units</span>
          </div>

          <div>
            <span style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
              {t('cargoInsurance')}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#059669', fontWeight: 700, fontSize: '0.88rem' }}>
              <ShieldCheck size={15} /> {t('activeInsurance')}
            </span>
            <span style={{ display: 'block', fontSize: '0.75rem', color: '#64748b' }}>Expires: {carrier.insuranceExpiry}</span>
          </div>

          <div>
            <span style={{ display: 'block', fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
              {t('equipmentSpecialties')}
            </span>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '4px' }}>
              {carrier.equipment.map((eq, i) => (
                <span key={i} style={{ fontSize: '0.72rem', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                  {eq}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Carrier Notes */}
        {carrier.notes && (
          <div style={{ marginTop: '16px', padding: '10px 14px', background: '#f8fafc', borderRadius: '8px', fontSize: '0.82rem', color: '#475569', border: '1px solid #e2e8f0' }}>
            <strong>{t('internalDispatchNote')}:</strong> {carrier.notes}
          </div>
        )}
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #e2e8f0', marginBottom: '22px' }}>
        <button
          onClick={() => setActiveTab('active_loads')}
          style={{
            padding: '10px 18px',
            fontSize: '0.9rem',
            fontWeight: 700,
            color: activeTab === 'active_loads' ? '#0284c7' : '#64748b',
            borderBottom: activeTab === 'active_loads' ? '3px solid #0284c7' : '3px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Truck size={17} />
          <span>{t('activeAssignedLoads')} ({activeLoads.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('drivers')}
          style={{
            padding: '10px 18px',
            fontSize: '0.9rem',
            fontWeight: 700,
            color: activeTab === 'drivers' ? '#0284c7' : '#64748b',
            borderBottom: activeTab === 'drivers' ? '3px solid #0284c7' : '3px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <UserCheck size={17} />
          <span>{t('driversPowerUnits')} ({carrier.drivers?.length || 1})</span>
        </button>

        <button
          onClick={() => setActiveTab('assign_new')}
          style={{
            padding: '10px 18px',
            fontSize: '0.9rem',
            fontWeight: 700,
            color: activeTab === 'assign_new' ? '#0284c7' : '#64748b',
            borderBottom: activeTab === 'assign_new' ? '3px solid #0284c7' : '3px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <PlusCircle size={17} />
          <span>{t('assignNewLoad')} ({unassignedLoads.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          style={{
            padding: '10px 18px',
            fontSize: '0.9rem',
            fontWeight: 700,
            color: activeTab === 'history' ? '#0284c7' : '#64748b',
            borderBottom: activeTab === 'history' ? '3px solid #0284c7' : '3px solid transparent',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <CheckCircle2 size={17} />
          <span>{t('completedHistory')} ({pastLoads.length})</span>
        </button>
      </div>

      {/* Tab Content 1: Active Loads */}
      {activeTab === 'active_loads' && (
        <div>
          {activeLoads.length === 0 ? (
            <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '16px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
              <Truck size={36} color="#94a3b8" style={{ margin: '0 auto 10px' }} />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e293b' }}>{t('noActiveShipments')}</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
                {t('carrierZeroLoads')}
              </p>
              <button
                onClick={() => setActiveTab('assign_new')}
                style={{
                  marginTop: '14px',
                  padding: '9px 18px',
                  borderRadius: '8px',
                  backgroundColor: '#0284c7',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}
              >
                {t('assignAvailableLoad')}
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {activeLoads.map(load => (
                <div
                  key={load.id}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    border: '1px solid #bae6fd',
                    padding: '20px 24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: 800, color: '#0284c7', background: '#f0f9ff', padding: '3px 8px', borderRadius: '6px' }}>
                        {load.id}
                      </span>
                      <strong style={{ fontSize: '1rem', color: '#0f172a' }}>{load.customer}</strong>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '0.78rem', background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '999px', fontWeight: 700 }}>
                        {load.status.toUpperCase()}
                      </span>
                      <strong style={{ fontSize: '1.15rem', color: '#059669' }}>${load.rate.toLocaleString()}</strong>
                    </div>
                  </div>

                  {/* Route */}
                  <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase' }}>{t('pickup')}</span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{load.origin.city}, {load.origin.state}</h4>
                      <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{load.origin.pickupDate}</p>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 700 }}>{load.miles} miles</span>
                      <div style={{ width: '60px', height: '2px', background: '#bae6fd', margin: '4px auto' }} />
                    </div>

                    <div>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase' }}>{t('delivery')}</span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{load.destination.city}, {load.destination.state}</h4>
                      <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{load.destination.deliveryDate}</p>
                    </div>
                  </div>

                  <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#475569' }}>
                    <div>
                      <span>{t('assignedDriver')}: <strong>{load.driverName || carrier.primaryDriver}</strong> ({load.driverPhone || carrier.phone})</span>
                      <span style={{ marginLeft: '12px', color: '#0284c7', fontWeight: 600 }}>ETA: {load.etaStatus}</span>
                    </div>

                    <button
                      onClick={onOpenDriverPhone}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        background: '#f0f9ff',
                        border: '1px solid #bae6fd',
                        color: '#0284c7',
                        fontWeight: 700,
                        fontSize: '0.76rem'
                      }}
                    >
                      {t('updateETAInDriverApp')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content 2: Assigned Drivers & Equipment */}
      {activeTab === 'drivers' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {carrier.drivers?.map((driver, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
                padding: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: '#e0f2fe',
                  color: '#0284c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}
              >
                TRK
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>{driver.name}</h4>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                  <span>{driver.truckNumber}</span> • <span>{driver.phone}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 600, marginTop: '4px' }}>
                  {t('status')}: {driver.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content 3: Assign Available Load Directly */}
      {activeTab === 'assign_new' && (
        <div>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
              {t('assignShipmentTo')} {carrier.name}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              {t('selectFromUnassigned')}
            </p>
          </div>

          {unassignedLoads.length === 0 ? (
            <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '14px', textAlign: 'center', color: '#64748b', border: '1px solid #e2e8f0' }}>
              {t('allLoadsAssigned')}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {unassignedLoads.map(load => (
                <div
                  key={load.id}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '14px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 800, color: '#0284c7', fontSize: '0.85rem' }}>{load.id}</span>
                      <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>{load.customer}</strong>
                      <span style={{ fontSize: '0.72rem', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                        {load.equipment}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '4px' }}>
                      {load.origin.city}, {load.origin.state} → {load.destination.city}, {load.destination.state} ({load.miles} mi)
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669' }}>
                      ${load.rate.toLocaleString()}
                    </span>
                    <button
                      onClick={() => onAssignLoadToCarrier(load.id, carrier.id, carrier.name, carrier.primaryDriver, carrier.phone)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        backgroundColor: '#0284c7',
                        color: '#ffffff',
                        fontSize: '0.84rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <PlusCircle size={15} />
                      <span>{t('assignToThisCarrier')}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content 4: Past Completed History */}
      {activeTab === 'history' && (
        <div>
          {pastLoads.length === 0 ? (
            <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '14px', textAlign: 'center', color: '#64748b', border: '1px solid #e2e8f0' }}>
              {t('noCompletedArchives')}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {pastLoads.map(load => (
                <div
                  key={load.id}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 800, color: '#0f172a' }}>{load.id} • {load.customer}</span>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>
                      {load.origin.city}, {load.origin.state} → {load.destination.city}, {load.destination.state}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.78rem', background: '#d1fae5', color: '#065f46', fontWeight: 700, padding: '2px 8px', borderRadius: '999px' }}>
                      {t('deliveredAndInvoiced')}
                    </span>
                    <strong style={{ display: 'block', fontSize: '1rem', color: '#059669', marginTop: '4px' }}>
                      ${load.rate.toLocaleString()}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
