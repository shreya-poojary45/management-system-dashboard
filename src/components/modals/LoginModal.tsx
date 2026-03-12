import React, { useState } from 'react';
import { useAcademy } from '@/context/AcademyContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { User, Mail, Lock, LogIn, UserPlus, X, Sparkles } from 'lucide-react';

const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, login, signup, user } = useAcademy();
  const { toast } = useToast();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [form, setForm] = useState({ username: '', email: '', password: '', name: '', confirmPassword: '' });
  const [error, setError] = useState('');

  if (!isLoginModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) { setError('الرجاء تعبئة البريد وكلمة المرور'); return; }
    const success = login(form.email, form.password, form.username);
    if (success) {
      setIsLoginModalOpen(false);
      toast({
        title: `مرحباً ${user?.username || form.username || form.email.split('@')[0]}!`,
        description: 'تم تسجيل الدخول بنجاح',
      });
      setForm({ username: '', email: '', password: '', name: '', confirmPassword: '' });
    }
    else { setError('بيانات الدخول غير صحيحة'); }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.password || !form.confirmPassword) { setError('الرجاء تعبئة جميع الحقول'); return; }
    if (form.password !== form.confirmPassword) { setError('كلمة المرور غير متطابقة'); return; }
    if (form.password.length < 6) { setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل'); return; }
    const success = signup(form.name, form.email, form.password);
    if (success) {
      setIsLoginModalOpen(false);
      toast({
        title: `مرحباً ${form.name}!`,
        description: 'تم إنشاء حسابك بنجاح',
      });
      setForm({ username: '', email: '', password: '', name: '', confirmPassword: '' });
    }
    else { setError('البريد الإلكتروني مسجل مسبقاً'); }
  };

  const handleClose = () => {
    setIsLoginModalOpen(false);
    setForm({ username: '', email: '', password: '', name: '', confirmPassword: '' });
    setError('');
    setMode('login');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md glass-vibrant rounded-3xl p-8 shadow-lg animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow-sm">
            {mode === 'login' ? <LogIn className="w-8 h-8 text-primary-foreground" /> : <UserPlus className="w-8 h-8 text-primary-foreground" />}
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </h2>
          <p className="text-muted-foreground mt-2">
            {mode === 'login' ? 'أهلاً بعودتك! سجل دخولك للاستمرار' : 'انضم إلينا وابدأ رحلة التعلم'}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="space-y-5">
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">الاسم الكامل</label>
              <div className="relative">
                <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="أدخل اسمك الكامل"
                  className="w-full pr-12 pl-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="example@email.com"
                className="w-full pr-12 pl-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                dir="ltr"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pr-12 pl-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                dir="ltr"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">تأكيد كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pr-12 pl-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                  dir="ltr"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg shadow-glow-sm hover:bg-primary-dark hover:shadow-glow transition-all duration-300"
          >
            <Sparkles className="w-5 h-5" />
            {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب'}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            {mode === 'login' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
            <button
              type="button"
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
              className="text-primary font-semibold hover:text-primary-dark mr-2 transition-colors"
            >
              {mode === 'login' ? 'سجل الآن' : 'سجل دخولك'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
