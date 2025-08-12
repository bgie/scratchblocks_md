#!/bin/bash
set -e

# This script configures the Uncomplicated Firewall (ufw) on Debian/Ubuntu
# to allow incoming connections for the web server.
# It needs to be run with root privileges (e.g., using sudo).
#
# Usage: sudo ./configure-firewall.sh [port]
#
# If no port is specified, it defaults to 8080.

if [ "$EUID" -ne 0 ]; then
  echo "Please run as root or with sudo."
  exit 1
fi

if ! command -v ufw &> /dev/null; then
    echo "ufw command not found. Please install it first (e.g., 'sudo apt-get install ufw')."
    exit 1
fi

# Use the first argument as the port, or default to 8080
PORT=${1:-8080}

echo "Configuring firewall to allow TCP traffic on port $PORT..."

# Allow incoming traffic on the specified port
ufw allow ${PORT}/tcp

# Check if ufw is active, and enable it if it's not.
if ufw status | grep -q "Status: inactive"; then
    echo "ufw is inactive. Enabling firewall..."
    # The `y` pipe is to auto-confirm enabling the firewall,
    # as it can disrupt existing connections (like SSH).
    yes | ufw enable
fi

echo ""
echo "Firewall configured. Current status:"
ufw status verbose
