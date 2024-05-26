# E-Commerce Website
## Project Overview
This project is a comprehensive e-commerce website developed as part of the Talent Acceleration Platform (TAP) final project. The website leverages modern web technologies including TypeScript and Node.js, showcasing both backend and frontend capabilities. The project was developed by a team of six members using Agile methodologies.

## Features
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
## Installation
1. Clone the repository
`git clone https://github.com/SD-0224/backend-final-2.git
cd backend-final-2`

2. Install dependencies
bash
`npm install
`
3. Set up environment variables

Create a .env file in the root directory and add the following variables:
`DB_HOST=your-database-host
DB_PORT=3306
DB_DATABASE=your-database-name
DB_USERNAME=your-database-username
DB_PASSWORD=your-database-password
DB_DIALECT=mysql
sessionSecret="your-session-secret"
clientSecretAuth="your-client-secret-auth"
clientIDAuth="your-client-id-auth"
Cloud_Name=your-cloud-name
Cloud_Key=your-cloud-key
API_Secret=your-api-secret
Stripe_API_Key=your-stripe-api-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
`
Run the application
`npm run dev
`

## API Documentation
https://documenter.getpostman.com/view/33968858/2sA3BkdtGN#0526bc1b-b1c9-4103-8125-9111abdc20c8

