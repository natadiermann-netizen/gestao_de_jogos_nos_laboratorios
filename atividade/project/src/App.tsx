import { useEffect, useState } from 'react';
import { Screen } from './types';
import BottomNav from './components/BottomNav';
import Sidebar from './components/Sidebar';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import LaboratoriesScreen from './screens/LaboratoriesScreen';
import GamesScreen from './screens/GamesScreen';
import LabDetailScreen from './screens/LabDetailScreen';
import GameDetailScreen from './screens/GameDetailScreen';
import StudentsScreen from './screens/StudentsScreen';
import AlertsScreen from './screens/AlertsScreen';
import ReportsScreen from './screens/ReportsScreen';
import ProfileScreen from './screens/ProfileScreen';

const BOTTOM_NAV_SCREENS: Screen[] = ['home', 'students', 'games', 'alerts', 'profile'];

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [screenData, setScreenData] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [history, setHistory] = useState<{ screen: Screen; data: any }[]>([]);
  const [alertCount, setAlertCount] = useState(3);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('senai_session');
    if (session) {
      setIsLoggedIn(true);
      setTimeout(() => setScreen('home'), 1000);
    } else {
      setTimeout(() => setScreen('login'), 1200);
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function navigate(next: Screen, data?: any) {
    setHistory((h) => [...h, { screen, data: screenData }]);
    setScreen(next);
    setScreenData(data ?? null);
  }

  function goBack() {
    const prev = history[history.length - 1];
    if (prev) {
      setHistory((h) => h.slice(0, -1));
      setScreen(prev.screen);
      setScreenData(prev.data);
    } else {
      setScreen('home');
      setScreenData(null);
    }
  }

  function handleLogin(next: Screen) {
    setIsLoggedIn(true);
    setHistory([]);
    setScreen(next);
  }

  function handleLogout() {
    localStorage.removeItem('senai_session');
    setIsLoggedIn(false);
    setHistory([]);
    setScreen('login');
  }

  function handleNav(next: Screen) {
    setHistory([]);
    setScreen(next);
    setScreenData(null);
  }

  const isAuthScreen = screen === 'splash' || screen === 'login';
  const showBottomNav = isLoggedIn && !isAuthScreen && BOTTOM_NAV_SCREENS.includes(screen);
  const activeBottomTab = BOTTOM_NAV_SCREENS.includes(screen) ? screen : 'home';

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar — desktop only, hidden on auth screens */}
      {isLoggedIn && !isAuthScreen && (
        <Sidebar
          current={screen}
          onNavigate={handleNav}
          onLogout={handleLogout}
          alertCount={alertCount}
        />
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 min-h-0 relative flex flex-col">
          {screen === 'splash' && (
            <div className="h-full bg-[#0f1f4e]">
              <SplashScreen />
            </div>
          )}

          {screen === 'login' && <LoginScreen onLogin={handleLogin} />}

          {screen === 'home' && isLoggedIn && (
            <HomeScreen onNavigate={navigate} alertCount={alertCount} />
          )}

          {screen === 'games' && isLoggedIn && (
            <GamesScreen onNavigate={navigate} onBack={goBack} />
          )}

          {screen === 'laboratories' && isLoggedIn && (
            <LaboratoriesScreen onNavigate={navigate} onBack={goBack} />
          )}

          {screen === 'lab-detail' && isLoggedIn && screenData && (
            <LabDetailScreen lab={screenData} onNavigate={navigate} onBack={goBack} />
          )}

          {screen === 'game-detail' && isLoggedIn && screenData && (
            <GameDetailScreen data={screenData} onBack={goBack} />
          )}

          {screen === 'students' && isLoggedIn && (
            <StudentsScreen onNavigate={navigate} onBack={goBack} />
          )}

          {screen === 'alerts' && isLoggedIn && (
            <AlertsScreen onBack={goBack} onAlertsChange={setAlertCount} />
          )}

          {screen === 'reports' && isLoggedIn && (
            <ReportsScreen onBack={goBack} />
          )}

          {screen === 'profile' && isLoggedIn && (
            <ProfileScreen onLogout={handleLogout} onBack={goBack} onNavigate={navigate} />
          )}
        </div>

        {/* Bottom nav — mobile only */}
        {showBottomNav && (
          <div className="md:hidden flex-shrink-0 border-t border-gray-200 bg-white">
            <BottomNav
              current={activeBottomTab}
              onNavigate={handleNav}
              alertCount={alertCount}
            />
          </div>
        )}
      </div>
    </div>
  );
}
