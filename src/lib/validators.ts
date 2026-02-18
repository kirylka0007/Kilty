import type { RegistrationFormData } from "@/types";

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  telegram?: string;
  instagram?: string;
  telephone?: string;
}

export function validateRegistration(
  data: RegistrationFormData
): ValidationErrors {
  const errors: ValidationErrors = {};

  const name = data.fullName.trim();
  if (!name) {
    errors.fullName = "Full name is required";
  } else if (name.length < 2) {
    errors.fullName = "Name must be at least 2 characters";
  }

  const email = data.email.trim().toLowerCase();
  if (!email) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  if (data.telephone && !/^[\d\s+()-]{7,20}$/.test(data.telephone.trim())) {
    errors.telephone = "Please enter a valid phone number";
  }

  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
