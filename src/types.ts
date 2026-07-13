export interface MemoryPhoto {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: 'Childhood' | 'Adventures' | 'Best Friends' | 'Milestones' | 'Funny';
  rotation: number; // degrees for Polaroid effect
  scale?: number;
}

export interface TimelineEvent {
  year: string;
  title: string;
  story: string;
  imageUrl: string;
  tag: string;
}

export interface BirthdayWish {
  id: number;
  message: string;
  author: string;
  relation: string;
  color: string; // tailwind gradient or background color
}
