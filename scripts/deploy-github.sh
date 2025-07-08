#!/bin/bash

# GitHub Pages Deployment Script
# Usage: npm run deploy:github

set -e  # Exit immediately if a command exits with a non-zero status

echo "🚀 Starting GitHub Pages deployment process..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Current directory is not a git repository"
    exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Detected uncommitted changes, adding to git..."
    git add .
    
    # Get commit message
    read -p "Enter commit message (default: 🚀 Deploy updates): " commit_msg
    commit_msg=${commit_msg:-"🚀 Deploy updates"}
    
    git commit -m "$commit_msg"
else
    echo "✅ Working directory clean, no need to commit changes"
fi

# Verify CNAME file (optional for custom domains)
echo "🔍 Checking CNAME configuration..."
if [ -f "public/CNAME" ]; then
    domain=$(cat public/CNAME | tr -d '\n\r')
    echo "✅ Custom domain configured: $domain"
else
    echo "ℹ️  No CNAME file found - using GitHub Pages default domain"
fi

# Local build test
echo "🔨 Running local build test..."
npm run build

# Verify build output
if [ ! -d "out" ]; then
    echo "❌ Error: Build output directory 'out' does not exist"
    exit 1
fi

if [ -f "public/CNAME" ] && [ ! -f "out/CNAME" ]; then
    echo "❌ Error: CNAME file was not copied to build output"
    exit 1
fi

if [ ! -f "out/sitemap.xml" ]; then
    echo "⚠️  Warning: sitemap.xml not found"
else
    url_count=$(grep -c '<url>' out/sitemap.xml || echo "0")
    echo "✅ Sitemap contains $url_count URLs"
fi

echo "✅ Local build successful!"

# Get current branch
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "⚠️  Current branch: $current_branch (main branch recommended)"
    read -p "Continue with deployment? (y/N): " confirm
    if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
        echo "❌ Deployment cancelled"
        exit 1
    fi
fi

# Push to remote repository
echo "📤 Pushing code to GitHub..."
git push origin $current_branch

echo ""
echo "🎉 Deployment completed!"
echo "📋 Next steps:"
echo "   1. Visit GitHub Actions page to monitor build progress"
if [ -f "public/CNAME" ]; then
    domain=$(cat public/CNAME | tr -d '\n\r')
    echo "   2. After build completion, visit: https://$domain"
    echo "   3. Ensure DNS settings point correctly to GitHub Pages"
else
    echo "   2. After build completion, visit your GitHub Pages URL"
    echo "   3. Configure custom domain in repository settings if needed"
fi
echo ""
repo_path=$(git config --get remote.origin.url | sed 's/.*github.com[:/]\(.*\)\.git/\1/')
echo "🔗 Useful links:"
echo "   • GitHub Actions: https://github.com/$repo_path/actions"
echo "   • GitHub Pages Settings: https://github.com/$repo_path/settings/pages"
echo "" 