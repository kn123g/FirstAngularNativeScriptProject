# FirstAngularNativeScriptProject
FirstAngular NativeScript Project  build for learning mobile app

# Generate apk file
ns build android

# Run in USBconnected device
ns run android --bundle

ns run ios --bundle

# Platform
## Prepare platform
ns prepare android

ns prepare ios

## Remove platform
ns platform remove android

ns platform remove ios

## Add platform
ns platform add android

ns platform add ios

# Keystore

## Existing keystore password
ngnschallenge

## New keystore generate
keytool -genkey -v -keystore ng-ns-challenge.keystore -alias ng-ns-challenge -keyalg RSA -keysize 2048 -validity 10000

# Release app-release.apk
ns build android --release --key-store-path ng-ns-challenge.keystore --key-store-password ngnschallenge --key-store-alias ng-ns-challenge --key-store-alias-password ngnschallenge


