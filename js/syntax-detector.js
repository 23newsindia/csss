// Language detection patterns
const languagePatterns = {
    javascript: /\b(const|let|var|function|return|if|for|while|class)\b/,
    python: /\b(def|class|import|from|return|if|for|while)\b/,
    php: /(<\?php|\b(function|class|public|private|protected|echo|return)\b)/,
    bash: /\b(echo|cd|ls|mkdir|rm|cp|mv)\b/,
    sql: /\b(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE|JOIN)\b/i
};

export function detectLanguage(code) {
    for (const [lang, pattern] of Object.entries(languagePatterns)) {
        if (pattern.test(code)) {
            return lang;
        }
    }
    return 'text'; // Default fallback
}