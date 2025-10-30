import { House, Commentary } from './types';

// Sample houses for Phil's route (Modern Family themed)
export const sampleHouses: House[] = [
  {
    id: '0',
    name: "Jay's Mansion",
    coordinates: { x: 200, y: 150 },
    timeWindow: { start: 60, end: 180 }, // 9:00 - 11:00
    preference: 9.5,
    status: 'available',
    description: "Upscale property in a prestigious neighborhood"
  },
  {
    id: '1',
    name: "Mitchell's Modern Loft",
    coordinates: { x: 400, y: 200 },
    timeWindow: { start: 120, end: 240 }, // 10:00 - 12:00
    preference: 8.0,
    status: 'available',
    description: "Contemporary design with city views"
  },
  {
    id: '2',
    name: "Haley's Trendy Condo",
    coordinates: { x: 300, y: 400 },
    timeWindow: { start: 180, end: 300 }, // 11:00 - 13:00
    preference: 7.5,
    status: 'available',
    description: "Perfect for young professionals"
  },
  {
    id: '3',
    name: "Alex's Smart Home",
    coordinates: { x: 600, y: 250 },
    timeWindow: { start: 240, end: 360 }, // 12:00 - 14:00
    preference: 9.0,
    status: 'available',
    description: "Tech-integrated sustainable living"
  },
  {
    id: '4',
    name: "Luke's Fixer-Upper",
    coordinates: { x: 500, y: 450 },
    timeWindow: { start: 300, end: 420 }, // 13:00 - 15:00
    preference: 6.0,
    status: 'available',
    description: "Great potential for renovation enthusiasts"
  },
  {
    id: '5',
    name: "Claire's Corporate Suite",
    coordinates: { x: 700, y: 350 },
    timeWindow: { start: 360, end: 480 }, // 14:00 - 16:00
    preference: 8.5,
    status: 'available',
    description: "Executive-level luxury apartment"
  },
  {
    id: '6',
    name: "Cam's Countryside Retreat",
    coordinates: { x: 450, y: 100 },
    timeWindow: { start: 420, end: 540 }, // 15:00 - 17:00
    preference: 7.0,
    status: 'available',
    description: "Peaceful suburban family home"
  },
  {
    id: '7',
    name: "Gloria's Estate",
    coordinates: { x: 650, y: 150 },
    timeWindow: { start: 480, end: 600 }, // 16:00 - 18:00
    preference: 9.5,
    status: 'available',
    description: "Luxurious Mediterranean-style villa"
  }
];

// Modern Family character commentaries
export const commentaries: Commentary[] = [
  // Phil
  {
    character: 'Phil',
    trigger: 'start',
    text: "Time to show these houses like a Dunphy!",
    emotion: 'happy'
  },
  {
    character: 'Phil',
    trigger: 'good_decision',
    text: "Nailed it! Phil's-osophy in action!",
    emotion: 'proud'
  },
  {
    character: 'Phil',
    trigger: 'bad_decision',
    text: "Wait, that wasn't supposed to happen...",
    emotion: 'confused'
  },
  {
    character: 'Phil',
    trigger: 'completion',
    text: "And that's how Phil Dunphy gets it done!",
    emotion: 'proud'
  },
  
  // Claire
  {
    character: 'Claire',
    trigger: 'start',
    text: "Phil, please don't mess this up again...",
    emotion: 'annoyed'
  },
  {
    character: 'Claire',
    trigger: 'good_decision',
    text: "You actually did it without calling me 5 times!",
    emotion: 'happy'
  },
  {
    character: 'Claire',
    trigger: 'bad_decision',
    text: "Phil, you're going to be late again...",
    emotion: 'annoyed'
  },
  {
    character: 'Claire',
    trigger: 'completion',
    text: "I'm... actually impressed. Don't let it go to your head.",
    emotion: 'proud'
  },
  
  // Luke
  {
    character: 'Luke',
    trigger: 'start',
    text: "Dad's doing math? This should be interesting...",
    emotion: 'confused'
  },
  {
    character: 'Luke',
    trigger: 'good_decision',
    text: "Dad used math! And it WORKED!",
    emotion: 'happy'
  },
  {
    character: 'Luke',
    trigger: 'completion',
    text: "That was cooler than I expected!",
    emotion: 'happy'
  },
  
  // Haley
  {
    character: 'Haley',
    trigger: 'start',
    text: "Just use GPS like a normal person 🙄",
    emotion: 'annoyed'
  },
  {
    character: 'Haley',
    trigger: 'good_decision',
    text: "Okay that's actually impressive I guess",
    emotion: 'happy'
  },
  
  // Alex
  {
    character: 'Alex',
    trigger: 'start',
    text: "The optimal solution requires dynamic programming...",
    emotion: 'happy'
  },
  {
    character: 'Alex',
    trigger: 'good_decision',
    text: "Finally, someone uses their brain around here!",
    emotion: 'proud'
  },
  {
    character: 'Alex',
    trigger: 'bad_decision',
    text: "That's not even close to optimal!",
    emotion: 'annoyed'
  }
];

// Phil's-osophy quotes
export const philQuotes = [
  "Success is 10% inspiration, 90% optimization algorithms!",
  "When life gives you houses, make a route!",
  "I'm not just a realtor, I'm a route optimizer!",
  "The secret to real estate? Dynamic programming!",
  "If you're not first, you're last... unless you optimize!",
  "Sometimes you gotta take the scenic route... but calculate it first!",
  "I'm like the Steve Jobs of real estate routing!",
  "Phil's-osophy: Always trust the algorithm!",
  "Success is measured in satisfied clients per kilometer!",
  "When in doubt, use a bitmask!"
];
