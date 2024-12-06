import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Introduction } from './components/Introduction';
import { Dashboard } from './components/Dashboard';
import { SmartContracts } from './components/SmartContracts';
import { DAppDemo } from './components/DAppDemo';
import { MiningSimulator } from './components/MiningSimulator';
import { ETFDashboard } from './components/ETFDashboard';

export default function App() {
  const [activeSection, setActiveSection] = useState('intro');

  const renderSection = () => {
    switch (activeSection) {
      case 'intro':
        return <Introduction />;
      case 'dashboard':
        return <Dashboard />;
      case 'contracts': 
        return <SmartContracts />;
      case 'dapp':
        return <DAppDemo />;
      case 'mining':
        return <MiningSimulator />;
      case 'etf':
        return <ETFDashboard />;
      default:
        return <Introduction />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main className="pt-16">
        {renderSection()}
      </main>
    </div>
  );
}