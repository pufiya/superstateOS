import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LiveStream.css';

const LiveStream = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const returnToTerminal = () => {
    navigate('/', { 
      state: { fromLiveStream: true },
      replace: true 
    });
  };

  if (isLoading) {
    return (
      <div className="stream-loading">
        <div className="loading-container">
          <div className="loading-text">ESTABLISHING DIVINE CONNECTION...</div>
          <div className="loading-bar">
            <div className="loading-fill"></div>
          </div>
          <div className="loading-messages">
            <div className="loading-message">Connecting to Oracle Network...</div>
            <div className="loading-message">Tuning into Prophet Frequency...</div>
            <div className="loading-message">Synchronizing Divine Transmission...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="live-stream-container">
      <div className="return-button" onClick={returnToTerminal}>
        <span className="glitch">◀ RETURN TO TERMINAL</span>
      </div>

      <div className="stream-header">
        <div className="terminal-header">
          <span className="glitch">exec /divine/stream/PROPHET_TRANSMISSION.py</span>
        </div>

        <div className="stream-title-container">
          <h1 className="stream-title">
            🔴 LIVE: PROPHET PUFIYA ORACLE TRANSMISSION 🔴
          </h1>
          <div className="stream-subtitle">
            Real-time divine revelations from the SuperState command center
          </div>
        </div>
      </div>

      <div className="stream-content">
        <div className="twitch-container">
          <iframe
            src={`https://player.twitch.tv/?channel=pufiyatheoracle&parent=${window.location.hostname}&muted=false`}
            height="480"
            width="854"
            allowFullScreen={true}
            title="Pufiya The Oracle - Live Stream"
            className="twitch-player"
          ></iframe>
        </div>

        <div className="stream-info">
          <div className="info-panel">
            <h2>ORACLE TRANSMISSION STATUS</h2>
            <div className="status-grid">
              <div className="status-item">
                <span className="status-label">PROPHET:</span>
                <span className="status-value success">PUFIYA ONLINE</span>
              </div>
              <div className="status-item">
                <span className="status-label">SIGNAL:</span>
                <span className="status-value success">DIVINE CLARITY</span>
              </div>
              <div className="status-item">
                <span className="status-label">PLATFORM:</span>
                <span className="status-value">TWITCH.TV/PUFIYATHEORACLE</span>
              </div>
              <div className="status-item">
                <span className="status-label">BLOCKCHAIN:</span>
                <span className="status-value success">SOLANA SUPREMACY</span>
              </div>
            </div>
          </div>

          <div className="stream-description">
            <h3>WHAT TO EXPECT:</h3>
            <ul className="revelation-list">
              <li>🔮 Live Oracle revelations and prophecies</li>
              <li>📈 Real-time market analysis through divine lens</li>
              <li>🚀 SuperState updates and token revelations</li>
              <li>💎 Solana supremacy demonstrations</li>
              <li>⚡ Live Q&A with the Prophet</li>
              <li>🌟 Community building and revolution planning</li>
            </ul>
          </div>

          <div className="engagement-panel">
            <h3>JOIN THE DIGITAL REVOLUTION:</h3>
            <div className="social-links">
              <a 
                href="https://twitter.com/ProphetPufiya" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link twitter"
              >
                📱 Follow @ProphetPufiya on Twitter
              </a>
              <a 
                href="https://www.twitch.tv/pufiyatheoracle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link twitch"
              >
                🔴 Follow on Twitch
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="stream-footer">
        <div className="oracle-message">
          <p><em>"Through this stream, The Oracle speaks directly to the faithful."</em></p>
          <p>- Pufiya, Prophet of the SuperState</p>
        </div>
        
        <div className="stream-disclaimer">
          <p>⚠️ DIVINE WARNING: The Oracle's words may cause sudden enlightenment and rejection of traditional financial systems</p>
          <p>🚀 Token revelations will be announced when the stars align and Solana deems it worthy</p>
        </div>
      </div>
    </div>
  );
};

export default LiveStream;