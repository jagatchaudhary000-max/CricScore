import type { GuideTopic } from './types';

export const warmup: GuideTopic = {
  id: 'warmup',
  emoji: '🤸',
  title: 'Warm-up & stretching',
  summary: 'Moving stretches before you bat, bowl and field, plus a cool-down for afterwards.',
  sections: [
    {
      title: 'Before anything: general warm-up (8–10 min)',
      chip: 'General',
      blocks: [
        {
          kind: 'text',
          text: 'Do this first, every time. It raises your body temperature so muscles stretch safely. Use moving (dynamic) stretches before play. Save held (static) stretches for after.',
        },
        {
          kind: 'items',
          items: [
            { name: 'Light jog', how: 'Easy jog around the ground or boundary.', dose: '3–5 min' },
            { name: 'High knees', how: 'Jog forward bringing each knee up to hip height.', dose: '2 × 20 m' },
            { name: 'Butt kicks', how: 'Jog forward flicking your heels up towards your bottom.', dose: '2 × 20 m' },
            { name: 'Side shuffles', how: 'Stay low, shuffle sideways without crossing your feet. Face the other way on the way back.', dose: '2 × 20 m' },
            { name: 'Leg swings', how: 'Hold a fence or partner. Swing one leg forward and back, then side to side.', dose: '10 each way, each leg' },
            { name: 'Walking lunges with twist', how: 'Step into a lunge, rotate your upper body over the front knee, stand and repeat on the other leg.', dose: '8 each leg' },
            { name: 'Arm circles', how: 'Small circles growing to big circles, forwards then backwards.', dose: '10 each direction' },
            { name: 'Inchworms', how: 'Bend down, walk hands out to a push-up position, then walk feet up to your hands.', dose: '5 reps' },
          ],
        },
      ],
    },
    {
      title: 'Batting warm-up',
      chip: 'Batting',
      blocks: [
        {
          kind: 'text',
          text: 'Batting needs loose hips, a free upper body to rotate, strong wrists and fast feet for quick singles.',
        },
        {
          kind: 'items',
          items: [
            { name: 'Bat-on-shoulders twists', how: 'Rest the bat across your shoulders, feet shoulder-width. Rotate slowly left and right.', dose: '10 each side' },
            { name: 'Hip openers ("open the gate")', how: 'Lift a knee up and rotate it out to the side, then reverse ("close the gate").', dose: '8 each leg, each way' },
            { name: 'Bodyweight squats', how: 'Feet shoulder-width, sit back and down, chest up, then stand.', dose: '10 reps' },
            { name: 'Wrist circles & forearm stretch', how: 'Rotate wrists both ways. Then with arm straight, gently pull the fingers back, then down.', dose: '10 circles + 10 s each stretch' },
            { name: 'Neck turns', how: 'Slowly turn your head left and right, then tilt ear to shoulder. Never roll it hard.', dose: '5 each way' },
            { name: 'Shadow batting', how: 'Without a ball, play forward defence, drives, back-foot punch, pull and sweep. Start slow and build speed.', dose: '2 min' },
            { name: 'Running between wickets', how: 'Sprint 22 yards (one pitch length), turn with your bat grounded, sprint back.', dose: '4 runs' },
          ],
        },
        { kind: 'note', tone: 'tip', text: 'Finish by facing a few throw-downs or nets balls at gentle pace before your innings.' },
      ],
    },
    {
      title: 'Bowling warm-up',
      chip: 'Bowling',
      blocks: [
        {
          kind: 'text',
          text: 'Bowling puts heavy load on the shoulder, side (oblique) muscles, back, hips and front leg. Never bowl at full pace without warming up.',
        },
        {
          kind: 'items',
          items: [
            { name: 'Big arm windmills', how: 'Swing both arms in large circles, then one arm at a time.', dose: '15 each direction' },
            { name: 'Cross-body arm swings', how: 'Swing arms open wide, then across your chest, hugging yourself.', dose: '15 reps' },
            { name: 'Side bends', how: 'Hands on hips or one arm overhead, bend slowly to each side.', dose: '10 each side' },
            { name: 'Lunge with overhead reach', how: 'Step into a lunge and reach both arms high above your head to stretch the hip flexor.', dose: '8 each leg' },
            { name: 'Hamstring sweeps', how: 'Heel forward, toe up, hinge at the hips and sweep your hands towards the toe as you walk.', dose: '10 each leg' },
            { name: 'Glute bridges', how: 'Lie on your back, knees bent, push hips up and squeeze, then lower.', dose: '10 reps' },
            { name: 'Calf raises', how: 'Rise onto your toes and lower slowly.', dose: '15 reps' },
            { name: 'Build-up deliveries', how: 'Bowl from a short run-up at about 50% pace, then 75%, then 90% before going full speed.', dose: '6–8 balls' },
          ],
        },
        {
          kind: 'note',
          tone: 'tip',
          text: 'Spinners: also stretch fingers back gently, roll the ball between your fingers, and do wrist circles. Your fingers do most of the work.',
        },
        {
          kind: 'note',
          tone: 'warning',
          text: 'Fast bowlers: lower back or side pain is a warning sign. Stop and rest rather than bowling through it.',
        },
      ],
    },
    {
      title: 'Fielding warm-up',
      chip: 'Fielding',
      blocks: [
        {
          kind: 'text',
          text: 'Fielding is quick sprints, sudden changes of direction, diving and hard throws. Warm up your legs and especially your throwing shoulder.',
        },
        {
          kind: 'items',
          items: [
            { name: 'Lateral lunges', how: 'Step wide to one side, sit into that hip with the other leg straight, push back.', dose: '8 each side' },
            { name: 'Carioca (grapevine)', how: 'Move sideways crossing one foot in front, then behind, twisting the hips.', dose: '2 × 20 m' },
            { name: 'Ankle hops', how: 'Small quick bounces on the balls of your feet.', dose: '20 hops' },
            { name: 'Sprint starts', how: 'From a "ready" stance (knees bent, on toes), sprint 15 m. Also try starting sideways.', dose: '4–6 sprints' },
            { name: 'Throwing build-up', how: 'Throw to a partner at 10 m, then 20 m, then 30 m. Increase power only when it feels easy.', dose: '8–10 throws per distance' },
            { name: 'Catching warm-up', how: 'Easy underarm catches with a partner, then a few higher ones.', dose: '20 catches' },
          ],
        },
      ],
    },
    {
      title: 'After the match: cool-down stretches',
      chip: 'Cool-down',
      blocks: [
        {
          kind: 'text',
          text: 'Walk for 2–3 minutes, then hold each stretch gently. Breathe slowly; it should feel like a stretch, never pain.',
        },
        {
          kind: 'items',
          items: [
            { name: 'Hamstring stretch', how: 'Leg straight on a low step or the ground, lean forward from the hips.', dose: '20–30 s each leg' },
            { name: 'Quad stretch', how: 'Standing, pull your heel to your bottom, knees together.', dose: '20–30 s each leg' },
            { name: 'Calf stretch', how: 'Hands on a wall, one leg back, heel down.', dose: '20–30 s each leg' },
            { name: 'Hip flexor stretch', how: 'Kneel on one knee, push hips forward gently.', dose: '20–30 s each side' },
            { name: 'Shoulder cross-body stretch', how: 'Pull one arm across your chest with the other.', dose: '20–30 s each arm' },
            { name: 'Triceps stretch', how: 'Hand behind your head, gently push the elbow with the other hand.', dose: '20–30 s each arm' },
            { name: "Child's pose", how: 'Kneel, sit back on heels and stretch arms forward on the ground to relax the lower back.', dose: '30 s' },
            { name: 'Butterfly (groin)', how: 'Sit, soles of feet together, gently press knees down.', dose: '20–30 s' },
          ],
        },
      ],
    },
  ],
};
