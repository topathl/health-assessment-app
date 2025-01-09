import React, { useState, useEffect } from 'react';
import { 
  Activity, BarChart2, Database, Bell, Settings,
  User, Sun, Moon, Monitor, ChevronDown, ChevronUp
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [colorTheme, setColorTheme] = useState('blue');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const themes = {
    blue: {
      primary: 'bg-blue-500',
      secondary: 'bg-blue-50',
      hover: 'hover:bg-blue-600',
      text: 'text-blue-500'
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const menuItems = [
    {
      id: 'dashboard',
      title: 'ダッシュボード',
      icon: <Activity className="w-5 h-5" />
    },
    {
      id: 'analysis',
      title: '詳細分析',
      icon: <BarChart2 className="w-5 h-5" />
    },
    {
      id: 'data',
      title: 'データ管理',
      icon: <Database className="w-5 h-5" />
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 
      ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* ヘッダー */}
      <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {isSidebarOpen ? <ChevronUp /> : <ChevronDown />}
              </button>
              <span className="text-xl font-bold ml-4">トータルヘルス評価システム</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* サイドバー */}
          <div 
            className={`transform transition-all duration-300 ${
              isSidebarOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
            }`}
          >
            {isSidebarOpen && (
              <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-4`}>
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id 
                        ? `${themes[colorTheme].secondary} ${themes[colorTheme].text}`
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </button>
                ))}
              </nav>
            )}
          </div>

          {/* コンテンツエリア */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-bold mb-4">
                {menuItems.find(item => item.id === activeTab)?.title}
              </h2>
              {/* ここに各タブのコンテンツが入ります */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
