import re
import unittest
from pathlib import Path
from html.parser import HTMLParser

PROJECT_ROOT = Path(__file__).parent.parent
SRC_DIR = PROJECT_ROOT / "src"
INDEX_HTML = SRC_DIR / "index.html"
STYLES_CSS = SRC_DIR / "styles.css"
APP_JS = SRC_DIR / "app.js"


class HTMLSimpleParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.ids = {}
        self.classes = {}

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        self.tags.append((tag, attr_dict))
        if 'id' in attr_dict:
            self.ids[attr_dict['id']] = tag
        if 'class' in attr_dict:
            for cls in attr_dict['class'].split():
                self.classes.setdefault(cls, []).append(tag)


class TestGallerySpecCoverage(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.html_content = INDEX_HTML.read_text(encoding="utf-8")
        cls.css_content = STYLES_CSS.read_text(encoding="utf-8")
        cls.js_content = APP_JS.read_text(encoding="utf-8")

        cls.parser = HTMLSimpleParser()
        cls.parser.feed(cls.html_content)

    def test_ac1_renders_exactly_10_items_in_data(self):
        """AC1: Verify dataset contains 10 item objects."""
        items = re.findall(r'id:\s*"gallery-item-\d+"', self.js_content)
        self.assertEqual(len(items), 10, f"Expected 10 items in GALLERY_DATA, found {len(items)}")

    def test_ac1_html_structure_containers(self):
        """AC1: Verify HTML contains required grid and modal containers."""
        self.assertIn("gallery-grid", self.parser.ids)
        self.assertIn("image-modal", self.parser.ids)

    def test_ac2_card_rendering_logic(self):
        """AC2: Verify card rendering logic in app.js includes title, tags, likes, and image."""
        self.assertIn("createCardElement", self.js_content)
        self.assertIn("gallery-card", self.js_content)
        self.assertIn("card-title", self.js_content)
        self.assertIn("tag-pill", self.js_content)
        self.assertIn("card-likes", self.js_content)

    def test_ac3_desktop_column_count_css(self):
        """AC3: Verify CSS column-count >= 2 for desktop."""
        match = re.search(r'\.gallery-grid\s*\{[^}]*column-count:\s*(\d+)', self.css_content)
        self.assertIsNotNone(match, "column-count missing in .gallery-grid")
        col_count = int(match.group(1))
        self.assertGreaterEqual(col_count, 2)

    def test_ac3_break_inside_avoid_css(self):
        """AC3: Verify break-inside: avoid on gallery cards."""
        self.assertIn("break-inside: avoid", self.css_content)

    def test_ac4_mobile_single_column_css(self):
        """AC4: Verify CSS column-count: 1 in mobile media query."""
        self.assertIn("@media (max-width: 767px)", self.css_content)
        self.assertIn("column-count: 1", self.css_content)

    def test_ac5_modal_open_functions(self):
        """AC5: Verify modal open and populated functions exist."""
        self.assertIn("function openModal", self.js_content)
        self.assertIn("modal-open", self.js_content)

    def test_ac6_modal_close_controls(self):
        """AC6: Verify modal close controls and escape key listener."""
        self.assertIn("function closeModal", self.js_content)
        self.assertIn("modal-close", self.html_content)
        self.assertIn("modal-backdrop", self.html_content)
        self.assertIn("Escape", self.js_content)

    def test_ac7_offline_compliance(self):
        """AC7: Verify HTML, CSS, and JS do not reference external HTTP/HTTPS links (except SVG namespace)."""
        for name, content in [("index.html", self.html_content), ("styles.css", self.css_content), ("app.js", self.js_content)]:
            matches = re.findall(r'https?://[^\s\'"<>]+', content)
            filtered = [m for m in matches if "w3.org/2000/svg" not in m]
            self.assertEqual(len(filtered), 0, f"External URL found in {name}: {filtered}")


if __name__ == "__main__":
    unittest.main()
