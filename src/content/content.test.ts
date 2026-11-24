import { describe, expect, it } from 'vitest';
import { GUIDE_TOPICS, getTopic, itemVideoQuery, sectionKey, youtubeSearchUrl } from './index';
import { SECTION_VIDEOS } from './videos';

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

describe('guide videos', () => {
  it('gives every section at least one video, with no unused video entries', () => {
    const used = new Set<string>();
    for (const t of GUIDE_TOPICS) {
      for (const s of t.sections) {
        const key = sectionKey(t.id, s);
        used.add(key);
        expect(s.videos?.length, `no videos for ${key}`).toBeGreaterThan(0);
        for (const v of s.videos!) expect(v.title.trim() && v.query.trim()).toBeTruthy();
      }
    }
    expect(Object.keys(SECTION_VIDEOS).filter((k) => !used.has(k))).toEqual([]);
  });

  it('builds clean item search queries and safe URLs', () => {
    expect(itemVideoQuery('1. Hip openers ("open the gate")', 'exercise')).toBe('Hip openers exercise');
    expect(itemVideoQuery('Nimbu pani (homemade energy drink)', 'x')).toBe('Nimbu pani x');
    expect(youtubeSearchUrl('LBW & DRS')).toBe('https://www.youtube.com/results?search_query=LBW%20%26%20DRS');
  });
});
