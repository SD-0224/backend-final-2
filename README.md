E-Commerce Website
Project Overview
This project is a comprehensive e-commerce website developed as part of the Talent Acceleration Platform (TAP) final project. The website leverages modern web technologies including TypeScript and Node.js, showcasing both backend and frontend capabilities. The project was developed by a team of six members using Agile methodologies.

Features
User Authentication and Authorization
Product Listing and Details
Shopping Cart and Checkout Process
Payment Gateway Integration
Order Management for Users
Admin Dashboard for Managing Products, Orders, and Users
Technologies Used
Backend: Node.js, Express, TypeScript
Frontend: React, TypeScript
Database: MongoDB
Payment Gateway: Stripe
Authentication: JWT (JSON Web Tokens)
Project Setup
Prerequisites
Node.js (version 14.x or higher)
MongoDB (local or cloud instance)
Stripe Account for Payment Gateway
Installation
Clone the repository

bash
Copy code
git clone https://github.com/SD-0224/backend-final-2.git
cd backend-final-2
Install dependencies

bash
Copy code
npm install
Set up environment variables

Create a .env file in the root directory and add the following variables:

makefile
Copy code
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
Run the application

bash
Copy code
npm run dev
This will start both the backend and frontend servers concurrently.

API Documentation
https://documenter.getpostman.com/view/33968858/2sA3BkdtGN#0526bc1b-b1c9-4103-8125-9111abdc20c8

Fork the repository
Create a new branch (git checkout -b feature-branch)
Commit your changes (git commit -m 'Add some feature')
Push to the branch (git push origin feature-branch)
Create a new Pull Request
