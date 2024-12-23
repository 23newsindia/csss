<?php
class Shiki_Content_Cleaner {
    public function clean_content($content) {
        // Remove outer pre tags when they wrap shiki pre tags
        $content = preg_replace(
            '/<pre>\s*(<pre class="shiki.*?".*?>.*?<\/pre>)\s*<\/pre>/s',
            '$1',
            $content
        );

        // Remove duplicate shiki pre tags
        $content = preg_replace(
            '/<pre class="shiki.*?".*?>\s*(<pre class="shiki.*?".*?>.*?<\/pre>)\s*<\/pre>/s',
            '$1',
            $content
        );

        // Add shiki class to plain code blocks
        $content = preg_replace_callback(
            '/<code>(.*?)<\/code>/s',
            function($matches) {
                // Only wrap in shiki if not already wrapped
                if (strpos($matches[0], 'shiki') === false) {
                    return '<pre class="shiki dark-plus" style="background-color:#1E1E1E"><code>' . 
                           $matches[1] . 
                           '</code></pre>';
                }
                return $matches[0];
            },
            $content
        );

        return $content;
    }
}