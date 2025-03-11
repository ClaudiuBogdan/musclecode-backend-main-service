import { Message } from '../entities/thread';

export const createChatPrompt = (message: Message) => {
  if (message.context?.prompt === 'hint-prompt') {
    return createHintPrompt(message);
  }
  return message.content;
};

export const createHintPrompt = (message: Message) => {
  const files = message.context?.files || [];
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
