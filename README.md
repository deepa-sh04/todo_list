# Create README.md in main project folder
@'
# Todo App - React + Node.js + MongoDB

A full-stack Todo application with modern web technologies.

## 🛠️ Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Styling**: CSS3

## ✨ Features
- ✅ Add, edit, delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Search todos by text
- ✅ Filter by status (Active/Completed)
- ✅ Filter by priority (High/Medium/Low)
- ✅ Responsive design
- ✅ Real-time updates

## 🚀 Installation

### Backend Setup
\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

### Frontend Setup
\`\`\`bash
cd frontend
npm install
npm start
\`\`\`

## 📁 Project Structure
\`\`\`
todo-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── App.js
    │   └── App.css
    └── package.json
\`\`\`
'@ | Set-Content -Path README.md

# Add and push README
git add README.md
git commit -m "Add README documentation"
git push
