# API Integration Quick Reference

## Installation & Setup

### 1️⃣ Set Environment Variable
```bash
# .env (or .env.local)
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 2️⃣ Import and Use Hooks
```typescript
import { usePages, useAuth } from '@/hooks';
```

That's it! Ready to use.

---

## Common Tasks

### 🔐 User Authentication

```typescript
import { useAuth } from '@/hooks';

function LoginComponent() {
  const { login, logout, user, isAuthenticated, loading } = useAuth();

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={() => login({ email: 'admin@test.com', password: 'pass' })}>
          Login
        </button>
      ) : (
        <>
          <p>Welcome {user?.name}</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}
```

### 📰 Fetch & Display Pages

```typescript
import { usePages } from '@/hooks';

function PagesList() {
  const { data: pages, loading, error } = usePages(1, 15);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {pages?.map((page) => (
        <li key={page.id}>{page.title_en}</li>
      ))}
    </ul>
  );
}
```

### 📝 Submit Forms

```typescript
import { useSubmitContact } from '@/hooks';

function ContactForm() {
  const submitContact = useSubmitContact();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitContact.mutate({
        name: 'John',
        email: 'john@example.com',
        phone: '+201000000',
        message: 'Hello',
      });
      alert('Form submitted!');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={submitContact.loading}>
        {submitContact.loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

### 🛠️ Admin Operations

```typescript
import { useAdminPages, useCreatePage, useUpdatePage } from '@/hooks';

function AdminPages() {
  const { data: pages, refetch } = useAdminPages(1, 15);
  const createPage = useCreatePage();

  const handleCreate = async () => {
    try {
      await createPage.mutate({
        title_en: 'New Page',
        title_ar: 'صفحة جديدة',
        content_en: 'Content...',
        content_ar: 'المحتوى...',
        slug: 'new-page',
      });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {pages?.map((p) => <div key={p.id}>{p.title_en}</div>)}
      <button onClick={handleCreate}>Add Page</button>
    </div>
  );
}
```

### 📤 Upload Files

```typescript
import { useUploadFile } from '@/hooks';

function FileUpload() {
  const uploadFile = useUploadFile();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const result = await uploadFile.mutate({ file });
      console.log('Uploaded:', result.url);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return <input type="file" onChange={handleUpload} />;
}
```

---

## Hooks Reference

### Authentication
| Hook | Purpose |
|------|---------|
| `useAuth()` | Complete auth state and operations |
| `useLogin()` | Login mutation |
| `useLogout()` | Logout mutation |
| `useCurrentUser()` | Get current user |
| `useIsAuthenticated()` | Check if authenticated |

### Pages
| Hook | Purpose |
|------|---------|
| `usePages(page, perPage)` | Get paginated pages |
| `usePageBySlug(slug)` | Get single page |

### Services
| Hook | Purpose |
|------|---------|
| `useServices(page, perPage)` | Get paginated services |
| `useServicesByCategory(cat)` | Get services by category |
| `useService(id)` | Get single service |

### Posts
| Hook | Purpose |
|------|---------|
| `usePosts(page, perPage)` | Get paginated posts |
| `usePostsByType(type)` | Get posts by type |
| `usePostBySlug(slug)` | Get single post |
| `useFeaturedPosts()` | Get featured posts |
| `useSearchPosts(query)` | Search posts |

### Products
| Hook | Purpose |
|------|---------|
| `useProducts(page, perPage)` | Get paginated products |
| `useProduct(id)` | Get single product |
| `useProductsByType(type)` | Get products by type |
| `useFeaturedProducts()` | Get featured products |
| `useDiscountedProducts()` | Get discounted products |

### Projects
| Hook | Purpose |
|------|---------|
| `useProjects(page, perPage)` | Get paginated projects |
| `useProject(id)` | Get single project |
| `useProjectsByCategory(cat)` | Get projects by category |
| `useFeaturedProjects()` | Get featured projects |
| `useSearchProjects(query)` | Search projects |

### Forms
| Hook | Purpose |
|------|---------|
| `useSubmitContact()` | Contact form |
| `useSubmitStudioBooking()` | Studio booking |
| `useSubmitProductInquiry()` | Product inquiry |

### Admin Pages
| Hook | Purpose |
|------|---------|
| `useAdminPages(page, perPage)` | List pages |
| `useAdminPage(id)` | Get single page |
| `useCreatePage()` | Create page |
| `useUpdatePage(id)` | Update page |
| `useDeletePage()` | Delete page |

### Admin Services
| Hook | Purpose |
|------|---------|
| `useAdminServices(page, perPage)` | List services |
| `useCreateService()` | Create service |
| `useUpdateService(id)` | Update service |
| `useToggleService()` | Toggle active status |
| `useDeleteService()` | Delete service |

### Admin Products
| Hook | Purpose |
|------|---------|
| `useAdminProducts(page, perPage)` | List products |
| `useCreateProduct()` | Create product |
| `useUpdateProduct(id)` | Update product |
| `useToggleProduct()` | Toggle active status |
| `useDeleteProduct()` | Delete product |

### Admin Contacts
| Hook | Purpose |
|------|---------|
| `useAdminContacts(status?, page, perPage)` | List contacts |
| `useUpdateContact(id)` | Update contact |
| `useDeleteContact()` | Delete contact |

### Admin Media
| Hook | Purpose |
|------|---------|
| `useUploadFile()` | Upload single file |
| `useUploadFiles()` | Upload multiple files |
| `useDeleteMediaFile()` | Delete media file |

### Base Hooks
| Hook | Purpose |
|------|---------|
| `useApi<T>(fn, deps)` | Generic GET request |
| `usePaginatedApi<T>(fn, page, perPage)` | Paginated GET request |
| `useMutation<T, R>(fn)` | POST/PUT/DELETE request |
| `useLazyApi<T>(fn)` | Manual trigger GET request |

---

## Hook Return Values

### useApi / usePaginatedApi
```typescript
{
  data: T | null,              // Response data
  loading: boolean,            // Loading state
  error: Error | null,         // Error object
  refetch: () => Promise<void> // Manual refetch
}
```

### usePaginatedApi (additional)
```typescript
{
  meta: PaginationMeta,        // Pagination metadata
  goToPage: (page) => void,    // Go to specific page
  setPerPage: (perPage) => void, // Change items per page
  currentPage: number,         // Current page number
  perPage: number              // Items per page
}
```

### useMutation
```typescript
{
  mutate: (data) => Promise<R>, // Execute mutation
  loading: boolean,             // Loading state
  error: Error | null,          // Error object
  data: R | null,               // Last success response
  reset: () => void             // Reset state
}
```

---

## Error Handling

```typescript
// Hook-based error handling
const { data, error } = usePages();

if (error) {
  console.error('Error:', error.message);
}

// Mutation error handling
const createPage = useCreatePage();

try {
  await createPage.mutate(data);
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  }
}
```

---

## Pagination Example

```typescript
function PaginatedContent() {
  const { data, currentPage, goToPage, meta } = usePages(1, 15);

  return (
    <div>
      {data?.map((item) => <div key={item.id}>{item.title_en}</div>)}
      
      {meta && (
        <div className="pagination">
          {Array.from({ length: meta.last_page }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className={currentPage === i + 1 ? 'active' : ''}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## TypeScript Types

```typescript
import type {
  Page,
  Service,
  Post,
  Product,
  Project,
  Contact,
  ApiResponse,
  PaginatedResponse,
  AdminUser,
  LoginResponse,
} from '@/types/api';

// Use in components
const { data }: { data: Page[] | null } = usePages();
const { user }: { user: AdminUser | null } = useAuth();
```

---

## Direct Service Usage

If you prefer not using hooks:

```typescript
import { pagesService, servicesService, authService } from '@/api/services';

// Manual calls
const pages = await pagesService.getPages(1, 15);
const services = await servicesService.getServices(1, 15);
await authService.login({ email: 'admin@test.com', password: 'pass' });
```

---

## Environment Variables

```bash
# Development
VITE_API_BASE_URL=http://localhost:8000/api/v1

# Production
VITE_API_BASE_URL=https://api.yourdomain.com/api/v1
```

---

## Troubleshooting

### "401 Unauthorized"
→ Make sure you're logged in: `const { login } = useAuth();`

### "Network error"
→ Check if backend is running and VITE_API_BASE_URL is correct

### "Request timeout"
→ Backend might be slow. Check API_CONFIG.requestTimeout (default: 30s)

### "Cannot read property 'data' of undefined"
→ Check if `data` is loaded before accessing. Use `loading` state.

### "Token not found"
→ Clear localStorage and login again: `localStorage.clear()`

---

## File Structure Reminder

```
src/
├── api/                    # API configuration & services
│   ├── config.ts
│   ├── client.ts
│   ├── endpoints.ts
│   └── services/
│       ├── auth.ts
│       ├── public.ts
│       ├── forms.ts
│       └── admin.ts
├── hooks/                  # React hooks
│   ├── useAuth.ts
│   ├── useApi.ts
│   ├── usePublicApi.ts
│   ├── useFormsApi.ts
│   └── useAdminApi.ts
└── types/
    └── api.ts             # TypeScript types
```

---

## More Information

- **Full Guide**: [API_INTEGRATION_GUIDE.md](./API_INTEGRATION_GUIDE.md)
- **Code Examples**: [API_INTEGRATION_EXAMPLES.tsx](./API_INTEGRATION_EXAMPLES.tsx)
- **Summary**: [API_INTEGRATION_SUMMARY.md](./API_INTEGRATION_SUMMARY.md)

---

**Ready to use! 🚀**
