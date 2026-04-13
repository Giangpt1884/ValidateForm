'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ShieldCheck, Mail, Lock, User, AlertCircle, Loader2 } from 'lucide-react';
import styles from './LibraryForm.module.css';

// 1. Định nghĩa Schema bằng Zod
const registerSchema = z.object({
  username: z.string()
    .min(3, 'Tên đăng nhập tối thiểu 3 ký tự')
    .max(20, 'Tên đăng nhập tối đa 20 ký tự'),
  email: z.string()
    .email('Email không hợp lệ'),
  password: z.string()
    .min(6, 'Mật khẩu phải từ 6 ký tự trở lên'),
  confirmPassword: z.string()
}).refine((data) => data.confirmPassword === data.password, {
  message: "Mật khẩu xác nhận không khớp",
  path: ["confirmPassword"],
});

// Loại Type cho Form
type RegisterInput = z.infer<typeof registerSchema>;

export default function LibraryForm() {
  const [success, setSuccess] = useState(false);

  // 2. Sử dụng React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched' // Validate ngay khi người dùng rời khỏi input
  });

  const onSubmit = async (data: RegisterInput) => {
    setSuccess(false);
    // Giả lập API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form data submitted (Library):', data);
    setSuccess(true);
    // reset();
  };

  return (
    <div className={`glass ${styles.container}`}>
      <div className={styles.header}>
        <ShieldCheck className={styles.icon} size={32} />
        <h2>Library Validation</h2>
        <p className={styles.subtitle}>Sử dụng React Hook Form & Zod</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.inputGroup}>
          <label><User size={16} /> Tên đăng nhập</label>
          <div className={styles.inputWrapper}>
            <input
              {...register('username')}
              placeholder="Nhập username..."
              className={errors.username ? 'error' : ''}
            />
          </div>
          {errors.username && (
            <span className="error-message">
              <AlertCircle size={14} /> {errors.username.message}
            </span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label><Mail size={16} /> Email</label>
          <div className={styles.inputWrapper}>
            <input
              {...register('email')}
              placeholder="example@gmail.com"
              className={errors.email ? 'error' : ''}
            />
          </div>
          {errors.email && (
            <span className="error-message">
              <AlertCircle size={14} /> {errors.email.message}
            </span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label><Lock size={16} /> Mật khẩu</label>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              {...register('password')}
              placeholder="••••••"
              className={errors.password ? 'error' : ''}
            />
          </div>
          {errors.password && (
            <span className="error-message">
              <AlertCircle size={14} /> {errors.password.message}
            </span>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label><Lock size={16} /> Xác nhận mật khẩu</label>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              {...register('confirmPassword')}
              placeholder="••••••"
              className={errors.confirmPassword ? 'error' : ''}
            />
          </div>
          {errors.confirmPassword && (
            <span className="error-message">
              <AlertCircle size={14} /> {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <button type="submit" className="primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className={styles.loading}>
              <Loader2 className={styles.spinner} size={18} /> Đang xử lý...
            </span>
          ) : 'Đăng ký thông minh'}
        </button>

        {success && (
          <div className={styles.successBox}>
            🔥 Cực nhanh! Đăng ký thành công (Zod Validated).
          </div>
        )}
      </form>
    </div>
  );
}
