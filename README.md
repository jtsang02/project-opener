# Project Management Opening System

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installing)
    * [Running the web app](#running-the-web-app)
    * [Dependencies](#dependencies)

## Overview

Project Management Opening System is a web app built for project managers to make requests for project openings, view the status of their requests, and assign to administrators for processing.  The web app consists of a form for project managers to submit requests, and a dashboard for administrators to view and process the requests.  Adminstrators can send automated emails to the project managers to notify them of the status of their requests.

The web app is built using Next.js, a full stack React framework for building web apps.  The backend uses MongoDB for the database, Auth0 for secure login authentication, and Node.js for the server.  The frontend consists of React and Tailwind CSS for the user interface.

A demo of the app is deployed on Vercel, and can be accessed at the following link: https://project-opener.vercel.app/


<video src="Project%20Opener%20Example.mp4" controls title="Title"></video>

## Architecture

The software architecture involves a structured framework that integrates MongoDB for database management, Auth0 for secure login authentication, NodeMailer for automated email functionalities, and Node.js for server-side operations.

The front-end features are developed using the Next.js framework, which facilitates seamless client-side routing and enables the creation of dynamic and responsive user interfaces.

For data storage and management, the app utilizes MongoDB, a NoSQL database, known for its scalability and flexibility. MongoDB allows efficient handling of structured and unstructured data, ensuring reliable data storage and retrieval.

To ensure secure user authentication, the application employs Auth0, a robust authentication and authorization platform. Auth0 provides secure and seamless user authentication, allowing users to safely access sensitive project and client information.

The application incorporates NodeMailer for automated email functionalities, enabling the seamless integration of email services within the application. NodeMailer facilitates the sending of automated emails, notifications, and alerts, enhancing user engagement and communication.

Next.js server-side operations are managed through Node.js, a powerful runtime environment that ensures efficient and scalable application performance.

## Getting Started

### Prerequisites

You will need the following software installed on your system:

* Next.js (version 10 or later for web app)
* npm (version 6 or later for web app)
* MongoDB (version 4 or later for database)

### Installing

After cloning the repository to your local machine, follow the instructions below to install the necessary dependencies.

To install the dependencies for the web app, run the following command in the software directory:

```
npm install
```


### Running the web app

To run the next.js web app, first run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
To build the web app for production, run the following command in the project directory:

```
npm run build
```

### Dependencies

* [Next.js](https://nextjs.org/) - full stack framework 
* [MongoDB](https://www.mongodb.com/) - database 
* [Auth0](https://auth0.com/) - Authentication service
* [NodeMailer](https://nodemailer.com/about/) - NodeJS Email service
* [Node.js](https://nodejs.org/en/) - JavaScript runtime
* [Tailwind CSS](https://tailwindcss.com/) - CSS framework
* [Material Tailwind](https://material-tailwind.com/) - CSS components
  

