https://github.com/coolbmann/Project_Noggin/assets/117170435/f653afa4-6ead-4781-b2b9-b0d9472a1b51

A full-stack quiz hub with session based user-management.

## 📄 Overview 
This project was inspired by agruably my favourite daily company ritual in my time at MILKRUN: 5PM Trivia.

This is a **full-stack application**, with a minimal layer of authentication, automated through session cookies. When users open the app, a unique user instance is provisioned and becomes accessible in the browser for 24 hours.

During this window, users have the ability to complete quizzes to collect points and make their way up the community leaderboard.

Users also have the ability to contribute by creating "Community Made" quizzes, with the help of our question generation engine to fill in the gaps where needed.

## 💡 Technologies Used 
**React** and **Node.js** powers the front and back-end respectively, alongside a **PostgreSQL** database hosted on Supabase.

Both FE and BE is written in **TypeScript**, and **Express** leveraged as the server side framework. No ORM was used for this project.

The static site and web service is hosted through **Render** as the hosting provider.

Credits to **Unsplash** for usage of their image API.

## 🔥 Features 
- Browse through quizzes and complete trivia in a multiple choice style quiz;
- Drag-and-drop functionality to re-order question sequence in the quiz creator;
- Contribute your own quizzes to the community;
- Question generation engine to support the creation of "Community Made" quizzes;
- Persisted, session-based user provisioning;
- Custom made toast component to handle warning, error and success notifications in the UI.

## ⚡ See it in Action!
View the live app at [noggin-app.bryanherijanto.com](https://noggin-app.bryanherijanto.com/).
