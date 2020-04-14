# TetraBody #

#### Portland State Computer Science Capstone ####

##### Fall 2019 - Winter 2020 #####

---

## Project description and process ##

TetraBody is a new kind of fitness app that provides free workouts for anyone, anytime, anywhere.  Users can find and watch follow-along workout videos created and curated by gyms and trainers, as well as create their own workout plans and track their fitness stats and goals. [Tetrabody.com](https://www.tetrabody.com/)

This project was completed by a 7 person team of Computer Science students at Portland state University as the required senior capstone project.  This project lasted a lotal of 6 months over two terms.  The first 10 week term was spent planning for the project, while the second 10 week term was spent developing.
Our team used an agile approach during this project including week-long sprints and regular stand-up progress meetings.  At the end of the 6 months, our team prepared a presentation to demonstrate the project, and delivered the code and documentation to our sponsor Holly.

---

## Team Members and roles ##

### Team Lead: ###

Josh Ray: https://github.com/jraypdx

The team lead interacted with the professor and project sponsor, as well as planning and running meetings.  The team lead also helped to coordinate work between the teams.

### UI team ###

Peter Bui: https://github.com/CameraCore

Peter Chung: https://github.com/sneakwolf777

The UI team were the main creators of the user interface for the app.  This included creating the various pages, choosing the styling, and creating the video feed.                                                                                                                                                             |

### Model team ###

Brooks Russell

Tommy Kinch

The model team focused on connecting the work from the backend and UI teams, as well as assisting the other teams when needed.  The model team started the basic structure of the app and handled the profile and stats pages, as well as creating the login page and handling authentication through email, Facebook, and Google.


### Backend team ###

Erik Jastad

John Li

The backend team worked with AWS to bring functionality to the app.  This involved setting up a database with tables to hold user and app data, creating APIs to interact with the database, setting up video storage, and getting video playback and uploads working in the app.

---

## Tools used ##

### Development ###

[React Native](https://reactnative.dev/) - [Expo](https://expo.io/) - [VSCode](https://code.visualstudio.com/)

### Backend ###

[AWS](https://aws.amazon.com/)

### Collaboration ###

[Atlassian: Bitbucket, Jira, Confluence](https://www.atlassian.com/) - [Slack](https://slack.com/)

---

## Steps to run on your machine ##

1.  Clone the repo to your local machine and install [NPM 12.9](https://nodejs.org/en/blog/release/v0.12.9/) or other NPM version confirmed to work with Expo
2.  Using VSCode or an IDE of your choice, install Expo using: "npm install -g expo-cli"
3.  Install the Expo app on your Android or IOS device (note: Android emulator in Android Studio can also be used, as well as IOS Simulator on a Mac)
4.  Run "Expo start --tunnel" in the project directory
5.  Scan the QR code in the expo app on your phone, and allow the app to compile and download to your device

Note:  AWS backend setup will need to occur to give the app functionality.  This is contained in documentation delivered to Holly.