'use strict';

const { Plugin, editorInfoField } = require('obsidian');
const { EditorView } = require('@codemirror/view');

// 25.10.2026
function formatDate(d) {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${d.getFullYear()}`;
}

function dayKey(d) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

module.exports = class TopDateStampPlugin extends Plugin {
  async onload() {
    const data = (await this.loadData()) || {};
    this.stamped = data.stamped || {}; // file path -> dayKey of last stamp

    this.registerEditorExtension(
      EditorView.inputHandler.of((view, from, to, text) => this.onInput(view, from, to, text))
    );

    this.registerEvent(
      this.app.vault.on('rename', (file, oldPath) => {
        if (this.stamped[oldPath]) {
          this.stamped[file.path] = this.stamped[oldPath];
          delete this.stamped[oldPath];
          this.save();
        }
      })
    );
  }

  onInput(view, from, to, text) {
    // Only a plain typed character at the very top of the document.
    if (from !== 0 || to !== 0 || !text || text.includes('\n')) return false;
    if (view.composing) return false;

    const info = view.state.field(editorInfoField, false);
    const file = info && info.file;
    if (!file) return false;

    const now = new Date();
    const today = dayKey(now);
    if (this.stamped[file.path] === today) return false;

    const stamp = formatDate(now);
    const firstLine = view.state.doc.line(1).text.trim();
    this.stamped[file.path] = today;
    this.save();
    if (firstLine === stamp) return false; // already dated today by hand

    const insert = `${stamp}\n${text}`;
    view.dispatch({
      changes: { from: 0, to: 0, insert },
      selection: { anchor: insert.length },
      userEvent: 'input.type',
    });
    return true;
  }

  save() {
    // Keep only today's entries so the data file never grows.
    const today = dayKey(new Date());
    for (const k of Object.keys(this.stamped)) {
      if (this.stamped[k] !== today) delete this.stamped[k];
    }
    this.saveData({ stamped: this.stamped });
  }
};
