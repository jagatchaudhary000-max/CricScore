import { describe, expect, it } from 'vitest';
import { GUIDE_TOPICS, getTopic } from './index';

describe('guide content', () => {
  it('has unique topic ids that can be looked up', () => {
    const ids = GUIDE_TOPICS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(getTopic(id)?.id).toBe(id);
    expect(getTopic('nope')).toBeUndefined();
  });

  it('covers the requested topics', () => {
    for (const id of ['warmup', 'food', 'drinks', 'drills', 'rules']) expect(getTopic(id)).toBeDefined();
  });

  it('has no empty topics, sections, blocks or duplicate section chips', () => {
    for (const t of GUIDE_TOPICS) {
      expect(t.title && t.summary && t.emoji).toBeTruthy();
      expect(t.sections.length).toBeGreaterThan(0);
      const chips = t.sections.map((s) => s.chip ?? s.title);
      expect(new Set(chips).size, `duplicate chip in ${t.id}`).toBe(chips.length);
      for (const s of t.sections) {
        expect(s.blocks.length, `${t.id} / ${s.title}`).toBeGreaterThan(0);
        for (const b of s.blocks) {
          if (b.kind === 'text' || b.kind === 'note') expect(b.text.trim()).not.toBe('');
          else expect(b.items.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it('lists all 10 modes of dismissal in the rules', () => {
    const dismissals = getTopic('rules')!.sections.find((s) => s.chip === 'Dismissals')!;
    const block = dismissals.blocks.find((b) => b.kind === 'items');
    expect(block && block.kind === 'items' && block.items.length).toBe(10);
  });
});
