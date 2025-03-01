import { useState } from 'react';
import toast from 'react-hot-toast';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for your message! We will get back to you soon.', {
      duration: 5000,
      position: 'bottom-right',
      style: {
        background: '#4F46E5',
        color: '#fff',
        padding: '16px',
        borderRadius: '10px',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#4F46E5',
      },
    });
    resetForm();
  };

  return {
    formData,
    handleInputChange,
    handleSubmit
  };
}