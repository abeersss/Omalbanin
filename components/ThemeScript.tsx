/**
 * Applies saved theme (light/dark/reading) and font-size class before paint,
 * to avoid a flash of the wrong theme. Runs as an inline script (safe: no
 * external input, just reads localStorage keys this app itself wrote).
 */
export default function ThemeScript() {
  const code = `
(function(){
  try {
    var t = localStorage.getItem('omalbnin-theme') || 'light';
    var fs = localStorage.getItem('omalbnin-fontsize') || 'md';
    var root = document.documentElement;
    if (t === 'dark') root.classList.add('dark');
    if (t === 'reading') root.classList.add('reading');
    root.setAttribute('data-fontsize', fs);
  } catch (e) {}
})();
`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
