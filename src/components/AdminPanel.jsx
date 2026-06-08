import React, { useState, useEffect } from 'react';
import { Lock, Mail, RefreshCw, X, ShieldAlert, FileText } from 'lucide-react';

const AdminPanel = ({ 
  isAdmin, 
  isLoginModalOpen, 
  onCloseLoginModal, 
  onLoginSuccess 
}) => {
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  
  // Dashboard details (Contact Form Messages)
  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!password) return;

    setLoginLoading(true);
    setLoginError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
      });
      const data = await response.json();

      if (data.success) {
        onLoginSuccess(data.token);
        setPassword('');
        onCloseLoginModal();
      } else {
        setLoginError(data.message || 'Invalid password.');
      }
    } catch (err) {
      setLoginError('Could not reach backend for login validation.');
    } finally {
      setLoginLoading(false);
    }
  };

  const fetchMessages = async () => {
    if (!isAdmin) return;
    
    setMessagesLoading(true);
    setMessagesError('');

    try {
      const response = await fetch('/api/contacts');
      const data = await response.json();

      if (data.success) {
        setMessages(data.data);
      } else {
        setMessagesError('Failed to fetch contact inquiries.');
      }
    } catch (err) {
      setMessagesError('Could not connect to API to retrieve messages.');
    } finally {
      setMessagesLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchMessages();
    }
  }, [isAdmin]);

  return (
    <>
      {/* Admin Login Modal */}
      {isLoginModalOpen && (
        <div className="modal-overlay" onClick={onCloseLoginModal}>
          <div className="modal-container" style={{ maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={18} style={{ color: 'var(--color-primary)' }} />
                <span>Admin Login</span>
              </h3>
              <button className="modal-close-btn" onClick={onCloseLoginModal} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleLoginSubmit}>
              <div className="modal-body">
                {loginError && (
                  <div className="form-status error" style={{ marginBottom: '16px' }}>
                    <ShieldAlert size={16} />
                    <span>{loginError}</span>
                  </div>
                )}
                
                <div className="form-group">
                  <label htmlFor="admin-password-input">Enter Admin Password</label>
                  <input
                    id="admin-password-input"
                    type="password"
                    className="form-control"
                    placeholder="Enter password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoFocus
                  />
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', marginTop: '6px' }}>
                    Default password is <code>admin123</code>
                  </span>
                </div>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-outline btn-sm" onClick={onCloseLoginModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm" disabled={loginLoading}>
                  {loginLoading ? 'Authenticating...' : 'Login'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Admin Dashboard Panel (Visible only when logged in) */}
      {isAdmin && (
        <section id="admin-dashboard" className="section container" style={{ borderTop: '1px solid var(--color-border)' }}>
          <div className="admin-dashboard-container">
            <div className="admin-dashboard-header">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Lock size={26} style={{ color: '#f59e0b' }} />
                <span>Admin Control Panel</span>
                <span className="admin-badge">Logged In</span>
              </h2>
              <button className="btn btn-secondary btn-sm" onClick={fetchMessages} disabled={messagesLoading}>
                <RefreshCw size={14} className={messagesLoading ? 'spin' : ''} />
                <span>Refresh Messages</span>
              </button>
            </div>

            <div className="admin-tabs">
              <button className="admin-tab active">
                <Mail size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                <span>Received Messages ({messages.length})</span>
              </button>
            </div>

            {messagesLoading ? (
              <p style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-dim)' }}>
                Retrieving inquiries...
              </p>
            ) : messagesError ? (
              <p style={{ color: '#ef4444', textAlign: 'center', padding: '20px' }}>
                {messagesError}
              </p>
            ) : messages.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-dim)' }}>
                No contact form submissions received yet.
              </p>
            ) : (
              <div className="admin-messages-list">
                {messages.map((msg, idx) => (
                  <div key={msg._id || idx} className="admin-message-card">
                    <div className="message-meta">
                      <div>
                        <span className="message-sender">{msg.name}</span>
                        {' '}
                        <a href={`mailto:${msg.email}`} className="message-email">&lt;{msg.email}&gt;</a>
                      </div>
                      <span className="message-date">
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>
                    
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                      Subject: {msg.subject}
                    </div>

                    <div className="message-text">
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <style>{`
            .spin {
              animation: spin-anim 1s linear infinite;
            }
            @keyframes spin-anim {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </section>
      )}
    </>
  );
};

export default AdminPanel;
