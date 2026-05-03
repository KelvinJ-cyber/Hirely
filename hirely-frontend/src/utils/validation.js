import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[0-9]/, 'Must contain a number')
    .regex(/[^A-Za-z0-9]/, 'Must contain a special character'),
  confirmPassword: z.string(),
  role: z.string().min(1, 'Please select a role'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  role: z.string().min(1, 'Please select a role'),
});

export const profileSchema = z.object({
  aboutMe: z.string().optional(),
  bio: z.string().optional(),
  skillSets: z.array(z.string()).optional(),
});

export const educationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  nameOfInstitute: z.string().min(1, 'Institution name is required'),
  timeline: z.string().min(1, 'Timeline is required'),
});

export const experienceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  nameOfInstitute: z.string().min(1, 'Organization name is required'),
  timeline: z.string().min(1, 'Timeline is required'),
});

export const passwordChecks = [
  { label: 'At least 8 characters', test: (pw) => pw.length >= 8 },
  { label: 'One number', test: (pw) => /[0-9]/.test(pw) },
  { label: 'One uppercase letter', test: (pw) => /[A-Z]/.test(pw) },
  { label: 'One special character', test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

export function validateForm(schema, data) {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data, errors: {} };
  }
  const errors = {};
  result.error.issues.forEach((issue) => {
    const path = issue.path.join('.');
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  });
  return { success: false, data: null, errors };
}
