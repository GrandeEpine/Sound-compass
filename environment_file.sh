#!/usr/bin/env bash
set -euo pipefail

# On suppose que le script est lancé depuis sound-compass/
ENV_FILE="src/environments/environment.development.ts"

# S'assurer que le dossier existe (au cas où)
mkdir -p "$(dirname "$ENV_FILE")"

cat > "$ENV_FILE" <<EOF
export const environment = {
  spotifyClientId: '${SPOTIFY_CLIENT_ID}'
};
EOF