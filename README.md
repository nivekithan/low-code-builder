# Low Code Builder

A visual, node-based low-code builder for creating API endpoints through an intuitive drag-and-drop interface. Built with Electron, React Flow, and TypeScript, it compiles visual workflows into deployable Cloudflare Workers.

## Features

- **Visual API Design**: Build API endpoints using a node-based visual editor
- **Node-Based Workflow**: Connect nodes to define API logic including:
  - API Request nodes (GET, POST, PUT, DELETE)
  - API Response nodes
  - Conditional logic (If/Else) nodes
- **Auto-Layout**: Automatic graph layout using Dagre and ELK algorithms
- **Real-time Autosave**: Changes are automatically saved as you work
- **Code Generation**: Compiles visual workflows into production-ready JavaScript code
- **Cloudflare Workers**: Generated code is ready to deploy to Cloudflare Workers
- **Desktop Application**: Cross-platform Electron app for local development

## Tech Stack

### Frontend
- **Electron**: Desktop application framework
- **React**: UI framework
- **React Flow (@xyflow/react)**: Node-based editor
- **TanStack Router**: Type-safe routing
- **TanStack Query**: Data fetching and caching
- **Tailwind CSS**: Styling
- **Radix UI**: Accessible UI components
- **Monaco Editor**: Code editor for JavaScript expressions
- **Framer Motion**: Animations

### Backend
- **tRPC**: End-to-end type-safe API
- **Drizzle ORM**: Type-safe database access
- **Better SQLite3**: Embedded database
- **TypeScript Compiler API**: AST generation and code compilation

### Code Generation
- **Hono**: Lightweight web framework for generated APIs
- **Cloudflare Workers**: Deployment target

## Project Structure

```
low-code-builder/
├── electron/                 # Electron main process
│   ├── api/                 # tRPC API routes
│   │   ├── projects.ts     # Project management endpoints
│   │   └── directory.ts    # Directory operations
│   ├── lib/
│   │   ├── compiler/       # Code compilation pipeline
│   │   │   ├── lexer/      # Tokenization
│   │   │   ├── parser/     # Graph parsing
│   │   │   └── codegen/    # Code generation
│   │   └── models/         # Database models
│   └── main.ts             # Electron entry point
├── src/                     # React frontend
│   ├── routes/             # Application routes
│   │   ├── index.tsx       # Project list
│   │   └── projects/       # Project editor
│   ├── customNodes/        # Custom React Flow nodes
│   │   ├── nodes/          # Node implementations
│   │   └── edges/          # Edge implementations
│   ├── components/         # Reusable UI components
│   └── features/           # Feature-specific code
├── common/                  # Shared types and utilities
├── migrations/              # Database migrations
└── docs/                    # Documentation
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd low-code-builder
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

This will start the Electron application in development mode with hot reload.

### Building

Build the application for production:

```bash
pnpm build
```

This will:
1. Compile TypeScript
2. Build the React application
3. Package the Electron app

## Usage

### Creating a Project

1. Launch the application
2. Create a new project from the home screen
3. Enter your project name

### Building an API Endpoint

1. Open a project to access the visual editor
2. Add nodes from the available node types:
   - **API Request**: Defines the HTTP method (GET, POST, PUT, DELETE) and headers
   - **API Response**: Returns a response with JavaScript expressions
   - **If/Else Condition**: Adds conditional logic to your workflow

3. Connect nodes to define the flow of your API logic
4. Configure each node:
   - Set HTTP methods
   - Define custom headers
   - Write JavaScript expressions for responses and conditions
   - Name output variables

5. The workflow is automatically saved as you make changes

### Node Types

#### API Request Node
- Select HTTP method (GET, POST, PUT, DELETE)
- Define custom headers
- Set output variable name (default: "request")
- Entry point for your API route

#### API Response Node
- Write JavaScript expressions for response text
- Access variables from previous nodes
- Terminates the request flow

#### If/Else Condition Node
- Write JavaScript conditional expressions
- Create branching logic in your API
- Set output variable name (default: "condition")
- Connect different paths for true/false outcomes

### Publishing

Click the "Publish" button to compile your visual workflow into deployable code. The compiler will:

1. **Tokenize**: Convert nodes and edges into a graph structure
2. **Parse**: Transform the graph into an abstract syntax tree (AST)
3. **Generate**: Create production-ready JavaScript code
4. **Package**: Output a complete Cloudflare Workers project with:
   - `index.js`: Main application file
   - `package.json`: Dependencies and scripts
   - `wrangler.toml`: Cloudflare Workers configuration
   - Route files in `api-routes/` directory

## Development

### Available Scripts

- `pnpm dev`: Start development server
- `pnpm build`: Build for production
- `pnpm lint`: Run ESLint
- `pnpm codegen:playground`: Test code generation

### Database

The application uses SQLite with Drizzle ORM. Database schema is defined in `electron/lib/schema.ts`.

Migrations are stored in the `migrations/` directory and applied automatically on startup.

### Code Generation Pipeline

The compiler follows a three-stage pipeline:

1. **Lexer** (`electron/lib/compiler/lexer/`): Tokenizes nodes and edges
2. **Parser** (`electron/lib/compiler/parser/`): Builds an intermediate representation
3. **Codegen** (`electron/lib/compiler/codegen/`): Generates TypeScript AST and outputs JavaScript

## Current Limitations

- Each project currently supports only one route (`__index`)
- Limited to basic API operations and conditional logic
- Generated code targets Cloudflare Workers only

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

[Add your license here]

## Acknowledgments

- Built with [React Flow](https://reactflow.dev/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Icons from [Lucide](https://lucide.dev/) and [Heroicons](https://heroicons.com/)
