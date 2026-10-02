import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, ArrowRight, Truck, User, Phone, MapPin, 
  Clock, DollarSign, AlertTriangle, CheckCircle2, ChevronRight,
  SlidersHorizontal, PlusCircle, ArrowUpDown, ShieldCheck, Smartphone, Eye
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function OrdersHome({ 
  orders, 
  carriers, 
  onSelectCarrier, 
  onOpenAssignModal, 
  onOpenNewOrder,
  onOpenDriverPhone
}) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [equipmentFilter, setEquipmentFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Summary Metrics
  const metrics = useMemo(() => {
    const total = orders.length;
    const unassigned = orders.filter(o => !o.carrierId || o.status === 'unassigned').length;
    const assigned = orders.filter(o => o.status === 'assigned').length;
    const inTransit = orders.filter(o => o.status === 'in_transit' || o.status === 'delayed').length;
    const delivered = orders.filter(o => o.status === 'delivered').length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.rate, 0);

    return { total, unassigned, assigned, inTransit, delivered, totalRevenue };
  }, [orders]);

  // Filtered & Sorted Orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Status filter
      if (statusFilter === 'unassigned' && (order.carrierId && order.status !== 'unassigned')) return false;
      if (statusFilter === 'assigned' && order.status !== 'assigned') return false;
      if (statusFilter === 'in_transit' && (order.status !== 'in_transit' && order.status !== 'delayed')) return false;
      if (statusFilter === 'delivered' && order.status !== 'delivered') return false;
      if (statusFilter === 'delayed' && order.status !== 'delayed') return false;

      // Equipment filter
      if (equipmentFilter !== 'all' && order.equipment !== equipmentFilter) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = order.id.toLowerCase().includes(q);
        const matchesCustomer = order.customer.toLowerCase().includes(q);
        const matchesOrigin = `${order.origin.city} ${order.origin.state}`.toLowerCase().includes(q);
        const matchesDest = `${order.destination.city} ${order.destination.state}`.toLowerCase().includes(q);
        const matchesCarrier = order.carrierName?.toLowerCase().includes(q);
        const matchesDriver = order.driverName?.toLowerCase().includes(q);
        const matchesCargo = order.cargo?.toLowerCase().includes(q);

        if (!matchesId && !matchesCustomer && !matchesOrigin && !matchesDest && !matchesCarrier && !matchesDriver && !matchesCargo) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rate') return b.rate - a.rate;
      if (sortBy === 'priority') {
        const pOrder = { critical: 3, high: 2, normal: 1 };
        return (pOrder[b.priority] || 1) - (pOrder[a.priority] || 1);
      }
      return 0;
    });
  }, [orders, statusFilter, equipmentFilter, searchQuery, sortBy]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'unassigned':
        return {
          bg: '#fef3c7',
          color: '#b45309',
          border: '#fde68a',
          label: t('unassigned'),
          icon: <AlertTriangle size={13} />
        };
      case 'assigned':
        return {
          bg: '#e0f2fe',
          color: '#0369a1',
          border: '#bae6fd',
          label: t('assigned'),
          icon: <Truck size={13} />
        };
      case 'in_transit':
        return {
          bg: '#dbeafe',
          color: '#1d4ed8',
          border: '#bfdbfe',
          label: t('inTransit'),
          icon: <Truck size={13} />
        };
      case 'delayed':
        return {
          bg: '#fee2e2',
          color: '#b91c1c',
          border: '#fecaca',
          label: t('delayed'),
          icon: <AlertTriangle size={13} />
        };
      case 'delivered':
        return {
          bg: '#d1fae5',
          color: '#047857',
          border: '#a7f3d0',
          label: t('delivered'),
          icon: <CheckCircle2 size={13} />
        };
      default:
        return {
          bg: '#f1f5f9',
          color: '#475569',
          border: '#e2e8f0',
          label: status,
          icon: null
        };
    }
  };

  return (
    <div className="main-content animate-fade-in">
      {/* Top Banner / Heading */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            {t('ordersBoardTitle')}
          </h1>
          <p style={{ fontSize: '0.92rem', color: '#64748b', marginTop: '4px' }}>
            {t('ordersBoardSubtitle')}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onOpenDriverPhone}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: '10px',
              backgroundColor: '#ffffff',
              border: '1px solid #bae6fd',
              color: '#0284c7',
              fontSize: '0.88rem',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(2, 132, 199, 0.08)'
            }}
          >
            <Smartphone size={16} />
            <span>{t('driverPhonePreview')}</span>
          </button>

          <button
            onClick={onOpenNewOrder}
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
            <span>{t('createOrder')}</span>
          </button>
        </div>
      </div>

      {/* Metrics Header Summary Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '14px',
          marginBottom: '26px'
        }}
      >
        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>{t('activeLoads')}</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>{metrics.total}</span>
            <span style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 600 }}>{t('totalPosted')}</span>
          </div>
        </div>

        <div 
          onClick={() => setStatusFilter('unassigned')}
          style={{ 
            backgroundColor: statusFilter === 'unassigned' ? '#fef3c7' : '#ffffff', 
            padding: '16px 20px', 
            borderRadius: '14px', 
            border: '1px solid #fde68a', 
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#b45309', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertTriangle size={13} /> {t('unassignedLoads')}
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#b45309' }}>{metrics.unassigned}</span>
            <span style={{ fontSize: '0.78rem', color: '#d97706', fontWeight: 600 }}>{t('needsCarrier')}</span>
          </div>
        </div>

        <div 
          onClick={() => setStatusFilter('in_transit')}
          style={{ 
            backgroundColor: statusFilter === 'in_transit' ? '#e0f2fe' : '#ffffff', 
            padding: '16px 20px', 
            borderRadius: '14px', 
            border: '1px solid #bae6fd', 
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0369a1', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Truck size={13} /> {t('inTransit')}
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0284c7' }}>{metrics.inTransit}</span>
            <span style={{ fontSize: '0.78rem', color: '#0ea5e9', fontWeight: 600 }}>{t('onRoad')}</span>
          </div>
        </div>

        <div 
          onClick={() => setStatusFilter('delivered')}
          style={{ 
            backgroundColor: statusFilter === 'delivered' ? '#d1fae5' : '#ffffff', 
            padding: '16px 20px', 
            borderRadius: '14px', 
            border: '1px solid #a7f3d0', 
            boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#047857', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={13} /> {t('delivered')}
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#047857' }}>{metrics.delivered}</span>
            <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>{t('completed')}</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>{t('grossRevenue')}</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>
              ${(metrics.totalRevenue / 1000).toFixed(1)}k
            </span>
            <span style={{ fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>{t('totalValue')}</span>
          </div>
        </div>
      </div>

      {/* Organization Filters & Search Controls */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '16px 20px',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}
      >
        {/* Status Filter Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', overflowX: 'auto', paddingBottom: '4px' }}>
          {[
            { id: 'all', label: t('allOrders'), count: metrics.total },
            { id: 'unassigned', label: t('unassigned'), count: metrics.unassigned, alert: true },
            { id: 'assigned', label: t('assigned'), count: metrics.assigned },
            { id: 'in_transit', label: t('inTransit'), count: metrics.inTransit },
            { id: 'delivered', label: t('delivered'), count: metrics.delivered }
          ].map(tab => {
            const isActive = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '999px',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  backgroundColor: isActive ? '#0284c7' : '#f8fafc',
                  color: isActive ? '#ffffff' : '#475569',
                  border: isActive ? '1px solid #0284c7' : '1px solid #e2e8f0',
                  transition: 'all 0.15s ease'
                }}
              >
                <span>{tab.label}</span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: '999px',
                    backgroundColor: isActive 
                      ? 'rgba(255, 255, 255, 0.25)' 
                      : tab.alert ? '#fef3c7' : '#e2e8f0',
                    color: isActive 
                      ? '#ffffff' 
                      : tab.alert ? '#b45309' : '#475569'
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Refinement Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1 1 300px' }}>
            <input
              type="text"
              placeholder={t('searchOrdersPlaceholder')}
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
            {/* Equipment Filter */}
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

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
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
              <option value="date">{t('sortRecent')}</option>
              <option value="rate">{t('sortPayout')}</option>
              <option value="priority">{t('sortPriority')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List / Grid */}
      {filteredOrders.length === 0 ? (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px dashed #cbd5e1',
            padding: '60px 20px',
            textAlign: 'center',
            color: '#64748b'
          }}
        >
          <Truck size={42} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>{t('noOrdersFound')}</h3>
          <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
            {t('adjustSearchCriteria')}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredOrders.map(order => {
            const statusBadge = getStatusBadge(order.status);
            const isUnassigned = !order.carrierId || order.status === 'unassigned';

            return (
              <div
                key={order.id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  border: isUnassigned ? '1.5px solid #fde68a' : '1px solid #e2e8f0',
                  boxShadow: '0 3px 10px rgba(15, 23, 42, 0.03)',
                  padding: '20px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Top Order Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0284c7', background: '#f0f9ff', border: '1px solid #bae6fd', padding: '4px 10px', borderRadius: '8px' }}>
                      {order.id}
                    </span>
                    <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                      {order.customer}
                    </span>
                    {order.priority === 'critical' && (
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#dc2626', background: '#fee2e2', padding: '2px 8px', borderRadius: '999px', textTransform: 'uppercase' }}>
                        {t('critical')}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Status Badge */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 12px',
                        borderRadius: '999px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        backgroundColor: statusBadge.bg,
                        color: statusBadge.color,
                        border: `1px solid ${statusBadge.border}`
                      }}
                    >
                      {statusBadge.icon}
                      <span>{statusBadge.label}</span>
                    </div>

                    {/* Payout Rate */}
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#059669' }}>
                        ${order.rate.toLocaleString()}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#64748b', display: 'block' }}>
                        {order.miles} mi • ${(order.rate / order.miles).toFixed(2)}/mi
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle Row: Route Visual, Addresses, Cargo Details */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(280px, 1.8fr) minmax(200px, 1.2fr)',
                    gap: '20px',
                    padding: '16px',
                    backgroundColor: '#f8fbff',
                    borderRadius: '12px',
                    border: '1px solid #e0f2fe'
                  }}
                >
                  {/* Origin to Destination Route Visual */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0284c7' }} />
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>{t('pickup')}</span>
                      </div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                        {order.origin.city}, {order.origin.state}
                      </h4>
                      <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '1px' }}>
                        {order.origin.pickupDate}
                      </p>
                    </div>

                    {/* Connecting Route Arrow */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 8px' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0284c7' }}>{order.miles} mi</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#38bdf8' }}>
                        <div style={{ width: '40px', height: '2px', background: '#bae6fd' }} />
                        <ArrowRight size={14} color="#0284c7" />
                      </div>
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#059669' }} />
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>{t('delivery')}</span>
                      </div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
                        {order.destination.city}, {order.destination.state}
                      </h4>
                      <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '1px' }}>
                        {order.destination.deliveryDate}
                      </p>
                    </div>
                  </div>

                  {/* Cargo, Weight, Equipment */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px', borderLeft: '1px solid #e2e8f0', paddingLeft: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, background: '#e0f2fe', color: '#0369a1', padding: '3px 8px', borderRadius: '6px' }}>
                        {order.equipment}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 600 }}>
                        {order.weight}
                      </span>
                      {order.temperature && (
                        <span style={{ fontSize: '0.72rem', background: '#e0f7fa', color: '#00838f', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>
                          ❄️ {order.temperature}
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 600 }}>
                      {t('cargo')}: {order.cargo}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      {t('latestUpdate')}: {order.etaStatus}
                    </span>
                  </div>
                </div>

                {/* Bottom Row: Carrier Assignment Section */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                    paddingTop: '6px'
                  }}
                >
                  {/* Carrier Information (Assigned vs Unassigned) */}
                  {isUnassigned ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          backgroundColor: '#fef3c7',
                          border: '1px solid #fde68a',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#b45309'
                        }}
                      >
                        <AlertTriangle size={18} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#b45309', display: 'block' }}>
                          {t('noCarrierAssigned')}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          {t('unallocatedReady')}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Assigned Carrier with clickable shortcut to carrier's page */
                    <div
                      onClick={() => onSelectCarrier(order.carrierId)}
                      title={`Click to view full carrier profile for ${order.carrierName}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        padding: '6px 12px',
                        borderRadius: '10px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = '#f0f9ff';
                        e.currentTarget.style.borderColor = '#bae6fd';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                        e.currentTarget.style.borderColor = '#e2e8f0';
                      }}
                    >
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '8px',
                          background: '#0284c7',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.85rem'
                        }}
                      >
                        {order.carrierName ? order.carrierName.substring(0, 2).toUpperCase() : 'CR'}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0284c7', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                            {order.carrierName}
                          </span>
                          <span style={{ fontSize: '0.7rem', background: '#e0f2fe', color: '#0369a1', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                            {t('carrierShortcut')} ↗
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem', color: '#64748b', marginTop: '1px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <User size={12} /> {order.driverName}
                          </span>
                          <span>•</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Phone size={12} /> {order.driverPhone}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {isUnassigned ? (
                      <button
                        onClick={() => onOpenAssignModal(order)}
                        style={{
                          padding: '9px 18px',
                          borderRadius: '8px',
                          backgroundColor: '#0284c7',
                          color: '#ffffff',
                          fontSize: '0.84rem',
                          fontWeight: 700,
                          boxShadow: '0 4px 10px rgba(2, 132, 199, 0.25)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Truck size={15} />
                        <span>{t('assignCarrier')}</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={onOpenDriverPhone}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            backgroundColor: '#ffffff',
                            border: '1px solid #bae6fd',
                            color: '#0284c7',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}
                        >
                          <Smartphone size={14} />
                          <span>{t('simulateDriverUpdate')}</span>
                        </button>

                        <button
                          onClick={() => onSelectCarrier(order.carrierId)}
                          style={{
                            padding: '8px 14px',
                            borderRadius: '8px',
                            backgroundColor: '#f1f5f9',
                            color: '#334155',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <span>{t('carrierDetails')}</span>
                          <ChevronRight size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
