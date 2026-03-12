import React from 'react';
import { useAcademy } from '@/context/AcademyContext';
import { Brain, ChevronLeft, Mail, Phone, Facebook, Heart } from 'lucide-react';
import { MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  const { navigate } = useAcademy();

  const quickLinks = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'courses', label: 'الكورسات' },
    { id: 'paths', label: 'المسارات' },
    { id: 'about', label: 'عن الأكاديمية' },
    { id: 'contact', label: 'اتصل بنا' },
  ];

  const socialLinks = [
    { icon: MessageCircle, href: 'https://wa.me/201016707108', label: 'WhatsApp', target: '_blank' },
    { icon: Facebook, href: 'https://www.facebook.com/ahmedyassin1900900', label: 'Facebook', target: '_blank' },
    { icon: Mail, href: 'mailto:ahmedyassin1900900@gmail.com', label: 'Gmail', target: '_self' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-muted pt-20 pb-8 overflow-hidden">
      {/* Decorative Elements - Solid Colors */}
      <div className="absolute top-0 left-0 right-0 h-px bg-primary/20" />
      <div className="absolute -top-40 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -top-40 left-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-glow-sm">
                <Brain className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">أكاديمية AI</h3>
                <p className="text-sm text-muted-foreground">تعلم المستقبل اليوم</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              نقدم لك أفضل المحتوى التعليمي في مجال الذكاء الاصطناعي والبرمجة باللغة العربية. انضم إلى آلاف المتعلمين وابدأ رحلتك نحو المستقبل.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target={social.target}
                    rel={social.target === '_blank' ? 'noopener noreferrer' : undefined}
                    aria-label={social.label}
                    className="w-11 h-11 bg-card rounded-xl flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-glow-sm"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-foreground">روابط سريعة</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.id)}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 group"
                  >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-foreground">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <span>info@ai-academy.com</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <span dir="ltr">+20101607108</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              صنع بـواسطة احمد ياسين محمد  في {currentYear}
            </p>
            <p className="text-muted-foreground text-sm">
              جميع الحقوق محفوظة © أكاديمية الذكاء الاصطناعي
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
