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
DIRECTORY_TO_ZIP=$(pwd)/your-library-name

# Step 2: Ensure the correct directory structure
if [ ! -d "$DIRECTORY_TO_ZIP/library" ]; then
    echo "Directory structure is incorrect. Please ensure the library/ directory exists within $DIRECTORY_TO_ZIP"
    exit 1
fi

# Step 3: Remove any existing .mtlib files in the directory
echo "Cleaning up old .mtlib files..."
find "$(pwd)" -name "*.mtlib" -type f -delete

# Step 4: Zip the directory into a .mtlib file
echo "Creating .mtlib file..."
zip -r "$LIBRARY_NAME" "your-library-name" -x "*.mtlib" -x "*/.git/*"
if [ $? -eq 0 ]; then
  echo ".mtlib file created successfully: $LIBRARY_NAME"
else
  echo "Failed to create .mtlib file"
  exit 1
fi

echo "Local build complete: $LIBRARY_NAME"
