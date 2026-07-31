/**
 * ContentData.gs — GENERATED FILE. Do not hand-edit.
 * Source of truth is content/content.json — edit that, then run:
 *   node scripts/generate-content.js
 * Apps Script cannot read arbitrary external JSON files at runtime,
 * so this .gs file embeds the same data as a plain JS object literal.
 */

var CONTENT_LIBRARY = {
  Friends: {
    headline: 'Solid Gold Friendship',
    tagline: "The kind of bond that doesn't need a label to be valuable.",
    loveNote:
      "Some of the best relationships in life were friendships first. What you two have is real, easy, and built on genuine trust — that's rarer than romance.",
    tips: [
      "Keep showing up for the small stuff — that's what friendship is actually made of.",
      'Say the honest thing, kindly. Real friends can handle real talk.',
      "Don't let distance or busy seasons quietly end it — a five-minute check-in keeps it alive."
    ],
    dateIdeas: [
      'A no-agenda hangout — coffee, a walk, or just sitting around talking',
      'Try something neither of you has done before, just for the story',
      'A game night with snacks and zero pressure'
    ],
    colorTheme: {
      primary: '#5EEAD4',
      secondary: '#38BDF8'
    }
  },
  Love: {
    headline: "This One's Electric",
    tagline: "Real chemistry, the kind that's hard to fake and easy to feel.",
    loveNote:
      "There's a spark here that's genuinely rare. The kind of connection where conversation flows and silence feels comfortable too. Protect this — it's worth it.",
    tips: [
      "Say what you appreciate out loud, often — don't assume they already know.",
      "Make time on purpose. Chemistry doesn't run on autopilot forever.",
      'Fight fair: the goal is understanding each other, not winning.'
    ],
    dateIdeas: [
      'A sunset walk somewhere with a view, phones away',
      'Cook a meal together from scratch, mess and all',
      'A spontaneous day trip with no fixed plan'
    ],
    colorTheme: {
      primary: '#FF6B35',
      secondary: '#FF3D68'
    }
  },
  Affection: {
    headline: 'Warm, Genuine, Growing',
    tagline: 'A soft kind of care that has real room to become something more.',
    loveNote:
      "There's a warmth between you two that's honest and unforced. It might already be something, or it might be quietly becoming something — either way, it's worth paying attention to.",
    tips: [
      'Be clear about how you feel — affection grows faster with honesty than with guessing.',
      'Small gestures matter more than grand ones right now.',
      'Give it time. Not everything good needs to be rushed.'
    ],
    dateIdeas: [
      'A cozy café, good conversation, no rush to leave',
      'A slow museum or bookstore afternoon',
      'Watch the sunset from somewhere quiet'
    ],
    colorTheme: {
      primary: '#F472B6',
      secondary: '#FB923C'
    }
  },
  Marriage: {
    headline: 'Built to Last',
    tagline: 'The rare kind of match that feels like a partnership, not just a romance.',
    loveNote:
      "This is the kind of bond people spend years looking for — steady, deep, and genuinely built to grow old together. Whatever stage you're at, this connection has real staying power.",
    tips: [
      "Keep dating each other, even after 'I do.' Effort doesn't stop at commitment.",
      'Build shared goals, not just shared routines.',
      'Celebrate the small wins together — they add up to a life.'
    ],
    dateIdeas: [
      'Revisit where you first met or had your first date',
      "Plan something for 'future you two' — a trip, a home project, a goal",
      'A quiet dinner, just the two of you, no occasion needed'
    ],
    colorTheme: {
      primary: '#F59E0B',
      secondary: '#9B5CF6'
    }
  },
  Enemy: {
    headline: 'Fire Meets Fire',
    tagline: 'Intense energy — the kind that clashes as easily as it connects.',
    loveNote:
      "You two bring out strong reactions in each other, for better or worse. That's not automatically bad — it just means you'll need real patience and honesty to turn friction into understanding.",
    tips: [
      'Pause before reacting — most fights are really about being unheard.',
      'Find one thing you genuinely respect about them and lead with that.',
      "It's okay for this to just be a lesson, not a relationship."
    ],
    dateIdeas: [
      'A low-stakes group hangout, not one-on-one, to ease tension',
      'A competitive game — channel the energy somewhere fun',
      'Honestly? Some space first, if things feel heavy'
    ],
    colorTheme: {
      primary: '#FB7185',
      secondary: '#7F1D1D'
    }
  },
  Siblings: {
    headline: 'Family-Level Bond',
    tagline: 'Comfortable, loyal, and a little chaotic — like family should be.',
    loveNote:
      "There's an easy, no-filter comfort between you two — the kind you usually only get with family. You can annoy each other and still show up without hesitation.",
    tips: [
      'Tease each other, but know where the line is.',
      'Loyalty is the whole point here — protect that.',
      "You don't need to perform around each other. That's the gift."
    ],
    dateIdeas: [
      'A chaotic group outing — arcade, bowling, karaoke',
      'A home-cooked meal, loud music, no formality',
      'Marathon a show together and argue about the plot'
    ],
    colorTheme: {
      primary: '#A78BFA',
      secondary: '#60A5FA'
    }
  }
};

// Testability hook — see the matching pattern in Code.gs. Apps Script has
// no `module` global, so this only runs under Node (tests/flames.test.js).
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONTENT_LIBRARY: CONTENT_LIBRARY };
}
