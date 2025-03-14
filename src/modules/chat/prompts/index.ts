import { ContextFile, Message, MessageCommand } from '../entities/thread';

export const createChatPrompt = (message: Message): string => {
  if (message.context?.prompt === 'hint-prompt') {
    return createHintPrompt(message);
  }
  return createPrompt(message);
};

export const createHintPrompt = (message: Message) => {
  const filesContext = createFilesContext(message.context?.files || []);
  return `
You are a helpful coding assistant providing a hint for a user working on an algorithm problem.

${filesContext}

Based on the information above, provide ONE concise, helpful hint that will guide the user toward solving the problem without giving away the complete solution. Focus on:

1. If there's no code yet, suggest a starting approach or data structure
2. If there are errors, point out what might be causing ONE specific error
3. If the solution is inefficient, suggest an optimization for ONE part
4. If tests are failing, explain what ONE test case is checking for

You should also look at the user code for comments and see if the user is asking for help in the comments. If so, use that to generate a hint.

Keep your hint under 3 sentences and make it specific to their current progress.
`;
};

export const createPrompt = (message: Message) => {
  const filesContext = createFilesContext(message.context?.files || []);
  const commandsContext = createCommandsContext(message.commands || []);
  return `
Here are your instructions:
<instructions>
${commandsContext}
${message.content}
</instructions>

Here are the context you have access to:
<context>
${filesContext}
</context>

You should follow the instructions and use the context to generate a response.
`;
};
const createFilesContext = (files: ContextFile[]): string => {
  const filesContext = files
    .map(
      (file) => `
${file.description}

<${file.name}>
${file.content}
</${file.name}>

`,
    )
    .join('');

  return filesContext;
};

const createCommandsContext = (commands: MessageCommand[]): string => {
  return commands.map((command) => command.prompt).join('\n');
};
