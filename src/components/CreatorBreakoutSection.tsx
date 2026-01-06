import { useEffect, useState, useRef } from "react";
import { Play, Star, Users, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import creatorUmutAktu from "@/assets/creator-umut-aktu.jpg";
import creatorPlanckMind from "@/assets/creator-planckmind.jpg";
import creatorAIMoneyManiac from "@/assets/creator-card3.jpg";
import creatorMartinCash from "@/assets/creator-martin-cash.jpg";
import creatorCard5 from "@/assets/creator-card5.jpg";
import creatorCard6Avatar from "@/assets/creator-card6-avatar.jpg";

interface CreatorCard {
  thumbnail: string;
  duration: string;
  title: string;
  creatorName: string;
  creatorAvatar: string;
  fans: string;
  rating: number;
  stars: number;
  description: string;
  source: string;
  stats: string;
  videoUrl?: string;
}

interface YouTubeVideoInfo {
  videoId: string;
  title: string;
  thumbnail: string;
  duration: string;
  viewCount: string;
  publishedAt: string;
  channelId: string;
  channelTitle: string;
  channelThumbnail: string;
  subscriberCount: string;
}

// Video IDs to fetch
const VIDEO_IDS = [
  "m8brjPr23j4",
  "ygJsgrrUUH0", 
  "RxXvya5v5Lw",
  "HrKjPC_Racg",
  "2FugAplwawk",
  "zc9mdszta3A"
];

// Static data for ratings and descriptions (not available from YouTube API)
const staticData: Record<string, { rating: number; stars: number; description: string; fallbackAvatar: string }> = {
  "m8brjPr23j4": {
    rating: 9.7,
    stars: 4.75,
    description: "Discover how AI automation transforms YouTube content creation - from script to publish in minutes. A must-watch for creators!",
    fallbackAvatar: creatorUmutAktu
  },
  "ygJsgrrUUH0": {
    rating: 9.1,
    stars: 4.25,
    description: "Explore the future of AI automation with MuleRun's marketplace - discover how to buy, sell, and deploy AI agents for your business!",
    fallbackAvatar: creatorPlanckMind
  },
  "RxXvya5v5Lw": {
    rating: 9.2,
    stars: 4.25,
    description: "Learn how to monetize AI agents on MuleRun - the world's largest marketplace for buying and selling AI automation tools!",
    fallbackAvatar: creatorAIMoneyManiac
  },
  "HrKjPC_Racg": {
    rating: 9.2,
    stars: 4.25,
    description: "Real creator tests MuleRun's AI agents on his workflow - see the jaw-dropping automation results that save hours of work!",
    fallbackAvatar: creatorMartinCash
  },
  "2FugAplwawk": {
    rating: 9.5,
    stars: 4.5,
    description: "Discover how MuleRun AI agents can automate your daily creative tasks and save you hours of work every day!",
    fallbackAvatar: creatorCard5
  },
  "zc9mdszta3A": {
    rating: 9.1,
    stars: 4.25,
    description: "Learn how to automate your content creation workflow with MuleRun AI agents - save hours of work every day!",
    fallbackAvatar: creatorCard6Avatar
  }
};

// Placeholder cards for new slots
const placeholderCards: CreatorCard[] = [
  {
    thumbnail: "/placeholder.svg",
    duration: "0:00",
    title: "New Creator Video 7",
    creatorName: "Creator Name",
    creatorAvatar: "/placeholder.svg",
    fans: "0",
    rating: 9.0,
    stars: 4.5,
    description: "Placeholder description for new creator video.",
    source: "From YouTube",
    stats: "0 views",
    videoUrl: "#"
  },
  {
    thumbnail: "/placeholder.svg",
    duration: "0:00",
    title: "New Creator Video 8",
    creatorName: "Creator Name",
    creatorAvatar: "/placeholder.svg",
    fans: "0",
    rating: 9.0,
    stars: 4.5,
    description: "Placeholder description for new creator video.",
    source: "From YouTube",
    stats: "0 views",
    videoUrl: "#"
  },
  {
    thumbnail: "/placeholder.svg",
    duration: "0:00",
    title: "New Creator Video 9",
    creatorName: "Creator Name",
    creatorAvatar: "/placeholder.svg",
    fans: "0",
    rating: 9.0,
    stars: 4.5,
    description: "Placeholder description for new creator video.",
    source: "From YouTube",
    stats: "0 views",
    videoUrl: "#"
  },
  {
    thumbnail: "/placeholder.svg",
    duration: "0:00",
    title: "New Creator Video 10",
    creatorName: "Creator Name",
    creatorAvatar: "/placeholder.svg",
    fans: "0",
    rating: 9.0,
    stars: 4.5,
    description: "Placeholder description for new creator video.",
    source: "From YouTube",
    stats: "0 views",
    videoUrl: "#"
  },
  {
    thumbnail: "/placeholder.svg",
    duration: "0:00",
    title: "New Creator Video 11",
    creatorName: "Creator Name",
    creatorAvatar: "/placeholder.svg",
    fans: "0",
    rating: 9.0,
    stars: 4.5,
    description: "Placeholder description for new creator video.",
    source: "From YouTube",
    stats: "0 views",
    videoUrl: "#"
  },
  {
    thumbnail: "/placeholder.svg",
    duration: "0:00",
    title: "New Creator Video 12",
    creatorName: "Creator Name",
    creatorAvatar: "/placeholder.svg",
    fans: "0",
    rating: 9.0,
    stars: 4.5,
    description: "Placeholder description for new creator video.",
    source: "From YouTube",
    stats: "0 views",
    videoUrl: "#"
  },
  {
    thumbnail: "/placeholder.svg",
    duration: "0:00",
    title: "New Creator Video 13",
    creatorName: "Creator Name",
    creatorAvatar: "/placeholder.svg",
    fans: "0",
    rating: 9.0,
    stars: 4.5,
    description: "Placeholder description for new creator video.",
    source: "From YouTube",
    stats: "0 views",
    videoUrl: "#"
  }
];

const RatingStars = ({ count }: { count: number }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => {
        const starValue = i + 1;
        const diff = count - (starValue - 1);
        let fillPercent = 0;
        
        if (diff >= 1) {
          fillPercent = 100;
        } else if (diff > 0) {
          fillPercent = diff * 100;
        }
        
        return (
          <div key={i} className="relative w-3.5 h-3.5">
            {/* Background star (empty) */}
            <Star className="absolute inset-0 w-3.5 h-3.5 fill-gray-300 text-gray-300" />
            {/* Filled star with dynamic width */}
            {fillPercent > 0 && (
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const CreatorCardComponent = ({ card }: { card: CreatorCard }) => {
  return (
    <div className="bg-background rounded-lg overflow-hidden shadow-sm border border-border/50 w-[320px] flex-shrink-0">
      {/* Thumbnail - Clickable */}
      {card.videoUrl ? (
        <a href={card.videoUrl} target="_blank" rel="noopener noreferrer" className="block relative aspect-video group">
          <img
            src={card.thumbnail}
            alt={card.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center group-hover:bg-black/70 transition-colors">
              <Play className="w-5 h-5 text-white fill-white ml-1" />
            </div>
          </div>
          {/* Duration */}
          {card.duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
              {card.duration}
            </div>
          )}
        </a>
      ) : (
        <div className="relative aspect-video">
          <img
            src={card.thumbnail}
            alt={card.title}
            className="w-full h-full object-cover"
          />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white ml-1" />
            </div>
          </div>
          {/* Duration */}
          {card.duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
              {card.duration}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-foreground mb-3 line-clamp-2">{card.title}</h3>

        {/* Creator info */}
        <div className="flex items-center gap-2 mb-3">
          <img
            src={card.creatorAvatar}
            alt={card.creatorName}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg";
            }}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-foreground">{card.creatorName}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="w-3 h-3" />
              <span>{card.fans} Fans</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-muted text-foreground text-xs font-medium px-2 py-1 rounded">
            {card.rating}
          </span>
          <RatingStars count={card.stars} />
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {card.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/50">
          <span>{card.source}</span>
          <span>{card.stats}</span>
        </div>
      </div>
    </div>
  );
};

interface ScrollingRowProps {
  cards: CreatorCard[];
  direction: 'left' | 'right';
}

const ScrollingRow = ({ cards, direction }: ScrollingRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number>();
  const positionRef = useRef(0);

  // Duplicate cards for seamless loop
  const duplicatedCards = [...cards, ...cards];

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const cardWidth = 320 + 24; // card width + gap
    const totalWidth = cards.length * cardWidth;
    
    // Initialize position based on direction
    if (direction === 'right') {
      positionRef.current = -totalWidth;
    }

    const animate = () => {
      if (!isPaused) {
        if (direction === 'left') {
          positionRef.current -= 0.5; // Speed: 0.5px per frame
          if (positionRef.current <= -totalWidth) {
            positionRef.current = 0;
          }
        } else {
          positionRef.current += 0.5;
          if (positionRef.current >= 0) {
            positionRef.current = -totalWidth;
          }
        }
        row.style.transform = `translateX(${positionRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [cards.length, direction, isPaused]);

  return (
    <div className="overflow-hidden">
      <div
        ref={rowRef}
        className="flex gap-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedCards.map((card, index) => (
          <CreatorCardComponent key={index} card={card} />
        ))}
      </div>
    </div>
  );
};

const CreatorBreakoutSection = () => {
  const [cards, setCards] = useState<CreatorCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchYouTubeData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error: fnError } = await supabase.functions.invoke('youtube-videos', {
          body: { videoIds: VIDEO_IDS }
        });

        if (fnError) {
          console.error('Edge function error:', fnError);
          throw new Error(fnError.message);
        }

        if (data.error) {
          console.error('API error:', data.error);
          throw new Error(data.error);
        }

        const videos: YouTubeVideoInfo[] = data.videos;
        
        // Map YouTube data to card format
        const mappedCards: CreatorCard[] = videos.map((video) => {
          const static_ = staticData[video.videoId] || {
            rating: 9.0,
            stars: 4.5,
            description: "Amazing content from this creator!",
            fallbackAvatar: "/placeholder.svg"
          };

          return {
            // Use static YouTube thumbnail URL for faster loading
            thumbnail: `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`,
            duration: video.duration,
            title: video.title,
            creatorName: video.channelTitle,
            // Use static avatar from our assets instead of fetching from YouTube
            creatorAvatar: static_.fallbackAvatar,
            fans: video.subscriberCount,
            rating: static_.rating,
            stars: static_.stars,
            description: static_.description,
            source: "From YouTube",
            stats: `${video.viewCount} views · ${video.publishedAt}`,
            videoUrl: `https://www.youtube.com/watch?v=${video.videoId}`
          };
        });

        setCards(mappedCards);
      } catch (err) {
        console.error('Failed to fetch YouTube data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchYouTubeData();
  }, []);

  // Combine fetched cards with placeholder cards
  const allCards = [...cards, ...placeholderCards];
  const row1Cards = allCards.slice(0, 7); // First 7 cards for top row
  const row2Cards = allCards.slice(7, 13); // Next 6 cards for bottom row

  return (
    <section className="bg-yellow-light py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-anton text-5xl md:text-5xl lg:text-6xl leading-[120%] text-foreground mb-4">
            Become the Next Breakout Creator
          </h2>
          <p className="font-inter text-sm md:text-base text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            See how creators are using these agents to make hit videos.
          </p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading videos...</span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center py-16">
          <p className="text-destructive mb-2">Failed to load videos</p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      )}

      {/* Scrolling Rows */}
      {!loading && !error && cards.length > 0 && (
        <div className="space-y-6">
          {/* Row 1 - Scrolls Left */}
          <ScrollingRow cards={row1Cards} direction="left" />
          
          {/* Row 2 - Scrolls Right */}
          <ScrollingRow cards={row2Cards} direction="right" />
        </div>
      )}
    </section>
  );
};

export default CreatorBreakoutSection;
