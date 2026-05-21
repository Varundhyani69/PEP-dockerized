#!/bin/sh
echo "Generating env-config.js at runtime..."
echo "window.env = {" > /usr/share/nginx/html/env-config.js
echo "  VITE_API_URL: \"${VITE_API_URL:-http://localhost:5000}\"" >> /usr/share/nginx/html/env-config.js
echo "};" >> /usr/share/nginx/html/env-config.js
