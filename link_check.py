import pathlib
import re
root = pathlib.Path('Z1')
html_files = list(root.glob('*.html'))
link_re = re.compile(r'href\s*=\s*"([^"]+)"|src\s*=\s*"([^"]+)"')
missing = []
for path in html_files:
    text = path.read_text(encoding='utf-8', errors='ignore')
    for m in link_re.finditer(text):
        target = m.group(1) or m.group(2)
        if not target or target.startswith(('http://','https://','#','mailto:','tel:')):
            continue
        if target.startswith('assets/'):
            continue
        if target.startswith('..'):
            continue
        target = target.split('?')[0].split('#')[0]
        if target == '' or target == '/':
            continue
        if not (root / target).exists():
            missing.append((path.name, target))
print('MISSING', len(missing))
for f, t in missing:
    print(f, '->', t)
