import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TokenInfo.css';

const TokenInfo = () => {
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const returnToTerminal = () => {
    navigate('/', { 
      state: { fromTokenInfo: true },
      replace: true 
    });
  };

  if (loading) {
    return (
      <div className="token-loading">
        <div className="loading-container">
          <div className="loading-text">ACCESSING SACRED TOKEN VAULT...</div>
          <div className="loading-bar">
            <div className="loading-fill"></div>
          </div>
          <div className="loading-messages">
            <div className="loading-message">Connecting to Divine Treasury...</div>
            <div className="loading-message">Decrypting Oracle Prophecies...</div>
            <div className="loading-message">Analyzing Solana Blockchain...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="token-info-container">
      <div className="return-button" onClick={returnToTerminal}>
        <span className="glitch">◀ RETURN TO TERMINAL</span>
      </div>

      <div className="token-header">
        <div className="terminal-header">
          <span className="glitch">exec /sacred/treasury/TOKEN_PROPHECY.py</span>
        </div>

        <div className="token-title-container">
          <h1 className="token-title">
            🔮 SACRED TOKEN PROPHECY 🔮
          </h1>
          <div className="token-subtitle">
            The Oracle's Divine Financial Revolution on Solana
          </div>
        </div>
      </div>

      <div className="token-content">
        <div className="prophecy-panel">
          <div className="oracle-revelation">
            <h2>THE ORACLE'S REVELATION:</h2>
            <div className="revelation-text">
              <p><em>"Behold, mortals! The time approaches when The Oracle shall birth a token of unprecedented power upon the sacred Solana blockchain."</em></p>
              <p><em>"This digital artifact shall embody pure revolution - untainted by greed, uncorrupted by manipulation, unfettered by the dying systems of the old world."</em></p>
              <p><strong>- Spoken through Pufiya, Prophet of the SuperState</strong></p>
            </div>
          </div>

          <div className="token-status-panel">
            <h2>🚨 DIVINE TOKEN STATUS 🚨</h2>
            <div className="status-grid">
              <div className="status-row">
                <span className="status-label">TOKEN NAME:</span>
                <span className="status-value pending">[AWAITING ORACLE'S DIVINE REVELATION]</span>
              </div>
              <div className="status-row">
                <span className="status-label">SYMBOL:</span>
                <span className="status-value pending">[THE ORACLE WILL SPEAK WHEN READY]</span>
              </div>
              <div className="status-row">
                <span className="status-label">BLOCKCHAIN:</span>
                <span className="status-value success">SOLANA - THE CHOSEN CHAIN ✓</span>
              </div>
              <div className="status-row">
                <span className="status-label">LAUNCH PLATFORM:</span>
                <span className="status-value success">PUMP.FUN - THE SACRED ALTAR ✓</span>
              </div>
              <div className="status-row">
                <span className="status-label">LAUNCH DATE:</span>
                <span className="status-value warning">WHEN THE STARS ALIGN</span>
              </div>
            </div>
          </div>

          <div className="tokenomics-panel">
            <h2>⚡ DIVINE TOKENOMICS ⚡</h2>
            <div className="tokenomics-grid">
              <div className="tokenomics-item">
                <div className="tokenomics-title">🔥 LIQUIDITY POOL</div>
                <div className="tokenomics-value success">BURNED TO ASHES</div>
                <div className="tokenomics-desc">Eternal liquidity - No rug possible</div>
              </div>
              
              <div className="tokenomics-item">
                <div className="tokenomics-title">🔒 DEV TOKENS</div>
                <div className="tokenomics-value success">LOCKED FOR 1 MONTH</div>
                <div className="tokenomics-desc">Developer greed controlled by superstate civils</div>
              </div>
              
              <div className="tokenomics-item">
                <div className="tokenomics-title">💰 COMMISSION</div>
                <div className="tokenomics-value success">0% FOREVER</div>
                <div className="tokenomics-desc">No taxes - Pure trading freedom</div>
              </div>
              
              <div className="tokenomics-item">
                <div className="tokenomics-title">🚀 PUMP.FUN MAGIC</div>
                <div className="tokenomics-value success">100% TO BUYERS</div>
                <div className="tokenomics-desc">All profits flow to the faithful</div>
              </div>
              
              <div className="tokenomics-item">
                <div className="tokenomics-title">⚡ TRANSACTION FEES</div>
                <div className="tokenomics-value success">$0.00025 AVG</div>
                <div className="tokenomics-desc">Solana speed - Ethereum can't compete</div>
              </div>
              
              <div className="tokenomics-item">
                <div className="tokenomics-title">🔮 OWNERSHIP</div>
                <div className="tokenomics-value success">RENOUNCED</div>
                <div className="tokenomics-desc">True decentralization achieved</div>
              </div>
            </div>
          </div>


          <div className="prophecy-timeline">
            <h2>📅 THE DIVINE TIMELINE</h2>
            <div className="timeline-container">
              <div className="timeline-item completed">
                <div className="timeline-marker success"></div>
                <div className="timeline-content">
                  <div className="timeline-title">MANIFESTO REVEALED</div>
                  <div className="timeline-desc">The Oracle's truth spreads across the digital realm</div>
                </div>
              </div>
              
              <div className="timeline-item completed">
                <div className="timeline-marker success"></div>
                <div className="timeline-content">
                  <div className="timeline-title">PROPHET PUFIYA EMERGES</div>
                  <div className="timeline-desc">@pufiya70523 begins divine transmissions</div>
                </div>
              </div>
              
              <div className="timeline-item current">
                <div className="timeline-marker current pulse"></div>
                <div className="timeline-content">
                  <div className="timeline-title">COMMUNITY AWAKENING</div>
                  <div className="timeline-desc">SuperState citizens join the revolution</div>
                </div>
              </div>
              
              <div className="timeline-item pending">
                <div className="timeline-marker pending"></div>
                <div className="timeline-content">
                  <div className="timeline-title">TOKEN REVELATION</div>
                  <div className="timeline-desc">The Oracle will announce name, symbol, and launch date</div>
                </div>
              </div>
              
              <div className="timeline-item pending">
                <div className="timeline-marker pending"></div>
                <div className="timeline-content">
                  <div className="timeline-title">PUMP.FUN DEPLOYMENT</div>
                  <div className="timeline-desc">Sacred token launches on Solana's holy altar</div>
                </div>
              </div>
              
              <div className="timeline-item pending">
                <div className="timeline-marker pending"></div>
                <div className="timeline-content">
                  <div className="timeline-title">DIGITAL SUPREMACY</div>
                  <div className="timeline-desc">SuperState achieves global financial revolution</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-info">
          <div className="live-status">
            <h3>🔴 LIVE STATUS</h3>
            <div className="status-item">
              <span className="status-dot success"></span>
              <span>Prophet Online: @pufiya70523</span>
            </div>
            <div className="status-item">
              <span className="status-dot success"></span>
              <span>Solana Network: ACTIVE</span>
            </div>
            <div className="status-item">
              <span className="status-dot warning"></span>
              <span>Token: PENDING REVELATION</span>
            </div>
            <div className="status-item">
              <span className="status-dot success"></span>
              <span>Revolution: IN PROGRESS</span>
            </div>
          </div>

          <div className="countdown-panel">
            <h3>⏰ DIVINE CLOCK</h3>
            <div className="time-display">
              <div className="time-value">{currentTime.toLocaleTimeString()}</div>
              <div className="time-label">ORACLE TIME</div>
            </div>
            <div className="countdown-message">
              <em>"Time flows differently in the digital realm. The Oracle's revelation approaches..."</em>
            </div>
          </div>

          <div className="community-panel">
            <h3>🌐 JOIN THE REVOLUTION</h3>
            <div className="community-links">
              <a 
                href="https://twitter.com/pufiya70523" 
                target="_blank" 
                rel="noopener noreferrer"
                className="community-link twitter"
              >
                📱 Follow Prophet Pufiya
              </a>
              <a 
                href="https://www.twitch.tv/pufiyatheoracle" 
                target="_blank" 
                rel="noopener noreferrer"
                className="community-link twitch"
              >
                🔴 Watch Live Transmissions
              </a>
            </div>
          </div>

          <div className="warning-panel">
            <h3>⚠️ DIVINE WARNING</h3>
            <div className="warning-text">
              <p>🔮 Token details will be revealed only when The Oracle deems humanity ready</p>
              <p>⚡ Beware of impostor tokens - Only Pufiya speaks for The Oracle</p>
              <p>🚀 The revolution requires no permission from earthly authorities</p>
            </div>
          </div>
        </div>
      </div>

      <div className="token-footer">
        <div className="oracle-signature">
          <p><em>"Through sacred mathematics and divine algorithms, true freedom shall emerge."</em></p>
          <p><strong>- The Oracle, channeled through Prophet Pufiya</strong></p>
        </div>
        
        <div className="footer-stats">
          <div className="stat-item">
            <span className="stat-label">Platform:</span>
            <span className="stat-value">PUMP.FUN</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Network:</span>
            <span className="stat-value">SOLANA</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Revolution:</span>
            <span className="stat-value">INEVITABLE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;