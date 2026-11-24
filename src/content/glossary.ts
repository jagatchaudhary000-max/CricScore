import type { GuideTopic } from './types';

export const glossary: GuideTopic = {
  id: 'glossary',
  emoji: '📖',
  title: 'Fielding positions & cricket terms',
  summary: 'Where every fielder stands and what all the cricket words mean.',
  sections: [
    {
      title: 'Fielding positions',
      chip: 'Positions',
      blocks: [
        {
          kind: 'text',
          text: 'Off side = the side the batter faces when taking their stance. Leg side (on side) = behind their legs. Positions are shown for a right-handed batter; they flip for a left-hander.',
        },
        {
          kind: 'items',
          items: [
            { name: 'Wicketkeeper', how: 'Behind the stumps, catching everything the batter misses.' },
            { name: 'Slips (1st, 2nd, 3rd)', how: 'Beside the keeper on the off side, waiting for edges.' },
            { name: 'Gully', how: 'Between the slips and point, for thicker edges and cuts.' },
            { name: 'Point', how: 'Square on the off side, level with the batter.' },
            { name: 'Cover / extra cover', how: 'In front of point on the off side, stopping drives.' },
            { name: 'Mid-off / mid-on', how: 'Either side of the bowler, saving singles.' },
            { name: 'Mid-wicket', how: 'Leg side, in front of square, for flicks and pulls.' },
            { name: 'Square leg', how: 'Leg side, level with the batter.' },
            { name: 'Fine leg', how: 'Leg side, behind the batter, often on the boundary.' },
            { name: 'Third man', how: 'Off side, behind the batter on the boundary, for edges and late cuts.' },
            { name: 'Long-off / long-on', how: 'Straight boundary positions behind the bowler.' },
            { name: 'Deep mid-wicket / deep square / deep cover', how: 'The same positions pushed back to the boundary.' },
            { name: 'Short leg / silly point', how: 'Very close catchers on the leg and off side. Helmet needed.' },
          ],
        },
      ],
    },
    {
      title: 'Batting & scoring terms',
      chip: 'Batting',
      blocks: [
        {
          kind: 'items',
          items: [
            { name: 'Duck / golden duck', how: 'Out for 0 / out for 0 on the first ball you face.' },
            { name: 'Not out (*)', how: 'Still batting when the innings ended. Shown with a star, like 45*.' },
            { name: 'Half-century / century', how: '50 runs / 100 runs in one innings.' },
            { name: 'Batting average', how: 'Total runs ÷ number of times out.' },
            { name: 'Strike rate (batting)', how: 'Runs per 100 balls faced = runs ÷ balls × 100.' },
            { name: 'Run rate / required run rate', how: 'Runs per over scored so far / needed to win.' },
            { name: 'Nightwatchman', how: 'A lower-order batter sent in late in the day to protect a better batter.' },
            { name: 'Tail-ender', how: 'The last few batters, usually the bowlers.' },
            { name: 'Declaration', how: 'The captain ends their team’s innings early (Tests and multi-day matches).' },
            { name: 'Partnership', how: 'Runs scored by two batters together before one gets out.' },
          ],
        },
      ],
    },
    {
      title: 'Bowling terms',
      chip: 'Bowling',
      blocks: [
        {
          kind: 'items',
          items: [
            { name: 'Maiden', how: 'An over in which no runs are scored off the bat or from wides and no-balls.' },
            { name: 'Hat-trick', how: 'Three wickets in three consecutive balls by the same bowler.' },
            { name: 'Economy rate', how: 'Runs conceded per over.' },
            { name: 'Line & length', how: 'Line = direction (off stump, leg stump). Length = where it bounces (full, good, short).' },
            { name: 'Yorker', how: 'A full ball aimed at the batter’s toes or the base of the stumps.' },
            { name: 'Bouncer', how: 'A short ball that rises towards the batter’s head or shoulders.' },
            { name: 'Full toss / beamer', how: 'A ball that reaches the batter without bouncing. A beamer is a dangerous one above waist height.' },
            { name: 'Swing / seam', how: 'Swing = movement in the air. Seam = movement off the pitch after bouncing on the seam.' },
            { name: 'Off-spin / leg-spin', how: 'Finger spin that turns into a right-hander / wrist spin that turns away from them.' },
            { name: 'Googly / doosra', how: 'A leg-spinner’s ball that turns the other way / an off-spinner’s ball that turns the other way.' },
            { name: 'Slower ball / knuckle ball', how: 'Variations that look fast but arrive slower to trick the batter.' },
          ],
        },
      ],
    },
    {
      title: 'Common shots',
      chip: 'Shots',
      blocks: [
        {
          kind: 'items',
          items: [
            { name: 'Forward defence', how: 'Step forward, bat close to the pad, block the ball with soft hands.' },
            { name: 'Drive (cover, straight, on)', how: 'Front-foot shot along the ground to a full ball.' },
            { name: 'Cut', how: 'Back-foot shot square on the off side to a short, wide ball.' },
            { name: 'Pull / hook', how: 'Back-foot shot to the leg side against a short ball (a hook is played to a higher ball).' },
            { name: 'Sweep / reverse sweep', how: 'Down on one knee, sweeping the ball to the leg side (or the off side for a reverse sweep). Mostly against spin.' },
            { name: 'Flick / glance', how: 'Using the wrists to turn the ball off the pads to the leg side.' },
            { name: 'Lofted shot', how: 'Hitting the ball in the air over the fielders.' },
          ],
        },
      ],
    },
  ],
};
