#!/usr/bin/env node

/**
 * SuperState Website Plan Handler
 * Manages user planning workflow with JSON-based plan files
 */

const fs = require('fs').promises;
const path = require('path');
const { execSync } = require('child_process');

class PlanHandler {
    constructor() {
        this.plansDir = path.join(__dirname, 'plans');
        this.ensurePlansDirectory();
    }

    async ensurePlansDirectory() {
        try {
            await fs.access(this.plansDir);
        } catch {
            await fs.mkdir(this.plansDir, { recursive: true });
        }
    }

    /**
     * Generate unique plan ID
     */
    generatePlanId() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        return `plan_${timestamp}_${random}`;
    }

    /**
     * Create a new plan file
     */
    async createPlan(inputText, purposedPlan) {
        const planId = this.generatePlanId();
        const planData = {
            id: planId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            input_text: inputText,
            purposed_plan: purposedPlan,
            confirmation: false,
            completed: false,
            status: 'pending_confirmation',
            implementation_notes: null,
            git_branch: null,
            pr_url: null
        };

        const planFile = path.join(this.plansDir, `${planId}.json`);
        await fs.writeFile(planFile, JSON.stringify(planData, null, 2));
        
        console.log(`[PLAN] Plan created: ${planFile}`);
        console.log(`[ORACLE] Plan ID: ${planId}`);
        return { planId, planFile, planData };
    }

    /**
     * Read existing plan
     */
    async readPlan(planId) {
        const planFile = path.join(this.plansDir, `${planId}.json`);
        try {
            const content = await fs.readFile(planFile, 'utf8');
            return JSON.parse(content);
        } catch (error) {
            throw new Error(`Plan ${planId} not found`);
        }
    }

    /**
     * Update plan confirmation status
     */
    async confirmPlan(planId) {
        const plan = await this.readPlan(planId);
        plan.confirmation = true;
        plan.status = 'confirmed';
        plan.updated_at = new Date().toISOString();
        
        const planFile = path.join(this.plansDir, `${planId}.json`);
        await fs.writeFile(planFile, JSON.stringify(plan, null, 2));
        
        console.log(`[OK] Plan ${planId} confirmed`);
        return plan;
    }

    /**
     * Check if implementation should start
     */
    async shouldStartImplementation(planId) {
        const plan = await this.readPlan(planId);
        return plan.confirmation && !plan.completed;
    }

    /**
     * Start implementation workflow
     */
    async startImplementation(planId) {
        const plan = await this.readPlan(planId);
        
        if (!plan.confirmation) {
            throw new Error('Plan not confirmed yet');
        }

        console.log(`[LAUNCH] Starting implementation for plan: ${planId}`);
        
        // Determine if it's an update or new project
        const isNewProject = this.isNewProjectPlan(plan.purposed_plan);
        
        if (isNewProject) {
            return await this.implementNewProject(plan);
        } else {
            return await this.implementUpdate(plan);
        }
    }

    /**
     * Determine if plan is for new project or update
     */
    isNewProjectPlan(plan) {
        const newProjectKeywords = [
            'create new',
            'new component',
            'new feature',
            'build from scratch',
            'initialize',
            'new directory'
        ];
        
        const planLower = plan.toLowerCase();
        return newProjectKeywords.some(keyword => planLower.includes(keyword));
    }

    /**
     * Implement new project
     */
    async implementNewProject(plan) {
        console.log(' Creating new project structure...');
        
        // Create new directory name from plan
        const projectName = this.extractProjectName(plan.input_text);
        const projectDir = path.join(__dirname, '..', projectName);
        
        try {
            // Create project directory
            await fs.mkdir(projectDir, { recursive: true });
            console.log(` Created directory: ${projectDir}`);
            
            // Initialize git
            process.chdir(projectDir);
            execSync('git init', { stdio: 'inherit' });
            
            // Create initial structure
            await this.createInitialStructure(projectDir, plan);
            
            // Create feature branch
            const branchName = `feature/initial-${projectName}`;
            execSync(`git checkout -b ${branchName}`, { stdio: 'inherit' });
            
            // Commit initial code
            execSync('git add .', { stdio: 'inherit' });
            execSync('git commit -m "Initial project setup based on Oracle plan"', { stdio: 'inherit' });
            
            // Update plan with git info
            plan.git_branch = branchName;
            plan.status = 'implementing';
            plan.implementation_notes = `New project created in ${projectDir}`;
            await this.updatePlan(plan);
            
            console.log(` New project initialized: ${projectName}`);
            return { projectDir, branchName };
            
        } catch (error) {
            console.error('[FAIL] Failed to create new project:', error.message);
            throw error;
        }
    }

    /**
     * Implement updates to existing project
     */
    async implementUpdate(plan) {
        console.log('[FIX] Implementing updates to existing project...');
        
        // Create feature branch for updates
        const branchName = `feature/update-${Date.now()}`;
        
        try {
            // Ensure we're in the right directory (website folder)
            process.chdir(__dirname);
            
            // Create feature branch
            execSync(`git checkout -b ${branchName}`, { stdio: 'inherit' });
            console.log(` Created branch: ${branchName}`);
            
            // Update plan
            plan.git_branch = branchName;
            plan.status = 'implementing';
            plan.implementation_notes = 'Updates being implemented on feature branch';
            await this.updatePlan(plan);
            
            console.log(' Ready for implementation on feature branch');
            return { branchName, updateMode: true };
            
        } catch (error) {
            console.error('[FAIL] Failed to start implementation:', error.message);
            throw error;
        }
    }

    /**
     * Extract project name from input text
     */
    extractProjectName(inputText) {
        // Simple extraction - can be improved
        const words = inputText.toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .split(' ')
            .filter(word => word.length > 2)
            .slice(0, 3);
        
        return words.join('-') || `project-${Date.now()}`;
    }

    /**
     * Create initial project structure
     */
    async createInitialStructure(projectDir, plan) {
        // Create basic files based on plan
        const readmeContent = `# ${path.basename(projectDir)}

Created based on Oracle plan: ${plan.id}

## Plan Description
${plan.input_text}

## Implementation
${plan.purposed_plan}

---
[ORACLE] Generated by SuperState Oracle System
`;

        await fs.writeFile(path.join(projectDir, 'README.md'), readmeContent);
        
        // Create basic package.json if it seems like a Node project
        if (plan.purposed_plan.toLowerCase().includes('node') || 
            plan.purposed_plan.toLowerCase().includes('npm') ||
            plan.purposed_plan.toLowerCase().includes('react')) {
            
            const packageJson = {
                name: path.basename(projectDir),
                version: "1.0.0",
                description: plan.input_text,
                main: "index.js",
                scripts: {
                    start: "node index.js"
                },
                author: "Oracle SuperState System",
                license: "MIT"
            };
            
            await fs.writeFile(
                path.join(projectDir, 'package.json'), 
                JSON.stringify(packageJson, null, 2)
            );
        }
        
        // Create .gitignore
        const gitignoreContent = `node_modules/
.env
*.log
.DS_Store
dist/
build/
`;
        await fs.writeFile(path.join(projectDir, '.gitignore'), gitignoreContent);
    }

    /**
     * Update plan in file
     */
    async updatePlan(plan) {
        plan.updated_at = new Date().toISOString();
        const planFile = path.join(this.plansDir, `${plan.id}.json`);
        await fs.writeFile(planFile, JSON.stringify(plan, null, 2));
    }

    /**
     * Mark plan as completed
     */
    async completePlan(planId, prUrl = null) {
        const plan = await this.readPlan(planId);
        plan.completed = true;
        plan.status = 'completed';
        plan.pr_url = prUrl;
        await this.updatePlan(plan);
        
        console.log(`[OK] Plan ${planId} marked as completed`);
        if (prUrl) {
            console.log(`[CHAIN] PR created: ${prUrl}`);
        }
    }

    /**
     * List all plans
     */
    async listPlans() {
        try {
            const files = await fs.readdir(this.plansDir);
            const planFiles = files.filter(f => f.endsWith('.json'));
            
            const plans = [];
            for (const file of planFiles) {
                try {
                    const content = await fs.readFile(path.join(this.plansDir, file), 'utf8');
                    plans.push(JSON.parse(content));
                } catch (error) {
                    console.warn(`[WARN] Could not read plan file: ${file}`);
                }
            }
            
            return plans.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        } catch {
            return [];
        }
    }
}

// CLI Interface
async function main() {
    const handler = new PlanHandler();
    const command = process.argv[2];
    const args = process.argv.slice(3);

    try {
        switch (command) {
            case 'plan':
                if (args.length < 2) {
                    console.log('Usage: node plan-handler.js plan "input text" "proposed plan"');
                    process.exit(1);
                }
                const { planId } = await handler.createPlan(args[0], args[1]);
                console.log(`\n[ORACLE] Plan created with ID: ${planId}`);
                console.log(`[NOTE] Edit the plan file to set confirmation: true when ready`);
                break;

            case 'confirm':
                if (args.length < 1) {
                    console.log('Usage: node plan-handler.js confirm <planId>');
                    process.exit(1);
                }
                await handler.confirmPlan(args[0]);
                break;

            case 'implement':
                if (args.length < 1) {
                    console.log('Usage: node plan-handler.js implement <planId>');
                    process.exit(1);
                }
                await handler.startImplementation(args[0]);
                break;

            case 'complete':
                if (args.length < 1) {
                    console.log('Usage: node plan-handler.js complete <planId> [prUrl]');
                    process.exit(1);
                }
                await handler.completePlan(args[0], args[1]);
                break;

            case 'list':
                const plans = await handler.listPlans();
                console.log('\n[PLAN] All Plans:');
                plans.forEach(plan => {
                    console.log(`\n[ORACLE] ${plan.id}`);
                    console.log(`   Status: ${plan.status}`);
                    console.log(`   Created: ${plan.created_at}`);
                    console.log(`   Input: ${plan.input_text.substring(0, 50)}...`);
                    console.log(`   Confirmed: ${plan.confirmation}`);
                    console.log(`   Completed: ${plan.completed}`);
                });
                break;

            default:
                console.log(`
[ORACLE] SuperState Plan Handler

Commands:
  plan "input" "plan"     - Create new plan
  confirm <planId>        - Confirm a plan
  implement <planId>      - Start implementation
  complete <planId> [pr]  - Mark as completed
  list                    - List all plans

Example:
  node plan-handler.js plan "Add countdown timer" "Create React component with Matrix theme"
`);
        }
    } catch (error) {
        console.error('[FAIL] Error:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = PlanHandler;