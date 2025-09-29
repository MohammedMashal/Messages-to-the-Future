# Messages to the Future

## Project Overview

**Messages to the Future** is a Node.js application that allows users to schedule messages to be sent to themselves or others at a future date. Users can sign up, log in, and manage their scheduled messages, while the system ensures emails are sent automatically at the scheduled time.

## Features

- User authentication with JWT
- Password reset via email
- Schedule messages to be sent in the future
- Send messages to other users via email
- Automatic background job to send pending messages
- Validation of inputs with proper error handling
- Secure password hashing with bcrypt

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Email Service**: Nodemailer (supports Mailtrap for dev, SendGrid for production)
- **Authentication**: JWT, bcrypt
- **Validation**: express-validator
- **Task Scheduler**: node-cron
- **Documentation**: Swagger (OpenAPI)

## Getting Started

**Prerequisites**

- Node.js >= 18
- PostgreSQL
- npm or yarn

**Installation**

1. Clone the repository:

```bash
git clone <repository-url>
cd messages-to-the-future
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root directory with the following variables:

```bash
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# Email (development)
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mailtrap_user
EMAIL_PASSWORD=your_mailtrap_password
NAME_FROM="Messages To Future"

# Email (production - SendGrid)
SENDGRID_USERNAME=your_sendgrid_user
SENDGRID_PASSWORD=your_sendgrid_password
```

4. Run migrations to create the tables:

```bash
npm run migrate
```

5. Start the server:

```bash
npm start
```

Server will run on http://localhost:5000

**Note** : All message routes require authentication (JWT token in Authorization header).

**Scheduled Message Sending**

- A cron job runs every minute to check for pending messages (status = pending) and sends them automatically via email.

- Messages are sent according to the UTC timestamp stored in the database.

**Future Improvements**

- Add message attachments
- Allow recurring messages
- User timezone support for scheduling
- Frontend interface for easier message management

**License**

MIT License
