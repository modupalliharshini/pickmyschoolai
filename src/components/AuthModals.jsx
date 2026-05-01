import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useModal } from '../context/ModalContext';
import { toast } from 'sonner';

export const AuthModals = () => {
  const { modal, modalData, closeModal } = useModal();
  const [form, setForm] = useState({});
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submitSignIn = (e) => {
    e.preventDefault();
    toast.success(`Welcome back${form.email ? ', ' + form.email.split('@')[0] : ''}!`);
    setForm({});
    closeModal();
  };
  const submitList = (e) => {
    e.preventDefault();
    toast.success(`Thanks! ${form.school || 'Your school'} submitted for listing.`);
    setForm({});
    closeModal();
  };

  return (
    <>
      <Dialog open={modal === 'signin'} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent className="sm:max-w-[400px] bg-white border-stone-200 rounded-[28px] p-6 lg:p-7">
          <DialogHeader className="mb-2">
            <DialogTitle className="font-serif text-[24px] font-bold text-stone-900 leading-tight">Sign in</DialogTitle>
            <DialogDescription className="text-stone-400 font-medium text-[13px]">Access your saved schools and applications.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submitSignIn} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-stone-500 font-bold text-[12px] uppercase tracking-wider">Email</Label>
              <Input type="email" required value={form.email || ''} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" className="h-11 rounded-xl bg-stone-50 border-stone-100 text-[14px]" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-stone-500 font-bold text-[12px] uppercase tracking-wider">Password</Label>
              <Input type="password" required value={form.password || ''} onChange={(e) => set('password', e.target.value)} placeholder="••••••••" className="h-11 rounded-xl bg-stone-50 border-stone-100 text-[14px]" />
            </div>
            <button type="submit" className="w-full bg-[#7C1A1A] hover:bg-[#651414] text-white py-3.5 rounded-xl font-bold text-[15px] shadow-lg shadow-[#7C1A1A]/20 transition-all">Sign in</button>
            <p className="text-center text-[13px] text-stone-400 font-medium">No account? <button type="button" className="text-[#7C1A1A] font-bold hover:underline">Create one</button></p>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={modal === 'list'} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent className="sm:max-w-[480px] bg-white border-stone-200 rounded-[28px] p-6 lg:p-7">
          <DialogHeader className="mb-2">
            <DialogTitle className="font-serif text-[24px] font-bold text-stone-900 leading-tight">List your school</DialogTitle>
            <DialogDescription className="text-stone-400 font-medium text-[13px]">Get verified and reach thousands of parents.</DialogDescription>
          </DialogHeader>
          <form onSubmit={submitList} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-stone-500 font-bold text-[12px] uppercase tracking-wider">School name</Label>
                <Input required value={form.school || ''} onChange={(e) => set('school', e.target.value)} placeholder="Greenfield Public School" className="h-11 rounded-xl bg-stone-50 border-stone-100 text-[14px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-stone-500 font-bold text-[12px] uppercase tracking-wider">City</Label>
                <Input required value={form.city || ''} onChange={(e) => set('city', e.target.value)} placeholder="Hyderabad" className="h-11 rounded-xl bg-stone-50 border-stone-100 text-[14px]" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-stone-500 font-bold text-[12px] uppercase tracking-wider">Your name</Label>
                <Input required value={form.name || ''} onChange={(e) => set('name', e.target.value)} placeholder="Admissions head" className="h-11 rounded-xl bg-stone-50 border-stone-100 text-[14px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-stone-500 font-bold text-[12px] uppercase tracking-wider">Phone</Label>
                <Input required value={form.phone || ''} onChange={(e) => set('phone', e.target.value)} placeholder="+91 98765 43210" className="h-11 rounded-xl bg-stone-50 border-stone-100 text-[14px]" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-stone-500 font-bold text-[12px] uppercase tracking-wider">Email</Label>
              <Input type="email" required value={form.email || ''} onChange={(e) => set('email', e.target.value)} placeholder="admin@school.edu" className="h-11 rounded-xl bg-stone-50 border-stone-100 text-[14px]" />
            </div>
            <button type="submit" className="w-full bg-[#7C1A1A] hover:bg-[#651414] text-white py-3.5 rounded-xl font-bold text-[15px] shadow-lg shadow-[#7C1A1A]/20 transition-all">Submit application</button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={modal === 'apply'} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent className="sm:max-w-[480px] bg-white border-stone-200 rounded-[28px] p-6 lg:p-7">
          <DialogHeader className="mb-2">
            <DialogTitle className="font-serif text-[24px] font-bold text-stone-900 leading-tight">
              Apply to {modalData?.schoolName || 'School'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={submitSignIn} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-stone-500 font-bold text-[12px] uppercase tracking-wider">Child's name</Label>
                <Input required value={form.childName || ''} onChange={(e) => set('childName', e.target.value)} placeholder="Full name" className="h-11 rounded-xl bg-stone-50 border-stone-100 text-[14px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-stone-500 font-bold text-[12px] uppercase tracking-wider">Phone</Label>
                <Input required type="tel" value={form.phone || ''} onChange={(e) => set('phone', e.target.value)} placeholder="+91 98765 43210" className="h-11 rounded-xl bg-stone-50 border-stone-100 text-[14px]" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-stone-500 font-bold text-[12px] uppercase tracking-wider">Age</Label>
                <Input required value={form.age || ''} onChange={(e) => set('age', e.target.value)} placeholder="6" className="h-11 rounded-xl bg-stone-50 border-stone-100 text-[14px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-stone-500 font-bold text-[12px] uppercase tracking-wider">Grade</Label>
                <Input required value={form.grade || ''} onChange={(e) => set('grade', e.target.value)} placeholder="Class 1" className="h-11 rounded-xl bg-stone-50 border-stone-100 text-[14px]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-stone-500 font-bold text-[12px] uppercase tracking-wider">Notes (optional)</Label>
              <textarea 
                value={form.notes || ''} 
                onChange={(e) => set('notes', e.target.value)} 
                placeholder="Anything else we should know?" 
                className="w-full h-20 rounded-xl bg-stone-50 border-stone-100 p-3 outline-none focus:ring-1 focus:ring-[#7C1A1A] text-[14px]"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button type="button" onClick={closeModal} className="w-full sm:w-auto text-stone-400 font-bold text-[14px] hover:text-stone-600 transition-colors px-4 py-2">
                Cancel
              </button>
              <button type="submit" className="w-full sm:w-auto bg-[#7C1A1A] hover:bg-[#651414] text-white px-8 py-3 rounded-xl font-bold text-[14px] shadow-lg shadow-[#7C1A1A]/20 transition-all">
                Submit application
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={modal === 'bookTrial'} onOpenChange={(o) => !o && closeModal()}>
        <DialogContent className="sm:max-w-[480px] bg-white border-stone-200 rounded-[28px] p-6 lg:p-7">
          <DialogHeader className="mb-2">
            <DialogTitle className="font-serif text-[24px] font-bold text-stone-900 leading-tight">
              Trial with {modalData?.teacherName || 'Teacher'}
            </DialogTitle>
            <DialogDescription className="text-stone-400 font-medium text-[13px]">
              Start your learning journey with a free session.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitSignIn} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-stone-500 font-bold text-[12px] uppercase tracking-wider">Your name</Label>
              <Input required value={form.parentName || ''} onChange={(e) => set('parentName', e.target.value)} placeholder="Full name" className="h-11 rounded-xl bg-stone-50 border-stone-100 text-[14px]" />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-stone-500 font-bold text-[12px] uppercase tracking-wider">Grade</Label>
                <Input required value={form.studentGrade || ''} onChange={(e) => set('studentGrade', e.target.value)} placeholder="Class 8" className="h-11 rounded-xl bg-stone-50 border-stone-100 text-[14px]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-stone-500 font-bold text-[12px] uppercase tracking-wider">Phone</Label>
                <Input required type="tel" value={form.phone || ''} onChange={(e) => set('phone', e.target.value)} placeholder="+91 98765 43210" className="h-11 rounded-xl bg-stone-50 border-stone-100 text-[14px]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-stone-500 font-bold text-[12px] uppercase tracking-wider">Message (optional)</Label>
              <textarea 
                value={form.message || ''} 
                onChange={(e) => set('message', e.target.value)} 
                placeholder="Mention specific topics or any requirements" 
                className="w-full h-20 rounded-xl bg-stone-50 border-stone-100 p-3 outline-none focus:ring-1 focus:ring-[#7C1A1A] text-[14px]"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
              <button type="button" onClick={closeModal} className="w-full sm:w-auto text-stone-400 font-bold text-[14px] hover:text-stone-600 transition-colors px-4 py-2">
                Cancel
              </button>
              <button type="submit" className="w-full sm:w-auto bg-[#7C1A1A] hover:bg-[#651414] text-white px-8 py-3 rounded-xl font-bold text-[14px] shadow-lg shadow-[#7C1A1A]/20 transition-all">
                Confirm booking
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
