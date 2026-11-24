import type { GuideTopic } from './types';

export const safety: GuideTopic = {
  id: 'safety',
  emoji: '🪖',
  title: 'Equipment, safety & mindset',
  summary: 'Protective gear, looking after your bat, injury first aid, and staying mentally sharp.',
  sections: [
    {
      title: 'Protective gear (hard ball)',
      chip: 'Gear',
      blocks: [
        {
          kind: 'items',
          items: [
            { name: 'Helmet with grille', how: 'Always wear one when batting against a hard ball, and when fielding close in (short leg, silly point). The keeper needs one when standing up to the stumps.' },
            { name: 'Abdominal guard (box)', how: 'Must-have for every batter and the wicketkeeper.' },
            { name: 'Batting pads & gloves', how: 'Pads should cover from the top of your foot to above the knee. Choose gloves that let you grip comfortably.' },
            { name: 'Thigh, arm and chest guards', how: 'Useful against fast or bouncy bowling.' },
            { name: 'Shoes', how: 'Spikes for grass. Rubber studs for hard ground, matting or astro turf.' },
            { name: 'Sun protection', how: 'Cap or wide hat, SPF 30+ sunscreen every 2 hours, and sunglasses for fielding in bright sun.' },
          ],
        },
      ],
    },
    {
      title: 'Looking after your bat',
      chip: 'Bat care',
      blocks: [
        {
          kind: 'bullets',
          items: [
            'Size: when you stand, the handle should reach around the top of your thigh. A bat that is too heavy slows your shots.',
            'New English willow bats need "knocking in" before facing a hard ball. Tap the face and edges with a bat mallet for several hours over a few days, then play gentle throw-downs.',
            'Oil lightly with raw linseed oil on the face, edges and toe. Do not oil the splice or handle, and avoid too much oil.',
            'Keep it dry and out of extreme heat, such as the car boot in summer.',
            'Kashmir willow and tape-ball bats need less care, but still keep them dry.',
          ],
        },
      ],
    },
    {
      title: 'Injuries & first aid',
      chip: 'Injuries',
      blocks: [
        {
          kind: 'note',
          tone: 'warning',
          text: 'Hit on the head? Stop playing and tell someone. Watch for headache, dizziness, confusion, feeling sick or blurred vision. Do not play again that day, and see a doctor. Concussion is serious.',
        },
        {
          kind: 'items',
          items: [
            { name: 'Sprains & bruises (R.I.C.E.)', how: 'Rest. Ice wrapped in a cloth for 15–20 min. Compression with a bandage. Elevate above the heart. See a doctor if you cannot put weight on it, or if the swelling is large.' },
            { name: 'Finger knocks while catching', how: 'Ice straight away. If the finger looks bent, cannot straighten, or stays very swollen, get it checked. It may be broken.' },
            { name: 'Cramps', how: 'Stop, gently stretch the muscle, and drink ORS or an electrolyte drink.' },
            { name: 'Bowler’s back or side pain', how: 'Stop bowling. Rest, then build up slowly. Pain that keeps coming back needs a physio or doctor.' },
          ],
        },
      ],
    },
    {
      title: 'Avoiding injury',
      chip: 'Prevention',
      blocks: [
        {
          kind: 'bullets',
          items: [
            'Always warm up before playing and cool down after.',
            'Fast bowlers: increase how many overs you bowl in a week slowly. Avoid sudden jumps.',
            'Take at least 1–2 rest days a week from hard training.',
            'Sleep 8+ hours, especially the night before a match.',
            'Build strength in your legs, core and shoulders with simple bodyweight exercises such as squats, lunges, planks and push-ups.',
          ],
        },
      ],
    },
    {
      title: 'Mindset & batting tips',
      chip: 'Mindset',
      blocks: [
        {
          kind: 'bullets',
          items: [
            'Play one ball at a time. Forget the last ball, good or bad.',
            'Have a routine between balls: look away, take a deep breath, tap your bat, then watch the bowler’s hand.',
            'Watch the ball out of the bowler’s hand. It tells you length, line and swing early.',
            'Rotate the strike with singles. Dot balls build pressure on you.',
            'Call clearly: "Yes", "No" or "Wait". The batter who can see the ball best makes the call.',
            'Use this app: check your Home stats and the "How you got out" chart to see which dismissal you need to work on in practice.',
          ],
        },
      ],
    },
    {
      title: 'Match-day kit checklist',
      chip: 'Checklist',
      blocks: [
        {
          kind: 'bullets',
          items: [
            'Bat, helmet, pads, gloves, box, thigh guard',
            'Shoes, spare socks, cap or hat',
            'White or coloured kit as required, plus a spare shirt',
            'Water bottle (1–2 L), ORS sachets, banana or dates',
            'Sunscreen, small towel, basic first aid (tape, plasters)',
            'Phone, so you can record your innings in 11 Wolves afterwards',
          ],
        },
      ],
    },
  ],
};
