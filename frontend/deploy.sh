#!/bin/bash

# Build the application
echo "Building the frontend application..."
npm run build

# Verify build succeeded
if [ $? -ne 0 ]; then
  echo "Build failed! Aborting deployment."
  exit 1
fi

# Deploy to production
echo "Deploying to production..."
rsync -avz --delete build/ user@production-server:/var/www/skillshare/

# Restart services
echo "Restarting services..."
ssh user@production-server "systemctl restart nginx"

echo "Deployment completed successfully!"