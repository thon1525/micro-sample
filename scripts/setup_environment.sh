#!/bin/bash

# Ensure NVM is installed
if ! type nvm > /dev/null 2>&1; then
    echo "NVM not found. Installing NVM..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

    # Load NVM
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
else
    echo "NVM is already installed."
fi

# Load NVM if not already loaded
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js v20
echo "Installing Node.js v20..."
nvm install 20

if [ $? -eq 0 ]; then
    nvm use 20
    nvm alias default 20
else
    echo "Failed to install Node.js v20."
    exit 1
fi

# Install Yarn and PM2
echo "Installing Yarn and PM2..."
npm install -g yarn pm2

if [ $? -ne 0 ]; then
    echo "Failed to install Yarn and PM2."
    exit 1
fi

# Display versions
echo "Node.js version:"
node -v
echo "PM2 version:"
pm2 -v
echo "Yarn version:"
yarn -v
