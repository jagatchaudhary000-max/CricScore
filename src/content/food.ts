import type { GuideTopic } from './types';

export const food: GuideTopic = {
  id: 'food',
  emoji: '🍌',
  title: 'Food before you play',
  summary: 'What and when to eat before batting, bowling and fielding, and what to eat after.',
  sections: [
    {
      title: 'Timing is everything',
      chip: 'Timing',
      blocks: [
        {
          kind: 'items',
          items: [
            { name: 'Main meal', how: 'Rich in carbohydrates, some protein, low in oil and fat. This is your fuel for the match.', dose: '3–4 hours before' },
            { name: 'Small snack', how: 'Easy carbohydrates that digest quickly.', dose: '1–1½ hours before' },
            { name: 'Top-up', how: 'A banana or 2–3 dates if you feel hungry.', dose: '15–30 min before' },
          ],
        },
        { kind: 'note', tone: 'tip', text: 'Never try a new food on match day. Practise your match-day meals at training first.' },
      ],
    },
    {
      title: 'Good pre-match meals (3–4 hours before)',
      chip: 'Meals',
      blocks: [
        {
          kind: 'bullets',
          items: [
            'Rice with dal and lightly cooked vegetables',
            'Roti or chapati with paneer, egg or chicken curry (not oily)',
            'Poha with peanuts and vegetables',
            'Idli or dosa with sambar',
            'Upma or vegetable khichdi',
            'Oats or porridge with milk, banana and honey',
            'Pasta or noodles with chicken or eggs',
            'Whole-wheat sandwich with egg, chicken, paneer or peanut butter',
          ],
        },
      ],
    },
    {
      title: 'Quick snacks (1 hour before or during breaks)',
      chip: 'Snacks',
      blocks: [
        {
          kind: 'bullets',
          items: [
            'Banana (the best cricket snack: quick energy and potassium for cramps)',
            'Dates, raisins or other dried fruit',
            'Toast or bread with honey, jam or peanut butter',
            'Curd or yoghurt with fruit',
            'Orange slices, watermelon or apple',
            'Plain biscuits or a cereal or energy bar',
            'Peanut chikki or a small handful of nuts',
          ],
        },
      ],
    },
    {
      title: 'Before batting',
      chip: 'Batting',
      blocks: [
        {
          kind: 'text',
          text: 'A long innings needs steady energy and a clear head. Have your main carbohydrate meal on time. Keep a banana or dates in your kit bag to eat during breaks.',
        },
        {
          kind: 'bullets',
          items: [
            "If you are next in, eat only a light snack at lunch or the innings break. Don't eat a full plate.",
            'Avoid very sugary food on its own. You get a quick rush, then you feel tired.',
            'Eat something small between sessions if you are batting for a long time.',
          ],
        },
      ],
    },
    {
      title: 'Before bowling',
      chip: 'Bowling',
      blocks: [
        {
          kind: 'text',
          text: 'Bowling, especially fast bowling, uses the most energy in cricket. Bowlers need a good carbohydrate meal and small top-ups between spells.',
        },
        {
          kind: 'bullets',
          items: [
            'Eat your main meal 3–4 hours before, so your stomach is settled when you run in.',
            'Have a banana or fruit between spells.',
            'Avoid heavy, fried or very spicy food. It can cause stitches, cramps and acidity during your run-up.',
          ],
        },
      ],
    },
    {
      title: 'Before fielding',
      chip: 'Fielding',
      blocks: [
        {
          kind: 'text',
          text: 'Fielding means hours on your feet in the sun. Light, regular snacks keep you sharp so you do not drop catches late in the innings.',
        },
        {
          kind: 'bullets',
          items: [
            'Have juicy fruit at drinks breaks: orange slices, watermelon or grapes.',
            'Eat a light snack at the innings break, not a heavy meal.',
            'Food and water together keep your concentration high in the final overs.',
          ],
        },
      ],
    },
    {
      title: 'Avoid on match day',
      chip: 'Avoid',
      blocks: [
        {
          kind: 'bullets',
          items: [
            'Deep-fried food: samosa, pakora, puri, chips',
            'Very spicy or very oily curries',
            'Large amounts of sweets or soft drinks',
            'Big portions just before playing',
            'New supplements or pills you have never tried before',
          ],
        },
      ],
    },
    {
      title: 'After the match (recovery)',
      chip: 'After',
      blocks: [
        {
          kind: 'text',
          text: 'Within about an hour of finishing, eat carbohydrates plus protein. This refuels your muscles and helps them repair.',
        },
        {
          kind: 'bullets',
          items: [
            'A glass of milk or chocolate milk with a banana',
            'Curd rice, or rice with dal and eggs',
            'Roti with chicken, fish, paneer or soya',
            'Plenty of water, plus fruit',
          ],
        },
        {
          kind: 'note',
          tone: 'warning',
          text: 'This is general advice. If you have diabetes, allergies or another health condition, follow your doctor’s advice.',
        },
      ],
    },
  ],
};
