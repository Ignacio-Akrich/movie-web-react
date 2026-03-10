import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchOutlined, HeartOutlined } from '@ant-design/icons';
import { ReactComponent as Logo } from '../../assets/img/logo.svg';
import { useWatchlistContext } from '../../context/WatchlistContext';
import './Navbar.scss';

export default function Navbar() {
  const location = useLocation();
  const { watchlist } = useWatchlistContext();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link to="/" className="navbar__logo">
        <Logo />
      </Link>

      <div className="navbar__links">
        <Link to="/"               className={isActive('/')}>Home</Link>
        <Link to="/new-movies"     className={isActive('/new-movies')}>Estrenos</Link>
        <Link to="/popular-movies" className={isActive('/popular-movies')}>Populares</Link>
      </div>

      <div className="navbar__actions">
        <Link to="/search"    className="navbar__icon-btn" title="Buscar">
          <SearchOutlined />
        </Link>
        <Link to="/watchlist" className="navbar__icon-btn navbar__watchlist-btn" title="Watchlist">
          <HeartOutlined />
          {watchlist.length > 0 && (
            <span className="navbar__badge">{watchlist.length}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}
