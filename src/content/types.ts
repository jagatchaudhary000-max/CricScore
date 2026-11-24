/** A piece of content inside a guide section. */
export type GuideBlock =
  | { kind: 'text'; text: string }
  | { kind: 'bullets'; items: string[] }
  /** Exercise / drill / item cards: a name, how to do it, and an optional dose (reps, time, amount). */
  | { kind: 'items'; items: { name: string; how: string; dose?: string }[] }
  | { kind: 'note'; tone: 'tip' | 'warning'; text: string };

export interface GuideSection {
  title: string;
  /** Short label shown in the section's filter chip, e.g. "Batting". Defaults to the title. */
  chip?: string;
  blocks: GuideBlock[];
  /** YouTube links shown under the section (filled in from videos.ts). */
  videos?: { title: string; query: string }[];
}

export interface GuideTopic {
  id: string;
  emoji: string;
  title: string;
  summary: string;
  sections: GuideSection[];
  /** When set, every card in an `items` block gets a "▶ Video" button searching "<name> <suffix>". */
  itemVideoSuffix?: string;
}
