# Prisma Blog App

A modern backend blog platform built with Node.js, Express, Prisma ORM, PostgreSQL, and Better Auth using a clean modular architecture.

This project provides a scalable backend for a blogging platform with authentication, role-based access control, post management, and comment moderation.

# Features

### Authentication & Authorization

- Authentication powered by Better Auth
- Google OAuth support.
- Role-based access control:
  - USER
  - ADMIN

### Blog System

- Users can:

  - Create, edit, delete their own posts
  - Comment on posts

- Admin can:
  - Manage all posts
  - Approve or reject comments

## Post Management

- Draft / Publish / Archive posts
- Tag system
- Featured posts
- View counter
- Thumbnail support

---

## Comment System

- Nested comments (parent-child)
- Approval system
- Admin moderation

# Tech Stack

| Technology      | Purpose            |
| --------------- | ------------------ |
| Node.js         | Runtime            |
| Express.js      | Backend framework  |
| Prisma ORM      | Database ORM       |
| PostgreSQL      | Database           |
| Better Auth     | Authentication     |
| Google OAuth    | Social login       |
| CORS            | API security       |
| Modular Pattern | Clean architecture |

# Project Structure

```bash
prisma-blog-app/
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── better-auth.ts│   │
│   ├── modules/
│   │   ├── post/
│   │   │   ├── post.controller.ts
│   │   │   ├── post.service.ts
│   │   │   ├── post.routes.ts
│   │   │
│   │   │
│   │   ├── comment/
│   │   │   ├── comment.controller.ts
│   │   │   ├── comment.service.ts
│   │   │   ├── comment.routes.ts
│   │
│   ├── app.ts
│   └── server.ts
├── .env
├── package.json
└── README.md
```

# Entity Relationship Diagram (ERD)

### User

- id
- name
- email (unique)
- role (USER | ADMIN)

### Post

- id
- title
- content
- thumbnail
- isFeatured
- status (DRAFT | PUBLISHED | ARCHIVED)
- tags
- views
- authorId
- createdAt
- updatedAt

### Comment

- id
- content
- authorId
- postId
- parentId (nested comments)
- status (APPROVED | REJECTED)
- createdAt
- updatedAt

# Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/prisma-blog-app.git
cd prisma-blog-app
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Setup Environment Variables

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/prisma_blog"
PORT=5000

BETTER_AUTH_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4️⃣ Setup Database

```bash
npx prisma migrate dev
npx prisma generate
```

### 5️⃣ Run Server

```bash
npm run dev
```

## Thank You

**Rakibul Hasan Roki**  
GitHub: [rakibulhasanroki](https://github.com/rakibulhasanroki)
