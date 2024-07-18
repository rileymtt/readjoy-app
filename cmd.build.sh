#!/bin/bash

# Load NVM
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

# Use a specific Node version
nvm use 18.20

sudo rm -rf ~/Library/Developer/Xcode/DerivedData/*
sudo rm -rf ~/Library/Caches/org.swift.swiftpm
sudo rm -rf ~/Library/org.swift.swiftpm
# sudo rm -rf node_modules
sudo rm -rf ios/Pods
sudo rm -rf ios/Podfile.lock
# yarn install
cd ios
NO_FLIPPER=1 arch -x86_64 pod install
cd ..
yarn ios