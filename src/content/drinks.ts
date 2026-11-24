import type { GuideTopic } from './types';

export const drinks: GuideTopic = {
  id: 'drinks',
  emoji: '🥤',
  title: 'Drinks & energy',
  summary: 'How much to drink, the best energy drinks for batting and fielding, and what to avoid.',
  sections: [
    {
      title: 'How much to drink',
      chip: 'Plan',
      blocks: [
        {
          kind: 'items',
          items: [
            { name: '2–3 hours before', how: 'Drink water steadily.', dose: '400–600 ml' },
            { name: '15–20 min before', how: 'A few more sips.', dose: '200–300 ml' },
            { name: 'During play', how: 'Sip at every drinks break or between overs when allowed. Do not wait until you feel thirsty.', dose: '150–250 ml each time' },
            { name: 'After play', how: 'Keep drinking until your urine is pale yellow again.', dose: 'About 500 ml+' },
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          text: 'Easy check: pale yellow urine means you are well hydrated. Dark yellow means drink more.',
        },
      ],
    },
    {
      title: 'Best energy drinks (natural and safe)',
      chip: 'Best drinks',
      blocks: [
        {
          kind: 'items',
          items: [
            { name: 'Water', how: 'Your main drink for every match. Carry a 1–2 litre bottle.' },
            { name: 'ORS (oral rehydration solution)', how: 'Replaces the salt you sweat out. Best on hot days or long innings.' },
            { name: 'Coconut water', how: 'Natural electrolytes (potassium) and mild sugar.' },
            { name: 'Nimbu pani (homemade energy drink)', how: '1 litre water + juice of 1–2 lemons + 6 level teaspoons sugar or glucose + ½ teaspoon salt. Gives energy and replaces salts.' },
            { name: 'Glucose water', how: 'Quick energy when you feel tired. Use 1–2 spoons in a glass of water, not a whole packet.' },
            { name: 'Sports or electrolyte drink', how: 'Good for long, hot matches. These are different from caffeine "energy drinks".' },
            { name: 'Banana milkshake or lassi', how: 'Good 1–2 hours before or after play. Too heavy to drink just before batting.' },
          ],
        },
      ],
    },
    {
      title: 'Before batting',
      chip: 'Batting',
      blocks: [
        {
          kind: 'bullets',
          items: [
            'Drink 400–600 ml of water 2–3 hours before. Add ORS or nimbu pani if it is hot.',
            'Have a few sips before walking out. Not too much, or you will feel heavy running between wickets.',
            'During a long innings, sip water or an electrolyte drink at every drinks break.',
            'Cramps while batting usually mean you have lost salt as well as water. Drink ORS or an electrolyte drink, not just plain water.',
          ],
        },
      ],
    },
    {
      title: 'Before fielding',
      chip: 'Fielding',
      blocks: [
        {
          kind: 'bullets',
          items: [
            'Fielders sweat for hours. Start the match well hydrated.',
            'Drink at every drinks break, even if you do not feel thirsty.',
            'On hot days, switch between water and ORS or coconut water.',
            'Wear a cap or hat and stay in shade during breaks to sweat less.',
          ],
        },
      ],
    },
    {
      title: 'Caffeine energy drinks: be careful',
      chip: 'Caution',
      blocks: [
        {
          kind: 'text',
          text: 'Canned "energy drinks" are high in caffeine and sugar. They do not hydrate you well. They can make your heart race, make you jittery, upset your stomach and spoil your sleep.',
        },
        {
          kind: 'bullets',
          items: [
            'Not recommended for anyone under 18.',
            'Never drink them to replace water.',
            'Never mix them with alcohol.',
            'Adults who are used to caffeine: at most a small amount (about one cup of coffee) 45–60 minutes before play.',
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          text: 'For energy you can trust, have a banana with nimbu pani or coconut water. It works better than a can.',
        },
      ],
    },
    {
      title: 'Danger signs of dehydration or heat illness',
      chip: 'Danger signs',
      blocks: [
        {
          kind: 'bullets',
          items: [
            'Headache, dizziness or feeling faint',
            'Strong muscle cramps',
            'Very dark urine, or none for hours',
            'Feeling sick, confused, or hot skin that has stopped sweating',
          ],
        },
        {
          kind: 'note',
          tone: 'warning',
          text: 'If you notice these, stop playing, move to shade, sip ORS or water slowly and tell someone. Confusion or fainting is an emergency, so get medical help immediately.',
        },
      ],
    },
  ],
};
