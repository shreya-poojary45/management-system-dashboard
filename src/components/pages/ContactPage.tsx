import React, { useState } from 'react';
import { useAcademy } from '@/context/AcademyContext';
import { useToast } from '@/hooks/use-toast';
import { Mail, Send, User, MessageSquare } from 'lucide-react';

const ContactPage: React.FC = () => {
  const { addMessage } = useAcademy();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    addMessage({ ...form, date: new Date().toISOString() });
    toast({ title: 'تم الإرسال!', description: 'سنتواصل معك قريباً' });
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="relative min-h-screen py-20 bg-background">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <Mail className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">تواصل معنا</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">نحن هنا لمساعدتك</h1>
        </div>
        <form onSubmit={handleSubmit} className="glass-vibrant rounded-3xl p-8 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="الاسم" className="w-full pr-12 pl-4 py-3 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary/50" required />
            </div>
            <div className="relative">
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="البريد الإلكتروني" className="w-full pr-12 pl-4 py-3 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary/50" dir="ltr" required />
            </div>
          </div>
          <input type="text" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="الموضوع" className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary/50" />
          <div className="relative">
            <MessageSquare className="absolute right-4 top-4 w-5 h-5 text-muted-foreground" />
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="رسالتك..." rows={5} className="w-full pr-12 pl-4 py-3 bg-muted border border-border rounded-xl resize-none focus:ring-2 focus:ring-primary/50" required />
          </div>
          <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary-dark transition-all">
            <Send className="w-5 h-5" />
            إرسال الرسالة
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
