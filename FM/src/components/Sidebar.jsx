import { useState } from 'react';
import { TrendingUp, CreditCard, Calendar, Bell, X, Home, Users, Clock, Settings, LogOut, ChartColumnStacked } from 'lucide-react';


export default function Sidebar({ sidebarOpen, setSidebarOpen }){
  const [activeItem, setActiveItem] = useState('Dashboard');

  const navigation = [
      { name: 'Dashboard', icon: Home, href: '/dashboard' },
      { name: 'Transactions', icon: CreditCard, href: '/transaction' },
      { name: 'Groups', icon: Users, href: '/group' },
      { name: 'Reminders', icon: Bell, href: '/reminder' },
      { name: 'Calendar', icon: Calendar, href: '/calender' },
      { name: 'Categories', icon: ChartColumnStacked, href: '/categories' },
      { name: 'Settings', icon: Settings, href: '/setting' }
    ];

  return(
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-blue-600 to-purple-700 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xl font-bold text-white">FinManager</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveItem(item.name)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  activeItem === item.name
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </nav>

          {/* Bottom Menu */}
          <div className="p-4 border-t border-white/20 space-y-2">
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-white/80 hover:bg-white/10 hover:text-white rounded-lg transition">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </a>
          </div>
        </div>
      </div>
  )
}