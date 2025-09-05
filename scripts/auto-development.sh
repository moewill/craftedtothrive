#!/bin/bash

# Safe automated development script for Podcast Planner Web Application
# This script runs with standard permissions and performs safe operations

set -e  # Exit on any error
set -u  # Exit on undefined variables

# Configuration
PROJECT_ROOT="/Users/moewill/repos/craftedtothrive"
LOG_FILE="$PROJECT_ROOT/logs/auto-development.log"
PROGRESS_FILE="$PROJECT_ROOT/.development-progress"

# Ensure directories exist
mkdir -p "$PROJECT_ROOT/logs"
touch "$PROGRESS_FILE"

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to run Claude with specific task
run_claude_task() {
    local task_description="$1"
    log "Starting task: $task_description"
    
    # Use Claude to work on specific task with safe parameters
    cd "$PROJECT_ROOT"
    claude --continue --no-input --dangerously-skip-permissions --continue << EOF
/process-task-list Please work on the next task from the PRD task list in tasks/tasks-prd-podcast-planner-webapp.md. 
Focus on: $task_description

Follow these guidelines:
1. Only work on files within the project directory
2. Follow the established project structure
3. Create comprehensive tests for any code you write
4. Document your progress
5. If you encounter any blockers, document them and move to the next feasible task
6. Do not make any system-level changes outside the project
EOF
    
    if [ $? -eq 0 ]; then
        log "Completed task: $task_description"
        echo "$(date): $task_description" >> "$PROGRESS_FILE"
    else
        log "Failed task: $task_description"
    fi
}

# Main execution
main() {
    log "Starting automated development session"
    
    # Get current progress
    local last_completed=$(tail -n 1 "$PROGRESS_FILE" 2>/dev/null || echo "")
    log "Last completed: $last_completed"
    
    # Define task sequence based on PRD
    tasks=(
        "Set up project infrastructure and development environment (Task 1.0)"
        "Implement OAuth 2.0 PKCE authentication (Task 2.0)" 
        "Build Flask API backend with PostgreSQL (Task 3.0)"
        "Create React frontend with dashboard (Task 4.0)"
        "Implement CSS testing and visual regression (Task 5.0)"
        "Configure containerization and deployment (Task 6.0)"
    )
    
    # Execute tasks sequentially
    for task in "${tasks[@]}"; do
        run_claude_task "$task"
        
        # Add delay between tasks to prevent overwhelming
        sleep 300  # 5 minute delay
    done
    
    log "Automated development session completed"
}

# Error handling
trap 'log "Script interrupted or failed"' ERR INT TERM

# Run main function
main "$@"
