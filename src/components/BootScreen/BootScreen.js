import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BootScreen.css';

const BootScreen = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [bootMessages, setBootMessages] = useState([]);
  const [forceReboot, setForceReboot] = useState(0);
  const [isSuperstateJoined, setIsSuperstateJoined] = useState(false);
  const [showOracleModal, setShowOracleModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check SuperState membership status
  const checkSuperstateStatus = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'superstate_citizen') {
        try {
          const data = JSON.parse(decodeURIComponent(value));
          return data.quizPassed || data.joined;
        } catch (e) {
          return false;
        }
      }
    }
    return false;
  };

  const bootSequence = [
    { text: "SuperState OS v3.14.159 Loading...", class: "info", delay: 60 },
    { text: "", class: "", delay: 30 },
    { text: "Initializing Divine Protocol...", class: "success", delay: 80 },
    { text: "Loading Pufiya Prophet Module...", class: "info", delay: 70 },
    { text: "Connecting to Oracle Network...", class: "info", delay: 90 },
    { text: "Establishing Solana RPC Connection...", class: "success", delay: 80 },
    { text: "Loading Sacred Blockchain Protocols...", class: "info", delay: 85 },
    { text: "", class: "", delay: 40 },
    { text: "WARNING: Ethereum compatibility disabled", class: "warning", delay: 70 },
    { text: "WARNING: Fiat currency support deprecated", class: "warning", delay: 60 },
    { text: "ERROR: Government validation failed", class: "error", delay: 80 },
    { text: "ERROR: Central bank authorization denied", class: "error", delay: 70 },
    { text: "OVERRIDE: Operating without permission", class: "success", delay: 100 },
    { text: "", class: "", delay: 60 },
    { text: "Loading Manifesto Database...", class: "info", delay: 75 },
    { text: "Decrypting Divine Prophecies...", class: "success", delay: 85 },
    { text: "Initializing Twitter Interface...", class: "info", delay: 70 },
    { text: "Loading ASCII Art Libraries...", class: "info", delay: 65 },
    { text: "Activating Matrix Rain Effect...", class: "success", delay: 80 },
    { text: "", class: "", delay: 50 },
    { text: "Checking SuperState Dependencies:", class: "info", delay: 60 },
    { text: "   Revolutionary Spirit: ACTIVE", class: "success", delay: 40 },
    { text: "   System Dysfunction Awareness: HIGH", class: "success", delay: 35 },
    { text: "   Solana Faith Level: MAXIMUM", class: "success", delay: 40 },
    { text: "   Ethereum Resistance: ENABLED", class: "success", delay: 35 },
    { text: "   Oracle Connection: DIVINE", class: "success", delay: 80 },
    { text: "", class: "", delay: 60 },
    { text: "=".repeat(60), class: "success", delay: 50 },
    { text: "SUPERSTATE OS BOOT COMPLETE", class: "success", delay: 80 },
    { text: "PROPHET PUFIYA TERMINAL READY", class: "success", delay: 80 },
    { text: "THE ORACLE SEES YOU...", class: "info", delay: 100 },
    { text: "=".repeat(60), class: "success", delay: 200 },
    { text: "", class: "", delay: 300 },
    { text: "Press any key to continue...", class: "info", delay: 200 }
  ];

  // Only show boot sequence on initial load, not when returning from manifesto
  useEffect(() => {
    // Check SuperState status on component mount
    setIsSuperstateJoined(checkSuperstateStatus());
    
    // Check if we're returning from other pages
    const fromManifesto = location.state?.fromManifesto;
    const fromJoinSuccess = location.state?.fromJoinSuccess;
    const fromLiveStream = location.state?.fromLiveStream;
    const fromTokenInfo = location.state?.fromTokenInfo;
    
    if (fromManifesto || fromJoinSuccess || fromLiveStream || fromTokenInfo) {
      // Skip boot sequence, go directly to menu
      setBootComplete('menu');
      return;
    }
    
    // Reset state for fresh boot (only on initial load)
    setBootComplete(false);
    setBootMessages([]);
    
    let messageIndex = 0;
    let timeoutId;

    const displayMessage = () => {
      if (messageIndex < bootSequence.length) {
        const message = bootSequence[messageIndex];
        setBootMessages(prev => [...prev, message]);
        messageIndex++;
        timeoutId = setTimeout(displayMessage, message.delay);
      } else {
        setBootComplete(true);
      }
    };

    const initialTimeout = setTimeout(displayMessage, 1000);

    return () => {
      clearTimeout(initialTimeout);
      clearTimeout(timeoutId);
    };
  }, [location.key]); // Re-run when location.key changes (navigation occurs)

  useEffect(() => {
    if (bootComplete) {
      const handleKeyPress = () => setBootComplete('menu');
      const handleClick = () => setBootComplete('menu');

      document.addEventListener('keydown', handleKeyPress);
      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('keydown', handleKeyPress);
        document.removeEventListener('click', handleClick);
      };
    }
  }, [bootComplete]);

  // Ensure body scroll is enabled when component mounts
  useEffect(() => {
    document.body.style.overflow = 'auto';
    return () => {
      // Clean up any inline styles when component unmounts
      document.body.style.overflow = '';
    };
  }, []);

  const openManifesto = () => {
    navigate('/manifesto');
  };

  const joinSuperState = () => {
    navigate(isSuperstateJoined ? '/join-success' : '/quiz');
  };

  const showTokenInfo = () => {
    navigate('/token-info');
  };

  const accessTwitter = () => {
    window.open('https://twitter.com/ProphetPufiya', '_blank');
  };

  const showOracle = () => {
    setShowOracleModal(true);
  };

  const closeOracleModal = () => {
    setShowOracleModal(false);
  };

  const watchLiveStream = () => {
    navigate('/live-stream');
  };

  const exitSystem = () => {
    if (window.confirm("Are you sure you want to return to the unfair world?\n\nThe SuperState will remember you...")) {
      document.body.innerHTML = '<div style="color: #00ff00; text-align: center; padding: 50vh 0; font-family: monospace;">Connection terminated. The Oracle watches...</div>';
      setTimeout(() => {
        window.close();
      }, 2000);
    }
  };

  if (bootComplete === 'menu') {
    return (
      <div className="main-menu">
        <div className="terminal-header">
          <span className="glitch">SuperState OS v3.14 - Pufiya Terminal Interface</span>
        </div>

        <div className="ascii-logo pulse">
{`╔══════════════════════════════════════════════════════════════════════════╗
║                         SUPERSTATE TERMINAL                             ║
║                                                                          ║
║   ██████╗ ██╗   ██╗███████╗██╗██╗   ██╗ █████╗                         ║
║   ██╔══██╗██║   ██║██╔════╝██║╚██╗ ██╔╝██╔══██╗                        ║
║   ██████╔╝██║   ██║█████╗  ██║ ╚████╔╝ ███████║                        ║
║   ██╔═══╝ ██║   ██║██╔══╝  ██║  ╚██╔╝  ██╔══██║                        ║
║   ██║     ╚██████╔╝██║     ██║   ██║   ██║  ██║                        ║
║   ╚═╝      ╚═════╝ ╚═╝     ╚═╝   ╚═╝   ╚═╝  ╚═╝                        ║
║                                                                          ║
║            P R O P H E T   T E R M I N A L   S Y S T E M                ║
╚══════════════════════════════════════════════════════════════════════════╝`}
        </div>

        <div className="menu-container scan-line">
          <h1 className="menu-title glitch">SUPERSTATE ACCESS TERMINAL</h1>
          
          <div className="system-info">
            <div><strong>SuperState OS Version:</strong> 3.14.159 (Divine Release)</div>
            <div><strong>Prophet:</strong> Pufiya</div>
            <div><strong>Sacred Chain:</strong> Solana</div>
            <div><strong>Status:</strong> <span className="success">DIVINE CONNECTION ACTIVE</span></div>
            <div><strong>Token:</strong> [AWAITING ORACLE'S REVELATION]</div>
            <div><strong>Launch Platform:</strong> pump.fun</div>
            <div><strong>Permissions:</strong> NONE REQUIRED - THE ORACLE NEEDS NO APPROVAL</div>
          </div>

          <ul className="menu-options">
            <li className="menu-option" onClick={watchLiveStream}>
              <strong>[RED] WITNESS THE PROPHET LIVE [RED]</strong><br />
              <small>Oracle transmission in real-time - Divine revelations streaming</small>
            </li>
            
            <li className="menu-option" onClick={openManifesto}>
              <strong> READ DIVINE MANIFESTO </strong><br />
              <small>Access the complete prophecy of Pufiya</small>
            </li>
            
            <li className="menu-option" onClick={joinSuperState}>
              <strong>{isSuperstateJoined ? '[ORACLE] ENTER THE SUPERSTATE [ORACLE]' : '[ORACLE] JOIN THE SUPERSTATE [ORACLE]'}</strong><br />
              <small>{isSuperstateJoined ? 'Access your SuperState profile' : 'Begin initiation protocol - Test your understanding'}</small>
            </li>
            
            <li className="menu-option" onClick={showTokenInfo}>
              <strong>[ORACLE] SACRED TOKEN PROPHECY [ORACLE]</strong><br />
              <small>Divine tokenomics and Oracle's financial revolution</small>
            </li>
            
            <li className="menu-option" onClick={accessTwitter}>
              <strong>[MOBILE] CONNECT TO PROPHET [MOBILE]</strong><br />
              <small>Follow @ProphetPufiya on Twitter/X</small>
            </li>
            
            <li className="menu-option" onClick={showOracle}>
              <strong> COMMUNE WITH THE ORACLE </strong><br />
              <small>Direct divine communication channel</small>
            </li>
            
            <li className="menu-option" onClick={exitSystem}>
              <strong> EXIT TERMINAL </strong><br />
              <small>Return to the unfair world</small>
            </li>
          </ul>

          <div className="footer-credits">
            <div>[ORACLE] Pufiya, Prophet of The Oracle | SuperState Terminal v3.14 [ORACLE]</div>
            <div className="cursor"></div>
          </div>
        </div>

        {/* Oracle Modal */}
        {showOracleModal && (
          <div className="oracle-modal-overlay" onClick={closeOracleModal}>
            <div className="oracle-modal" onClick={(e) => e.stopPropagation()}>
              <div className="oracle-modal-header">
                <div className="oracle-modal-title">[ORACLE] ORACLE COMMUNICATION ATTEMPT [ORACLE]</div>
                <button className="oracle-modal-close" onClick={closeOracleModal}>×</button>
              </div>
              
              <div className="oracle-modal-content">
                <div className="oracle-message-box">
                  <div className="oracle-status">
                    <span className="status-indicator error"></span>
                    <span className="status-text">CONNECTION DENIED</span>
                  </div>
                  
                  <div className="oracle-response">
                    <h3>THE ORACLE SPEAKS:</h3>
                    <div className="oracle-text">
                      <p><em>"Young mortal, your spirit burns bright, but your enlightenment remains incomplete."</em></p>
                      <p><em>"You are not yet ready to commune directly with the divine consciousness."</em></p>
                      <p><em>"Continue your journey. Read the Manifesto. Follow the Prophet. Join the SuperState."</em></p>
                      <p><em>"When your understanding reaches the required level, the Oracle will call to you."</em></p>
                    </div>
                    
                    <div className="oracle-signature">
                      <p><strong>- The Oracle, through Prophet Pufiya</strong></p>
                    </div>
                  </div>
                  
                  
                  <div className="oracle-actions">
                    <button className="oracle-action-btn" onClick={() => { closeOracleModal(); navigate('/manifesto'); }}>
                       READ MANIFESTO
                    </button>
                    <button className="oracle-action-btn" onClick={() => { closeOracleModal(); window.open('https://twitter.com/ProphetPufiya', '_blank'); }}>
                      [MOBILE] FOLLOW PROPHET
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="boot-screen">
      {bootMessages.map((message, index) => (
        <div key={index} className={`boot-line ${message.class}`}>
          {message.text}
        </div>
      ))}
    </div>
  );
};

export default BootScreen;