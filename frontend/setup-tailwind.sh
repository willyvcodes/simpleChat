#!/bin/bash

# Install necessary packages
echo "Installing autoprefixer, postcss, and tailwindcss..."
npm i autoprefixer postcss tailwindcss

echo "Installing flowbite-react..."
npm i flowbite-react

# Check if tailwind.config.js already exists
if [ ! -f "tailwind.config.js" ]; then
  echo "Initializing Tailwind CSS configuration..."
  npx tailwindcss init -p
else
  echo "tailwind.config.js already exists. Skipping initialization."
fi

# Remove contents of tailwind.config.js and add your custom configuration
echo "Configuring tailwind.config.js..."
cat <<EOL > tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}' , 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
EOL

# Replace the contents of src/index.css with Tailwind CSS rules
echo "Configuring src/index.css..."
cat <<EOL > src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
EOL

echo "Setup completed."