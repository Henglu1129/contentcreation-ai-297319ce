import { useEffect, useState } from "react";
import { Play, Star, Users, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import creatorUmutAktu from "@/assets/creator-umut-aktu.jpg";
import creatorPlanckMind from "@/assets/creator-planckmind.jpg";
import creatorAIMoneyManiac from "@/assets/creator-card3.jpg";
import creatorMartinCash from "@/assets/creator-martin-cash.jpg";
import creatorCard5 from "@/assets/creator-card5.jpg";
import creatorCard6Avatar from "@/assets/creator-card6-avatar.jpg";
import creatorGet365AI from "@/assets/creator-get365ai.jpg";
import creatorMetaverseGuy from "@/assets/creator-metaverse-guy.jpg";
import creatorMulerunGroup from "@/assets/creator-mulerun-group.png";
import creatorWincash from "@/assets/creator-wincash.jpg";
import creatorBruceDark from "@/assets/creator-bruce-dark.jpg";
import creatorHiveCorp from "@/assets/creator-hive-corp.jpg";
import creatorNafay3D from "@/assets/creator-nafay-3d.jpg";

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

// Video IDs to fetch - first 7 are for carousel (first row), last 3 for grid (second row)
const CAROUSEL_VIDEO_IDS = [
  "m8brjPr23j4",
  "ygJsgrrUUH0", 
  "RxXvya5v5Lw",
  "utU3OsLYWnM",
  "dZwjGj5Z9a8",
  "l6TDxq98Q1M",
  "Nr_SQOeN43I"  // New video
];

const GRID_VIDEO_IDS = [
  "HrKjPC_Racg",
  "2FugAplwawk",
  "zc9mdszta3A",
  "w8OsJkfYgLw",
  "g3UIOlhYz9w",
  "Xu5kFtuTaV8"  // New video
];

const VIDEO_IDS = [...CAROUSEL_VIDEO_IDS, ...GRID_VIDEO_IDS];

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
    rating: 9.5,
    stars: 4.5,
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
  },
  "utU3OsLYWnM": {
    rating: 9.5,
    stars: 4.5,
    description: "Discover how AI automation can transform your content creation process and save you hours of work!",
    fallbackAvatar: creatorGet365AI
  },
  "dZwjGj5Z9a8": {
    rating: 9.5,
    stars: 4.5,
    description: "Explore the power of AI agents and how they can revolutionize your content creation workflow!",
    fallbackAvatar: creatorMetaverseGuy
  },
  "l6TDxq98Q1M": {
    rating: 9.1,
    stars: 4.15,
    description: "Discover AI-powered content creation tools that can transform your workflow!",
    fallbackAvatar: creatorWincash
  },
  "Nr_SQOeN43I": {
    rating: 9.1,
    stars: 4.15,
    description: "Learn how AI agents can help automate your content creation and boost productivity!",
    fallbackAvatar: creatorBruceDark
  },
  "w8OsJkfYgLw": {
    rating: 9.1,
    stars: 4.15,
    description: "Explore the power of AI automation and how it can revolutionize your workflow!",
    fallbackAvatar: creatorHiveCorp
  },
  "g3UIOlhYz9w": {
    rating: 9.2,
    stars: 4.25,
    description: "Discover how AI can streamline your creative process and boost your productivity!",
    fallbackAvatar: creatorNafay3D
  },
  "Xu5kFtuTaV8": {
    rating: 9.2,
    stars: 4.25,
    description: "Learn how to leverage AI agents for maximum content creation efficiency!",
    fallbackAvatar: creatorCard6Avatar
  }
};

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

const CreatorCard = ({ card }: { card: CreatorCard }) => {
  return (
    <div className="bg-background rounded-lg overflow-hidden shadow-sm border border-border/50">
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

  return (
    <section className="bg-yellow-light py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-anton text-5xl md:text-5xl lg:text-6xl leading-[120%] text-foreground mb-4">
            Become the Next Breakout Creator
          </h2>
          <p className="font-inter text-sm md:text-base text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            See how creators are using these agents to make hit videos.
          </p>
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

        {/* First Row - Auto-scrolling Marquee */}
        {!loading && !error && cards.length > 0 && (
          <>
            <div className="overflow-hidden mb-6 group/marquee">
              <div 
                className="flex gap-6 animate-marquee"
                style={{ width: 'max-content' }}
              >
                {/* First set of cards */}
                {cards.slice(0, 7).map((card, index) => (
                  <div key={index} className="w-[calc((100vw-48px)/1)] md:w-[calc((100vw-72px)/2)] lg:w-[calc((1280px-48px)/3)] flex-shrink-0">
                    <CreatorCard card={card} />
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {cards.slice(0, 7).map((card, index) => (
                  <div key={`dup-${index}`} className="w-[calc((100vw-48px)/1)] md:w-[calc((100vw-72px)/2)] lg:w-[calc((1280px-48px)/3)] flex-shrink-0">
                    <CreatorCard card={card} />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Second Row - Auto-scrolling Marquee (reverse direction) */}
            <div className="overflow-hidden group/marquee">
              <div 
                className="flex gap-6 animate-marquee-reverse"
                style={{ width: 'max-content' }}
              >
                {/* First set of cards */}
                {cards.slice(7).map((card, index) => (
                  <div key={index} className="w-[calc((100vw-48px)/1)] md:w-[calc((100vw-72px)/2)] lg:w-[calc((1280px-48px)/3)] flex-shrink-0">
                    <CreatorCard card={card} />
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                {cards.slice(7).map((card, index) => (
                  <div key={`dup-${index}`} className="w-[calc((100vw-48px)/1)] md:w-[calc((100vw-72px)/2)] lg:w-[calc((1280px-48px)/3)] flex-shrink-0">
                    <CreatorCard card={card} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CreatorBreakoutSection;
