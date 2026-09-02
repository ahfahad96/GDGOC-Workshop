import http.server
import os
import socketserver
import threading
import urllib.request
import unittest
from html.parser import HTMLParser

FRONTEND_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src', 'frontend')

class DOMIDParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.found_ids = set()
        self.found_scripts = []
        self.found_links = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if 'id' in attr_dict:
            self.found_ids.add(attr_dict['id'])
        if tag == 'script' and 'src' in attr_dict:
            self.found_scripts.append(attr_dict['src'])
        if tag == 'link' and attr_dict.get('rel') == 'stylesheet' and 'href' in attr_dict:
            self.found_links.append(attr_dict['href'])

class TestFrontendServerAndAssets(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.port = 8888
        handler = lambda *args, **kwargs: http.server.SimpleHTTPRequestHandler(*args, directory=FRONTEND_DIR, **kwargs)
        cls.httpd = socketserver.TCPServer(('127.0.0.1', cls.port), handler)
        cls.server_thread = threading.Thread(target=cls.httpd.serve_forever, daemon=True)
        cls.server_thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.httpd.shutdown()
        cls.httpd.server_close()

    def test_static_files_exist(self):
        required_files = ['index.html', 'style.css', 'app.js', 'mock_backend.js']
        for fname in required_files:
            fpath = os.path.join(FRONTEND_DIR, fname)
            self.assertTrue(os.path.isfile(fpath), f"File {fname} does not exist in {FRONTEND_DIR}")

    def test_http_server_serves_index(self):
        url = f"http://127.0.0.1:{self.port}/index.html"
        with urllib.request.urlopen(url) as response:
            self.assertEqual(response.status, 200)
            content = response.read().decode('utf-8')
            self.assertIn("ChatGPT", content)

    def test_dom_elements_present(self):
        index_path = os.path.join(FRONTEND_DIR, 'index.html')
        with open(index_path, 'r', encoding='utf-8') as f:
            content = f.read()

        parser = DOMIDParser()
        parser.feed(content)

        required_ids = {'chat-thread', 'prompt-input', 'send-btn', 'typing-indicator', 'prompt-form'}
        self.assertTrue(required_ids.issubset(parser.found_ids), f"Missing DOM IDs: {required_ids - parser.found_ids}")
        self.assertIn('style.css', parser.found_links)
        self.assertIn('mock_backend.js', parser.found_scripts)
        self.assertIn('app.js', parser.found_scripts)

    def test_xss_sanitization_in_app_js(self):
        app_js_path = os.path.join(FRONTEND_DIR, 'app.js')
        with open(app_js_path, 'r', encoding='utf-8') as f:
            content = f.read()
        self.assertTrue(
            'textContent' in content or 'createTextNode' in content,
            "app.js must use textContent or createTextNode to prevent XSS vulnerabilities"
        )

    def test_ac1_layout_structure(self):
        css_path = os.path.join(FRONTEND_DIR, 'style.css')
        with open(css_path, 'r', encoding='utf-8') as f:
            content = f.read()
        self.assertIn('100vh', content)
        self.assertIn('.chat-thread', content)

    def test_ac2_message_submission_handlers(self):
        app_js_path = os.path.join(FRONTEND_DIR, 'app.js')
        with open(app_js_path, 'r', encoding='utf-8') as f:
            content = f.read()
        self.assertIn('handleSubmit', content)
        self.assertIn('keydown', content)

    def test_ac3_empty_and_whitespace_submission_prevented(self):
        app_js_path = os.path.join(FRONTEND_DIR, 'app.js')
        with open(app_js_path, 'r', encoding='utf-8') as f:
            content = f.read()
        self.assertIn('.trim()', content)
        self.assertIn('sendBtn.disabled', content)

    def test_ac4_input_clearing_and_focus(self):
        app_js_path = os.path.join(FRONTEND_DIR, 'app.js')
        with open(app_js_path, 'r', encoding='utf-8') as f:
            content = f.read()
        self.assertIn("promptInput.value = ''", content)
        self.assertIn('promptInput.focus()', content)

    def test_ac5_mock_backend_invocation_and_contract(self):
        mock_path = os.path.join(FRONTEND_DIR, 'mock_backend.js')
        with open(mock_path, 'r', encoding='utf-8') as f:
            content = f.read()
        self.assertIn('sendMockPrompt', content)
        self.assertIn('assistant', content)

    def test_ac6_assistant_response_appended_to_thread(self):
        app_js_path = os.path.join(FRONTEND_DIR, 'app.js')
        with open(app_js_path, 'r', encoding='utf-8') as f:
            content = f.read()
        self.assertIn("renderMessage('assistant'", content)

    def test_ac7_auto_scroll_behavior(self):
        app_js_path = os.path.join(FRONTEND_DIR, 'app.js')
        with open(app_js_path, 'r', encoding='utf-8') as f:
            content = f.read()
        self.assertIn('scrollTop = chatThread.scrollHeight', content)

if __name__ == '__main__':
    unittest.main()
