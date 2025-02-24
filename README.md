# S76_WeirdEats

## Project Overview
S76_WeirdEats is a web application designed to let users share, explore, and rate bizarre food combinations. Whether it's pineapple on pizza or chocolate-dipped pickles, this app serves as a hub for food enthusiasts to celebrate the unexpected, strange, and oddly delicious. Users can log in, create their own lists of weird food combos, and interact with others by liking or commenting on their preferences. The project brings humor and curiosity into the world of food exploration.

## Features
- **User Authentication**: Secure login and registration system to allow users to participate.
- **Food Combination Sharing**: Users can submit their weird food combinations for others to explore.
- **Like & Comment System**: Engage with other users' posts by liking or commenting.
- **User Profiles**: Each user has a profile showcasing their shared food combos and interactions.
- **Explore & Discover**: Browse through a variety of bizarre food combinations shared by the community.

## Tech Stack
S76_WeirdEats is built using the MERN stack:

- **MongoDB**: A NoSQL database for storing user data, food combinations, likes, and comments.
- **Express.js**: A lightweight backend framework for building APIs and managing server-side logic.
- **React.js**: A JavaScript library for creating dynamic and interactive user interfaces.
- **Node.js**: A runtime environment that enables JavaScript to run on the server, powering the backend of the application.

## REST API Structure
To enable seamless communication between the frontend and backend, the following REST APIs are implemented:

1. **User Authentication**: Handles user registration, login, and authentication.
2. **Food Combination Management**: Allows users to add, edit, and delete food combination entries.
3. **Like System**: Enables users to like or unlike specific food combinations.
4. **Comment Handling**: Facilitates adding, viewing, and managing comments on food combinations.

## Database Schema Design
Using MongoDB, we define schemas that represent the relationships and attributes of various data models:
- **Users**: Stores user information, authentication credentials, and profile details.
- **Food Combinations**: Stores details of shared food combinations, including user IDs, descriptions, and images.
- **Likes**: Keeps track of likes associated with each food combination.
- **Comments**: Stores user-generated comments for each food entry.

## Authentication & Security
Authentication is implemented to secure the platform and ensure that users have appropriate access. Key security measures include:
- **User Verification**: Ensures users are authenticated before accessing restricted features.
- **Data Protection**: Uses encryption and secure practices to protect sensitive user data.
- **Session Management**: Implements secure authentication mechanisms to maintain user sessions safely.

S76_WeirdEats is an exciting and fun project aimed at building a full-stack application while exploring unconventional food preferences. Join the journey and contribute your weird food combos!

--- 

## https://s76-wierdeats.onrender.com