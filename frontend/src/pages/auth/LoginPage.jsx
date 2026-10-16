import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from 'lucide-react';
import { ThemeToggle } from '../../components/theme/ThemeToggle';
import { useAuth } from '../../hooks/useAuth';
import campusOneLogo from '../../assets/campusone-logo.svg';
import './LoginPage.css';

const DEMO_ROLES = [
  { id: 'student', label: 'Student', path: '/student/dashboard' },
  { id: 'faculty', label: 'Faculty', path: '/faculty/dashboard' },
  { id: 'hod', label: 'HOD', path: '/hod/dashboard' },
  { id: 'admin', label: 'Admin', path: '/admin/dashboard' },
];

export function LoginPage() {
  const navigate = useNavigate();
  const { loginAs, loading } = useAuth();

  const [selectedRole, setSelectedRole] = useState('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const targetRole = selectedRole;
      const targetObj = DEMO_ROLES.find((r) => r.id === targetRole) || DEMO_ROLES[0];
      await loginAs(targetRole);
      navigate(targetObj.path);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="c360-fullscreen-login">
      {/* 1. Fullscreen Cinematic Background Video */}
      <video
        className="c360-fullscreen-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/assets/videos/Finalvedio.mp4" type="video/mp4" />
        <source src="/assets/vedios/Finalvedio.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* 2. Layered Navy Atmospheric Overlay for High Contrast */}
      <div className="c360-fullscreen-overlay" />

      {/* 3. Minimal Top Header Bar (No duplicate logo on left, clean campus pill & theme toggle on right) */}
      <header className="c360-login-header">
        <div className="c360-login-header__left">
          {/* Top-left clean indicator without repeating centered logo */}
        </div>

        <div className="c360-login-header__right">
          <div className="c360-login-header__campus-pill">
            <span className="c360-login-header__pill-dot" />
            <span>Garden City University</span>
          </div>
          <ThemeToggle className="c360-login-header__theme-btn" />
        </div>
      </header>

      {/* 4. Center Floating Authentication Container (Completely Transparent, NO Card Background) */}
      <main className="c360-login-center-stage">
        <div className="c360-minimal-login-container">
          {/* Prominent Transparent CampusOne Logo Sitting Centered Above Fields */}
          <div className="c360-login-logo-wrap">
            <img
              src={campusOneLogo}
              alt="CampusOne - Connected Campus System"
              className="c360-login-logo"
            />
          </div>

          {/* Minimal Transparent Form */}
          <form onSubmit={handleSubmit} className="c360-minimal-form" noValidate>
            {/* Demo Role Selector: Sign in as */}
            <div className="c360-login-role-selector">
              <span className="c360-login-role-title">Sign in as</span>
              <div className="c360-login-role-grid">
                {DEMO_ROLES.map((r) => {
                  const isActive = selectedRole === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      className={`c360-login-role-pill ${isActive ? 'c360-login-role-pill--active' : ''}`}
                      onClick={() => setSelectedRole(r.id)}
                    >
                      {r.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* University ID / Institutional Email */}
            <div className="c360-minimal-field">
              <label className="c360-minimal-label" htmlFor="c360-auth-id">
                University ID / Institutional Email
              </label>
              <div className="c360-minimal-input-wrap">
                <Mail size={16} className="c360-minimal-input-icon" />
                <input
                  id="c360-auth-id"
                  type="text"
                  required
                  autoComplete="username"
                  className="c360-minimal-input"
                  placeholder="e.g. shiva.kumar@campus.edu or CS2023-042"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="c360-minimal-field">
              <div className="c360-minimal-label-row">
                <label className="c360-minimal-label" htmlFor="c360-auth-pass">
                  Password
                </label>
                <button
                  type="button"
                  className="c360-minimal-forgot-link"
                  onClick={() => alert('Password reset link sent to your registered institutional email.')}
                >
                  Forgot password?
                </button>
              </div>
              <div className="c360-minimal-input-wrap">
                <Lock size={16} className="c360-minimal-input-icon" />
                <input
                  id="c360-auth-pass"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  className="c360-minimal-input c360-minimal-input--pass"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="c360-minimal-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={0}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Primary Strong Solid Blue Sign In CTA */}
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="c360-minimal-submit-btn"
            >
              <span>{isSubmitting ? 'Signing in...' : 'Sign In'}</span>
              <ArrowRight size={16} className="c360-minimal-submit-arrow" />
            </button>
          </form>
        </div>

        {/* 5. Clean Centered Bottom Statement */}
        <div className="c360-login-bottom-statement-wrap">
          <p className="c360-login-bottom-statement">
            One platform. Every campus request. Fully connected and trackable.
          </p>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
