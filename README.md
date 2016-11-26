# MobileMolecularWeight
Calculate molecular weights of any chemical compound on  your mobile phone!

Instructions:

1) Just begin typing! Once you load up the page you can begin searching for a chemical element.

2) When you find the element you want, click on it and it'll appear on the left side of the screen with a plus and minus sign above and below, respectively. Click these to add one more or one less atom. Go below one and the atom is removed from the calculation panel.

3) Create whatever chemical compounds you like!


To run app locally on an emulator:

1) Download and install Android SDK ( https://developer.android.com/studio/install.html ).

2) Follow this guide to set up your virtual device ( https://facebook.github.io/react-native/docs/getting-started.html ). The specs I use are: Nexus 5, Android 7.0 - API Level 24, Google APIs Intel Atom (x86_64).

3) Download and install Genymotion ( https://www.genymotion.com/ ).

4) Run the Genymotion emulator.

5) Download or clone the git repository. Open terminal and run ( npm install ).

6) In the terminal run ( react-native run-android ). The app should appear on screen in about 2-5 minutes. If it takes 10 or 15 minutes, check out ( http://stackoverflow.com/questions/37958376/fetching-js-bundle-monstrously-slow/40628722#40628722 ).

7) To view JS console, press ctrl M with your app running and click 'Debug JS Remotely'. That will open a tab in your web browser (http://localhost:8081/debugger-ui). Inspect this page to bring up the console!