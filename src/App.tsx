import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BillingActions from './components/BillingActions';
import RecentItems from './components/RecentItems';
import InvoicePreview from './components/InvoicePreview';
import CustomerMenuPage from './components/CustomerMenuPage';
import StaffLoginPage from './components/StaffLoginPage';
import WaiterOrderPage from './components/WaiterOrderPage';
import KitchenDisplayPage from './components/KitchenDisplayPage';
import AdminDashboardPage from './components/AdminDashboardPage';
import { DemoLoginPage } from './pages/DemoLoginPage';
import { StaffOpsLanding } from './pages/StaffOpsLanding';

// Home Page Component (Original)
const HomePage: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <Header />

      {/* Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        border: '1px solid #d0e7cd',
        borderRadius: '8px',
        padding: '10px 0',
        backgroundColor: '#f1faf3',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        {['Generate Bill', 'Table Management', 'Room Management', 'Order Management (Online)'].map((tab, i) => (
          <span
            key={i}
            style={{
              flex: 1,
              minWidth: '150px',
              textAlign: 'center',
              fontWeight: tab === 'Generate Bill' ? 'bold' : 'normal',
              color: tab === 'Generate Bill' ? '#4caf50' : '#000'
            }}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* Left column */}
        <div style={{ flex: 1, minWidth: '350px' }}>
          <BillingActions />
          <RecentItems />
        </div>

        {/* Right column */}
        <div style={{
          flex: 1,
          minWidth: '350px',
        }}>
          <InvoicePreview />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<HomePage />} />

      {/* New Pages */}
      <Route path="/customer" element={<CustomerMenuPage />} />
      <Route path="/staff-login" element={<StaffLoginPage />} />
      <Route path="/waiter" element={<WaiterOrderPage />} />
      <Route path="/kitchen" element={<KitchenDisplayPage />} />
      <Route path="/admin" element={<AdminDashboardPage />} />

      {/* New Routes - Phase 2 */}
      <Route path="/demo-login" element={<DemoLoginPage />} />
      <Route path="/staff-ops" element={<StaffOpsLanding />} />
    </Routes>
  );
};

export default App;


