import type { GuideTopic } from './types';
import { warmup } from './warmup';
import { food } from './food';
import { drinks } from './drinks';
import { drills } from './drills';
import { rules } from './rules';
import { safety } from './safety';
import { glossary } from './glossary';

export type { GuideBlock, GuideSection, GuideTopic } from './types';

/** All guide topics, in the order they appear on the Guide tab. */
export const GUIDE_TOPICS: GuideTopic[] = [warmup, food, drinks, drills, rules, safety, glossary];

export function getTopic(id: string): GuideTopic | undefined {
  return GUIDE_TOPICS.find((t) => t.id === id);
}
