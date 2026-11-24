import type { GuideTopic } from './types';

export const rules: GuideTopic = {
  id: 'rules',
  emoji: '📜',
  title: 'Rules of cricket',
  summary: 'The main Laws of Cricket in simple words: scoring, extras, all the ways to get out, fielding and formats.',
  sections: [
    {
      title: 'The basics',
      chip: 'Basics',
      blocks: [
        {
          kind: 'bullets',
          items: [
            'Two teams of 11 players. A coin toss decides who bats or bowls first.',
            'The pitch is 22 yards (20.12 m) long, with a set of three stumps and two bails at each end.',
            'An over is 6 legal balls, bowled from one end. Wides and no-balls must be bowled again.',
            'A bowler cannot bowl two overs in a row.',
            'Two batters are on the field at a time. When 10 batters are out (all out), the innings ends.',
            'The team with more runs wins. In limited-overs cricket, an innings also ends when its overs run out.',
          ],
        },
      ],
    },
    {
      title: 'Formats',
      chip: 'Formats',
      blocks: [
        {
          kind: 'items',
          items: [
            { name: 'Test match', how: 'Up to 5 days. Each team bats twice. If the time runs out before a result, the match is a draw.' },
            { name: 'One Day (ODI)', how: '50 overs per side. Each bowler can bowl at most 10 overs.' },
            { name: 'T20', how: '20 overs per side. Each bowler can bowl at most 4 overs.' },
            { name: 'The Hundred / T10 / local formats', how: 'Shorter versions with their own playing conditions. Check your league rules.' },
          ],
        },
      ],
    },
    {
      title: 'Scoring runs',
      chip: 'Runs',
      blocks: [
        {
          kind: 'bullets',
          items: [
            'Run: both batters cross and ground their bat or body behind the popping crease at the other end.',
            'Four: the ball touches or crosses the boundary after bouncing.',
            'Six: the ball clears the boundary without bouncing.',
            'Short run: if a batter does not ground their bat at the end of a run, that run is not counted.',
            'Overthrows: if a fielder’s throw goes past the stumps, the batters can keep running. If it reaches the boundary, the four is added to the runs already completed.',
          ],
        },
      ],
    },
    {
      title: 'Extras (runs not off the bat)',
      chip: 'Extras',
      blocks: [
        {
          kind: 'items',
          items: [
            { name: 'Wide', how: 'The ball is too far from the batter to hit from a normal stance. 1 run is added and the ball is bowled again. Limited-overs umpires are strict, especially down the leg side.', dose: '+1, re-bowl' },
            { name: 'No-ball', how: 'Most common: the bowler’s front foot lands with no part behind the popping crease. Also a no-ball: a full toss above waist height, the back foot touching or outside the return crease, more than 2 fielders behind square on the leg side, or an illegal throwing action.', dose: '+1, re-bowl' },
            { name: 'Free hit', how: 'In limited-overs cricket, the ball after any no-ball is a free hit. The batter can only be out the ways allowed on a no-ball, such as run out.', dose: 'Next ball' },
            { name: 'Bye', how: 'The ball misses the bat and the batter’s body, and the batters run.', dose: 'Runs scored' },
            { name: 'Leg bye', how: 'The ball hits the batter’s body (not the hand holding the bat) and they run. Only allowed if the batter tried to play a shot or to get out of the way.', dose: 'Runs scored' },
            { name: 'Penalty runs', how: 'For example, when the ball hits a fielder’s helmet lying on the ground behind the keeper, a fielder deliberately fakes a fielding move, or a team wastes time or damages the pitch.', dose: '5 runs' },
          ],
        },
      ],
    },
    {
      title: 'All 10 ways to get out',
      chip: 'Dismissals',
      blocks: [
        {
          kind: 'items',
          items: [
            { name: '1. Bowled', how: 'The bowled ball hits the stumps and knocks off at least one bail, even after hitting the bat or body.' },
            { name: '2. Caught', how: 'A fielder or the keeper catches the ball off the bat (or the glove holding the bat) before it touches the ground. A fielder touching or over the boundary while holding the ball makes it a six, not a catch.' },
            { name: '3. LBW (leg before wicket)', how: 'The ball would have hit the stumps but hits the batter’s body first. It is NOT out if the ball pitched outside leg stump, or if it hit the bat first. If the batter is playing a shot, the impact must be in line with the stumps.' },
            { name: '4. Run out', how: 'A fielder breaks the wicket while a batter is out of their ground during play. This includes the non-striker leaving the crease early before the bowler releases the ball.' },
            { name: '5. Stumped', how: 'The keeper breaks the wicket while the striker is out of the crease and not trying to run. It can happen on a wide but not on a no-ball.' },
            { name: '6. Hit wicket', how: 'The batter knocks off the bails with their bat or body while playing a shot or setting off for a first run.' },
            { name: '7. Obstructing the field', how: 'The batter deliberately blocks a fielder or handles the ball on purpose without the fielders’ permission. This includes what used to be called "handled the ball".' },
            { name: '8. Hit the ball twice', how: 'The batter deliberately hits the ball a second time, except to protect their wicket.' },
            { name: '9. Timed out', how: 'The new batter is not ready to face, or for the other batter to face, within 3 minutes of the last wicket. Some tournaments use 2 minutes.' },
            { name: '10. Retired out', how: 'The batter leaves the field without the umpire’s permission and without injury or illness, and does not come back.' },
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          text: 'On a no-ball or free hit you can only be run out, hit the ball twice, or obstruct the field. On a wide you can also be stumped or out hit wicket.',
        },
      ],
    },
    {
      title: 'Bowling rules',
      chip: 'Bowling',
      blocks: [
        {
          kind: 'bullets',
          items: [
            'Tell the umpire which arm you bowl with and which side of the stumps (over or round the wicket) you bowl from.',
            'The arm must not straighten too much while delivering (no "throwing" or "chucking").',
            'Bouncers (balls above shoulder height): usually 2 per over in Tests and ODIs, and 1 per over in T20. More is a no-ball.',
            'Any full toss above waist height is a no-ball. A dangerous one can get the bowler taken off.',
            'Applying saliva to the ball is banned in international cricket. Sweat is still allowed.',
          ],
        },
      ],
    },
    {
      title: 'Fielding rules & powerplays',
      chip: 'Fielding',
      blocks: [
        {
          kind: 'bullets',
          items: [
            'Only the wicketkeeper may wear gloves and outer leg guards.',
            'No more than 2 fielders behind square on the leg side at the moment the ball is bowled.',
            'Fielders must not move significantly after the bowler starts running in, apart from small adjustments. The keeper must stay behind the stumps until the ball reaches the batter or passes the stumps.',
            'T20 powerplay: in overs 1–6, at most 2 fielders outside the 30-yard circle. After that, at most 5.',
            'ODI: in overs 1–10, at most 2 outside the circle. In overs 11–40, at most 4. In overs 41–50, at most 5.',
          ],
        },
      ],
    },
    {
      title: 'Results, ties & reviews',
      chip: 'Results',
      blocks: [
        {
          kind: 'bullets',
          items: [
            'Win by runs: the team that bowled second dismissed the other side or their overs ran out before the target was reached.',
            'Win by wickets: the team chasing reached the target. The margin is the wickets they had left.',
            'Tie: both teams have the same score. In T20 and ODI tournaments, a Super Over (one over each) usually decides the winner.',
            'Draw: Test cricket only. Time ran out before a result.',
            'DLS method: if rain shortens a limited-overs match, the target is adjusted using the Duckworth-Lewis-Stern method.',
            'Follow-on (Tests): a team leading by 200+ runs after the first innings can make the other team bat again straight away.',
            'DRS: in top-level matches, teams can ask the TV umpire to review a decision. Each side has a limited number of unsuccessful reviews per innings. "Umpire’s call" means the original decision stays.',
          ],
        },
      ],
    },
    {
      title: 'Umpire signals',
      chip: 'Signals',
      blocks: [
        {
          kind: 'items',
          items: [
            { name: 'Out', how: 'Index finger raised above the head.' },
            { name: 'Four', how: 'Arm waved side to side across the chest.' },
            { name: 'Six', how: 'Both arms raised straight above the head.' },
            { name: 'Wide', how: 'Both arms stretched out horizontally.' },
            { name: 'No-ball', how: 'One arm stretched out horizontally.' },
            { name: 'Free hit', how: 'One hand raised, making circles in the air.' },
            { name: 'Bye', how: 'One open hand raised above the head.' },
            { name: 'Leg bye', how: 'Touching a raised knee with the hand.' },
            { name: 'Dead ball', how: 'Crossing and uncrossing the wrists below the waist.' },
            { name: 'Short run', how: 'Bending one arm to touch the shoulder with the fingertips.' },
            { name: 'Penalty runs', how: 'Tapping one shoulder (to the batting side) or placing a hand on the opposite shoulder (to the fielding side).' },
            { name: 'TV review', how: 'Drawing a rectangle (TV screen) in the air.' },
          ],
        },
      ],
    },
    {
      title: 'Spirit of cricket',
      chip: 'Spirit',
      blocks: [
        {
          kind: 'bullets',
          items: [
            'Respect the umpires’ decisions, even when you disagree.',
            'Respect your opponents and teammates. No abuse or sledging that becomes personal.',
            'Do not claim a catch you know bounced.',
            'Shake hands at the end of the match, win or lose.',
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          text: 'Street, tape-ball and box cricket often use house rules (for example "one tip, one hand", or no LBW). Agree them with everyone before the game starts.',
        },
      ],
    },
  ],
};
