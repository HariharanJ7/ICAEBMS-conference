# Conference Site (React + Node + MySQL)

This archive contains a React frontend and Node.js/Express backend for a conference website (ICAEBMS).

## Quick start

1. Edit api/.env from .env.example to set DB and SMTP values.
2. Create the MongpoDB Sequalize database.
3. Install backend deps:
   cd client
   npm init -y
   npm i express cors dotenv mongoose sequelize sqlite3 multer nodemailer
   npm i -D nodemon
4. Seed admin account:
   node seed-admin.js
5. Start backend:
   npm run dev
6. Install frontend deps:
   cd ../client
   npm create vite@latest . -- --template react
   npm i
   npm i react-router-dom
   npm i -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
7. Start frontend:
   npm run dev

Frontend will open at http://localhost:5173 and backend at http://localhost:4000.

