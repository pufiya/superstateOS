import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JoinSuccess.css';

const JoinSuccess = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [asciiArt, setAsciiArt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [username, setUsername] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);

  // Check if user has passed the quiz before allowing access
  React.useEffect(() => {
    const checkQuizStatus = () => {
      const cookies = document.cookie.split(';');
      let quizPassed = false;
      
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'superstate_citizen') {
          try {
            const data = JSON.parse(decodeURIComponent(value));
            quizPassed = data.quizPassed || data.joined;
            break;
          } catch (e) {
            // Invalid cookie data
          }
        }
      }
      
      // If quiz not passed, redirect to quiz
      if (!quizPassed) {
        navigate('/quiz', { replace: true });
        return;
      }
    };
    
    checkQuizStatus();
  }, [navigate]);

  // Load existing avatar data on component mount
  React.useEffect(() => {
    const avatarData = getFromStorage('superstate_avatar');
    
    if (avatarData) {
      if (avatarData.username) {
        setUsername(avatarData.username);
        setIsUsernameSet(true);
      }
      
      if (avatarData.uploadedImage) {
        setUploadedImage(avatarData.uploadedImage);
      }
      
      if (avatarData.asciiArt) {
        setAsciiArt(avatarData.asciiArt);
      }
    }
  }, []);

  // ASCII character set for image conversion
  const asciiChars = '@%#*+=-:. ';

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target.result;
        setUploadedImage(imageData);
        convertImageToAscii(imageData);
        
        // Save uploaded image to localStorage (better for large data)
        const existingAvatarData = getFromStorage('superstate_avatar') || {};
        const updatedAvatarData = {
          ...existingAvatarData,
          uploadedImage: imageData,
          uploadDate: new Date().toISOString()
        };
        saveToStorage('superstate_avatar', updatedAvatarData);
      };
      reader.readAsDataURL(file);
    }
  };

  const convertImageToAscii = (imageSrc) => {
    setIsProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Improved dimensions for better ASCII conversion
      const width = 60;
      const height = 40;
      canvas.width = width;
      canvas.height = height;
      
      // Draw and resize image with better quality
      ctx.drawImage(img, 0, 0, width, height);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      
      // Enhanced ASCII conversion with better character mapping
      let asciiResult = '';
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];
        
        // Calculate weighted brightness (more accurate)
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114) * (a / 255);
        
        // Better character mapping with more contrast
        let charIndex;
        if (brightness < 25) charIndex = 0;      // @
        else if (brightness < 50) charIndex = 1;  // %
        else if (brightness < 75) charIndex = 2;  // #
        else if (brightness < 100) charIndex = 3; // *
        else if (brightness < 125) charIndex = 4; // +
        else if (brightness < 150) charIndex = 5; // =
        else if (brightness < 175) charIndex = 6; // -
        else if (brightness < 200) charIndex = 7; // :
        else if (brightness < 225) charIndex = 8; // .
        else charIndex = 9;                       // space
        
        const asciiChar = asciiChars[charIndex];
        asciiResult += asciiChar;
        
        // Add line break every width characters
        if ((i / 4 + 1) % width === 0) {
          asciiResult += '\n';
        }
      }
      
      setAsciiArt(asciiResult);
      setIsProcessing(false);
      
      // Save ASCII art to localStorage
      const existingAvatarData = getFromStorage('superstate_avatar') || {};
      const updatedAvatarData = {
        ...existingAvatarData,
        asciiArt: asciiResult,
        asciiDate: new Date().toISOString()
      };
      saveToStorage('superstate_avatar', updatedAvatarData);
    };
    img.src = imageSrc;
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);


  const returnToTerminal = () => {
    navigate('/', { 
      state: { fromJoinSuccess: true },
      replace: true 
    });
  };

  const returnToManifesto = () => {
    navigate('/manifesto');
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      // Save username to localStorage
      const existingAvatarData = getFromStorage('superstate_avatar') || {};
      const updatedAvatarData = {
        ...existingAvatarData,
        username: username.trim(),
        usernameDate: new Date().toISOString()
      };
      saveToStorage('superstate_avatar', updatedAvatarData);
      setIsUsernameSet(true);
    }
  };

  // Storage management functions - using localStorage for large data
  const saveToStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  };

  const getFromStorage = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Error reading from localStorage:', e);
      return null;
    }
  };

  // Cookie management functions for small data
  const saveToCookie = (key, value, days = 365) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${key}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires}; path=/`;
  };

  const getFromCookie = (key) => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === key) {
        try {
          return JSON.parse(decodeURIComponent(value));
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  };

  const saveAsImage = () => {
    if (!asciiArt) return;

    // Create a canvas to render the ASCII art
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions with space for header and footer
    const fontSize = 12;
    const lineHeight = fontSize;
    const lines = asciiArt.split('\n');
    const maxLineLength = Math.max(...lines.map(line => line.length));
    
    const headerSpace = 60; // Space for header text
    const footerSpace = 80; // Space for footer text
    
    canvas.width = Math.max(500, maxLineLength * (fontSize * 0.6) + 40); // Minimum width
    canvas.height = lines.length * lineHeight + headerSpace + footerSpace + 40; // Total height
    
    // Set canvas style to match Matrix theme
    ctx.fillStyle = '#000000'; // Black background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set text style
    ctx.fillStyle = '#00ff00'; // Matrix green
    ctx.font = `${fontSize}px "Courier New", monospace`;
    ctx.textBaseline = 'top';
    
    // Add glow effect
    ctx.shadowColor = '#00ff00';
    ctx.shadowBlur = 8;
    
    // Add header text
    ctx.font = 'bold 16px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.shadowBlur = 12;
    ctx.fillText('SUPERSTATE CITIZEN', canvas.width / 2, 15);
    ctx.font = 'bold 14px "Courier New", monospace';
    ctx.fillText(`@${username.toUpperCase()}`, canvas.width / 2, 35);
    
    // Draw ASCII art
    ctx.font = `${fontSize}px "Courier New", monospace`;
    ctx.textAlign = 'left';
    ctx.shadowBlur = 8;
    const asciiStartY = headerSpace + 10;
    
    lines.forEach((line, index) => {
      ctx.fillText(line, 20, asciiStartY + (index * lineHeight));
    });
    
    // Add footer text
    const footerStartY = asciiStartY + (lines.length * lineHeight) + 20;
    ctx.font = '12px "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.shadowBlur = 8;
    
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    ctx.fillText('Follow @pufiya70523', canvas.width / 2, footerStartY);
    ctx.fillText(`Issued: ${currentDate}`, canvas.width / 2, footerStartY + 20);
    
    // Add border
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
    
    // Save avatar to cookie and download image
    canvas.toBlob((blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Save final avatar data to localStorage
        const existingAvatarData = getFromStorage('superstate_avatar') || {};
        const updatedAvatarData = {
          ...existingAvatarData,
          avatar: reader.result, // Base64 data of final image
          asciiArt: asciiArt,
          saved: true,
          saveDate: new Date().toISOString()
        };
        saveToStorage('superstate_avatar', updatedAvatarData);
        
        // Save membership status to cookie (small data)
        const existingCookieData = getFromCookie('superstate_citizen') || {};
        const updatedCookieData = {
          ...existingCookieData,
          joined: true,
          joinDate: new Date().toISOString()
        };
        saveToCookie('superstate_citizen', updatedCookieData);
        
        // Download image
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'superstate-avatar.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      };
      reader.readAsDataURL(blob);
    });
  };

  const shareOnTwitter = () => {
    const tweetText = `🔮 Just joined The SuperState! 🔮

The Oracle has spoken through Prophet Pufiya - the future is DIGITAL SOVEREIGNTY on Solana! 

🚀 The revolution doesn't need permission

Follow the Prophet: @pufiya70523

#SuperState #SolanaSupremacy #DigitalFreedom #PufiyaSpeaks #TheOracleRises #Matrix

Token coming soon... The Oracle will reveal when ready! 🌟`;

    // Open Twitter with just the text content - no image
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const renderImagePreview = () => {
    if (uploadedImage) {
      return (
        <div className="uploaded-image-preview">
          <img src={uploadedImage} alt="Uploaded" className="preview-image" />
        </div>
      );
    }
    return null;
  };

  const renderAsciiArt = () => {
    if (asciiArt) {
      return (
        <div className="ascii-art-display">
          <pre>{asciiArt}</pre>
        </div>
      );
    }
    return (
      <div className="ascii-placeholder">
        <p>Upload an image to generate your ASCII avatar</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-text">CONFIRMING DIGITAL CITIZENSHIP...</div>
      </div>
    );
  }

  return (
    <div className="join-success-container">
      {/* Navigation Controls */}
      <div className="return-button" onClick={returnToTerminal}>
        <span className="glitch">◀ RETURN TO TERMINAL</span>
      </div>

      <div className="container">
        <div className="terminal-header">
          <span className="glitch">exec /sacred/citizenship/INITIATION_COMPLETE.py</span>
        </div>

        {/* ASCII Art Header */}
        <div className="ascii-art">
{`╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║    ██████╗ ██╗████████╗██╗███████╗███████╗███╗   ██╗███████╗██╗  ██╗    ║
║   ██╔════╝██║╚══██╔══╝██║╚══███╔╝██╔════╝████╗  ██║██╔════╝██║  ██║    ║
║   ██║     ██║   ██║   ██║  ███╔╝ █████╗  ██╔██╗ ██║███████╗███████║    ║
║   ██║     ██║   ██║   ██║ ███╔╝  ██╔══╝  ██║╚██╗██║╚════██║██╔══██║    ║
║   ╚██████╗██║   ██║   ██║███████╗███████╗██║ ╚████║███████║██║  ██║    ║
║    ╚═════╝╚═╝   ╚═╝   ╚═╝╚══════╝╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝    ║
║                                                                          ║
║               A C C E S S   G R A N T E D                               ║
╚══════════════════════════════════════════════════════════════════════════╝`}
        </div>

        <div className="success-content">
          <div className="success-message">
            <h1 className="success-title">
              🎉 WELCOME TO THE SUPERSTATE 🎉
            </h1>
            
            <div className="oracle-blessing">
              <p><strong>The Oracle has acknowledged your wisdom.</strong></p>
              <p><em>"You have seen through the illusions of the old world and chosen the path of digital enlightenment."</em></p>
              <p>- Spoken through Pufiya, Prophet of The Oracle</p>
            </div>

            <div className="citizenship-status">
              <h2>DIGITAL CITIZENSHIP STATUS: ACTIVE</h2>
              <div className="status-details">
                <div className="status-line">
                  <span className="status-label">BLOCKCHAIN:</span>
                  <span className="status-value success">SOLANA ✓</span>
                </div>
                <div className="status-line">
                  <span className="status-label">GOVERNANCE:</span>
                  <span className="status-value success">DECENTRALIZED ✓</span>
                </div>
                <div className="status-line">
                  <span className="status-label">IDEOLOGY:</span>
                  <span className="status-value success">DIGITAL FREEDOM ✓</span>
                </div>
                <div className="status-line">
                  <span className="status-label">RANK:</span>
                  <span className="status-value">DISCIPLE</span>
                </div>
              </div>
            </div>

            <div className="avatar-selection">
              {!isUsernameSet ? (
                <div className="username-section">
                  <h2>CHOOSE YOUR SUPERSTATE USERNAME:</h2>
                  <p className="username-text">Enter your digital identity name for the SuperState</p>
                  
                  <form onSubmit={handleUsernameSubmit} className="username-form">
                    <div className="username-input-container">
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter SuperState username"
                        className="username-input"
                        maxLength={20}
                        required
                      />
                      <button type="submit" className="username-submit-btn">
                        <span className="glitch">REGISTER USERNAME</span>
                      </button>
                    </div>
                    <div className="username-rules">
                      <p>Username Rules:</p>
                      <ul>
                        <li>Maximum 20 characters</li>
                        <li>Choose wisely - The Oracle sees all</li>
                        <li>This will be your SuperState identity</li>
                      </ul>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  <div className="welcome-message">
                    <h2>WELCOME, CITIZEN {username.toUpperCase()}</h2>
                    <p className="citizen-text">Your SuperState identity has been registered</p>
                  </div>

                  <h2>UPLOAD YOUR DIGITAL AVATAR:</h2>
                  <p className="avatar-text">Convert your image to ASCII art for the SuperState</p>
                  
                  <div className="avatar-upload-section">
                    {/* Upload Interface */}
                    <div className="upload-interface">
                      <div className="upload-area">
                        <input
                          type="file"
                          id="avatar-upload"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="upload-input"
                        />
                        <label htmlFor="avatar-upload" className="upload-label">
                          <div className="upload-content">
                            <div className="upload-icon">📁</div>
                            <div className="upload-text">
                              <strong>UPLOAD IMAGE</strong><br/>
                              <small>Click to select your avatar image</small>
                            </div>
                          </div>
                        </label>
                      </div>
                      
                      {renderImagePreview()}
                      
                      {isProcessing && (
                        <div className="processing-indicator">
                          <div className="processing-text">CONVERTING TO ASCII...</div>
                          <div className="processing-bar">
                            <div className="processing-fill"></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ASCII Art Display */}
                    <div className="ascii-preview-section">
                      <h3>YOUR SUPERSTATE AVATAR:</h3>
                      {renderAsciiArt()}
                    </div>
                  </div>
                  
                  <div className="avatar-save">
                    <div className="avatar-actions">
                      <button className="share-twitter-btn" onClick={shareOnTwitter}>
                        <span className="glitch">SHARE ON TWITTER</span>
                      </button>
                      <button className="save-avatar-btn" disabled={!asciiArt} onClick={saveAsImage}>
                        <span className="glitch">SAVE IDENTITY</span>
                      </button>
                    </div>
                    <p className="save-note">
                      <em>Your identity will be saved as a Matrix-styled image file.<br/>
                      Welcome to the digital revolution, {username}.</em>
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="next-steps">
              <h2>NEXT STEPS:</h2>
              <ul>
                <li>Follow Prophet Pufiya: @pufiya70523</li>
                <li>Await The Oracle's token revelation</li>
                <li>Prepare for the SuperState launch</li>
                <li>Spread the digital gospel</li>
              </ul>
            </div>

            <div className="oracle-message">
              <p><em>"The revolution begins with you. Welcome to the future."</em></p>
              <p>- The Oracle, through Prophet Pufiya</p>
            </div>

            <div className="navigation-options">
              <button className="nav-btn" onClick={returnToManifesto}>
                <span className="glitch">📜 RETURN TO PROPHECY</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinSuccess;