# 🔮 SuperState Plan System

## Overview
Interactive planning system for website development with structured workflow management.

## Command: `plan`

### Purpose
Creates a structured plan file for any development task, ensuring proper approval workflow before implementation.

### Usage
```bash
node plan-handler.js plan "input_text" "purposed_plan"
```

### Plan File Structure
```json
{
  "id": "plan_1234567890_abc123",
  "created_at": "2024-01-01T12:00:00.000Z",
  "updated_at": "2024-01-01T12:00:00.000Z",
  "input_text": "User's original request",
  "purposed_plan": "Detailed implementation plan",
  "confirmation": false,
  "completed": false,
  "status": "pending_confirmation",
  "implementation_notes": null,
  "git_branch": null,
  "pr_url": null
}
```

## Workflow

### 1. Create Plan
```bash
node plan-handler.js plan "Add countdown timer for token launch" "Create React component with Matrix theme, integrate with existing layout, add glitch animations"
```

**Result:** Creates `plans/plan_[timestamp]_[random].json`

### 2. Review & Confirm
- Edit the JSON file manually
- Set `"confirmation": true` when plan is approved
- OR use CLI: `node plan-handler.js confirm <planId>`

### 3. Implementation Triggers
When `confirmation: true` is detected:

#### For Updates (Default)
- Creates feature branch: `feature/update-[timestamp]`
- Implements changes on branch
- Creates PR to main

#### For New Projects
Detects keywords: "create new", "new component", "build from scratch", "initialize"
- Creates new directory
- Initializes git repository  
- Sets up basic structure (README, package.json, .gitignore)
- Creates feature branch: `feature/initial-[projectname]`
- Makes initial commit
- Creates PR to main (empty main branch)

## Commands Reference

### Create Plan
```bash
node plan-handler.js plan "input text" "proposed plan"
```

### Confirm Plan
```bash
node plan-handler.js confirm <planId>
```

### Start Implementation
```bash
node plan-handler.js implement <planId>
```

### Mark Complete
```bash
node plan-handler.js complete <planId> [prUrl]
```

### List All Plans
```bash
node plan-handler.js list
```

## Examples

### Example 1: Update Existing Website
```bash
node plan-handler.js plan "Add social media links to footer" "Create footer component with Twitter and Twitch links, maintain Matrix theme"
```

**Flow:**
1. Plan created in `plans/`
2. Review and confirm
3. Creates `feature/update-123456` branch
4. Implement changes
5. Create PR to main

### Example 2: New Component
```bash
node plan-handler.js plan "Create new admin dashboard" "Build separate React app for admin features with authentication"
```

**Flow:**
1. Plan created in `plans/`
2. Review and confirm  
3. Creates `admin-dashboard/` directory
4. Initializes git with empty main branch
5. Creates `feature/initial-admin-dashboard` branch
6. Sets up basic structure
7. Create PR to main

## File Locations

```
website/
├── plan-handler.js           # Main handler script
├── plans/                    # Plan files directory
│   ├── plan_123_abc.json    # Individual plan files
│   └── plan_456_def.json
└── PLAN_SYSTEM.md           # This documentation
```

## Integration with CLAUDE.md

The plan system enforces the workflow rules from `/website/CLAUDE.md`:

1. ✅ **Plan First** - Forces planning phase before coding
2. ✅ **Branch Always** - Automatically creates feature branches
3. ✅ **PR Required** - Guides toward PR creation
4. ✅ **Matrix Theme** - Plans should specify Matrix compliance

## Status Values

- `pending_confirmation` - Plan created, awaiting approval
- `confirmed` - Plan approved, ready for implementation
- `implementing` - Implementation in progress
- `completed` - Implementation finished, PR created

## Error Handling

- Invalid plan IDs show helpful error messages
- Git operations are wrapped with error handling
- File operations validate directory permissions
- Missing dependencies are caught and reported

## Advanced Usage

### Bulk Operations
```bash
# List pending plans
node plan-handler.js list | grep "pending_confirmation"

# Confirm multiple plans (manual JSON editing required)
# Auto-implement all confirmed plans (future feature)
```

### Custom Project Templates
The system can be extended with project templates for common patterns:
- React components
- API endpoints  
- Documentation sites
- Landing pages

---

**🔮 Remember: The Oracle requires planning before action. Every line of code serves the revolution!**