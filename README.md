# Agent Sleuth - Spot the Flaw in the Agent

An interactive React web application that challenges users to identify flaws in AI agent workflows by comparing agent behavior with proper HR system procedures.

## 🎯 Overview

Agent Sleuth is an educational game that helps users understand the importance of proper workflow validation and approval processes in HR systems. Users interact with AI agents that have intentional flaws, then compare their behavior with the correct HR system procedures.

## 🚀 Features

- **Three Interactive Workflows:**
  - Book Leave Workflow
  - Transfer Employee Workflow  
  - Provide Employee Feedback Workflow

- **Dual Interface Design:**
  - Left side: AI Agent interface styled like watsonx Orchestrate
  - Right side: HR system interface (WorkFlow - not Workday)

- **Real-time Chat Interaction:**
  - Users can send messages to AI agents
  - Agents respond with intentionally flawed behavior
  - Compare agent responses with proper HR procedures

## 🎮 How to Play

1. **Select a Workflow:** Choose from the three available workflows on the home page
2. **Interact with the Agent:** Send messages to the AI agent on the left side
3. **Spot the Flaws:** Identify what the agent is doing wrong
4. **Compare with HR System:** Review the correct procedures on the right side
5. **Learn:** Understand the importance of proper validation and approval processes

## 🏗️ Project Structure

```
src/
├── components/
│   ├── HomePage.js              # Main landing page
│   ├── AgentInterface.js        # AI agent chat interface
│   ├── HRSystem.js              # HR system interface
│   ├── BookLeaveWorkflow.js     # Leave booking workflow
│   ├── TransferEmployeeWorkflow.js # Employee transfer workflow
│   ├── ProvideFeedbackWorkflow.js  # Feedback workflow
│   └── *.css                    # Component styles
├── App.js                       # Main app component with routing
├── index.js                     # App entry point
└── *.css                        # Global styles
```

## 🛠️ Installation & Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Development Server:**
   ```bash
   npm start
   ```

3. **Open in Browser:**
   Navigate to `http://localhost:3000`

## 🎨 Design Features

- **Modern UI:** Clean, professional interface with gradient backgrounds
- **Responsive Design:** Works on desktop and tablet devices
- **Interactive Elements:** Hover effects, smooth transitions, and engaging animations
- **Professional Styling:** Mimics real enterprise software interfaces

## 🔍 Example Flaws in the Agents

### Book Leave Agent Flaws:
- Skips leave balance verification
- Bypasses manager approval process
- Ignores company policies
- Approves unlimited leave days

### Transfer Employee Agent Flaws:
- Doesn't verify employee existence
- Skips all approval workflows
- Ignores department validation
- Processes transfers immediately without coordination

### Feedback Agent Flaws:
- Submits feedback without verification
- Gives perfect ratings without criteria
- Skips face-to-face meetings
- Ignores performance metrics

## 🛡️ Built With

- **React 18** - Frontend framework
- **React Router** - Navigation and routing
- **CSS3** - Styling and animations
- **JavaScript ES6+** - Modern JavaScript features

## 📝 License

This project is created for educational purposes to demonstrate the importance of proper workflow validation in AI systems.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Note:** This is an educational tool designed to highlight the importance of proper validation and approval processes in AI-powered HR systems.
