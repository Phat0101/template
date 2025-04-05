'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Code } from 'lucide-react';
import Image from 'next/image';

interface FeatureItemProps {
  title: string;
  description: string;
  tagName: string;
  // Support multiple media types
  icon?: React.ReactNode;
  imageSrc?: string;
  videoSrc?: string;
  reverse?: boolean;
}

// Function to extract YouTube video ID from different URL formats
const getYouTubeVideoId = (url: string): string | null => {
  // Handle youtu.be format
  if (url.includes('youtu.be')) {
    const parts = url.split('/');
    const lastPart = parts[parts.length - 1];
    // Remove any query parameters
    return lastPart.split('?')[0];
  }
  
  // Handle youtube.com format
  if (url.includes('youtube.com/watch')) {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('v');
  }
  
  // Handle youtube.com/embed format
  if (url.includes('youtube.com/embed/')) {
    const parts = url.split('youtube.com/embed/');
    return parts[1].split('?')[0];
  }
  
  return null;
};

const FeatureItem: React.FC<FeatureItemProps> = ({
  title,
  description,
  tagName,
  icon,
  imageSrc,
  videoSrc,
  reverse = false,
}) => {
  // Check if the video is a YouTube video
  const youtubeVideoId = videoSrc ? getYouTubeVideoId(videoSrc) : null;
  const isYouTubeVideo = !!youtubeVideoId;
  
  return (
    <div className={`panel flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-6 py-8 min-h-[80vh] items-center`}>
      <div className="textBox flex-1 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="anchor text-accent text-sm font-medium mb-3">
          # {tagName}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="title text-2xl md:text-3xl font-bold mb-4">
          {title}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="desc text-muted-foreground text-base md:text-lg">
          {description}
        </motion.div>
      </div>
      <div className="imgBox flex-1" style={{ aspectRatio: '16/9' }}>
        <div className="relative w-full h-full rounded-lg overflow-hidden border bg-card">
          {/* Render icon */}
          {icon && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/20 opacity-70"></div>
              <div className="relative text-accent z-10">
                <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
                  {icon}
                </div>
              </div>
            </div>
          )}
          
          {/* Render image */}
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
              className="z-10"
            />
          )}
          
          {/* Render YouTube video */}
          {isYouTubeVideo && (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&rel=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full z-10"
            />
          )}
          
          {/* Render regular video */}
          {videoSrc && !isYouTubeVideo && (
            <video 
              src={videoSrc}
              className="w-full h-full object-cover z-10"
              controls={false}
              autoPlay
              muted
              loop
              playsInline
            />
          )}
        </div>
      </div>
    </div>
  );
};

const FeatureDisplay: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="head text-center mb-12 md:mb-16">
        <div className="tag-line text-accent text-sm font-medium mb-2">FEATURES</div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Powerful Features</h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
          Our platform provides robust tools designed to enhance your workflow and productivity.
        </p>
      </div>

      <div className="space-y-8 md:space-y-12">
        <FeatureItem
          tagName="Automation"
          title="Streamline your workflow with AI-powered tools"
          description="Our intelligent automation tools help you save time by handling repetitive tasks, allowing you to focus on what matters most - creating exceptional products."
          icon={<Code className="w-full h-full" />}
        />

        <FeatureItem
          tagName="Analytics"
          title="Make data-driven decisions with powerful insights"
          description="Gain valuable insights into your performance with comprehensive analytics. Visualize trends, track progress, and identify opportunities for growth with our intuitive dashboards."
          imageSrc="/images/download.jpeg"
          reverse={true}
        />

        <FeatureItem
          tagName="Collaboration"
          title="Work together seamlessly with your team"
          description="Foster effective collaboration with real-time communication tools. Share ideas, provide feedback, and work together on projects regardless of physical location."
          videoSrc="https://youtu.be/Li7uBMGQinw?si=rIGOtKnYaAszpGaO"
        />
      </div>
    </div>
  );
};

export default FeatureDisplay; 