/**
 * User Management Validation Schemas
 * 
 * Zod schemas for user-related entities and validation
 */

import { z } from 'zod';

export const CreateUserRequestSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email("Invalid email format"),
  passwordhash: z.string().min(8, "Password must be at least 8 characters")
});

export const UpdateUserRequestSchema = z.object({
  username: z.string().min(3).max(50).optional(),
  email: z.string().email("Invalid email format").optional(),
  passwordhash: z.string().min(8).optional()
});

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;
export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>;
