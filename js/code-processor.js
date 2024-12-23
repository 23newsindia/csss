// Handle code block processing
export class CodeProcessor {
    static async processCodeBlock(codeBlock, highlighter) {
        const code = codeBlock.textContent.trim();
        const language = this.getLanguage(codeBlock);
        
        try {
            const highlighted = await highlighter.codeToHtml(code, { lang: language });
            this.updateCodeBlock(codeBlock, highlighted);
        } catch (error) {
            console.warn('Failed to highlight code block:', error);
        }
    }

    static getLanguage(codeBlock) {
        // Get language from class or detect from content
        const classLanguage = codeBlock.className.match(/language-(\w+)/)?.[1];
        return classLanguage || this.detectLanguage(codeBlock.textContent);
    }

    static detectLanguage(code) {
        // Add more language patterns as needed
        const patterns = {
            python: /\b(import|def|class|print|return|if|for|while)\b/,
            javascript: /\b(const|let|var|function|return|if|for|while|class)\b/,
            bash: /\b(echo|cd|ls|mkdir|rm|cp|mv)\b/,
            php: /(<\?php|\b(function|class|public|private|protected|echo|return)\b)/
        };

        for (const [lang, pattern] of Object.entries(patterns)) {
            if (pattern.test(code)) return lang;
        }
        return 'text';
    }

    static updateCodeBlock(codeBlock, highlighted) {
        const temp = document.createElement('div');
        temp.innerHTML = highlighted;
        const highlightedCode = temp.querySelector('code');
        if (highlightedCode) {
            codeBlock.innerHTML = highlightedCode.innerHTML;
        }
    }
}