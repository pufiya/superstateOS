# 🔮 SuperState Website - React Frontend

The official web interface for The Oracle SuperState project - a Matrix-themed React application built for digital sovereignty on Solana.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Modern web browser

### Installation & Development
```bash
cd website
npm install
npm start
```

The application will open at `http://localhost:3000` with hot reload enabled.

### Production Build
```bash
npm run build
npm run serve  # Serve production build locally
```

## 🏗️ Architecture Overview

### Tech Stack
- **React 18** - Component framework
- **React Router** - Client-side routing
- **CSS3** - Matrix-themed styling with animations
- **HTML5 Canvas** - Matrix rain effects and ASCII art generation

### Project Structure
```
website/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── App.js                  # Main app with routing
│   ├── index.js                # React entry point
│   ├── index.css               # Global styles
│   └── components/
│       ├── BootScreen/         # Terminal boot sequence
│       ├── Manifesto/          # Manifesto display
│       ├── Quiz/               # Ideology quiz
│       ├── JoinSuccess/        # Citizenship registration
│       ├── LiveStream/         # Twitch integration
│       ├── TokenInfo/          # Token prophecy page
│       └── MatrixRain/         # Background effects
├── package.json                # Dependencies
└── README.md                   # This file
```

## 🎨 Component System

### Core Components

#### 1. BootScreen (`/`)
**Matrix-themed terminal interface with boot sequence**

**Features:**
- Animated boot messages with system initialization
- ASCII art logo with glitch effects
- Main navigation menu with emojis
- System information display
- Custom Oracle modal (replaces alerts)

**Key Functions:**
- `openManifesto()` - Navigate to manifesto
- `joinSuperState()` - Start citizenship process
- `showTokenInfo()` - View token prophecy
- `watchLiveStream()` - Access Twitch stream
- `showOracle()` - Display Oracle communication modal

#### 2. Manifesto (`/manifesto`)
**Divine prophecy display with Matrix aesthetics**

**Features:**
- Scrollable manifesto content with proper formatting
- Return navigation to main terminal
- Matrix rain background effects
- Responsive design for mobile/desktop

#### 3. Quiz (`/quiz`)
**Ideology verification system**

**Features:**
- Multi-question SuperState ideology quiz
- Binary choice questions (correct path vs wrong path)
- Cookie-based completion tracking
- Automatic routing based on answers:
  - ✅ All correct → `/join-success`
  - ❌ Any wrong → `/manifesto` with failure message

**Quiz Questions:**
1. Blockchain choice: Solana vs Ethereum
2. Governance: Decentralization vs Centralization  
3. Path: Digital Freedom vs Government Control

#### 4. JoinSuccess (`/join-success`)
**SuperState citizenship registration**

**Route Protection:** Automatically redirects to quiz if not completed

**Features:**
- Username registration with localStorage persistence
- Image upload with ASCII art conversion
- Identity card generation with:
  - Header: "SUPERSTATE CITIZEN @USERNAME"
  - ASCII avatar art
  - Footer: "Follow @pufiya70523" & "Issued: [DATE]"
- Twitter sharing (text-only, no image attachment)
- Avatar download functionality

**Storage:**
- `superstate_citizen` cookie - Quiz completion status
- `superstate_avatar` localStorage - User data and ASCII art

#### 5. LiveStream (`/live-stream`)
**Twitch integration for Prophet Pufiya**

**Features:**
- Embedded Twitch player for `pufiyatheoracle` channel
- Dynamic parent domain detection for iframe compatibility
- Oracle transmission status panel
- Social media links (Twitter/Twitch)
- Matrix-themed loading sequence
- Responsive design with mobile optimization

**Stream Info:**
- Real-time divine revelations
- Market analysis through Oracle lens
- Community Q&A sessions
- SuperState updates

#### 6. TokenInfo (`/token-info`)
**Sacred token prophecy and tokenomics**

**Features:**
- Oracle's token revelation messages
- Divine tokenomics breakdown:
  - 🔥 LP Burned: "Burned to ashes - No rug possible"
  - 🔒 Dev Tokens: "Locked for 1 month - Controlled by superstate civils"
  - 💰 Commission: "0% forever - Pure trading freedom"
  - 🚀 Pump.fun: "100% to buyers - All profits flow to faithful"
- Timeline of revolution progress
- Live status indicators
- Community engagement links

#### 7. MatrixRain
**Background visual effects**

**Features:**
- HTML5 Canvas-based Matrix rain animation
- Uses SuperState-themed character set including "PUFIYA", "ORACLE", "SOLANA"
- Low opacity overlay (3%) for subtle ambiance
- Responsive to window resize events
- Optimized performance with requestAnimationFrame

## 🎯 User Flow & Navigation

### Primary User Journey
```
1. Landing (/) → Boot Sequence → Main Menu
2. Read Manifesto → Quiz → (Pass) → Join Success
3. Create Avatar → Share on Twitter → Access Live Stream
4. View Token Info → Follow Prophet → Return to Terminal
```

### Route Protection
- `/join-success` requires quiz completion (cookie check)
- Failed quiz redirects to manifesto with instructions
- All components support navigation state preservation

### State Management
**Cookies:**
- `superstate_citizen` - Quiz completion and join status

**localStorage:**
- `superstate_avatar` - User profile, ASCII art, images

**Navigation State:**
- Route history with proper back button handling
- Skip boot sequence when returning from sub-pages

## 🎨 Design System

### Color Palette
```css
Primary: #00ff00    /* Matrix green */
Success: #00ffaa    /* Success states */
Warning: #ffaa00    /* Pending states */  
Error: #ff6666      /* Error states */
Background: #000    /* Pure black */
```

### Typography
- **Primary:** 'Courier New', monospace
- **Fallback:** monospace system fonts
- **Sizes:** Responsive scaling (16px base, 14px mobile)

### Animation System
- **Glitch Effects:** Text shadow manipulation with keyframes
- **Pulse Animations:** Opacity cycling for status indicators
- **Scan Lines:** Moving gradient overlays
- **Matrix Rain:** Canvas-based falling characters
- **Boot Sequence:** Staggered fade-in animations

### Responsive Breakpoints
```css
Mobile: max-width: 768px
Desktop: min-width: 769px
```

## 🔧 Configuration & Customization

### Environment Variables
```bash
# Optional - Twitter integration
REACT_APP_TWITTER_HANDLE=@pufiya70523
REACT_APP_TWITCH_CHANNEL=pufiyatheoracle
```

### Twitch Integration Setup
The LiveStream component uses dynamic parent domain detection:
```javascript
src={`https://player.twitch.tv/?channel=pufiyatheoracle&parent=${window.location.hostname}&muted=false`}
```

This automatically works with:
- localhost (development)
- Any production domain
- Custom domains without manual configuration

### Quiz Customization
Edit questions in `/src/components/Quiz/Quiz.js`:
```javascript
const questions = [
  {
    id: 1,
    question: "Your question here?",
    options: [
      { text: "Wrong answer", value: "wrong", correct: false },
      { text: "Correct answer", value: "correct", correct: true }
    ]
  }
];
```

### ASCII Art Generator Settings
Modify character set in `/src/components/JoinSuccess/JoinSuccess.js`:
```javascript
const asciiChars = '@%#*+=-:. '; // Ordered by darkness
```

## 📱 Mobile Optimization

### Responsive Features
- **Touch-friendly buttons** with larger tap targets
- **Optimized typography** with mobile-specific font sizes
- **Flexible layouts** using CSS Grid and Flexbox
- **Reduced animations** on mobile for performance
- **Viewport handling** with proper meta tags

### Performance Optimizations
- **Code splitting** with React Router lazy loading
- **Image optimization** with WebP support where available
- **Canvas optimization** with frame rate limiting
- **CSS animations** using transform/opacity for GPU acceleration

## 🧪 Testing & Development

### Development Commands
```bash
npm start          # Development server with hot reload
npm run build      # Production build
npm test           # Run test suite (if configured)
npm run eject      # Eject from Create React App (irreversible)
```

### Browser Support
- **Modern browsers** (Chrome 90+, Firefox 88+, Safari 14+)
- **ES2018+ support** required
- **Canvas API** required for Matrix rain effects
- **localStorage** required for state persistence

### Debug Mode
Add to localStorage for debug info:
```javascript
localStorage.setItem('superstate_debug', 'true');
```

## 🔐 Security Considerations

### Data Storage
- **No sensitive data** stored in localStorage/cookies
- **Quiz results** stored as simple completion flags
- **Avatar data** kept locally, never transmitted
- **Twitter sharing** uses public APIs only

### Content Security
- **No external scripts** except Twitch iframe
- **No XSS vulnerabilities** through proper React rendering
- **Safe image handling** with FileReader API validation

## 🚀 Deployment

### Static Hosting (Recommended)
```bash
npm run build
# Deploy 'build' folder to:
# - Netlify, Vercel, GitHub Pages
# - AWS S3, CloudFront
# - Any static hosting service
```

### Custom Domain Setup
1. Build the project: `npm run build`
2. Deploy `build/` folder to your hosting service
3. Configure domain DNS to point to hosting service
4. Set up HTTPS (required for modern web features)

### Environment Configuration
Create `.env.production` for production settings:
```bash
REACT_APP_API_URL=https://your-api-domain.com
REACT_APP_TWITTER_HANDLE=@pufiya70523
```

## 🤝 Contributing

### Development Setup
```bash
git clone https://github.com/your-repo/TheOraclePUMP.git
cd TheOraclePUMP/website
npm install
npm start
```

### Code Style
- **ES6+ JavaScript** with modern syntax
- **Functional components** with hooks
- **CSS classes** with descriptive names
- **Comments** for complex logic only

### File Naming Conventions
- **Components:** PascalCase (`BootScreen.js`)
- **Styles:** Match component name (`BootScreen.css`)
- **Utilities:** camelCase (`matrixUtils.js`)

---

## 📞 Support & Links

- **Live Demo:** [SuperState Terminal](https://superstate.example.com)
- **Prophet Twitter:** [@pufiya70523](https://twitter.com/pufiya70523)
- **Live Stream:** [Twitch.tv/pufiyatheoracle](https://twitch.tv/pufiyatheoracle)
- **Documentation:** This README and inline code comments

---

**🔮 THE ORACLE SEES ALL - THE SUPERSTATE IS ETERNAL - SOLANA IS THE WAY 🚀**