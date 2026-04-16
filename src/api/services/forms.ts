/**
 * Public Forms Services
 * Services for public form submissions (no authentication required)
 */

import { HttpClient } from '../client';
import { PUBLIC_ENDPOINTS } from '../endpoints';
import type {
  Contact,
  CreateContactRequest,
  StudioBooking,
  CreateStudioBookingRequest,
  ProductInquiry,
  CreateProductInquiryRequest,
  ApiResponse,
} from '../../types/api';

class FormsService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Submit contact form
   */
  async submitContact(data: CreateContactRequest): Promise<ApiResponse<Contact>> {
    return this.httpClient.post<ApiResponse<Contact>>(
      PUBLIC_ENDPOINTS.FORMS.CONTACT,
      data
    );
  }

  /**
   * Submit studio booking request
   */
  async submitStudioBooking(data: CreateStudioBookingRequest): Promise<ApiResponse<StudioBooking>> {
    return this.httpClient.post<ApiResponse<StudioBooking>>(
      PUBLIC_ENDPOINTS.FORMS.STUDIO_BOOKINGS,
      data
    );
  }

  /**
   * Submit product inquiry
   */
  async submitProductInquiry(
    data: CreateProductInquiryRequest
  ): Promise<ApiResponse<ProductInquiry>> {
    return this.httpClient.post<ApiResponse<ProductInquiry>>(
      PUBLIC_ENDPOINTS.FORMS.PRODUCT_INQUIRIES,
      data
    );
  }
}

export const formsService = new FormsService();
