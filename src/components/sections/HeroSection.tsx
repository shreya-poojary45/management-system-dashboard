import React, { useEffect, useRef } from 'react';
import { useAcademy } from '@/context/AcademyContext';
import { Sparkles, Rocket, Compass, CheckCircle, Users, BookOpen, Clock, Award, Code } from 'lucide-react';

interface StatItem {
  count: number;
  label: string;
  icon: React.ReactNode;
  suffix: string;
}

const stats: StatItem[] = [
  { count: 50000, label: 'طالب نشط', icon: <Users className="w-6 h-6" />, suffix: '+' },
  { count: 150, label: 'كورس متاح', icon: <BookOpen className="w-6 h-6" />, suffix: '+' },
  { count: 2000, label: 'ساعة تعليمية', icon: <Clock className="w-6 h-6" />, suffix: '+' },
  { count: 95, label: 'نسبة النجاح', icon: <Award className="w-6 h-6" />, suffix: '%' },
];

const HeroSection: React.FC = () => {
  const { navigate, user } = useAcademy();
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach((counter) => {
              const target = parseInt(counter.getAttribute('data-target') || '0');
              animateCounter(counter as HTMLElement, target);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (countersRef.current) {
      observer.observe(countersRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounter = (element: HTMLElement, target: number) => {
    let count = 0;
    const speed = Math.ceil(target / 100);
    const timer = setInterval(() => {
      count += speed;
      if (count >= target) {
        count = target;
        clearInterval(timer);
      }
      element.textContent = count.toLocaleString();
    }, 20);
  };

  const handleStartLearning = () => {
    navigate('courses');
  };

  // Floating cards with distinct solid colors matching the reference image
  const floatingCards = [
    { icon: 'fas fa-brain', label: 'AI', bgColor: 'bg-secondary' },
    { icon: 'fab fa-python', label: 'Python', bgColor: 'bg-secondary' },
    { icon: 'fas fa-robot', label: 'ML', bgColor: 'bg-accent' },
    { icon: 'fas fa-chart-line', label: 'Data', bgColor: 'bg-tertiary' },
    { icon: 'fas fa-server', label: 'Backend', bgColor: 'bg-primary' },
    { icon: 'fas fa-laptop-code', label: 'Frontend', bgColor: 'bg-secondary' },
    { icon: 'fas fa-mobile-alt', label: 'Apps', bgColor: 'bg-accent' },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0 bg-background" />

      {/* Subtle Solid Color Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[450px] h-[450px] bg-primary/10 rounded-full blur-3xl animate-orb-pulse" />
        <div className="absolute top-1/2 -left-32 w-[350px] h-[350px] bg-secondary/8 rounded-full blur-3xl animate-orb-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-32 right-1/3 w-[400px] h-[400px] bg-accent/6 rounded-full blur-3xl animate-orb-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-right order-2 lg:order-1 space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-card border border-border rounded-full shadow-soft animate-fade-in-up">
              <Sparkles className="w-5 h-5 text-tertiary animate-pulse" />
              <span className="text-sm font-semibold text-primary">
                المنصة الأولى عربياً في الذكاء الاصطناعي
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <span className="text-foreground">ابدأ رحلتك في</span>
              <br />
              <span className="text-primary">الذكاء الاصطناعي</span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              تعلم البرمجة والذكاء الاصطناعي من الصفر إلى الاحتراف مع أفضل الخبراء العرب. اكتشف مستقبلك التقني معنا واحصل على شهادات معتمدة.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={handleStartLearning}
                className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg shadow-glow hover:bg-primary-dark hover:scale-105 transition-all duration-500 overflow-hidden"
              >
                <Rocket className="w-5 h-5 relative z-10 group-hover:animate-bounce" />
                <span className="relative z-10">ابدأ التعلم مجاناً</span>
              </button>
              <button
                onClick={() => navigate('courses')}
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-card border-2 border-primary/20 text-foreground rounded-2xl font-semibold text-lg hover:bg-primary hover:text-primary-foreground hover:border-transparent hover:shadow-glow transition-all duration-500"
              >
                <Compass className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
                <span>استكشف الكورسات</span>
              </button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {['شهادات معتمدة', 'دعم فني 24/7', 'تعلم ذاتي', 'محتوى حصري'].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Content - Floating Cards with Icons */}
          <div className="relative order-1 lg:order-2 h-[400px] lg:h-[550px]" style={{ perspective: '1200px' }}>
            {/* Floating Tech Cards */}
            {floatingCards.map((card, index) => {
              const positions = [
                { top: '2%', right: '15%' },      // AI
                { top: '5%', right: '55%' },      // Python
                { top: '25%', right: '80%' },     // ML
                { top: '55%', right: '88%' },     // Data
                { top: '78%', right: '62%' },     // Backend
                { top: '72%', right: '22%' },     // Frontend
                { top: '42%', right: '2%' },      // Apps
              ];
              return (
                <div
                  key={index}
                  className="absolute w-20 h-20 lg:w-24 lg:h-24 bg-card border border-border rounded-2xl flex flex-col items-center justify-center gap-2 animate-float hover:scale-110 hover:shadow-glow-sm transition-all duration-500 cursor-pointer group shadow-soft"
                  style={{
                    ...positions[index],
                    animationDelay: `${index * 0.4}s`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 ${card.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <i className={`${card.icon} text-lg lg:text-xl text-white`} />
                  </div>
                  <span className="text-xs font-bold text-foreground">{card.label}</span>
                </div>
              );
            })}

            {/* Central Orb - Solid Blue */}
            <div
              className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-40 lg:h-40"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Animated Rings */}
              {[1, 2, 3].map((ring) => (
                <div
                  key={ring}
                  className="absolute inset-0 border-2 border-primary/15 rounded-full animate-orb-pulse"
                  style={{
                    animationDelay: `${ring * 0.4}s`,
                    transform: `scale(${1 + ring * 0.35})`
                  }}
                />
              ))}
              {/* Core Orb - Solid Primary */}
              <div className="absolute inset-0 bg-primary rounded-full shadow-glow flex items-center justify-center animate-pulse-soft">
                <Code className="w-12 h-12 lg:w-14 lg:h-14 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={countersRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mt-20 lg:mt-28"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border rounded-3xl p-6 lg:p-8 text-center hover-lift cursor-pointer overflow-hidden shadow-soft"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Hover Effect - Solid Color */}
              <div className="absolute inset-0 bg-primary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:shadow-glow-sm transition-all duration-500 text-primary-foreground">
                  {stat.icon}
                </div>
                <h3 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-2">
                  <span className="counter" data-target={stat.count}>0</span>
                  <span className="text-primary">{stat.suffix}</span>
                </h3>
                <p className="text-muted-foreground font-semibold">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
