#!/bin/bash

# GitHub PAT Setup Script
# Usage: ./setup_github.sh

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Setting up GitHub connection with PAT...${NC}"

# Your GitHub credentials
GITHUB_USERNAME="Vantagehub642"
GITHUB_PAT=""
GITHUB_REPO="otp-guardian-dashboard"

# Validate we're in a git repository
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Error: Not a git repository${NC}"
    echo "Please run this script from your project root directory"
    exit 1
fi

# Check current remote
echo -e "${YELLOW}📡 Checking current remote configuration...${NC}"
git remote -v

# Set the new remote URL with PAT embedded
echo -e "${YELLOW}🔗 Setting up remote URL with PAT authentication...${NC}"
git remote set-url origin "https://${GITHUB_USERNAME}:${GITHUB_PAT}@github.com/${GITHUB_USERNAME}/${GITHUB_REPO}.git"

echo -e "${GREEN}✅ Remote URL updated successfully${NC}"

# Configure git to store credentials
echo -e "${YELLOW}⚙️ Configuring git credential storage...${NC}"
git config --global credential.helper store

# Test the connection
echo -e "${YELLOW}🔍 Testing connection to GitHub...${NC}"
if git ls-remote origin > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Successfully connected to GitHub!${NC}"
else
    echo -e "${RED}❌ Failed to connect to GitHub${NC}"
    echo "Please check your PAT permissions and try again"
    exit 1
fi

# Show final remote configuration
echo -e "${YELLOW}📡 Final remote configuration:${NC}"
git remote -v

echo -e "${GREEN}🎉 GitHub connection setup completed successfully!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Run: git push -u origin main"
echo "2. Start Gemini CLI: gemini"
echo "3. Run: /setup-github"
