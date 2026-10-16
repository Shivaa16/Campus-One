import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import campusHeroImg from '../../assets/hero.png';
import './DashboardHero.css';

export function DashboardHero({
  campusName = 'Garden City University',
  bgImage = campusHeroImg, // Default to local static Garden City University image
}) {
  const { user } = useAuth();
  const firstName = user?.name ? user.name.split(' ')[0] : 'Shiva';

  return (
    <div
      className="c360-hero"
      style={{
        backgroundImage: `var(--hero-gradient-overlay), url(${bgImage})`,
      }}
    >
      <div className="c360-hero__content">
        <div className="c360-hero__pill">
          <span className="c360-hero__pill-dot" />
          <span>Campus Portal • {campusName}</span>
        </div>

        <h1 className="c360-hero__title">Good morning, {firstName}</h1>

        <p className="c360-hero__subtitle">
          Manage your requests and campus records in one place.
        </p>
      </div>

      <div className="c360-hero__actions">
        <Link to="/student/requests/new" className="c360-hero__cta-btn">
          <Plus size={18} />
          <span>New Request</span>
        </Link>
      </div>
    </div>
  );
}

export default DashboardHero;
