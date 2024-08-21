#!/bin/bash

# Step 0: Ensure necessary commands are available
if ! command -v jq &> /dev/null; then
    echo "jq is required but not installed. Please install jq and try again."
    exit 1
fi

if ! command -v gh &> /dev/null; then
    echo "GitHub CLI (gh) is required but not installed. Please install gh and try again."
    exit 1
fi

# Step 1: Set default variables and extract version and GitHub repo from library.json
LIBRARY_JSON="library.json"
if [ ! -f "$LIBRARY_JSON" ]; then
    echo "library.json not found in the current directory. Please ensure it exists."
    exit 1
fi

VERSION=$(jq -r '.version' "$LIBRARY_JSON")
GITHUB_REPO=$(jq -r '.gitUrl' "$LIBRARY_JSON" | sed 's|https://github.com/||')
LIBRARY_NAME="travellermg2_${VERSION}.mtlib"
DIRECTORY_TO_ZIP=$(pwd)

# Step 2: Remove any existing .mtlib files in the directory
echo "Cleaning up old .mtlib files..."
find "$DIRECT#!/bin/bash

# Step 0: Ensure necessary commands are available
if ! command -v jq &> /dev/null; then
    echo "jq is required but not installed. Please install jq and try again."
    exit 1
fi

if ! command -v gh &> /dev/null; then
    echo "GitHub CLI (gh) is required but not installed. Please install gh and try again."
    exit 1
fi

# Step 1: Set default variables and extract version and GitHub repo from library.json
LIBRARY_JSON="library.json"
if [ ! -f "$LIBRARY_JSON" ]; then
    echo "library.json not found in the current directory. Please ensure it exists."
    exit 1
fi

VERSION=$(jq -r '.version' "$LIBRARY_JSON")
GITHUB_REPO=$(jq -r '.gitUrl' "$LIBRARY_JSON" | sed 's|https://github.com/||')
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

# Step 4: Create a new release on GitHub
echo "Creating a new GitHub release..."
gh release create "$VERSION" "$LIBRARY_NAME" --title "Traveller MG2 v$VERSION" --notes "Release of Traveller MG2 version $VERSION"
if [ $? -eq 0 ]; then
  echo "Release created successfully and $LIBRARY_NAME uploaded."
else
  echo "Failed to create GitHub release or upload the .mtlib file"
  exit 1
fi

# Cleanup (optional)
# echo "Cleaning up..."
# rm "$LIBRARY_NAME"
# echo "Done!"
ARY_NAME" "$DIRECTORY_TO_ZIP" -x "*.mtlib" -x "*/.git/*"
if [ $? -eq 0 ]; then
  echo ".mtlib file created successfully: $LIBRARY_NAME"
else
  echo "Failed to create .mtlib file"
  exit 1
fi

# Step 4: Create a new release on GitHub
echo "Creating a new GitHub release..."
gh release create "$VERSION" "$LIBRARY_NAME" --title "Traveller MG2 v$VERSION" --notes "Release of Traveller MG2 version $VERSION"
if [ $? -eq 0 ]; then
  echo "Release created successfully and $LIBRARY_NAME uploaded."
else
  echo "Failed to create GitHub release or upload the .mtlib file"
  exit 1
fi

# Cleanup (optional)
echo "Cleaning up..."
rm "$LIBRARY_NAME"
echo "Done!"
