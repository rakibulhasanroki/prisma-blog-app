import { betterAuth, string } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

import nodemailer from "nodemailer";

// nodemailer

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.APP_URL!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verifiactionLink = `${process.env.APP_URL}/verify-email?token=${token}`;

        const info = await transporter.sendMail({
          from: '"Prisma Blog" <prismablog@testmail.email>',
          to: user.email,
          subject: "Email Verification",

          html: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: Arial, Helvetica, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
      }
      .header {
        background: #4f46e5;
        color: #ffffff;
        padding: 20px;
        text-align: center;
        font-size: 22px;
        font-weight: bold;
      }
      .content {
        padding: 30px;
        color: #333333;
        line-height: 1.6;
        font-size: 16px;
      }
      .btn {
        display: inline-block;
        margin-top: 20px;
        padding: 12px 24px;
      
        color: #f9fafb;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
      }
      .footer {
        padding: 15px;
        text-align: center;
        font-size: 12px;
        color: #777777;
        background: #f9fafb;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        Prisma Blog
      </div>

      <div class="content">
        <p>Hello ${user.name}</p>

        <p>
          Thank you for registering on <strong>Prisma Blog</strong>.
          Please verify your email address by clicking the button below:
        </p>

        <p style="text-align: center;">
          <a href="${verifiactionLink}" class="btn" >Verify Email</a>
        </p>
           <p style="text-align: center;">
          ${url}
        </p>

        <p>
          If you did not create an account, you can safely ignore this email.
        </p>

        <p>
          Thanks,<br />
          <strong>Prisma Blog Team</strong>
        </p>
      </div>

      <div class="footer">
        © 2026 Prisma Blog. All rights reserved.
      </div>
    </div>
  </body>
</html>
`,
        });

        console.log("Message sent:", info.messageId);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
