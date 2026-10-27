# Top Date Stamp

An Obsidian plugin that dates your notes for you.

The first time each day you type above all the text in a note (anywhere in the blank gap at the top), it inserts today's date (`dd.mm.yyyy`) on its own line, with two empty lines above it. Tomorrow you just click into that gap and type again.

```


27.10.2026
your new thought here…

25.10.2026
yesterday's thought…
```

## How it behaves
- **Once per note per day.** Type at the top again the same day and nothing is added.
- **Only above your text.** The cursor can be on any blank line at the top; typing below the first line of text never adds a date.
- **Keeps a gap.** Two empty lines above the date, and one empty line between today's text and older text.
- **No duplicates.** If the first line of text is already today's date (typed by hand), it does nothing.
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
