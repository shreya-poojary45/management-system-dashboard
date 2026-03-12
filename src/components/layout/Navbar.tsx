import React from 'react';
import { useAcademy } from '@/context/AcademyContext';
import { cn } from '@/lib/utils';
import { Brain, Home, LayoutDashboard, GraduationCap, HelpCircle, Route, Mail, Info, LogIn, LogOut, Menu, X } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

const navItems = [
  { id: 'home', label: 'الرئيسية', icon: Home },
  { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
  { id: 'courses', label: 'الكورسات', icon: GraduationCap },
  { id: 'quiz', label: 'الاختبارات', icon: HelpCircle },
  { id: 'paths', label: 'المسارات', icon: Route },
  { id: 'contact', label: 'اتصل بنا', icon: Mail },
  { id: 'about', label: 'عن الأكاديمية', icon: Info },
];

const Navbar: React.FC = () => {
  const {
    user,
    logout,
    currentPage,
    navigate,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useAcademy();

  const handleNavClick = (item: typeof navItems[0]) => {
    navigate(item.id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 glass-vibrant border-b border-primary/10 shadow-soft">
        <div className="relative overflow-hidden">
          {/* Solid color line */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary/30" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <button
                onClick={() => navigate('home')}
                className="flex items-center gap-3 group"
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-glow-sm group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-7 h-7 text-primary-foreground" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-foreground">أكاديمية AI</h1>
                  <p className="text-xs text-muted-foreground">تعلم المستقبل</p>
                </div>
              </button>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      className={cn(
                        "relative px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 group",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-glow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <Icon className={cn(
                        "w-4 h-4 transition-transform duration-300",
                        isActive ? "scale-110" : "group-hover:scale-110"
                      )} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Auth Button & Mobile Menu */}
              <div className="flex items-center gap-3">
                {user && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl hover:shadow-soft transition-all duration-300">
                        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                          <span className="text-secondary-foreground font-bold text-sm">
                            {user.username.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="hidden sm:block text-sm font-medium text-foreground">{user.username}</span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 glass-vibrant border-primary/10">
                      <DropdownMenuItem onClick={() => navigate('dashboard')} className="gap-2 cursor-pointer">
                        <LayoutDashboard className="w-4 h-4" />
                        لوحة التحكم
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="gap-2 cursor-pointer text-destructive">
                        <LogOut className="w-4 h-4" />
                        تحديث العرض التوضيحي
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2.5 rounded-xl glass hover:shadow-soft transition-all duration-300"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6 text-foreground" />
                  ) : (
                    <Menu className="w-6 h-6 text-foreground" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 transition-all duration-500",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={cn(
            "absolute top-20 left-4 right-4 glass-vibrant rounded-2xl p-6 shadow-lg transition-all duration-500",
            isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          )}
        >
          <div className="space-y-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
