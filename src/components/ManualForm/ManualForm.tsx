'use client';

import React, { useState } from 'react';
import { User, Mail, Lock, AlertCircle } from 'lucide-react';
import styles from './ManualForm.module.css';

export default function ManualForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Tên đăng nhập không được để trống';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không đúng định dạng';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);

    // Giả lập delay server
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (validate()) {
      console.log('Form data submitted (Manual):', formData);
      setSuccess(true);
      // Reset form sau khi thành công (tùy chọn)
      // setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className={`glass ${styles.container}`}>
      <h2>Manual Validation</h2>
      <p className={styles.subtitle}>Sử dụng useState và logic Javascript thuần</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label><User size={16} /> Tên đăng nhập</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Nhập username..."
            className={errors.username ? 'error' : ''}
          />
          {errors.username && (
            <span className="error-message">
              <AlertCircle size={14} /> {errors.username}
            </span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label><Mail size={16} /> Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@gmail.com"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && (
            <span className="error-message">
              <AlertCircle size={14} /> {errors.email}
            </span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label><Lock size={16} /> Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="••••••"
            className={errors.password ? 'error' : ''}
          />
          {errors.password && (
            <span className="error-message">
              <AlertCircle size={14} /> {errors.password}
            </span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label><Lock size={16} /> Xác nhận mật khẩu</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="••••••"
            className={errors.confirmPassword ? 'error' : ''}
          />
          {errors.confirmPassword && (
            <span className="error-message">
              <AlertCircle size={14} /> {errors.confirmPassword}
            </span>
          )}
        </div>

        <button type="submit" className="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Đanh xử lý...' : 'Đăng ký ngay'}
        </button>

        {success && (
          <div className={styles.successBox}>
            🎉 Đăng ký thành công (Manual Check)!
          </div>
        )}
      </form>
    </div>
  );
}
