# Top Date Stamp

An Obsidian plugin that dates your notes for you.

The first time you type at the very top of a note each day, it inserts today's date (`dd.mm.yyyy`) on its own line, then your text continues below it.

```
25.10.2026
your new thought here…
```

## How it behaves
- **Once per note per day.** Type at the top again the same day and nothing is added.
- **Only at the very top.** Typing anywhere else in the note never adds a date.
- **No duplicates.** If line 1 is already today's date (typed by hand), it does nothing.
- **Safe with IME input** (Vietnamese, Chinese, Japanese…): it ignores composition in progress and pasted multi-line text.
- **Renaming a note** keeps today's stamp, so it won't date the note twice.
- The data file holds only today's entries, so it never grows.
- Works on desktop and mobile.

## Install (manual)
1. In your vault, create the folder `.obsidian/plugins/top-date-stamp/`.
2. Copy `main.js` and `manifest.json` from this repo into it.
3. In Obsidian: **Settings → Community plugins**, turn off Restricted mode if needed, then enable **Top Date Stamp**.

## Change the date format
Edit `formatDate()` in `main.js`. For example, ISO format:

```js
return `${d.getFullYear()}-${mm}-${dd}`;
```

## License
MIT
