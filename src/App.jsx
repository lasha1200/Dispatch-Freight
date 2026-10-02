import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import OrdersHome from './pages/OrdersHome';
import CarriersList from './pages/CarriersList';
import CarrierDetail from './pages/CarrierDetail';
import AssignCarrierModal from './components/AssignCarrierModal';
import NewOrderModal from './components/NewOrderModal';
import DriverPhoneModal from './components/DriverPhoneModal';
import { INITIAL_CARRIERS, INITIAL_ORDERS } from './data/mockData';

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default logged in for smooth instant preview
  const [userRole, setUserRole] = useState('dispatcher'); // dispatcher | carrier
  const [userEmail, setUserEmail] = useState('dispatcher@aeroroute.io');

  // Navigation State
  const [currentTab, setCurrentTab] = useState('orders'); // orders | carriers | carrier_detail
  const [selectedCarrierId, setSelectedCarrierId] = useState(null);
  const [previousTab, setPreviousTab] = useState('orders');

  // Data State
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [carriers, setCarriers] = useState(INITIAL_CARRIERS);

  // Modal State
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [orderToAssign, setOrderToAssign] = useState(null);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [isDriverPhoneOpen, setIsDriverPhoneOpen] = useState(false);

  // Unassigned Count
  const unassignedCount = orders.filter(o => !o.carrierId || o.status === 'unassigned').length;

  // Handlers
  const handleLogin = (role, email) => {
    setUserRole(role);
    setUserEmail(email);
    setIsAuthenticated(true);
    setCurrentTab('orders');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleSelectCarrier = (carrierId) => {
    setSelectedCarrierId(carrierId);
    setPreviousTab(currentTab === 'carrier_detail' ? 'orders' : currentTab);
    setCurrentTab('carrier_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromCarrierDetail = () => {
    setCurrentTab(previousTab || 'orders');
  };

  const handleOpenAssignModal = (order) => {
    setOrderToAssign(order);
    setIsAssignModalOpen(true);
  };

  const handleConfirmAssignment = ({ orderId, carrierId, carrierName, driverName, driverPhone, notes }) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'assigned',
          carrierId,
          carrierName,
          driverName,
          driverPhone,
          lastUpdate: 'Just assigned by dispatcher',
          etaStatus: `Assigned to ${carrierName} - Pending dispatch`,
          notes: notes ? `${o.notes ? o.notes + ' | ' : ''}Dispatch Note: ${notes}` : o.notes
        };
      }
      return o;
    }));

    // Update carrier active load count
    setCarriers(prev => prev.map(c => {
      if (c.id === carrierId) {
        return {
          ...c,
          activeLoadsCount: (c.activeLoadsCount || 0) + 1,
          status: 'on_route'
        };
      }
      return c;
    }));

    setIsAssignModalOpen(false);
    setOrderToAssign(null);
  };

  const handleAssignDirectToCarrier = (orderId, carrierId, carrierName, driverName, driverPhone) => {
    handleConfirmAssignment({
      orderId,
      carrierId,
      carrierName,
      driverName,
      driverPhone,
      notes: 'Directly assigned from carrier management hub'
    });
  };

  const handleUpdateOrder = (orderId, partialUpdates) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, ...partialUpdates };
      }
      return o;
    }));
  };

  const handleCreateOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
  };

  const handleAddCarrier = (newCarrier) => {
    setCarriers(prev => [newCarrier, ...prev]);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      {/* Top Main Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenNewOrder={() => setIsNewOrderModalOpen(true)}
        onOpenDriverPhone={() => setIsDriverPhoneOpen(true)}
        userRole={userRole}
        onLogout={handleLogout}
        unassignedCount={unassignedCount}
      />

      {/* Main Pages */}
      <main style={{ minHeight: 'calc(100vh - 70px)' }}>
        {currentTab === 'orders' && (
          <OrdersHome
            orders={orders}
            carriers={carriers}
            onSelectCarrier={handleSelectCarrier}
            onOpenAssignModal={handleOpenAssignModal}
            onOpenNewOrder={() => setIsNewOrderModalOpen(true)}
            onOpenDriverPhone={() => setIsDriverPhoneOpen(true)}
          />
        )}

        {currentTab === 'carriers' && (
          <CarriersList
            carriers={carriers}
            orders={orders}
            onSelectCarrier={handleSelectCarrier}
            onAddCarrier={handleAddCarrier}
          />
        )}

        {currentTab === 'carrier_detail' && (
          <CarrierDetail
            carrierId={selectedCarrierId}
            carriers={carriers}
            orders={orders}
            onBack={handleBackFromCarrierDetail}
            onOpenDriverPhone={() => setIsDriverPhoneOpen(true)}
            onAssignLoadToCarrier={handleAssignDirectToCarrier}
            onUpdateOrderStatus={handleUpdateOrder}
          />
        )}
      </main>

      {/* Assign Carrier Modal */}
      {isAssignModalOpen && orderToAssign && (
        <AssignCarrierModal
          order={orderToAssign}
          carriers={carriers}
          onClose={() => {
            setIsAssignModalOpen(false);
            setOrderToAssign(null);
          }}
          onAssign={handleConfirmAssignment}
        />
      )}

      {/* Create New Order Modal */}
      <NewOrderModal
        isOpen={isNewOrderModalOpen}
        onClose={() => setIsNewOrderModalOpen(false)}
        onCreateOrder={handleCreateOrder}
      />

      {/* Interactive Driver Phone App Simulator */}
      <DriverPhoneModal
        isOpen={isDriverPhoneOpen}
        onClose={() => setIsDriverPhoneOpen(false)}
        orders={orders}
        carriers={carriers}
        onUpdateOrder={handleUpdateOrder}
      />
    </div>
  );
}
