#!/bin/sh
set -e

echo "Starting Next.js application with runtime environment variables..."

# Export NEXT_PUBLIC_ environment variables for runtime
export NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL}"
export NEXT_PUBLIC_CDN_URL="${NEXT_PUBLIC_CDN_URL}"
export NEXT_PUBLIC_MAP_API="${NEXT_PUBLIC_MAP_API}"

# Start the Next.js server
exec node server.js
