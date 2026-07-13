import { MemoryPhoto, TimelineEvent, BirthdayWish } from './types';

// Curated beautiful Unsplash image URLs representing sibling memories, sisterhood, travel, childhood, and laughter
export const memoryPhotos: MemoryPhoto[] = [
  {
    id: 1,
    title: "A Walk in the Woods",
    description: "Posing with pure joy in the middle of a dense pine forest, breathing in the fresh air, feeling alive and free.",
    imageUrl: "sri.jpg",
    category: "Adventures",
    rotation: -4
  },
  {
    id: 2,
    title: "Festive Grace",
    description: "Adorned in beautiful traditional attire with exquisite golden jewelry, looking absolutely glowing and gorgeous.",
    imageUrl: "sri1.jpg",
    category: "Milestones",
    rotation: 3
  },
  {
    id: 3,
    title: "Dog Filter Fun",
    description: "Laughing so hard during our video call with goofy puppy filters. No distance can stop our crazy laughter!",
    imageUrl: "sri2.jpg",
    category: "Funny",
    rotation: -3
  },
  {
    id: 4,
    title: "Double Trouble Selfies",
    description: "Throwing up the peace sign and posing together at home. Forever my favorite partner-in-crime.",
    imageUrl: "sri5.jpg",
    category: "Best Friends",
    rotation: 5
  },
  {
    id: 5,
    title: "Raksha Bandhan Bonds",
    description: "Showing off the beautiful Rakhi tied around my wrist. A promise of protection, care, and unconditional love forever.",
    imageUrl: "sri6.jpg",
    category: "Childhood",
    rotation: -5
  },
  {
    id: 6,
    title: "Sunday Selfies",
    description: "A warm and sunny Sunday selfie. Just spending some sweet sibling quality time at home.",
    imageUrl: "sri9.jpg",
    category: "Best Friends",
    rotation: 4
  },
  {
    id: 7,
    title: "Just Sibling Vibes",
    description: "Smiling brightly side-by-side. The bond we share is irreplaceable and holds our happiest vibes.",
    imageUrl: "sri10.jpg",
    category: "Best Friends",
    rotation: -2
  },
  {
    id: 8,
    title: "Standing By You",
    description: "Through every storm and sunshine, I will always stand behind you, supporting you and watching you shine.",
    imageUrl: "sri11.jpg",
    category: "Milestones",
    rotation: 3
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    year: "2012",
    title: "🎒 First School Day Together",
    story: "Remember walking hand-in-hand to school? You held my hand so tight, terrified of the big classrooms, but within minutes you were making friends and sharing crayons. I knew right then you'd conquer any room you ever walk into.",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80",
    tag: "Childhood"
  },
  {
    year: "2015",
    title: "🚲 The Bicycle Conquest",
    story: "After falling into the flowerbed four times, you stood up, dusted the leaves off your knees, refused my help, and pedaled all the way down the driveway. Your fierce independence has always been your superpower.",
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&auto=format&fit=crop&q=80",
    tag: "Milestones"
  },
  {
    year: "2018",
    title: "🏖️ Family Beach Vacation",
    story: "The summer we buried Dad in sand up to his chin and got lost in a giant maze for two hours. We ate pink cotton candy and made a pact that we would travel the entire world together when we grow up.",
    imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&auto=format&fit=crop&q=80",
    tag: "Adventure"
  },
  {
    year: "2021",
    title: "😂 Quarantine Baker Disasters",
    story: "We decided to become master pastry chefs. We created a loaf of banana bread that could literally double as a brick, and we laughed so hard we couldn't breathe. Splattering flour all over the kitchen remains my favorite memory.",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&auto=format&fit=crop&q=80",
    tag: "Funny"
  },
  {
    year: "2024",
    title: "💖 Best Siblings Road Trip",
    story: "Our epic road trip across the state line! Blasting throwback Disney music, stopping at every scenic overlook, eating sketchy diner food, and realizing that no matter how much we grow up, we are still those goofy kids at heart.",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop&q=80",
    tag: "Best Friends"
  },
  {
    year: "2026",
    title: "✨ Celebrating Your Grace",
    story: "Today you stand as an incredibly beautiful, smart, kind, and brilliant woman. I am the luckiest brother on earth to watch you blossom, and I promise to always stand by you, shield you, and celebrate your shining light.",
    imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&auto=format&fit=crop&q=80",
    tag: "Birthday"
  }
];

export const birthdayWishes: BirthdayWish[] = [
  {
    id: 1,
    message: "To my shining star, you bring endless warmth and joy to our entire family. May your path always be lit with blessings, laughter, and pure happiness! Love you sister!",
    author: "Mom & Dad",
    relation: "Parents",
    color: "from-pink-400 to-rose-400"
  },
  {
    id: 2,
    message: "Happy Birthday to my favorite partner-in-crime! Thanks for always covering up for me, sharing your fries, and being the best listener. Keep shining bright, Sis!",
    author: "Brother Lucas",
    relation: "Your Loving Brother",
    color: "from-purple-400 to-indigo-400"
  },
  {
    id: 3,
    message: "May this year bring you closer to all your beautiful dreams. You deserve everything pure and amazing in this world because of your golden heart. Cheers to a beautiful year!",
    author: "Grandma & Grandpa",
    relation: "Grandparents",
    color: "from-amber-400 to-orange-400"
  },
  {
    id: 4,
    message: "You are more than just a cousin, you are a sister of my heart. Thank you for the endless group chat memes, the wardrobe sharing, and the lifelong friendship. HBD!",
    author: "Sarah",
    relation: "Cousin",
    color: "from-teal-400 to-emerald-400"
  },
  {
    id: 5,
    message: "Happy Birthday to my absolute bestie! From kindergarten sandboxes to late night work rants, you've been my constant anchor. Let's celebrate your beautiful soul tonight!",
    author: "Elena",
    relation: "Best Friend",
    color: "from-cyan-400 to-blue-400"
  },
  {
    id: 6,
    message: "You inspire everyone around you with your work ethic, kindness, and brilliant sense of humor. Wishing you a year full of creative adventures and immense happiness!",
    author: "Uncle David",
    relation: "Uncle",
    color: "from-fuchsia-400 to-pink-500"
  }
];
