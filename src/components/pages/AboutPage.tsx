import React from 'react';
import { Info, Award, Users, Target } from 'lucide-react';

const AboutPage: React.FC = () => (
  <section className="relative min-h-screen py-20 bg-background">
    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
          <Info className="w-5 h-5 text-primary" />
          <span className="text-sm font-semibold text-primary">عن الأكاديمية</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">من نحن</h1>
      </div>
      <div className="glass-vibrant rounded-3xl p-8 lg:p-12 space-y-8">
        <p className="text-lg text-muted-foreground leading-relaxed">
          أكاديمية الذكاء الاصطناعي هي منصة تعليمية عربية رائدة متخصصة في تقديم محتوى تعليمي عالي الجودة في مجالات البرمجة والذكاء الاصطناعي.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: Users, label: '+50,000 طالب', color: 'bg-primary' },
            { icon: Award, label: 'شهادات معتمدة', color: 'bg-secondary' },
            { icon: Target, label: 'محتوى حصري', color: 'bg-accent' },
          ].map((item, i) => (
            <div key={i} className="text-center p-6 bg-muted/50 rounded-2xl">
              <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <item.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <p className="font-semibold text-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutPage;
