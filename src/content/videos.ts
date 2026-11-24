/**
 * YouTube video links for the guide. Each link opens a YouTube search, so it never breaks
 * when one particular video is deleted, and always shows current videos.
 */
export interface VideoLink {
  title: string;
  query: string;
}

/** Videos for each section, keyed by `${topicId}/${section chip}`. Tests check every section has some. */
export const SECTION_VIDEOS: Record<string, VideoLink[]> = {
  // Warm-up & stretching
  'warmup/General': [
    { title: 'Cricket warm-up routine', query: 'cricket dynamic warm up routine before match' },
    { title: 'Dynamic stretches explained', query: 'dynamic stretching warm up for sports' },
  ],
  'warmup/Batting': [
    { title: 'Batting warm-up', query: 'cricket batting warm up drills before innings' },
    { title: 'Shadow batting', query: 'cricket shadow batting practice' },
  ],
  'warmup/Bowling': [
    { title: 'Fast bowling warm-up', query: 'fast bowling warm up routine cricket' },
    { title: 'Spin bowling warm-up', query: 'spin bowler warm up fingers wrist cricket' },
  ],
  'warmup/Fielding': [
    { title: 'Fielding warm-up', query: 'cricket fielding warm up drills' },
    { title: 'Shoulder warm-up for throwing', query: 'shoulder warm up before throwing cricket' },
  ],
  'warmup/Cool-down': [{ title: 'Post-match cool-down stretches', query: 'cricket cool down static stretches after match' }],

  // Food
  'food/Timing': [{ title: 'When to eat before a match', query: 'what to eat before a cricket match timing' }],
  'food/Meals': [{ title: 'Cricket match-day meals', query: 'cricketer diet match day meal plan' }],
  'food/Snacks': [{ title: 'Healthy snacks for sport', query: 'healthy pre game snacks for athletes' }],
  'food/Batting': [{ title: 'Nutrition for batters', query: 'cricket nutrition for batsmen long innings' }],
  'food/Bowling': [{ title: 'Nutrition for fast bowlers', query: 'fast bowler diet nutrition cricket' }],
  'food/Fielding': [{ title: 'Eating during a long day in the field', query: 'cricket nutrition during match breaks' }],
  'food/Avoid': [{ title: 'Foods to avoid before sport', query: 'foods to avoid before playing sports' }],
  'food/After': [{ title: 'Recovery food after a match', query: 'post match recovery nutrition cricket' }],

  // Drinks
  'drinks/Plan': [{ title: 'Hydration for cricketers', query: 'hydration tips for cricketers' }],
  'drinks/Best drinks': [
    { title: 'How to make ORS at home', query: 'how to make ORS at home WHO recipe' },
    { title: 'Homemade energy drink for sports', query: 'homemade electrolyte drink nimbu pani for sports' },
  ],
  'drinks/Batting': [{ title: 'Hydration while batting in heat', query: 'cricket batting in heat hydration cramps' }],
  'drinks/Fielding': [{ title: 'Staying hydrated in the field', query: 'cricket fielding in hot weather hydration tips' }],
  'drinks/Caution': [{ title: 'Energy drinks vs sports drinks', query: 'energy drinks vs sports drinks difference' }],
  'drinks/Danger signs': [{ title: 'Heat exhaustion signs & first aid', query: 'heat exhaustion symptoms first aid sports' }],

  // Drills
  'drills/Basics': [{ title: 'How to catch a cricket ball', query: 'how to catch a cricket ball technique' }],
  'drills/Catching': [
    { title: 'Catching drills', query: 'cricket catching drills' },
    { title: 'Slip catching drills', query: 'cricket slip catching drills reaction' },
    { title: 'High catch technique', query: 'cricket high catch technique skyer' },
  ],
  'drills/Throw basics': [{ title: 'How to throw a cricket ball', query: 'how to throw a cricket ball further and accurately' }],
  'drills/Throwing': [
    { title: 'Throwing drills', query: 'cricket throwing drills accuracy' },
    { title: 'Direct hit run-out practice', query: 'cricket direct hit run out drill' },
    { title: 'Ground fielding: long barrier', query: 'cricket long barrier fielding technique' },
  ],
  'drills/Session plan': [{ title: 'Fielding practice session', query: 'cricket fielding practice session drills' }],

  // Rules
  'rules/Basics': [{ title: 'Cricket explained for beginners', query: 'cricket rules explained for beginners' }],
  'rules/Formats': [{ title: 'Test vs ODI vs T20', query: 'test vs odi vs t20 cricket formats explained' }],
  'rules/Runs': [{ title: 'How runs are scored', query: 'cricket how runs are scored explained overthrows' }],
  'rules/Extras': [
    { title: 'Wides and no-balls explained', query: 'cricket wide and no ball rules explained' },
    { title: 'Byes and leg byes explained', query: 'cricket byes and leg byes explained' },
  ],
  'rules/Dismissals': [
    { title: 'All ways to get out', query: 'all 10 ways to get out in cricket explained' },
    { title: 'LBW rule explained', query: 'lbw rule explained cricket' },
  ],
  'rules/Bowling': [{ title: 'Bowling rules explained', query: 'cricket bowling rules no ball bouncer limit explained' }],
  'rules/Fielding': [{ title: 'Fielding restrictions & powerplays', query: 'cricket powerplay fielding restrictions explained' }],
  'rules/Results': [
    { title: 'DRS explained', query: 'DRS decision review system cricket explained' },
    { title: 'DLS method explained', query: 'duckworth lewis stern method explained' },
  ],
  'rules/Signals': [{ title: 'Umpire signals', query: 'cricket umpire signals explained' }],
  'rules/Spirit': [{ title: 'Spirit of cricket', query: 'spirit of cricket MCC explained' }],

  // Equipment & safety
  'safety/Gear': [{ title: 'How to wear cricket gear', query: 'how to wear cricket batting gear properly' }],
  'safety/Bat care': [
    { title: 'How to knock in a bat', query: 'how to knock in a new cricket bat' },
    { title: 'How to oil a bat', query: 'how to oil a cricket bat linseed' },
  ],
  'safety/Injuries': [
    { title: 'Concussion in cricket', query: 'concussion signs cricket player safety' },
    { title: 'First aid for sprains', query: 'RICE first aid sprained ankle' },
  ],
  'safety/Prevention': [{ title: 'Injury prevention for cricketers', query: 'cricket injury prevention exercises fast bowlers' }],
  'safety/Mindset': [{ title: 'Batting mindset & routines', query: 'cricket batting mental routine between balls' }],
  'safety/Checklist': [{ title: 'What to pack in a cricket kit bag', query: 'what to pack in cricket kit bag' }],

  // Glossary
  'glossary/Positions': [{ title: 'Fielding positions explained', query: 'cricket fielding positions explained' }],
  'glossary/Batting': [{ title: 'Cricket terms explained', query: 'cricket terms explained for beginners' }],
  'glossary/Bowling': [{ title: 'Types of bowling deliveries', query: 'types of bowling deliveries cricket explained' }],
  'glossary/Shots': [{ title: 'Every cricket shot explained', query: 'all cricket batting shots explained' }],
};

/**
 * Topics whose cards (exercises, drills, rules, terms) get their own "▶ Video" button.
 * The value is added to the card name to make the YouTube search, e.g. "Crow-hop long throws cricket".
 */
export const ITEM_VIDEO_SUFFIX: Record<string, string> = {
  warmup: 'exercise how to',
  drills: 'cricket drill',
  rules: 'cricket rule explained',
  safety: 'cricket',
  glossary: 'cricket',
};

/** "1. Hip openers ("open the gate")" -> "Hip openers" */
export function itemVideoQuery(name: string, suffix: string): string {
  const clean = name
    .replace(/^\d+\.\s*/, '')
    .replace(/\(.*?\)/g, '')
    .replace(/["“”]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return `${clean} ${suffix}`;
}

export function youtubeSearchUrl(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}
