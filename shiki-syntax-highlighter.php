<?php
/**
 * Plugin Name: Shiki Syntax Highlighter
 * Description: A beautiful syntax highlighter using Shiki
 * Version: 1.0.3
 * Author: Your Name
 */

if (!defined('ABSPATH')) exit;

require_once plugin_dir_path(__FILE__) . 'includes/class-content-cleaner.php';

class Shiki_Syntax_Highlighter {
    private $content_cleaner;

    public function __construct() {
        $this->content_cleaner = new Shiki_Content_Cleaner();
        add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
        add_filter('the_content', array($this, 'process_content'), 20);
    }

    public function enqueue_assets() {
        wp_enqueue_style(
            'shiki-highlighter-styles',
            plugin_dir_url(__FILE__) . 'css/shiki-highlighter.css',
            array(),
            '1.0.3'
        );

        // Enqueue the script as a module
        wp_enqueue_script(
            'shiki-highlighter',
            plugin_dir_url(__FILE__) . 'js/shiki-highlighter.js',
            array(),
            '1.0.3',
            true
        );
        
        // Add type="module" to the script tag
        add_filter('script_loader_tag', function($tag, $handle) {
            if ('shiki-highlighter' === $handle) {
                return str_replace('<script', '<script type="module"', $tag);
            }
            return $tag;
        }, 10, 2);
    }

    public function process_content($content) {
        return $this->content_cleaner->clean_content($content);
    }
}

new Shiki_Syntax_Highlighter();