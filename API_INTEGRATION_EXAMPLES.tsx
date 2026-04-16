/**
 * API Integration Examples
 * Practical examples for common use cases
 */

// ============= Example 1: Simple Page Listing =============
// File: src/pages/PagesExample.tsx

import React from 'react';
import { usePages } from '@/hooks/usePublicApi';

export function PagesExample() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data: pages, loading, error, meta, goToPage } = usePages(currentPage, 10);

  if (loading) return <div className="loader">Loading pages...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="pages-container">
      <h1>Website Pages</h1>
      <div className="pages-list">
        {pages?.map((page) => (
          <div key={page.id} className="page-card">
            <h3>{page.title_en}</h3>
            <p>{page.meta_description}</p>
            <img src={page.featured_image} alt={page.title_en} />
          </div>
        ))}
      </div>

      {meta && meta.last_page > 1 && (
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

// ============= Example 2: Admin Services Management =============
// File: src/pages/admin/ServicesManagement.tsx

import React, { useState } from 'react';
import {
  useAdminServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
  useToggleService,
} from '@/hooks/useAdminApi';

export function ServicesManagementExample() {
  const { data: services, loading, error, refetch } = useAdminServices(1, 15);
  const createService = useCreateService();
  const deleteService = useDeleteService();
  const toggleService = useToggleService();
  const [formOpen, setFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title_ar: '',
    title_en: '',
    description_ar: '',
    description_en: '',
    category: 'marketing' as const,
    price: 0,
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createService.mutate(formData);
      alert('Service created successfully!');
      setFormOpen(false);
      refetch();
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService.mutate(id);
        refetch();
      } catch (err) {
        alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await toggleService.mutate(id);
      refetch();
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="services-manager">
      <h2>Services Management</h2>

      <button onClick={() => setFormOpen(!formOpen)} className="btn-primary">
        {formOpen ? 'Cancel' : 'Add New Service'}
      </button>

      {formOpen && (
        <form onSubmit={handleCreate} className="service-form">
          <input
            type="text"
            placeholder="Title (English)"
            value={formData.title_en}
            onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Title (Arabic)"
            value={formData.title_ar}
            onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
            required
          />
          <textarea
            placeholder="Description (English)"
            value={formData.description_en}
            onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
            required
          />
          <textarea
            placeholder="Description (Arabic)"
            value={formData.description_ar}
            onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
            required
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
          >
            <option value="marketing">Marketing</option>
            <option value="media">Media</option>
            <option value="podcast">Podcast</option>
            <option value="education">Education</option>
          </select>
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
          />
          <button type="submit" disabled={createService.loading}>
            {createService.loading ? 'Creating...' : 'Create Service'}
          </button>
        </form>
      )}

      <div className="services-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services?.map((service) => (
              <tr key={service.id}>
                <td>{service.title_en}</td>
                <td>{service.category}</td>
                <td>${service.price}</td>
                <td>
                  <button
                    onClick={() => handleToggle(service.id)}
                    className={service.is_active ? 'btn-active' : 'btn-inactive'}
                  >
                    {service.is_active ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(service.id)} className="btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============= Example 3: Product Inquiry Form =============
// File: src/components/ProductInquiryForm.tsx

import React, { useState } from 'react';
import { useSubmitProductInquiry } from '@/hooks/useFormsApi';

interface ProductInquiryFormProps {
  productId: number;
  productName: string;
  onSuccess?: () => void;
}

export function ProductInquiryForm({
  productId,
  productName,
  onSuccess,
}: ProductInquiryFormProps) {
  const submitInquiry = useSubmitProductInquiry();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitInquiry.mutate({
        ...formData,
        product_id: productId,
      });
      alert('Thank you! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      onSuccess?.();
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : 'Failed to submit'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-inquiry-form">
      <h3>Inquire About {productName}</h3>

      <div className="form-group">
        <label htmlFor="name">Your Name *</label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          maxLength={255}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Your Email *</label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Your Phone *</label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Your Message *</label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          minLength={10}
          rows={5}
        />
      </div>

      <button
        type="submit"
        disabled={submitInquiry.loading}
        className="btn-submit"
      >
        {submitInquiry.loading ? 'Submitting...' : 'Submit Inquiry'}
      </button>

      {submitInquiry.error && (
        <p className="error-message">{submitInquiry.error.message}</p>
      )}
    </form>
  );
}

// ============= Example 4: Authentication Protected Route =============
// File: src/components/ProtectedRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useIsAuthenticated } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Usage:
// <ProtectedRoute>
//   <AdminDashboard />
// </ProtectedRoute>

// ============= Example 5: Search with Debounce =============
// File: src/components/ProjectSearch.tsx

import React, { useState, useEffect } from 'react';
import { projectsService } from '@/api/services/public';

export function ProjectSearchExample() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        setLoading(true);
        projectsService
          .searchProjects(query)
          .then((response) => {
            setResults(response.data || []);
            setError(null);
          })
          .catch((err) => {
            setError(err);
            setResults([]);
          })
          .finally(() => setLoading(false));
      } else {
        setResults([]);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search projects..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />

      {loading && <p>Searching...</p>}
      {error && <p className="error">Error: {error.message}</p>}

      <div className="search-results">
        {results.map((project) => (
          <div key={project.id} className="result-item">
            <h4>{project.title_en}</h4>
            <p>{project.description_en}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============= Example 6: File Upload Handler =============
// File: src/components/MediaUploader.tsx

import React, { useState } from 'react';
import { useUploadFile, useUploadFiles } from '@/hooks/useAdminApi';

export function MediaUploaderExample() {
  const uploadFile = useUploadFile();
  const uploadFiles = useUploadFiles();
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleSingleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadFile.mutate({ file });
      setUploadedFiles([...uploadedFiles, result.url]);
      alert('File uploaded successfully!');
    } catch (err) {
      alert(`Upload failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handleMultipleFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      const results = await uploadFiles.mutate({ files });
      setUploadedFiles([...uploadedFiles, ...results.map((f) => f.url)]);
      alert(`${results.length} files uploaded successfully!`);
    } catch (err) {
      alert(`Upload failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="media-uploader">
      <div className="upload-area">
        <input
          type="file"
          onChange={handleSingleFileUpload}
          disabled={uploadFile.loading}
          accept="image/*,video/*,application/pdf"
        />
        <span>{uploadFile.loading ? 'Uploading...' : 'Upload Single File'}</span>
      </div>

      <div className="upload-area">
        <input
          type="file"
          multiple
          onChange={handleMultipleFilesUpload}
          disabled={uploadFiles.loading}
          accept="image/*"
        />
        <span>{uploadFiles.loading ? 'Uploading...' : 'Upload Multiple Files'}</span>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h4>Uploaded Files:</h4>
          <ul>
            {uploadedFiles.map((file) => (
              <li key={file}>
                <a href={file} target="_blank" rel="noreferrer">
                  {file}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
