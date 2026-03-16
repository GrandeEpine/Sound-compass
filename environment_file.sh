#!/bin/bash
mkdir -p src/environments
cat > src/environments/environment.development.ts << EOF
export const environment = {
  spotifyClientId: '${SPOTIFY_CLIENT_ID}'
};
EOF