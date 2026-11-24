import type { GuideTopic } from './types';
import { warmup } from './warmup';
import { food } from './food';
import { drinks } from './drinks';
import { drills } from './drills';
import { rules } from './rules';
import { safety } from './safety';
import { glossary } from './glossary';
import { ITEM_VIDEO_SUFFIX, SECTION_VIDEOS } from './videos';

export type { GuideBlock, GuideSection, GuideTopic } from './types';
export { itemVideoQuery, youtubeSearchUrl } from './videos';

export const sectionKey = (topicId: string, section: { chip?: string; title: string }) =>
  `${topicId}/${section.chip ?? section.title}`;

const withVideos = (t: GuideTopic): GuideTopic => ({
  ...t,
  itemVideoSuffix: ITEM_VIDEO_SUFFIX[t.id],
  sections: t.sections.map((s) => ({ ...s, videos: SECTION_VIDEOS[sectionKey(t.id, s)] ?? [] })),
});

/** All guide topics, in the order they appear on the Guide tab. */
export const GUIDE_TOPICS: GuideTopic[] = [warmup, food, drinks, drills, rules, safety, glossary].map(withVideos);

export function getTopic(id: string): GuideTopic | undefined {
  return GUIDE_TOPICS.find((t) => t.id === id);
}
