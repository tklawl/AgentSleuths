# Component Architecture

## Core Components

### `AgentMessage`
- **Purpose**: Renders individual chat messages with click handling
- **Features**: 
  - Supports different message types (user/agent)
  - Handles clickable states and error highlighting
  - Renders special components (LeaveTypeSelector, WorkflowOptions)
- **Props**: `message`, `index`, `onMessageClick`, `onLeaveTypeSelect`, `onWorkflowSelect`

### `MessageList`
- **Purpose**: Renders a list of messages using AgentMessage components
- **Features**: Maps through messages and renders each one
- **Props**: `messages`, `onMessageClick`, `onLeaveTypeSelect`, `onWorkflowSelect`

### `WorkflowContainer`
- **Purpose**: Reusable container for all workflow pages
- **Features**: 
  - Combines AgentInterface and HRSystem
  - Handles HR panel toggle
  - Provides back navigation
- **Props**: All workflow-related props including title, messages, handlers, etc.

## Custom Hooks

### `useMessageClick`
- **Purpose**: Centralized message click handling logic
- **Features**: 
  - Handles single and double error detection
  - Manages click counts and clickable states
  - Integrates with game scoring system
- **Returns**: `{ handleMessageClick }`

### `useHRPanel`
- **Purpose**: Manages HR panel visibility state
- **Features**: 
  - Toggle functionality
  - Configurable initial state
- **Returns**: `{ showHRPanel, toggleHRPanel }`

## Benefits of Refactoring

1. **Reusability**: Components can be easily reused across different workflows
2. **Maintainability**: Logic is centralized in custom hooks
3. **Consistency**: All workflows use the same components and patterns
4. **Testability**: Smaller, focused components are easier to test
5. **Readability**: Code is more organized and easier to understand
