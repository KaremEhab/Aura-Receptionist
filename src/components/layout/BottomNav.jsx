import { Menu, Search, RefreshCcw, Moon, Sun, Bell } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import './BottomNav.css';

export function BottomNav({ onMenuClick, onRefresh, onNotifClick, searchQuery, onSearch }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        <button className="icon-btn menu-btn-mobile" onClick={onMenuClick}>
          <Menu size={30} />
        </button>

        <div className="search-bar-mobile">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery || ''}
            onChange={(event) => onSearch?.(event.target.value)}
          />
        </div>

        <div className="bottom-nav-actions">
          <button className="icon-btn" onClick={onRefresh}>
            <RefreshCcw size={30} />
          </button>
          <button className="icon-btn" onClick={toggleTheme}>
            {isDark ? <Sun size={30} /> : <Moon size={30} />}
          </button>
          <button className="icon-btn" onClick={onNotifClick}>
            <Bell size={30} />
            <span className="notification-dot">3</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
