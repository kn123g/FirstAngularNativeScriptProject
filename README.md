# FirstAngularNativeScriptProject
FirstAngular NativeScript Project  build for learning mobile apps

#keystore password
ngnschallenge

#generate apk file
ns build android 

#run in USBconnected device
ns run android --bundle
ns run ios --bundle

#prepare platform
ns prepare android
ns prepare ios

#remove platform
ns platform remove android
ns platform remove ios

#add platform
ns platform add android
ns platform add ios

#keystore generate
keytool -genkey -v -keystore ng-ns-challenge.keystore -alias ng-ns-challenge -keyalg RSA -keysize 2048 -validity 10000

#release app-release.apk
ns build android --release --key-store-path ng-ns-challenge.keystore --key-store-password ngnschallenge --key-store-alias ng-ns-challenge --key-store-alias-password ngnschallenge


