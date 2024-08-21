#!/bin/bash

# Step 0: Ensure necessary commands are available
if ! command -v jq &> /dev/null; then
    echo "jq is required but not installed. Please install jq and try again."
    exit 1
fi

# Step 1: Set default variables and extract version from library.json
LIBRARY_JSON="library.json"
if [ ! -f "$LIBRARY_JSON" ]; then
    echo "library.json not found in the current directory. Please ensure it exists."
    exit 1
fi

VERSION=$(jq -r '.version' "$LIBRARY_JSON")
LIBRARY_NAME="travellermg2_${VERSION}.mtlib"
DIRECTORY_TO_ZIP=$(pwd)

# Step 2: Remove any existing .mtlib files in the directory
echo "Cleaning up old .mtlib files..."
find "$DIRECTORY_TO_ZIP" -name "*.mtlib" -type f -delete

# Step 3: Zip the directory, excluding existing .mtlib files
echo "Creating .mtlib file..."
zip -r "$LIBRARY_NAME" "$DIRECTORY_TO_ZIP" -x "*.mtlib" -x "*/.git/*"
if [ $? -eq 0 ]; then
  echo ".mtlib file created successfully: $LIBRARY_NAME"
else
  echo "Failed to create .mtlib file"
  exit 1
fi

echo "Local build complete: $LIBRARY_NAME"
