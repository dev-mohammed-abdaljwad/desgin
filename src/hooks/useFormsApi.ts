/**
 * Public Forms Hooks
 * React hooks for public form submissions
 */

import { formsService } from '../api/services/forms';
import { useMutation } from './useApi';
import type {
  Contact,
  CreateContactRequest,
  StudioBooking,
  CreateStudioBookingRequest,
  ProductInquiry,
  CreateProductInquiryRequest,
} from '../types/api';

// ============= Contact Form Hook =============

export function useSubmitContact() {
  return useMutation<CreateContactRequest, Contact>((data) => formsService.submitContact(data));
}

// ============= Studio Booking Hook =============

export function useSubmitStudioBooking() {
  return useMutation<CreateStudioBookingRequest, StudioBooking>((data) =>
    formsService.submitStudioBooking(data)
  );
}

// ============= Product Inquiry Hook =============

export function useSubmitProductInquiry() {
  return useMutation<CreateProductInquiryRequest, ProductInquiry>((data) =>
    formsService.submitProductInquiry(data)
  );
}
