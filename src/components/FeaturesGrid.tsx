import FeatureCard from "./FeatureCard";

const FeaturesGrid = () => {
  const sections = [
    {
      title: "Idea to Text",
      description: "How can I turn a half-baked idea into scroll-stopping content — without sounding like a robot?",
      cards: [
        { title: "Humanize Scripts", description: "Make your AI writing sound like you.", hasButton: true, link: "https://mulerun.com/agents/a63716fe-8230-49c7-8ea3-a9c1846e5e5c", imageIndex: 10 },
        { title: "Generate Shorts", description: "Idea to viral Short — everything baked in.", hasButton: true, link: "https://mulerun.com/agents/2d7a8a1b-4257-4cab-93e5-d790fe1ff807", imageIndex: 11 },
        { title: "Convert Threads", description: "Turn Reddit gold into YouTube stories—fast.", hasButton: true, link: "https://mulerun.com/agents/0cfa5d63-8037-4690-820c-b1d3f2a43d7f", imageIndex: 12 },
        { title: "Remix Shorts", description: "Remake the hit formula—fresh content.", hasButton: true, link: "https://mulerun.com/agents/03d920f7-6199-4bd0-9379-5fac38051523", imageIndex: 13 },
      ],
      layout: "right",
    },
    {
      title: "Text to Audio",
      description: "How can I turn plain text into rich, human-sounding audio — instantly and without a mic?",
      cards: [
        { title: "Make Shorts", description: "Auto-cut highlights that grab attention—perfect for social.", hasButton: true, link: "https://mulerun.com/agents/060c2d29-6d0f-41ef-aa16-bd4a000e1ef5", imageIndex: 2 },
        { title: "Generate Podcast", description: "Natural voice, ready to publish in seconds.", hasButton: true, link: "https://mulerun.com/agents/427c5b36-2769-4358-a93d-1323ec7ce1a4", imageIndex: 3 },
      ],
      layout: "left",
    },
    {
      title: "Great content, but no clicks?",
      description: "How can I get scroll-stopping titles and thumbnails — that actually convert?",
      cards: [
        { title: "Generate Title", description: "Scroll-stopping hooks tailored to your audience's interests.", hasButton: true, link: "https://mulerun.com/agents/f350d285-6795-4f94-97d9-2c9308b06b93", imageIndex: 5 },
        { title: "Create Thumbnail", description: "High-CTR visuals, optimized and done in one click.", hasButton: true, link: "https://mulerun.com/agents/01045f00-c02f-46eb-951b-8752bb5a6f12", imageIndex: 6 },
      ],
      layout: "right",
    },
    {
      title: "Posting to just one platform?",
      description: "How can I repurpose one video into posts for all social platforms — instantly?",
      cards: [
        { title: "Repurpose Content", description: "One piece, everywhere—zero rework.", hasButton: true, link: "https://mulerun.com/agents/9c9b03f0-41e8-4fbb-a99e-ac2f376dc24d", imageIndex: 7 },
      ],
      layout: "left",
    },
  ];

  return (
    <section className="bg-yellow-light border-t border-b border-yellow-glow">
      {/* Top Decorative pixels */}
      <div className="relative h-[72px] hidden md:flex justify-start pl-[60px] pt-4">
        <div className="flex gap-[3px]">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-[45px] h-[72px] relative">
              {[...Array(8)].map((_, j) => (
                <div 
                  key={j} 
                  className="absolute w-[9px] h-[9px] bg-yellow-soft"
                  style={{
                    left: `${(j % 2) * 9 + Math.floor(j / 2) * 9}px`,
                    top: `${j * 9}px`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="pt-10 md:pt-14 pb-10 md:pb-14 px-4 md:px-[60px]">
          <div className={`flex flex-col lg:flex-row gap-8 lg:gap-[80px] items-center justify-center ${section.layout === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
            {/* Text Content */}
            <div className={`flex flex-col gap-4 max-w-[400px] text-center lg:text-left ${section.layout === 'left' ? 'lg:text-right' : ''}`}>
              <h2 className="font-inter font-bold text-2xl md:text-[32px] leading-[120%] text-foreground">
                {section.title}
              </h2>
              <p className="font-inter font-medium text-base leading-normal text-muted-foreground">
                {section.description}
              </p>
            </div>

            {/* Cards Grid */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                {section.cards.slice(0, 2).map((card, cardIndex) => (
                  <FeatureCard 
                    key={cardIndex} 
                    title={card.title}
                    description={card.description}
                    hasButton={card.hasButton}
                    link={card.link}
                    imageIndex={card.imageIndex}
                  />
                ))}
              </div>
              {section.cards.length > 2 && (
                <div className="flex flex-col md:flex-row gap-4">
                  {section.cards.slice(2, 4).map((card, cardIndex) => (
                    <FeatureCard 
                      key={cardIndex + 2} 
                      title={card.title}
                      description={card.description}
                      hasButton={card.hasButton}
                      link={card.link}
                      imageIndex={card.imageIndex}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Decorative pixels */}
      <DecorativePixels />
    </section>
  );
};

const DecorativePixels = () => (
  <div className="relative h-[72px] hidden md:flex justify-start pl-[120px]">
    <div className="flex gap-[3px] rotate-180">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-[45px] h-[72px] relative">
          {[...Array(8)].map((_, j) => (
            <div 
              key={j} 
              className="absolute w-[9px] h-[9px] bg-yellow-soft"
              style={{
                left: `${(j % 2) * 9 + Math.floor(j / 2) * 9}px`,
                top: `${j * 9}px`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default FeaturesGrid;