
# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

# Integration of TemperatureSlider with Voice Control Systems

![Speech Recognition Diagram](speech-recogntion.png)


# Alexa and Google Home Integration for Mobile Applications

This guide provides step-by-step instructions to integrate **Alexa** and **Google Home** with your mobile application to perform specific tasks, such as controlling a `TemperatureSlider`.

---

## Prerequisites

### General
- A mobile app development environment for **iOS** (Xcode) and **Android** (Android Studio).
- native modules to integrate it with react native.

### Amazon Alexa
- An **Amazon Developer Account**: [](https://developer.amazon.com/).

### Google Home
- A **Google Cloud Account**: [](https://console.cloud.google.com/).

---

## Alexa Integration

### Step 1: Create a Custom Alexa Skill
1. Log in to the [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask).
2. Click **"Create Skill"** and name it (e.g., *TemperatureController*).
3. Select:
   - **Custom Model**.
   - **Provision your own backend**.
4. Continue to the skill creation page.

---

### Step 2: Define Intents
1. In the **Interaction Model** tab, add the following intents:
    ```json
    {
      "intents": [
        {
          "name": "SetTemperatureIntent",
          "slots": [
            {
              "name": "temperature",
              "type": "AMAZON.NUMBER"
            }
          ],
          "samples": [
            "Set temperature to {temperature}",
            "Adjust the temperature to {temperature}"
          ]
        },
        {
          "name": "GetTemperatureIntent",
          "slots": [],
          "samples": [
            "What is the current temperature?",
            "Get the temperature"
          ]
        }
      ]
    }
    ```
2. Save the interaction model and build the skill.

---

### Step 3: Connect to Your API
- Configure the skill’s **Endpoint**:
  - Use your API's HTTPS endpoint for handling Alexa's requests.
  - The API should implement logic to:
    - Handle `SetTemperatureIntent` to set the temperature.
    - Handle `GetTemperatureIntent` to fetch the current temperature.

---

### Example API Requirements
- **Set Temperature Endpoint**: Accepts a temperature value and updates the app state.
    - **Method**: `POST`
    - **Endpoint**: `/set-temperature`
    - **Payload**:
        ```json
        { "temperature": 24 }
        ```
- **Get Temperature Endpoint**: Returns the current temperature.
    - **Method**: `GET`
    - **Endpoint**: `/get-temperature`

This API should be from the java spring backend service.

---

## Google Home Integration

### Step 1: Create a Google Action
1. Visit the [Google Actions Console](https://console.actions.google.com/).
2. Create a new project and name it (e.g., *TemperatureController*).
3. Choose **Smart Home** or **Custom Action** depending on your needs.

---

### Step 2: Define Actions
Use **Dialogflow** to handle intents and parameters.
- Example actions:
  - **Set Temperature**: Matches phrases like *"Set the temperature to 24"*.
  - **Get Temperature**: Matches *"What’s the temperature?"*.

---

### Step 3: Connect to Your API
Link your webhook API to Dialogflow:
- The API should handle intents to set and retrieve the temperature.
- Example payload structure:

#### Set Temperature Intent
- **Intent**: `Set Temperature`
- **Payload**:
    ```json
    { "temperature": 24 }
    ```

#### Get Temperature Intent
- **Intent**: `Get Temperature`
- **Response**:
    ```json
    { "temperature": 24 }
    ```

---

### Step 4: Deploy and Test
- Deploy your API to a secure platform.
- Link the webhook to your Google Action in the **Actions Console**.
- Test the integration using the **Simulator** in the Actions Console.

---

## Native Module Integration with iOS and Android

### iOS Integration
1. **Use the Alexa Voice Service (AVS)** or **Google Assistant SDK** directly in your iOS app:
   - Use `NSURLSession` to make API calls for Alexa or Google Assistant requests.
   - Implement audio capture using `AVAudioRecorder` for voice commands.

2. **Create a Native Module**:
   - In Xcode, write Objective-C or Swift code that communicates with AVS or Google Assistant APIs.
   - Expose these methods to your app.

3. **Set Up OAuth2 Authorization**:
   - Use `ASWebAuthenticationSession` or a similar framework for signing in with Amazon or Google accounts.

4. **Send Voice Data to APIs**:
   - Record audio and send it to the respective APIs (AVS or Google Assistant).
   - Parse responses and execute the corresponding actions.

---

### Android Integration
1. **Use the Alexa Voice Service (AVS)** or **Google Assistant SDK**:
   - Implement voice recording with `AudioRecord` or `MediaRecorder`.
   - Make HTTP requests to AVS or Google Assistant APIs using libraries like `Retrofit`.

2. **Create a Native Module**:
   - Write Java or Kotlin code to handle voice interactions and API communication.
   - Use the `@ReactMethod` annotation (if integrating with React Native) to expose these methods.

3. **Set Up OAuth2 Authorization**:
   - Use `CustomTabsIntent` or `WebView` for Amazon or Google account authentication.

4. **Handle API Responses**:
   - Parse JSON responses and trigger the corresponding actions in the app.

---

## Connect Native Modules to React Native

To integrate your native modules with React Native:

### iOS
1. **Expose the Module**:
   - Use `RCT_EXPORT_MODULE` in your Objective-C/Swift file to expose the module to React Native.

   ```objc
   #import "React/RCTBridgeModule.h"

   @interface AlexaModule : NSObject <RCTBridgeModule>
   @end

   @implementation AlexaModule

   RCT_EXPORT_MODULE();

   RCT_EXPORT_METHOD(sendCommand:(NSString *)command resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
     // Process Alexa commands using AVS
     resolve(@{ @"result": @"Command Sent" });
   }

   @end


## Important Notes
- Always use secure HTTPS endpoints for API communication.
- Implement proper error handling for OAuth and API requests.
- Test thoroughly using simulators and actual devices before publishing because it maybe working on Dev and not working on Prod.

---

## Next Steps
1. Publish the Alexa skill in the Alexa Skills Store.
2. Publish the Google Action on the Google Assistant platform.

---

For more info, refer to:
- [Amazon Alexa Developer Documentation](https://developer.amazon.com/en-US/alexa)
- [Google Actions on Google Documentation](https://developers.google.com/assistant)


---

# React Native Performance Optimization

## Table of Contents
- [Efficient Data Fetching](#efficient-data-fetching)
- [Lazy Loading for Rendering](#lazy-loading-for-rendering)
- [Avoid Unnecessary Re-rendering](#avoid-unnecessary-re-rendering)

---

## Efficient Data Fetching

Efficient data fetching is crucial to minimize load times and improve app responsiveness. Key approaches include:

1. **Batch API Requests**  
   Consolidate multiple API calls into a single request to reduce the number of HTTP requests and improve efficiency, we can perform this using `Axios`

2. **Caching**  
   Implement caching mechanisms for frequently accessed data. Use libraries like `react-query` to minimize unnecessary network requests.

3. **Pagination and Infinite Scrolling**  
   Fetch data in smaller, manageable chunks instead of loading everything at once. This reduces initial load time and improves performance for data-heavy views.

---

## Lazy Loading for Rendering

Lazy loading defers rendering or loading of components and assets until they are needed. This reduces memory usage and improves load times:

1. **Lazy Load Components**  
   Use libraries like `react-native-lazy-load` to render components only when they come into view, enhancing performance on complex screens.

2. **Lazy Load Images**  
   - Load images only when they are about to appear on the screen.
   - Use optimized formats such as **WEBP** to reduce file size.
   - Consider libraries like `react-native-fast-image` for efficient image loading and caching.

---

## Avoid Unnecessary Re-rendering



1. **Use `React.memo` or `PureComponent`**  
   - Wrap functional components with `React.memo` to prevent them from re-rendering unnecessarily.
   - For class components, use `PureComponent` to achieve similar effects.

2. **Optimize State Management**  
   - Avoid deeply nested state objects and minimize updates that trigger re-renders.
   - Use state management libraries like `Zustand` for fine-grained control over state updates.
4. **Use `useCallback` and `useMemo` Hooks**  
   - Use `useCallback` to memoize functions and avoid creating new function instances on every render.
   - Use `useMemo` to memoize expensive calculations or derived values.

5. **Profile Components with Flipper**  
   - Use Flipper’s React DevTools to analyze component render times and identify unnecessary re-renders.

---
## Bug Identification and Troubleshooting For The Provided Code

1. ### Memory Leak Due to Uncontrolled `setInterval`

   - **Issue**: The `setInterval` function is initiated in the `useEffect` hook but is never cleared. This can result in multiple intervals running if the component re-renders, leading to a memory leak.
   - **Solution**: Store the interval ID returned by `setInterval` and clear it when the component unmounts by returning a cleanup function in the `useEffect` hook using `clearInterval(intervalId)`.

2. ### Initial `temperature` Value is `null`

   - **Issue**: The initial state of `temperature` is set to `null`, which may lead to displaying "Current Temperature: null°C" before the first temperature is fetched.
   - **Solution**: Initialize `temperature` with a default value or use conditional rendering to handle the `null` state, such as showing a loading indicator until the temperature is available.

3. ### No Error Handling in `fetchTemperature`

   - **Issue**: The `fetchTemperature` function does not handle potential errors during data fetching.
   - **Solution**: Use `try...catch` blocks within `fetchTemperature` to handle exceptions and update the UI with an error message or fallback state. Alternatively, use the **React Query** library for robust success or error handling.

4. ### Unnecessary Repeated Declaration

   - **Issue**: The code includes redundant import statements or repeated component declarations.
   - **Solution**: Remove duplicate code and ensure that the component is declared only once to avoid confusion and potential conflicts.

5. ### Absence of Dependencies in `useEffect`

   - **Issue**: The `useEffect` hook has an empty dependency array, which is correct for setting up the interval once but may cause stale closures if variables used inside the hook change.
   - **Solution**: Verify and include any required variables in the dependency array to ensure the latest values are used.

6. ### Asynchronous Calls Inside `setInterval`

   - **Issue**: Using an asynchronous function inside `setInterval` can lead to unhandled delays or errors in the promise chain.
   - **Solution**: Use `setTimeout` with recursive calls or use `setInterval` with proper error handling to manage asynchronous operations effectively.

7. ### React Native-Specific Element Usage

   - **Note**: Since **React Native** does not use the DOM, elements like `<div>` or `<h1>` are not applicable.
     - **Use** `<View>` or `<SafeAreaView>` for layout components.
     - **Use** `<Text>` for displaying text content.
     - **Action**: Adjust styling as needed to achieve the desired appearance within the React Native framework.
