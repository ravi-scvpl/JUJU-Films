# JUJU Films Blog HTML Structure Guide

This document outlines the standard HTML markup format to write or paste into the admin blog editor. By adhering to this structure, the frontend will automatically generate the premium, custom magazine layout featuring dynamic sidebars, sticky Table of Contents, section labels, pullquotes, and accordion FAQs.

---

## 1. Article Introduction (First 2 Paragraphs)

The first two `<p>` elements at the very top of your HTML (before any `<h2>` tag) are automatically extracted to serve as the bold, large-font introduction in the Hero section's double-column layout.

**Example HTML:**
```html
<p>Audiences do not care about characters because they are <strong>likable</strong>. They care because something about the character still feels <strong>unresolved</strong>.</p>
<p>That unresolved quality creates curiosity, tension, and the feeling that something still matters. Without it, a character can be entertaining and still be forgettable.</p>
```

---

## 2. Headings & Section Labels

Each `<h2>` heading represents a new section. The frontend automatically:
1. Generates an anchor ID from the heading text (enabling TOC click-to-scroll).
2. Prepends a styled monospace section label (e.g., `01 — THE CORE PROBLEM`).

### Overriding the Section Label Text
If you want to customize the text of the label rather than letting the parser generate it, insert a `<div class="section-label">Your Label</div>` directly before the `<h2>` tag.

**Example HTML:**
```html
<!-- Custom label override -->
<div class="section-label">The Core Problem</div>
<h2>Why Audiences Follow Some Characters And Forget Others</h2>
```

---

## 3. Pullquotes / Blockquotes

To insert a styled editorial callout with a red left border and dark block background, wrap your quote in a `<blockquote>` element or use the `.pullquote` class.

**Example HTML:**
```html
<blockquote>
    "The audience is not watching to see what happens. They are watching because they are afraid of what might happen — and they need to know."
</blockquote>
```

---

## 4. Key Takeaways / Highlight Box

To show a highlighted grey block with custom bullet list items, wrap a title and list inside a `.highlight-box` container.

**Example HTML:**
```html
<div class="highlight-box">
    <div class="highlight-box-title">What creates audience investment</div>
    <ul>
        <li>A character who wants something specific they cannot easily get</li>
        <li>An obstacle that reveals something true about who the character is</li>
        <li>A cost — something the character risks by trying to get what they want</li>
    </ul>
</div>
```

---

## 5. Numbered Lists (Monospace Numbers)

To display a custom numbered list with bold uppercase monospace subtitles and red numbers, apply the `.numbered-list` class to an `<ol>`.

**Example HTML:**
```html
<ol class="numbered-list">
    <li>
        <strong>Inconsistency Under Pressure</strong>
        A character who behaves consistently in comfort but inconsistently under pressure feels human.
    </li>
    <li>
        <strong>Self-Deception</strong>
        Characters who misread their own motivations create dramatic irony.
    </li>
</ol>
```

---

## 6. Visual FAQ Accordions & Schema Generation

When you add an FAQ section, the parser will automatically build the visual collapsible accordions on the page and generate the search-engine-friendly `FAQPage` schema.

**Important Structural Rules:**
1. Start with an `<h2>FAQ</h2>` (or `<h2>Frequently Asked Questions</h2>`) heading.
2. For each question, use an `<h3>` containing the question text.
3. For each answer, use a `<p>` immediately below the `<h3>`.

**Example HTML:**
```html
<h2>FAQ</h2>

<h3>What makes a character feel relatable?</h3>
<p>A character feels relatable when the audience recognises an emotion, conflict, or insecurity they understand.</p>

<h3>Do characters need to be likable?</h3>
<p>No. Audiences often connect more strongly with characters who are flawed, complicated, or still working through something.</p>
```
