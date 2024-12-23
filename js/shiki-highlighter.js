import { CodeProcessor } from './code-processor.js';

const shikiScript = document.createElement('script');
shikiScript.type = 'module'; // Required for ES module loading
shikiScript.src = '/wp-content/plugins/shiki-syntax-highlighter/node_modules/shiki/dist/index.mjs';
document.head.appendChild(shikiScript);

shikiScript.onload = async () => {
    const highlighter = await shiki.getHighlighter({
        theme: 'dark-plus',
        langs: ['javascript', 'python', 'php', 'bash', 'sql', 'text']
    });

    document.querySelectorAll('pre.shiki code').forEach(async codeBlock => {
        await CodeProcessor.processCodeBlock(codeBlock, highlighter);
    });
};