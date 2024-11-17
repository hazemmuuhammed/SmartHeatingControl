
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

To integrate the **TemperatureSlider** feature with voice control systems like **Amazon Alexa** or **Google Home**, follow these steps:

1. **Expose Temperature Control Functionality**: Develop an API or smart home capability that interfaces with your temperature control features.

2. **Create a Skill or Action**:
   - For **Alexa**: Develop a custom **Alexa Skill** that connects with your API.
   - For **Google Home**: Create a **Google Action** that links to your API.

3. **Implement Voice Commands**: Enable users to set or query the temperature using voice commands by defining intents and utterances in your skill or action.

4. **Ensure State Synchronization**: Implement bi-directional communication between the app and the voice assistant platform to keep the slider's state synchronized with the smart home system.

---

## Bug Identification and Troubleshooting

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
