#!/bin/bash

# Ensure jq is available
if ! command -v jq &> /dev/null; then
    echo "jq is required but not installed. Please install jq and try again."
    exit 1
fi

# Set up variables
BASE_DIR=$(pwd)
LIBRARY_JSON="${BASE_DIR}/library.json"

# Check if library.json exists
if [ ! -f "$LIBRARY_JSON" ]; then
    echo "library.json not found in the base directory. Please ensure it exists."
    exit 1
fi

# Extract version from library.json and set the name for the .mtlib file
VERSION=$(jq -r '.version' "$LIBRARY_JSON")
LIBRARY_NAME="travellermg2_${VERSION}.mtlib"

# Remove any existing .mtlib files
echo "Cleaning up old .mtlib files..."
find "$BASE_DIR" -name "*.mtlib" -type f -delete

# Create the .mtlib file
echo "Creating .mtlib file..."
zip -r "$LIBRARY_NAME" . -x "*.git*" "*.mtlib" -i "library.json" "library/*" "property/*"

if [ $? -eq 0 ]; then
  echo ".mtlib file created successfully: $LIBRARY_NAME"
else
  echo "Failed to create .mtlib file"
  exit 1
fi

echo "Build complete: $LIBRARY_NAME"
