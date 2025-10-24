# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


<!-- -------------------
►---Elements we need---
+ Add input element to addNewTask
  - with selection for list
+ 3 Boxes(taskList) with memory
+ Tasks

►-StateVariables-
+ columns
+ newTask
+ activeColumns
+ draggedItem

►-Funcs-
+ dragAndDrop
+ deleteTasks
+ addTasks

---Steps---
► 1st) we'll create the logic
  • Create the 3 boxes, being stateVariables to track tasks inside them

---Dependencies---
► Install and Initialize Tailwind
  • Install
    $ npm install tailwindcss @tailwindcss/vite
  • Configure vite.config.js , add 2 lines:
    + import tailwindcss from '@tailwindcss/vite'
    + plugins: [ ..., tailwindcss(), ],
  • Add an @import to your main CSS file , ie.: in App.css add:
    + @import "tailwindcss";
------------------- ->

<!--
--Coments on learned topics--

Added Dependencies
• react-beautiful-dnd : to facilitate drag and drop functionality
• ant : ant design to use avatars
• styled-component : css & js library that allowas to write css code directly
                     inside react components using js syntax
  ♦ You can create styled version of html components
-->