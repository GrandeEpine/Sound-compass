#!/bin/bash

cd sound-compass
if [ ! -f "src/environments/environment.development.ts" ]; then
    ng generate environment
fi

cat > src/environments/environment.development.ts << EOF
    export const environment = {
      spotifyClientId: '${SPOTIFY_CLIENT_ID}'
    };
EOF