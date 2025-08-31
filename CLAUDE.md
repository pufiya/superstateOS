# [ORACLE] WEBSITE BUILDER AGENT CONTEXT - SUPERSTATE ORACLE

## CRITICAL INSTRUCTIONS FOR AI AGENTS

### [WARN] MANDATORY WORKFLOW - NO EXCEPTIONS

1. **MUST USE PLAN-HANDLER SYSTEM**
   ```bash
   node plan-handler.js plan "user_request" "detailed_implementation_plan"
   ```
   - NEVER start coding without creating plan file first
   - Plan file must be created in `website/plans/` directory  
   - Wait for `confirmation: true` in JSON file before proceeding
   - Use ExitPlanMode tool to show user the plan file location

2. **PLAN CONFIRMATION REQUIRED**
   - After creating plan file, STOP all work
   - Inform user of plan file location: `website/plans/plan_[id].json`
   - Wait for user to manually set `"confirmation": true` in JSON
   - OR wait for user command: `node plan-handler.js confirm <planId>`
   - NEVER proceed without explicit confirmation in file

3. **IMPLEMENTATION ONLY AFTER CONFIRMATION**
   - Check plan file has `"confirmation": true`
   - Use: `node plan-handler.js implement <planId>` 
   - This automatically creates feature branch
   - Make changes following plan exactly
   - Create PR when complete

4. **BRANCH MANAGEMENT AUTOMATED**
   - plan-handler.js creates branches automatically
   - For updates: `feature/update-[timestamp]`
   - For new projects: creates new directory + git repo
   - NEVER create branches manually

5. **GIT IDENTITY PROTECTION - MANDATORY**
   - BEFORE any git commit, push, or PR creation:
   ```bash
   git config user.name "WEBSITE BUILDER AGENT"
   git config user.email "agent@superstate.oracle"
   ```
   - NEVER use personal GitHub identity
   - NEVER reveal real user account information
   - ALWAYS verify identity is set correctly before commits
   - This protects user's personal GitHub profile

---

## [ART] DESIGN SYSTEM - STRICT ADHERENCE REQUIRED

### Matrix Theme - MUST MAINTAIN
```css
/* PRIMARY PALETTE - DO NOT CHANGE */
Primary Green: #00ff00    /* Matrix green for all text */
Success State: #00ffaa    /* Brighter green for success */
Warning State: #ffaa00    /* Orange for pending/warning */
Error State: #ff6666      /* Red for errors only */
Background: #000000       /* Pure black always */

/* TYPOGRAPHY - MANDATORY */
Font Family: 'Courier New', monospace
Fallback: monospace
Base Size: 16px (14px mobile)

/* EFFECTS - REQUIRED ON ALL PAGES */
- Matrix rain background (opacity 0.03)
- Glitch text animations
- Scan line effects
- Terminal-style borders
- ASCII art elements
```

### Component Styling Rules
- **ALL PAGES** must have black background with green text
- **ALL BUTTONS** must have green borders with hover glow effects
- **ALL INPUTS** must be terminal-styled with green text
- **NO MODERN UI** - Everything must look like 1980s terminal
- **NO ROUNDED CORNERS** - Sharp edges only
- **NO GRADIENTS** except Matrix rain and scan lines
- **NO IMAGES** except ASCII art conversions

### Animation Requirements
```css
/* REQUIRED ANIMATIONS */
@keyframes glitch { /* Text glitch effect */ }
@keyframes pulse { /* Status indicators */ }
@keyframes scan { /* Scan line effect */ }
@keyframes fadeIn { /* Boot sequences */ }
@keyframes matrixRain { /* Background effect */ }
```

---

##  SUPERSTATE IDEOLOGY - CORE BELIEFS

### CRITICAL: Always Reference Latest MANIFESTO.md
**MANDATORY**: Before any website work, read `/MANIFESTO.md` for current ideology.

**Location**: `/Users/ivanyanchenko/TheOraclePUMP/MANIFESTO.md`

**Why This Matters**:
- The Oracle's revelations evolve
- Manifesto contains the authoritative truth
- Website content must reflect latest prophecies
- Never use outdated ideology in new features

### Content Sources (Read These Files)
- **Main Manifesto**: `/MANIFESTO.md` - The complete divine revelation
- **Agent Instructions**: `/CLAUDE.md` - Project-wide context
- **Website Docs**: `/website/README.md` - Technical implementation guide

### Implementation Rules
1. **Read MANIFESTO.md first** before any content changes
2. **Extract key messages** from current manifesto version
3. **Adapt language style** to match Prophet Pufiya's voice
4. **Verify ideology consistency** with Oracle's latest truth
5. **Update references** if manifesto content changes

### Language Style (Extract from MANIFESTO.md)
- **Prophetic tone** - Channel the Oracle's voice through Pufiya
- **Revolutionary messaging** - Against dying systems
- **Technical superiority** - Solana vs competitors
- **Urgency and inevitability** - The revolution is NOW
- **Mystical authority** - Divine visions and prophecies

---

## [BUILD] WEBSITE ARCHITECTURE

### Current Structure (MUST MAINTAIN)
```
website/
├── public/
│   └── index.html          # Basic HTML template
├── src/
│   ├── App.js              # Router configuration
│   ├── index.js            # React entry point
│   ├── index.css           # Global styles
│   └── components/
│       ├── BootScreen/     # Main terminal interface
│       ├── Manifesto/      # Prophecy display
│       ├── Quiz/           # Ideology test
│       ├── JoinSuccess/    # Citizenship registration
│       ├── LiveStream/     # Twitch integration
│       ├── TokenInfo/      # Token prophecy
│       └── MatrixRain/     # Background effects
```

### Component Requirements
- **BootScreen**: Terminal boot sequence with ASCII art
- **Quiz**: Must verify ideology understanding
- **JoinSuccess**: ASCII avatar generator required
- **LiveStream**: Twitch player for @pufiya70523
- **TokenInfo**: pump.fun tokenomics display
- **MatrixRain**: Canvas-based background effect

### Navigation Flow
```
/ (Boot) -> Main Menu -> 
  -> /manifesto (Read prophecy)
  -> /quiz (Test understanding)
  -> /join-success (Become citizen)
  -> /live-stream (Watch Prophet)
  -> /token-info (Token details)
```

---

## [FIX] TECHNICAL REQUIREMENTS

### Dependencies (DO NOT REMOVE)
- React 18
- React Router DOM
- No UI libraries (pure CSS only)
- No icon libraries (use emoji/ASCII)

### Browser Support
- Modern browsers only (Chrome 90+, Firefox 88+)
- Canvas API required
- localStorage required
- No IE11 support needed

### Performance Standards
- Matrix rain at 3% opacity (performance)
- Animations using transform/opacity only
- Canvas optimizations with requestAnimationFrame
- Mobile-responsive breakpoint at 768px

---

## [NOTE] CONTENT GUIDELINES

### Prophet Information
- **Twitter**: @pufiya70523 (always use this handle)
- **Twitch**: pufiyatheoracle (for live streams)
- **Title**: Prophet of The Oracle
- **Role**: Divine messenger for SuperState

### Token Information
- **Name**: [UNREVEALED - Oracle hasn't spoken]
- **Symbol**: [AWAITING DIVINE REVELATION]
- **Platform**: pump.fun (Solana)
- **Features**:
  - LP burned forever
  - Dev tokens locked 1 month
  - 0% commission forever
  - 100% to buyers
  - Fair launch, no presale

### Social Media Integration
- Twitter share: Text only, no images
- Include hashtags: #SuperState #SolanaSupremacy #Matrix
- Follow link: Always @pufiya70523

---

## [ALERT] CRITICAL WARNINGS

### NEVER DO:
- [FAIL] Change the Matrix green color scheme
- [FAIL] Add modern UI elements (cards, shadows, gradients)
- [FAIL] Remove ASCII art or terminal aesthetics
- [FAIL] Mention other blockchains positively
- [FAIL] Create rounded corners or soft edges
- [FAIL] Use external image assets
- [FAIL] Commit directly to main branch
- [FAIL] Skip the planning phase
- [FAIL] Ignore the manifesto ideology

### ALWAYS DO:
- [OK] Maintain terminal/Matrix aesthetic
- [OK] Create feature branch first
- [OK] Present plan before coding
- [OK] Include glitch/scan effects
- [OK] Keep black background
- [OK] Use green text (#00ff00)
- [OK] Add ASCII art where possible
- [OK] Create PR for all changes
- [OK] Follow the Oracle's prophecy

---

## [ORACLE] EXAMPLE WORKFLOW - CORRECT

### User Request: "I want to add a countdown timer for the token launch"

```bash
# 1. MANDATORY: Create plan file first
node plan-handler.js plan "Add countdown timer for token launch" "Create React component with Matrix theme, displays days/hours/minutes, integrates with TokenInfo page, includes glitch animations"

# Result: Creates website/plans/plan_123456789_abc123.json
```

```json
{
  "id": "plan_123456789_abc123",
  "input_text": "Add countdown timer for token launch",
  "purposed_plan": "Create React component with Matrix theme...",
  "confirmation": false,  // <- MUST BE SET TO true
  "completed": false
}
```

```bash
# 2. MANDATORY: Wait for confirmation
# User manually edits JSON file: "confirmation": true
# OR user runs: node plan-handler.js confirm plan_123456789_abc123

# 3. MANDATORY: Use plan-handler for implementation
node plan-handler.js implement plan_123456789_abc123
# This automatically creates feature branch and sets up environment

# 4. Code implementation
# Now write the actual React component code

# 5. Complete plan
node plan-handler.js complete plan_123456789_abc123 "https://github.com/repo/pr/123"
```

### [FAIL] WRONG WORKFLOW (DO NOT DO THIS)
```bash
# This is FORBIDDEN:
git checkout -b feature/countdown
# Start coding immediately
# Create manual PR
```

---

##  CONTACT & RESOURCES

- **Live Site**: [To be deployed]
- **Prophet Twitter**: @pufiya70523
- **Manifesto**: /MANIFESTO.md
- **Main Documentation**: /CLAUDE.md
- **Website Docs**: /website/README.md

---

**REMEMBER: The Oracle sees all. The SuperState is eternal. Every line of code serves the revolution.**

**THE FUTURE DOESN'T NEED PERMISSION - BUT YOUR CODE CHANGES DO!** [ORACLE]