/**
 * Simple markdown parser for blog content
 * Converts markdown syntax to styled HTML
 */

export function parseMarkdown(content: string): string {
  // Trim and normalize line endings
  let html = content.trim();

  // Escape HTML entities first (except for our markdown syntax)
  html = html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Process blocks first (headers, lists, etc.)
  const lines = html.split('\n');
  const processedLines: string[] = [];
  let inList = false;
  let listType: 'ul' | 'ol' | null = null;
  let inParagraph = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // H2 headers
    if (line.startsWith('## ')) {
      if (inList) {
        processedLines.push(listType === 'ul' ? '</ul>' : '</ol>');
        inList = false;
        listType = null;
      }
      if (inParagraph) {
        processedLines.push('</p>');
        inParagraph = false;
      }
      const headerText = line.slice(3);
      processedLines.push(`<h2 class="article-h2">${headerText}</h2>`);
      continue;
    }

    // H3 headers
    if (line.startsWith('### ')) {
      if (inList) {
        processedLines.push(listType === 'ul' ? '</ul>' : '</ol>');
        inList = false;
        listType = null;
      }
      if (inParagraph) {
        processedLines.push('</p>');
        inParagraph = false;
      }
      const headerText = line.slice(4);
      processedLines.push(`<h3 class="article-h3">${headerText}</h3>`);
      continue;
    }

    // Unordered list items
    if (line.startsWith('- ')) {
      if (inParagraph) {
        processedLines.push('</p>');
        inParagraph = false;
      }
      if (!inList || listType !== 'ul') {
        if (inList) processedLines.push('</ol>');
        processedLines.push('<ul class="article-ul">');
        inList = true;
        listType = 'ul';
      }
      const listText = line.slice(2);
      processedLines.push(`<li class="article-li">${listText}</li>`);
      continue;
    }

    // Ordered list items (1. 2. 3. etc.)
    const orderedMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (orderedMatch) {
      if (inParagraph) {
        processedLines.push('</p>');
        inParagraph = false;
      }
      if (!inList || listType !== 'ol') {
        if (inList) processedLines.push('</ul>');
        processedLines.push('<ol class="article-ol">');
        inList = true;
        listType = 'ol';
      }
      processedLines.push(`<li class="article-li">${orderedMatch[2]}</li>`);
      continue;
    }

    // Empty line - close any open structures
    if (line.trim() === '') {
      if (inList) {
        processedLines.push(listType === 'ul' ? '</ul>' : '</ol>');
        inList = false;
        listType = null;
      }
      if (inParagraph) {
        processedLines.push('</p>');
        inParagraph = false;
      }
      continue;
    }

    // Regular text - wrap in paragraph
    if (inList) {
      processedLines.push(listType === 'ul' ? '</ul>' : '</ol>');
      inList = false;
      listType = null;
    }

    if (!inParagraph) {
      processedLines.push('<p class="article-p">');
      inParagraph = true;
    } else {
      // Continue paragraph with a space
      processedLines.push(' ');
    }
    processedLines.push(line);
  }

  // Close any remaining open tags
  if (inList) {
    processedLines.push(listType === 'ul' ? '</ul>' : '</ol>');
  }
  if (inParagraph) {
    processedLines.push('</p>');
  }

  html = processedLines.join('\n');

  // Process inline formatting
  // Bold text
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="article-strong">$1</strong>');

  // Italic text
  html = html.replace(/\*([^*]+)\*/g, '<em class="article-em">$1</em>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="article-code">$1</code>');

  return html;
}
