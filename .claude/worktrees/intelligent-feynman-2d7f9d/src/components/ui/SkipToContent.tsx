/**
 * Skip-to-content link. Visible only when keyboard-focused. Programmatically
 * moves focus into <main> on activation so subsequent Tab / Shift+Tab does
 * the right thing — relying on default `href="#main-content"` is flaky
 * across browsers, especially under HashRouter where the existing hash
 * route is the URL fragment instead of an element id.
 */
export function SkipToContent() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const main = document.getElementById('main-content');
    if (!main) return;
    e.preventDefault();
    main.focus({ preventScroll: false });
  };

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary focus:text-primary-foreground focus:rounded-sm focus:font-light focus:tracking-wide focus:shadow-lg"
    >
      Skip to main content
    </a>
  );
}
