# Getting Started with EMEELAN PLATFORM

1) Client code: Techstack:
Framework antd-mobile
Coding guideline:

2) Deployment steps:
1. Android command

    ```npm install @capacitor/android```
    
    ```export JAVA_HOME=/usr/local/opt/openjdk@21```

     ```export PATH=$JAVA_HOME/bin:$PATH```

    
    ```cd android ``` 
    
    
   ``` ./gradlew clean ```
    
    ``` ./gradlew assembleRelease --stacktrace --info ```

    ```npx cap sync android```


For IOS

``` cd ios/App  ```

```npx cap copy ios && npx cap run ios ```

<details><summary>android/build.gradle</summary>
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {

    repositories {
    google()
    mavenCentral()
}
dependencies {
    classpath 'com.android.tools.build:gradle:8.7.2'
    classpath 'com.google.gms:google-services:4.4.2'

    // NOTE: Do not place your application dependencies here; they belong
    // in the individual module build.gradle files
}
}
apply from: "variables.gradle"

allprojects {
repositories {
google()
mavenCentral()
}
}

task clean(type: Delete) {
delete rootProject.buildDir
}
</details>

## Second file

<details>
<summary>android/app/build.gradle</summary>
apply plugin: 'com.android.application'

android {
    namespace "com.emeelan.mastjod"
    compileSdk 33
    defaultConfig {
        applicationId "com.emeelan.mastjod"
        minSdkVersion 21
        targetSdkVersion 33
        versionCode 2
        versionName "2.0.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
        aaptOptions {
             // Files and dirs to omit from the packaged assets dir, modified to accommodate modern web apps.
             // Default: https://android.googlesource.com/platform/frameworks/base/+/282e181b58cf72b6ca770dc7ca5f91f135444502/tools/aapt/AaptAssets.cpp#61
            ignoreAssetsPattern '!.svn:!.git:!.ds_store:!*.scc:.*:!CVS:!thumbs.db:!picasa.ini:!*~'
        }
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

repositories {
    flatDir{
        dirs '../capacitor-cordova-android-plugins/src/main/libs', 'libs'
    }
}

dependencies {
    implementation fileTree(include: ['*.jar'], dir: 'libs')
    implementation "androidx.appcompat:appcompat:$androidxAppCompatVersion"
    implementation "androidx.coordinatorlayout:coordinatorlayout:$androidxCoordinatorLayoutVersion"
    implementation "androidx.core:core-splashscreen:$coreSplashScreenVersion"
    implementation project(':capacitor-android')
    testImplementation "junit:junit:$junitVersion"
    androidTestImplementation "androidx.test.ext:junit:$androidxJunitVersion"
    androidTestImplementation "androidx.test.espresso:espresso-core:$androidxEspressoCoreVersion"
    implementation project(':capacitor-cordova-android-plugins')
}

apply from: 'capacitor.build.gradle'

try {
    def servicesJSON = file('google-services.json')
    if (servicesJSON.text) {
        apply plugin: 'com.google.gms.google-services'
    }
} catch(Exception e) {
    logger.info("google-services.json not found, google-services plugin not applied. Push Notifications won't work")
}

