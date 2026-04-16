# API Integration Documentation

This document provides a comprehensive guide on how to use the integrated Laravel 12 CMS Backend API with the React frontend.

## Table of Contents

1. [Setup & Configuration](#setup--configuration)
2. [Authentication](#authentication)
3. [Public API Usage](#public-api-usage)
4. [Admin API Usage](#admin-api-usage)
5. [Forms & Submissions](#forms--submissions)
6. [Error Handling](#error-handling)
7. [Examples](#examples)

## Setup & Configuration

### Environment Variables

Create a `.env` file in your project root and set the API base URL:

```bash
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

The API client will use this URL for all requests. Adjust the URL based on your environment (development, staging, production).

### API Configuration

The API configuration is centralized in `src/api/config.ts`:

```typescript
import { API_CONFIG } from '@/api/config';

console.log(API_CONFIG.baseUrl);           // API base URL
console.log(API_CONFIG.requestTimeout);    // Request timeout in ms (30s)
console.log(API_CONFIG.statusCodes);       // HTTP status codes reference
```

## Authentication

### Using Auth Hooks

```typescript
import { useAuth, useLogin, useLogout } from '@/hooks/useAuth';

// Option 1: Use the main useAuth hook
function LoginComponent() {
  const { user, isAuthenticated, login, logout, loading, error } = useAuth();

  const handleLogin = async () => {
    try {
      await login({
        email: 'admin@example.com',
        password: 'password123',
      });
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user?.name}</p>
          <button onClick={logout} disabled={loading}>
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </>
      ) : (
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      )}
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </div>
  );
}

// Option 2: Use individual hooks
function AnotherComponent() {
  const loginMutation = useLogin();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await loginMutation.mutate({ email, password });
      console.log('Login successful:', response);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <button onClick={() => handleLogin('admin@example.com', 'password')}>
      Login (Mutation)
    </button>
  );
}
```

### Using Auth Service Directly

```typescript
import { authService } from '@/api/services';

// Manual login
const response = await authService.login({
  email: 'admin@example.com',
  password: 'password123',
});

// Get current user
const user = authService.getUser();
console.log(user);

// Check if authenticated
if (authService.isAuthenticated()) {
  console.log('User is authenticated');
}

// Logout
await authService.logout();
```

## Public API Usage

### Pages

```typescript
import { usePages, usePageBySlug } from '@/hooks/usePublicApi';

function PagesComponent() {
  // Get paginated pages
  const { data: pages, loading, error, currentPage, goToPage } = usePages(1, 10);

  // Get single page by slug
  const { data: page } = usePageBySlug('about-us');

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {pages && pages.map((p) => <div key={p.id}>{p.title_en}</div>)}
    </div>
  );
}
```

### Services

```typescript
import { useServices, useServicesByCategory, useService } from '@/hooks/usePublicApi';

function ServicesComponent() {
  // Get all services
  const { data: services, loading } = useServices(1, 15);

  // Get services by category
  const { data: marketingServices } = useServicesByCategory('marketing', 15);

  // Get single service
  const { data: service } = useService(1);

  return (
    <div>
      {services?.map((s) => (
        <div key={s.id}>
          <h3>{s.title_en}</h3>
          <p>Price: ${s.price}</p>
        </div>
      ))}
    </div>
  );
}
```

### Posts

```typescript
import {
  usePosts,
  usePostsByType,
  usePostBySlug,
  useFeaturedPosts,
  useSearchPosts,
} from '@/hooks/usePublicApi';

function PostsComponent() {
  // Get all posts
  const { data: posts } = usePosts(1, 15);

  // Get posts by type (blog, reel, news)
  const { data: blogPosts } = usePostsByType('blog', 15);

  // Get single post
  const { data: post } = usePostBySlug('my-first-blog-post');

  // Get featured posts
  const { data: featured } = useFeaturedPosts();

  // Search posts
  const { data: searchResults } = useSearchPosts('digital marketing', 10);

  return <div>{/* Render posts */}</div>;
}
```

### Products

```typescript
import {
  useProducts,
  useProduct,
  useProductsByType,
  useFeaturedProducts,
  useDiscountedProducts,
} from '@/hooks/usePublicApi';

function ProductsComponent() {
  // Get all products
  const { data: products } = useProducts(1, 15);

  // Get single product
  const { data: product } = useProduct(1);

  // Get products by type
  const { data: courses } = useProductsByType('course', 15);

  // Get featured products
  const { data: featured } = useFeaturedProducts();

  // Get discounted products
  const { data: onSale } = useDiscountedProducts();

  return <div>{/* Render products */}</div>;
}
```

### Projects

```typescript
import {
  useProjects,
  useProject,
  useProjectsByCategory,
  useFeaturedProjects,
  useSearchProjects,
} from '@/hooks/usePublicApi';

function ProjectsComponent() {
  // Get all projects
  const { data: projects } = useProjects(1, 15);

  // Get single project
  const { data: project } = useProject(1);

  // Get projects by category
  const { data: categoryProjects } = useProjectsByCategory('web-development');

  // Get featured projects
  const { data: featured } = useFeaturedProjects();

  // Search projects
  const { data: searchResults } = useSearchProjects('mobile app');

  return <div>{/* Render projects */}</div>;
}
```

### Design System Settings

```typescript
import { useDesignSystem } from '@/hooks/usePublicApi';

function SettingsComponent() {
  const { data: settings } = useDesignSystem();

  return (
    <div>
      <h2>{settings?.site_name}</h2>
      <p>{settings?.site_description}</p>
      {/* Use settings to customize theme dynamically */}
      <style>{`
        :root {
          --theme-color: ${settings?.theme_color};
          --secondary-color: ${settings?.secondary_color};
        }
      `}</style>
    </div>
  );
}
```

## Admin API Usage

### Admin Pages Management

```typescript
import {
  useAdminPages,
  useAdminPage,
  useCreatePage,
  useUpdatePage,
  useDeletePage,
} from '@/hooks/useAdminApi';

function AdminPagesComponent() {
  // Get all pages (requires auth)
  const {
    data: pages,
    loading,
    error,
    currentPage,
    goToPage,
    refetch,
  } = useAdminPages(1, 15);

  // Get single page
  const pageDetail = useAdminPage(1);

  // Create page
  const createPage = useCreatePage();
  const handleCreate = async () => {
    try {
      await createPage.mutate({
        title_ar: 'صفحة جديدة',
        title_en: 'New Page',
        content_ar: 'محتوى...',
        content_en: 'Content...',
        slug: 'new-page',
        is_published: true,
      });
      refetch(); // Refresh the list
    } catch (err) {
      console.error('Failed to create page:', err);
    }
  };

  // Update page
  const updatePage = useUpdatePage(1);
  const handleUpdate = async () => {
    try {
      await updatePage.mutate({
        title_en: 'Updated Title',
        content_en: 'Updated content',
      });
      refetch();
    } catch (err) {
      console.error('Failed to update page:', err);
    }
  };

  // Delete page
  const deletePage = useDeletePage();
  const handleDelete = async (pageId: number) => {
    try {
      await deletePage.mutate(pageId);
      refetch();
    } catch (err) {
      console.error('Failed to delete page:', err);
    }
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {pages?.map((page) => (
        <div key={page.id}>
          <h3>{page.title_en}</h3>
          <button onClick={() => handleUpdate()}>Edit</button>
          <button onClick={() => handleDelete(page.id)}>Delete</button>
        </div>
      ))}
      <button onClick={handleCreate}>Create New Page</button>
    </div>
  );
}
```

### Admin Services Management

```typescript
import {
  useAdminServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
  useToggleService,
} from '@/hooks/useAdminApi';

function AdminServicesComponent() {
  const { data: services, refetch } = useAdminServices();
  const createService = useCreateService();
  const updateService = useUpdateService(1);
  const deleteService = useDeleteService();
  const toggleService = useToggleService();

  const handleCreate = async () => {
    try {
      const formData = new FormData();
      formData.append('title_ar', 'خدمة جديدة');
      formData.append('title_en', 'New Service');
      formData.append('description_ar', 'وصف...');
      formData.append('description_en', 'Description...');
      formData.append('category', 'marketing');
      formData.append('price', '5000');

      await createService.mutate({
        title_ar: 'خدمة جديدة',
        title_en: 'New Service',
        description_ar: 'وصف...',
        description_en: 'Description...',
        category: 'marketing',
        price: 5000,
      });
      refetch();
    } catch (err) {
      console.error('Failed to create service:', err);
    }
  };

  return (
    <div>
      {services?.map((service) => (
        <div key={service.id}>
          <h3>{service.title_en}</h3>
          <p>Active: {service.is_active ? 'Yes' : 'No'}</p>
          <button onClick={() => toggleService.mutate(service.id)}>
            Toggle Status
          </button>
        </div>
      ))}
      <button onClick={handleCreate}>Add Service</button>
    </div>
  );
}
```

### Admin Products Management

```typescript
import {
  useAdminProducts,
  useCreateProduct,
  useUpdateProduct,
} from '@/hooks/useAdminApi';

function AdminProductsComponent() {
  const { data: products, refetch } = useAdminProducts();
  const createProduct = useCreateProduct();

  const handleCreate = async () => {
    try {
      await createProduct.mutate({
        title_ar: 'منتج جديد',
        title_en: 'New Product',
        description_ar: 'وصف...',
        description_en: 'Description...',
        type: 'education_platform',
        price: 2000,
        discount_price: 1500,
        features: ['Feature 1', 'Feature 2'],
        duration_months: 12,
        modules_count: 24,
      });
      refetch();
    } catch (err) {
      console.error('Failed to create product:', err);
    }
  };

  return (
    <div>
      {products?.map((product) => (
        <div key={product.id}>
          <h3>{product.title_en}</h3>
          <p>Price: ${product.price}</p>
          {product.has_discount && <p>Discount: {product.discount_percentage}%</p>}
        </div>
      ))}
      <button onClick={handleCreate}>Add Product</button>
    </div>
  );
}
```

### Admin Contacts Management

```typescript
import {
  useAdminContacts,
  useUpdateContact,
  useDeleteContact,
} from '@/hooks/useAdminApi';

function AdminContactsComponent() {
  const { data: contacts, refetch } = useAdminContacts('new', 1, 15);
  const updateContact = useUpdateContact(1);
  const deleteContact = useDeleteContact();

  const handleUpdateStatus = async (contactId: number) => {
    try {
      await updateContact.mutate({
        status: 'contacted',
        admin_notes: 'Followed up via email',
      });
      refetch();
    } catch (err) {
      console.error('Failed to update contact:', err);
    }
  };

  return (
    <div>
      {contacts?.map((contact) => (
        <div key={contact.id}>
          <h3>{contact.name}</h3>
          <p>Email: {contact.email}</p>
          <p>Status: {contact.status}</p>
          <button onClick={() => handleUpdateStatus(contact.id)}>Mark as Contacted</button>
        </div>
      ))}
    </div>
  );
}
```

### Admin Media Management

```typescript
import {
  useUploadFile,
  useUploadFiles,
  useDeleteMediaFile,
} from '@/hooks/useAdminApi';

function AdminMediaComponent() {
  const uploadFile = useUploadFile();
  const uploadFiles = useUploadFiles();
  const deleteFile = useDeleteMediaFile();

  const handleFileUpload = async (file: File) => {
    try {
      const result = await uploadFile.mutate({ file });
      console.log('File uploaded:', result);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleMultipleUpload = async (files: File[]) => {
    try {
      const results = await uploadFiles.mutate({ files });
      console.log('Files uploaded:', results);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }}
      />
      <button onClick={() => deleteFile.mutate(1)}>Delete File</button>
    </div>
  );
}
```

## Forms & Submissions

### Contact Form

```typescript
import { useSubmitContact } from '@/hooks/useFormsApi';
import { useState } from 'react';

function ContactFormComponent() {
  const submitContact = useSubmitContact();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    type: 'general' as const,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitContact.mutate(formData);
      alert('Contact form submitted successfully!');
      setFormData({ name: '', email: '', phone: '', message: '', type: 'general' });
    } catch (err) {
      alert('Failed to submit contact form');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Your Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />
      <textarea
        placeholder="Your Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
      />
      <button type="submit" disabled={submitContact.loading}>
        {submitContact.loading ? 'Submitting...' : 'Submit'}
      </button>
      {submitContact.error && <p style={{ color: 'red' }}>{submitContact.error.message}</p>}
    </form>
  );
}
```

### Studio Booking

```typescript
import { useSubmitStudioBooking } from '@/hooks/useFormsApi';

function StudioBookingComponent() {
  const submitBooking = useSubmitStudioBooking();

  const handleBooking = async () => {
    try {
      await submitBooking.mutate({
        name: 'Ahmed Hassan',
        email: 'ahmed@example.com',
        phone: '+20100000000',
        booking_date: '2025-02-20 14:00',
        duration: 120,
        service_type: 'podcast',
        notes: 'Need professional microphone',
      });
      alert('Booking submitted successfully!');
    } catch (err) {
      alert('Failed to book studio');
    }
  };

  return (
    <button onClick={handleBooking} disabled={submitBooking.loading}>
      {submitBooking.loading ? 'Booking...' : 'Book Studio'}
    </button>
  );
}
```

### Product Inquiry

```typescript
import { useSubmitProductInquiry } from '@/hooks/useFormsApi';

function ProductInquiryComponent() {
  const submitInquiry = useSubmitProductInquiry();

  const handleInquiry = async () => {
    try {
      await submitInquiry.mutate({
        name: 'Fatima Ahmed',
        email: 'fatima@example.com',
        phone: '+20100000000',
        message: 'I am interested in this product',
        product_id: 1,
      });
      alert('Inquiry submitted successfully!');
    } catch (err) {
      alert('Failed to submit inquiry');
    }
  };

  return (
    <button onClick={handleInquiry} disabled={submitInquiry.loading}>
      {submitInquiry.loading ? 'Submitting...' : 'Submit Inquiry'}
    </button>
  );
}
```

## Error Handling

### API Error Responses

```typescript
import { useState } from 'react';
import { pagesService } from '@/api/services';

function ErrorHandlingComponent() {
  const [error, setError] = useState<string | null>(null);

  const fetchPages = async () => {
    try {
      const response = await pagesService.getPages(1, 15);
      console.log('Success:', response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        // Handle specific error types
        if (err.message.includes('401')) {
          console.log('Unauthorized - please login');
        } else if (err.message.includes('403')) {
          console.log('Forbidden - insufficient permissions');
        } else if (err.message.includes('404')) {
          console.log('Resource not found');
        }
      }
    }
  };

  return (
    <div>
      <button onClick={fetchPages}>Fetch Pages</button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}
```

### Hook Error Handling

```typescript
import { usePages } from '@/hooks/usePublicApi';

function ComponentWithErrorHandling() {
  const { data, loading, error, refetch } = usePages(1, 15);

  if (loading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={refetch}>Try Again</button>
      </div>
    );
  }

  return <div>{/* Render data */}</div>;
}
```

## Examples

### Building a Blog Component

```typescript
import { usePosts, usePostBySlug } from '@/hooks/usePublicApi';
import { useParams } from 'react-router-dom';

// Blog list page
export function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: posts, loading, error, meta } = usePosts(currentPage, 10);

  return (
    <div className="blog-page">
      <h1>Latest Blog Posts</h1>
      {loading && <p>Loading posts...</p>}
      {error && <p>Error loading posts: {error.message}</p>}
      <div className="posts-grid">
        {posts?.map((post) => (
          <article key={post.id}>
            <h2>{post.title_en}</h2>
            <p>{post.excerpt_en}</p>
            <a href={`/blog/${post.slug}`}>Read More →</a>
          </article>
        ))}
      </div>
      {meta && (
        <div className="pagination">
          {Array.from({ length: meta.last_page }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              aria-current={currentPage === i + 1}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Blog detail page
export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, loading, error } = usePostBySlug(slug!);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <article className="blog-post">
      <h1>{post.title_en}</h1>
      <p className="meta">Published: {new Date(post.published_at).toLocaleDateString()}</p>
      {post.featured_image && (
        <img src={post.featured_image} alt={post.title_en} />
      )}
      <div className="content">{post.content_en}</div>
    </article>
  );
}
```

## Troubleshooting

### Common Issues

#### 401 Unauthorized
**Problem:** Getting 401 errors on admin endpoints
**Solution:** Make sure you're authenticated first by calling `useAuth()` or `authService.login()`

#### 403 Forbidden
**Problem:** Getting 403 errors even when authenticated
**Solution:** Check your admin role and permissions. You may need super_admin or specific role.

#### Network Error
**Problem:** "Network error. Please check your connection."
**Solution:** Verify your API base URL is correct and the backend is running

#### Request Timeout
**Problem:** Request takes too long and times out
**Solution:** Increase the `requestTimeout` in `API_CONFIG` or check backend performance

### Debug Mode

```typescript
// Enable logging for all API requests
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  const [resource, config] = args;
  console.log('API Request:', resource, config);
  const response = await originalFetch(...args);
  console.log('API Response:', response.status, response);
  return response;
};
```

---

For more information, refer to the [API Specification Document](./API_STRUCTURE.md).
