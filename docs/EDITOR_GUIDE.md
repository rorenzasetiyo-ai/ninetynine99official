# Editor Implementation Guide

## Architecture

### Components
1. **index.html** - Main website with 7 responsive sections
2. **docs/editor.html** - Admin dashboard interface
3. **js/admin-bridge.js** - IFrame communication
4. **LocalStorage** - Data persistence

### Flow
```
User opens website
↓
Presses Ctrl+Shift+A
↓
Opens editor.html in modal/popup
↓
Editor loads saved data from localStorage
↓
User edits content
↓
Click Preview (updates temp)
↓
Click Simpan Permanen (saves to localStorage)
↓
Admin bridge syncs to website
↓
Website re-renders with new data
```

## Data Structure

All data stored in localStorage key:
```javascript
ninetynine_admin_data = {
  hero: { /* hero data */ },
  marquee: { /* marquee data */ },
  bestseller: [ /* 4 products */ ],
  collection: { /* collection data */ },
  ourPicks: [ /* 8 products */ ],
  stores: [ /* store locations */ ],
  footer: { /* footer data */ }
}
```

## Implementation Details

### Edit Modes
- **Preview**: Temporary changes, reload resets
- **Permanent Save**: Changes persist to localStorage

### Sync Mechanism
- Editor and website communicate via postMessage
- Admin Bridge listens for changes
- Website re-renders on save

### CSS
- White & black modern theme
- Responsive sidebar navigation
- Smooth transitions
- Professional appearance

## Testing Checklist
- [ ] All 7 sections load correctly
- [ ] Edit form validation works
- [ ] Preview shows changes instantly
- [ ] Save persists to localStorage
- [ ] Website updates on save
- [ ] Data survives page refresh
- [ ] Mobile responsive works
- [ ] No console errors

## Performance
- Minified CSS/JS
- Optimized images
- Lazy loading where applicable
- Efficient localStorage usage
- Fast load time <3 seconds
