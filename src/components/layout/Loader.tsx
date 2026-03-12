import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Brain, Sparkles } from 'lucide-react';

const Loader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHiding, setIsHiding] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const timer = setTimeout(() => {
      setIsHiding(true);
      setTimeout(() => setIsVisible(false), 600);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-700",
        isHiding && "opacity-0 scale-105 pointer-events-none"
      )}
    >
      {/* Solid Background */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-muted/30" />

      {/* Floating Orbs - Solid Colors */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/15 rounded-full blur-3xl animate-orb-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/15 rounded-full blur-3xl animate-orb-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-orb-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Loader Content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Logo Container */}
        <div className="relative mx-auto w-28 h-28" style={{ perspective: '1000px' }}>
          {/* Animated Rings */}
          {[1, 2, 3].map((ring) => (
            <div
              key={ring}
              className="absolute inset-0 border-2 border-primary/20 rounded-full animate-orb-pulse"
              style={{
                animationDelay: `${ring * 0.3}s`,
                transform: `scale(${1 + ring * 0.3})`
              }}
            />
          ))}
          
          {/* Core Icon */}
          <div className="absolute inset-0 bg-primary rounded-full shadow-glow flex items-center justify-center animate-pulse-soft">
            <Brain className="w-14 h-14 text-primary-foreground" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-tertiary animate-pulse" />
            <span>أكاديمية الذكاء الاصطناعي</span>
            <Sparkles className="w-5 h-5 text-tertiary animate-pulse" />
          </h2>
          <p className="text-muted-foreground font-medium">جاري التحميل...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
