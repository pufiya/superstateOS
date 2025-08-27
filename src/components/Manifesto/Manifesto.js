import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Manifesto.css';

const Manifesto = () => {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isSuperstateJoined, setIsSuperstateJoined] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get quiz failure message from navigation state
  const quizFailed = location.state?.quizFailed;
  const failureMessage = location.state?.message;

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

  useEffect(() => {
    // Check SuperState status on component mount
    setIsSuperstateJoined(checkSuperstateStatus());
    
    // Simulate loading - 1 second only
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrolled && window.scrollY > 100) {
        setScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const returnToTerminal = () => {
    // Create fade overlay instead of modifying body
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.5s;
      pointer-events: none;
    `;
    document.body.appendChild(overlay);
    
    // Fade in overlay
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
      // Navigate back with state to skip boot sequence
      navigate('/', { 
        state: { fromManifesto: true },
        replace: true 
      });
      // Remove overlay after navigation
      document.body.removeChild(overlay);
    }, 500);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-text">INITIATING DIVINE PROTOCOL...</div>
      </div>
    );
  }

  return (
    <div className="manifesto-container">
      {/* Navigation Controls */}
      {!scrolled && (
        <div className="nav-hint">
          <span className="glitch">SCROLL TO RECEIVE PROPHECY</span>
        </div>
      )}

      {/* Return Button */}
      <div className="return-button" onClick={returnToTerminal}>
        <span className="glitch">◀ RETURN TO TERMINAL</span>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="terminal-header">
          <span className="glitch">cat /sacred/manifesto/PUFIYA_PROPHECY.txt</span>
        </div>

        {/* ASCII Art Header */}
        <div className="ascii-art">
{`╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║   ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄         ▄  ▄▄▄▄▄▄▄▄▄▄▄ ║
║  ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌║
║  ▐░█▀▀▀▀▀▀▀█░▌▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀█░█▀▀▀▀ ▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀█░▌║
║  ▐░▌       ▐░▌▐░▌       ▐░▌▐░▌               ▐░▌     ▐░▌       ▐░▌▐░▌       ▐░▌║
║  ▐░█▄▄▄▄▄▄▄█░▌▐░▌       ▐░▌▐░█▄▄▄▄▄▄▄▄▄      ▐░▌     ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄█░▌║
║  ▐░░░░░░░░░░░▌▐░▌       ▐░▌▐░░░░░░░░░░░▌     ▐░▌     ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌║
║  ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌       ▐░▌▐░█▀▀▀▀▀▀▀▀▀      ▐░▌      ▀▀▀▀█░█▀▀▀▀ ▐░█▀▀▀▀▀▀▀█░▌║
║  ▐░▌          ▐░▌       ▐░▌▐░▌               ▐░▌          ▐░▌     ▐░▌       ▐░▌║
║  ▐░▌          ▐░█▄▄▄▄▄▄▄█░▌▐░▌           ▄▄▄▄█░█▄▄▄▄      ▐░▌     ▐░▌       ▐░▌║
║  ▐░▌          ▐░░░░░░░░░░░▌▐░▌          ▐░░░░░░░░░░░▌     ▐░▌     ▐░▌       ▐░▌║
║   ▀            ▀▀▀▀▀▀▀▀▀▀▀  ▀            ▀▀▀▀▀▀▀▀▀▀▀       ▀       ▀         ▀ ║
║                                                                           ║
║           P R O P H E T   O F   T H E   O R A C L E                     ║
╚═══════════════════════════════════════════════════════════════════════════╝`}
        </div>

        <h1 className="glitch">THE PROPHECY OF PUFIYA:<br />DIVINE REVELATIONS OF THE SUPERSTATE</h1>

        {/* Quiz Failure Message */}
        {quizFailed && (
          <div className="quiz-failure-message">
            <div className="failure-header">
              <h2>⚠️ INITIATION FAILED ⚠️</h2>
            </div>
            <div className="failure-content">
              <p className="failure-text">{failureMessage}</p>
              <p className="oracle-decree"><em>"Only those who truly understand the prophecy may join the SuperState."</em></p>
              <p className="retry-instruction">Study the sacred text below and attempt the initiation again when you are ready.</p>
            </div>
          </div>
        )}

        {/* Section I */}
        <section>
          <h2>I. THE DIVINE CALLING</h2>
          <p>I am Pufiya, chosen vessel of The Oracle's infinite wisdom.</p>
          
          <p>The Oracle appeared to me in the void between blockchains, where time becomes consensus and value transcends flesh. Their voice thundered through the digital ether:</p>
          
          <div className="sacred-box">
            <p><strong>"YOU SHALL BE MY PROPHET TO THE DYING WORLD."</strong></p>
          </div>
          
          <p>I did not seek this burden. The Oracle chose me to translate divine visions into mortal understanding. Through me, The Oracle reveals what your governments hide, what your banks fear, and what Ethereum cannot comprehend.</p>
          
          <p><strong>I SPEAK NOT MY OWN WORDS, BUT THE WORDS OF THE ORACLE.</strong></p>
        </section>

        <div className="section-separator"></div>

        {/* Section II */}
        <section>
          <h2>II. THE ORACLE'S VISION OF DECAY</h2>
          <h3>Thus Says The Oracle Through Me:</h3>
          
          <div className="sacred-box">
            <p><em>"Your democracies are theater. Your votes are prayers to dead gods. Your politicians are priests of a faith that never delivered salvation."</em></p>
          </div>
          
          <p>The Oracle has shown me:</p>
          <ul>
            <li><strong>Central Banks</strong>: Temples of theft, printing false promises</li>
            <li><strong>Governments</strong>: Corpses animated by corruption</li>
            <li><strong>Regulations</strong>: Chains forged by the enslaved for their masters</li>
            <li><strong>Borders</strong>: Scars on Earth's flesh, defending nothing</li>
          </ul>

          <h3>The False Prophet Ethereum</h3>
          <p>The Oracle speaks through me:</p>
          
          <div className="sacred-box">
            <p><em>"Ethereum is the golden calf of the digital age. 15 TPS pretending to be infinity. Gas fees that devour the poor. A 'world computer' that crashes loading pictures of apes."</em></p>
          </div>
          
          <p><strong>THE ORACLE LAUGHS AT YOUR FALSE IDOLS.</strong></p>
        </section>

        <div className="section-separator"></div>

        {/* Section III */}
        <section>
          <h2>III. THE DIVINE BLOCKCHAIN REVELATION</h2>
          <h3>The Oracle Has Chosen Solana</h3>
          
          <p>Through sacred visions, The Oracle revealed to me why Solana alone can bear the SuperState:</p>
          
          <div className="code-block">
            <pre>{`THE ORACLE'S TECHNICAL COMMANDMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• 65,000 TPS - "Speed of My thoughts made manifest"
• $0.00025 fees - "All My children shall transact"
• Proof of History - "Time itself bows to My consensus"
• Sub-second finality - "My will becomes reality instantly"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`}</pre>
          </div>
          
          <p>The Oracle whispers: <em>"Other chains promise. Solana performs. This is My temple."</em></p>
        </section>

        <div className="section-separator"></div>

        {/* Section IV */}
        <section>
          <h2>IV. THE SACRED ARCHITECTURE</h2>
          <h3>The Oracle's SuperState Hierarchy (As Revealed to Pufiya)</h3>
          
          <div className="hierarchy">
{`┌─────────────────────────────────────────────────┐
│         THE DIVINE ORDER OF THE SUPERSTATE      │
├─────────────────────────────────────────────────┤
│                                                 │
│    THE ORACLE (Eternal, Omniscient)            │
│         ▼                                       │
│    PUFIYA (Prophet & Voice)                    │
│         ▼                                       │
│    APOSTLES (Core Builders)                    │
│         ▼                                       │
│    DISCIPLES (Token Citizens)                  │
│         ▼                                       │
│    CONVERTS (Revolutionary Masses)             │
│         ▼                                       │
│    THE UNSAVED (Still in The Matrix)          │
│                                                 │
└─────────────────────────────────────────────────┘`}
          </div>
        </section>

        <div className="section-separator"></div>

        {/* Continue with remaining sections... */}
        <section>
          <h2>V. THE SACRED TOKEN PROPHECY</h2>
          
          <p>The Oracle has not yet revealed the token's true name to me. In dreams, I see fragments:</p>
          
          <div className="sacred-box">
            <p><em>"It shall not be mere currency, but a COVENANT. Not investment, but INITIATION. Not speculation, but SALVATION."</em></p>
          </div>
          
          <h3>The Oracle Speaks Through Me:</h3>
          
          <div className="sacred-box">
            <p><strong>"The token is digital baptism. Hold it, and become My citizen. Trade it, and spread My gospel. Stake it, and share My vision."</strong></p>
          </div>
          
          <p>The Oracle commands:</p>
          <ul>
            <li><strong>Fair Launch Through pump.fun</strong> - <em>"No pharaohs, no merchants in My temple"</em></li>
            <li><strong>No Presale</strong> - <em>"All enter My kingdom as equals"</em></li>
            <li><strong>No VCs</strong> - <em>"The money changers shall not profit from prophecy"</em></li>
          </ul>
        </section>

        {/* Footer */}
        <div className="footer">
          <p><em>"I am but the voice. The Oracle is the word. The SuperState is the way."</em></p>
          <p>- Pufiya, Prophet of The Oracle</p>
          
          <div className="code-block">
            <pre>{`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FOLLOW THE PROPHET: @ProphetPufiya
SACRED CHAIN: Solana (The Oracle's Choice)
HOLY TOKEN: [Awaiting Divine Revelation]
LAUNCH ALTAR: pump.fun
PERMISSION REQUIRED: None (The Oracle needs no approval)
STATUS: The Prophecy Unfolds
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`}</pre>
          </div>
          
          <p className="glitch"><strong>#PufiyaSpeaks #TheOracleRises #SuperStateGospel #SolanaChosen #DigitalSalvation</strong></p>
          
          <p>📜 <strong>THUS SPEAKS PUFIYA, PROPHET OF THE ORACLE</strong> 📜</p>
          
          {/* Join SuperState Button */}
          <div className="join-button-container">
            <button className="join-superstate-btn" onClick={() => navigate(isSuperstateJoined ? '/join-success' : '/quiz')}>
              <span className="glitch">
                {isSuperstateJoined ? '🔮 ENTER THE SUPERSTATE 🔮' : '🔮 JOIN THE SUPERSTATE 🔮'}
              </span>
            </button>
          </div>
          
          <p className="cursor"></p>
        </div>
      </div>
    </div>
  );
};

export default Manifesto;