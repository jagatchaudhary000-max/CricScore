import type { GuideTopic } from './types';

export const drills: GuideTopic = {
  id: 'drills',
  emoji: '🧤',
  title: 'Catching & throwing drills',
  summary: 'Practice exercises for safer hands, faster reactions and accurate throws.',
  sections: [
    {
      title: 'Catching basics',
      chip: 'Basics',
      blocks: [
        {
          kind: 'bullets',
          items: [
            'Watch the ball all the way into your hands. Keep your head still.',
            'Soft hands: let your hands "give" backwards as the ball arrives, so it does not bounce out.',
            'Chest height and above: fingers point up, thumbs together.',
            'Below the waist: fingers point down, little fingers together.',
            'Get your body behind the ball when you can, and call loudly ("MINE!") for high catches.',
          ],
        },
      ],
    },
    {
      title: 'Catching drills',
      chip: 'Catching',
      blocks: [
        {
          kind: 'items',
          items: [
            { name: '1. Wall rebound catches', how: 'Stand 2–3 m from a wall. Throw a tennis ball underarm against it and catch it. Then try one hand, then move closer for faster rebounds.', dose: '3 × 1 min' },
            { name: '2. Partner soft-hands', how: 'Stand 10 m apart and throw at different heights: chest, above the head, by the knees. Focus on giving with the ball.', dose: '20 catches each' },
            { name: '3. High catches (skyers)', how: 'A partner throws or hits the ball very high. Call, move under it early, keep your eyes on the ball, and catch at eye level with soft hands.', dose: '10–15 catches' },
            { name: '4. Reaction / slip catching', how: 'Stand low on your toes, 5–8 m from your partner. They throw hard and fast to your left, right, high and low. Or bounce the ball off a slanted board for surprise angles.', dose: '3 sets × 10' },
            { name: '5. Boundary catches', how: 'Run in or across to catch near a rope or line. Practise this: if you will cross the line, toss the ball up, step back inside, then catch it again.', dose: '10 catches' },
            { name: '6. Diving catches', how: 'Start on your knees on soft grass. The partner throws just out of reach and you dive and land on your side or shoulder, not your elbow. Progress to a standing start.', dose: '6–10 each side' },
            { name: '7. Two-ball juggling', how: 'Juggle two tennis balls in one hand, then two hands. Great for hand-eye coordination at home.', dose: '2–3 min' },
          ],
        },
      ],
    },
    {
      title: 'Throwing basics',
      chip: 'Throw basics',
      blocks: [
        {
          kind: 'bullets',
          items: [
            'Grip the ball across the seam with your first two fingers and thumb.',
            'Turn side-on. Point your front arm and front shoulder at the target.',
            'Step towards the target and throw over the top, elbow at or above shoulder height.',
            'Follow through across your body, with your throwing hand finishing near the opposite hip.',
            'For long throws, aim flat, one bounce into the keeper’s gloves, rather than high and loopy.',
          ],
        },
      ],
    },
    {
      title: 'Throwing drills',
      chip: 'Throwing',
      blocks: [
        {
          kind: 'items',
          items: [
            { name: '1. Target stump', how: 'Place one stump 10–15 m away. Throw overarm and count your hits. Then try underarm flicks from 5 m.', dose: '20 throws; count hits' },
            { name: '2. Attack and throw', how: 'A partner rolls the ball towards you. Run in, pick it up beside your back foot, and throw at the stumps in one smooth movement.', dose: '10 each side' },
            { name: '3. Crow-hop long throws', how: 'Take a short hop towards the target to build momentum, then throw. Aim to reach the keeper at stump height from 30–40 m.', dose: '8–10 throws' },
            { name: '4. Relay throw', how: 'Three players stand in a line about 25–30 m apart. The end player throws to the middle, who turns and throws on to the third. Then reverse.', dose: '5 rounds' },
            { name: '5. Long barrier (ground fielding)', how: 'Turn side-on, put one knee down so it touches the other heel, and keep hands in front so your body blocks the ball if you miss.', dose: '10 balls' },
            { name: '6. Run-out race', how: 'A partner rolls the ball and starts running 22 yards. You must field and hit the stumps before they arrive. This builds speed under pressure.', dose: '6–8 goes' },
          ],
        },
        {
          kind: 'note',
          tone: 'warning',
          text: 'Always warm up your shoulder before hard throws. Limit full-power throws to about 30–40 per session, and stop if your shoulder or elbow hurts.',
        },
      ],
    },
    {
      title: 'A 30-minute fielding session',
      chip: 'Session plan',
      blocks: [
        {
          kind: 'items',
          items: [
            { name: 'Warm-up', how: 'Use the fielding warm-up from the Warm-up & stretching guide.', dose: '8 min' },
            { name: 'Catching', how: 'Wall rebounds, partner soft-hands, then high catches.', dose: '10 min' },
            { name: 'Ground fielding & throwing', how: 'Long barrier, attack and throw, target stump.', dose: '10 min' },
            { name: 'Cool-down', how: 'Gentle shoulder and leg stretches.', dose: '2 min' },
          ],
        },
      ],
    },
  ],
};
