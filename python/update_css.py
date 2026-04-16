#!/usr/bin/env python3

# Read minified CSS
with open('css/style.css', 'r') as f:
    css = f.read()

# Replace the image hover scale animations (1.04 -> 1.05)
css = css.replace('scale(1.04)', 'scale(1.05)')

# Update the transition easing for smoother hover animation
css = css.replace('0.6s ease;', '0.6s cubic-bezier(0.4,0,0.2,1);')

# Add bestseller section styling with centered text
bestseller_addition = '#bestseller .container{text-align:center;}#bestseller .section-head{justify-content:center;text-align:center;margin-bottom:56px;}#bestseller .section-label{display:block;margin-bottom:12px;letter-spacing:0.25em;color:var(--mid);font-size:10px;}'

# Find #bestseller and add container/section-head styling after it if not already there
if '#bestseller{background:var(--white);}' in css:
    css = css.replace('#bestseller{background:var(--white);}', '#bestseller{background:var(--white);}' + bestseller_addition)
    print('✓ Updated #bestseller styling')

# Write updated CSS
with open('css/style.css', 'w') as f:
    f.write(css)

print('✅ CSS updated successfully!')
print('🎨 Changes:')
print('  • Image hover scale: 1.04 → 1.05 (5% zoom)')
print('  • Hover animation: smooth cubic-bezier easing')
print('  • Section centered: "Most Loved" and "Best Seller" aligned center')
