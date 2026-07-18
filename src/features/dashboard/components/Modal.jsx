// src/features/dashboard/components/Modal.jsx
import { useState, useEffect } from 'react';
import { X, Plus, Save, Trash2 } from 'lucide-react';
import { validateForm } from '../../../utils/validateForm';
import { getResourceLabel } from '../utils/resourceLabels';

const modalFields = {
  Projects: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true, rows: 4 },
    { name: 'category', label: 'Category', type: 'text', required: true },
    { name: 'tags', label: 'Tags (comma separated)', type: 'text' },
    { name: 'thumbnail_url', label: 'Thumbnail URL', type: 'url' },
    { name: 'thumbnail_file', label: 'Thumbnail File', type: 'file', accept: 'image/*' },
    { name: 'status', label: 'Status', type: 'select', options: ['published', 'archived'] },
  ],
  Articles: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'author', label: 'Author', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'text', required: true },
    { name: 'bio', label: 'Bio', type: 'textarea', required: true, rows: 4 },
    { name: 'link', label: 'Link', type: 'url', required: true },
    { name: 'tags', label: 'Tags (comma separated)', type: 'text' },
  ],
  Blogs: [
    { name: 'author', label: 'Author', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'content', label: 'Content', type: 'textarea', required: true, rows: 6 },
    { name: 'excerpt', label: 'Excerpt', type: 'textarea', rows: 2 },
    { name: 'status', label: 'Status', type: 'select', options: ['published', 'archived'] },
  ],
  Events: [
    { name: 'event_name', label: 'Event Name', type: 'text', required: true },
    { name: 'event_host', label: 'Host', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true, rows: 3 },
    { name: 'event_date', label: 'Date', type: 'date', required: true },
    { name: 'event_time', label: 'Time', type: 'time', required: true },
    { name: 'venue', label: 'Venue', type: 'text', required: true },
    { name: 'caption', label: 'Caption', type: 'text', required: true },
    { name: 'link', label: 'Link', type: 'url', required: true },
    { name: 'thumbnail_url', label: 'Thumbnail URL', type: 'url' },
    { name: 'thumbnail_file', label: 'Thumbnail File', type: 'file', accept: 'image/*' },
  ],
  Webinar: [
    { name: 'webinar_title', label: 'Title', type: 'text', required: true },
    { name: 'webinar_host', label: 'Host', type: 'text', required: true },
    { name: 'caption', label: 'Caption', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
    { name: 'link', label: 'Webinar Link', type: 'url', required: true },
    { name: 'tags', label: 'Tags (comma separated)', type: 'text' },
    { name: 'thumbnail_url', label: 'Thumbnail URL', type: 'url' },
    { name: 'thumbnail_file', label: 'Thumbnail File', type: 'file', accept: 'image/*' },
  ],
  Courses: [
    { name: 'course_title', label: 'Course Title', type: 'text', required: true },
    { name: 'caption', label: 'Caption', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true, rows: 4 },
    { name: 'link', label: 'Course Link', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'text', required: true },
    { name: 'tags', label: 'Tags (comma separated)', type: 'text', required: true },
  ],
  Gallery: [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'caption', label: 'Category', type: 'select', options: ['Outreach', 'Training', 'Event'], required: true },
    { name: 'description', label: 'Description', type: 'textarea', required: true, rows: 4 },
    { name: 'image_file', label: 'Image File', type: 'file', accept: 'image/*', requiredOnAdd: true },
  ],
  Volunteers: [
    { name: 'f_name', label: 'First Name', type: 'text', required: true },
    { name: 'l_name', label: 'Last Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'p_number', label: 'Phone', type: 'tel', required: true },
    { name: 'motivation_note', label: 'Motivation', type: 'textarea', required: true, rows: 3 },
    { name: 'interest', label: 'Interest', type: 'text' },
  ],
};

const Modal = ({ mode, activeFilter, currentItem, onClose, onSave }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    return () => setVisible(false);
  }, []);

  useEffect(() => {
    if (mode === 'edit' && currentItem) {
      const data = { ...currentItem };
      // Flatten tags array to comma-separated string for the input
      delete data.image_file;
      if ((activeFilter === 'Courses' || activeFilter === 'Projects' || activeFilter === 'Articles' || activeFilter === 'Webinar') && Array.isArray(data.tags)) {
        data.tags = data.tags.join(', ');
      }
      if (activeFilter === 'Courses') {
        data.link = data.link || data.youtube_url || '';
        delete data.youtube_url;
      }
      if (activeFilter === 'Projects' && data.status) {
        data.status = String(data.status).toLowerCase();
      }
      if (activeFilter === 'Blogs' && data.status) {
        data.status = String(data.status).toLowerCase();
      }
      setFormData(data);
    } else {
      const defaults = {};
      (modalFields[activeFilter] || []).forEach((f) => {
        defaults[f.name] = '';
      });
      setFormData(defaults);
    }
    setErrors({});
  }, [mode, currentItem, activeFilter]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => onClose(), 200);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build payload - convert comma-separated tags to arrays for APIs that expect them.
    const payload = { ...formData };
    if (['Courses', 'Webinar', 'Projects', 'Articles'].includes(activeFilter) && typeof payload.tags === 'string') {
      payload.tags = payload.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);
    }

    const validation = validateForm(activeFilter, payload);
    const nextErrors = { ...validation.errors };
    if (activeFilter === 'Gallery' && mode === 'add' && !payload.image_file) {
      nextErrors.image_file = 'image_file is required';
    }
    setErrors(nextErrors);
    if (!validation.isValid || Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await onSave(payload);
      handleClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field) => {
    const value = field.type === 'file' ? '' : formData[field.name] || '';
    const error = errors[field.name];
    const baseClass =
      'w-full px-4 py-2.5 rounded-lg border bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#FD90A7]/50 focus:border-transparent transition-all duration-200';
    const errorClass = error ? 'border-red-400' : 'border-gray-200';

    if (field.type === 'textarea') {
      return (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            {field.label} {field.required && <span className="text-[#FD90A7]">*</span>}
          </label>
          <textarea
            name={field.name}
            rows={field.rows || 3}
            value={value}
            onChange={handleChange}
            className={`${baseClass} ${errorClass} resize-none`}
            required={field.required}
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
      );
    }

    if (field.type === 'select') {
      return (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            {field.label} {field.required && <span className="text-[#FD90A7]">*</span>}
          </label>
          <select
            name={field.name}
            value={value}
            onChange={handleChange}
            className={`${baseClass} ${errorClass}`}
          >
            <option value="">Select...</option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
      );
    }

    if (field.type === 'file') {
      return (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            {field.label} {field.requiredOnAdd && mode === 'add' && <span className="text-[#FD90A7]">*</span>}
          </label>
          <input
            type="file"
            name={field.name}
            accept={field.accept || 'image/*'}
            onChange={handleChange}
            className={`${baseClass} ${errorClass} file:mr-3 file:rounded-full file:border-0 file:bg-[#FD90A7]/10 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-[#FD90A7] hover:file:bg-[#FD90A7]/20`}
          />
          <p className="mt-1 text-xs text-gray-500">
            {activeFilter === 'Gallery'
              ? mode === 'add'
                ? 'Required. Upload the gallery image file.'
                : 'Optional. Upload a new file to replace the current gallery image.'
              : activeFilter === 'Projects'
                ? 'Optional. Upload an image file to use as the project thumbnail.'
              : 'Optional. Upload an image file to use as the event thumbnail.'}
          </p>
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
      );
    }

    return (
      <div key={field.name} className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          {field.label} {field.required && <span className="text-[#FD90A7]">*</span>}
        </label>
        <input
          type={field.type}
          name={field.name}
          value={value}
          onChange={handleChange}
          className={`${baseClass} ${errorClass}`}
          required={field.required}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  };

  const fields = modalFields[activeFilter] || [];
  const resourceLabel = getResourceLabel(activeFilter);
  const title = mode === 'add' ? `New ${resourceLabel}` : `Edit ${resourceLabel}`;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        visible && !exiting ? 'bg-black/40 backdrop-blur-sm' : 'bg-transparent'
      }`}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
          visible && !exiting ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-200/60 bg-white/80 backdrop-blur-md rounded-t-2xl">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <div className="w-12 h-1 bg-linear-to-r from-[#FD90A7] to-[#C7365B] mt-1 rounded-full" />
          </div>
          <button onClick={handleClose} className="p-2 text-gray-400 transition rounded-lg hover:bg-gray-100 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5">
          <div className="space-y-1">{fields.map(renderField)}</div>

          <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-gray-200/80">
            {mode === 'edit' && (
              <button
                type="button"
                onClick={() => onSave({ ...formData, _delete: true })}
                className="flex items-center gap-2 px-5 py-2 text-red-600 transition border border-red-200 rounded-lg hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            )}
            <button type="button" onClick={handleClose} className="px-5 py-2 text-gray-700 transition border border-gray-200 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-linear-to-r from-[#FD90A7] to-[#C7365B] text-white font-semibold shadow-md hover:shadow-lg transition transform hover:scale-[1.02] active:scale-95 flex items-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Saving...
                </span>
              ) : mode === 'add' ? (
                <><Plus className="w-4 h-4" /> Create</>
              ) : (
                <><Save className="w-4 h-4" /> Save</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
