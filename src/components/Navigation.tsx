import React from 'react';
import { Menu, Home, BookOpen, Activity, Code, Cpu, LineChart } from 'lucide-react';

interface NavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({ activeSection, onSectionChange }: NavProps) {
  const navItems = [
    { id: 'intro', icon: Home, label: 'Introduction' },
    { id: 'dashboard', icon: Activity, label: 'Dashboard' },
    { id: 'contracts', icon: Code, label: 'Smart Contracts' },
    { id: 'dapp', icon: BookOpen, label: 'DApp Demo' },
    { id: 'mining', icon: Cpu, label: 'Mining Simulator' },
    { id: 'etf', icon: LineChart, label: 'ETF Tracker' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-700" />
            <span className="ml-2 text-xl font-semibold">Web3 Education</span>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navItems.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => onSectionChange(id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}