import type { PlopTypes } from "@turbo/gen";

// Learn more about Turborepo Generators at https://turborepo.com/docs/guides/generating-code

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // A simple generator to add a new React component to the internal UI library
  plop.setGenerator("react-component", {
    description: "React Component Generator",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the component?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/index.tsx",
        templateFile: "templates/component.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/index.module.scss",
        template: `@import '../../styles/variables';
@import '../../styles/typography';

.root {
  // Add your styles here
}`,
      },
      {
        type: "append",
        path: "src/index.tsx",
        template: "export { {{pascalCase name}} } from './components/{{pascalCase name}}';",
      },
    ],
  });
}
