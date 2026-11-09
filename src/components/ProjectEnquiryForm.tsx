import {useRef, useState, type FormEvent} from 'react';
import './ProjectEnquiryForm.css';

const projectTypes = ['Figma to Code', 'Responsive Website', 'React UI Development', 'Drupal / CMS Frontend', 'Website Fixes', 'Other'];
const budgets = ['Not decided', 'Under ₹10,000', '₹10,000–₹25,000', '₹25,000–₹50,000', 'Above ₹50,000'];
const timelines = ['Flexible', 'ASAP', 'Within 2 weeks', 'Within 1 month', '1–3 months'];
type Field = 'name' | 'email' | 'project_type' | 'message' | 'budget' | 'timeline' | 'project_url';
type Errors = Partial<Record<Field, string>>;
type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ProjectEnquiryForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [feedback, setFeedback] = useState('');
  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (field: Field) => String(data.get(field) ?? '').trim();
    const values = {
      name: value('name'), email: value('email'), project_type: value('project_type'),
      message: value('message'), budget: value('budget'), timeline: value('timeline'), project_url: value('project_url'),
    };
    const nextErrors: Errors = {};
    if (!values.name) nextErrors.name = 'Please enter your name.';
    else if (values.name.length > 100) nextErrors.name = 'Use no more than 100 characters.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Please enter a valid email address.';
    if (!projectTypes.includes(values.project_type)) nextErrors.project_type = 'Please choose a project type.';
    if (!values.message) nextErrors.message = 'Please describe your project requirements.';
    else if (values.message.length > 3000) nextErrors.message = 'Use no more than 3,000 characters.';
    if (values.project_url) {
      try {
        const url = new URL(values.project_url);
        if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Invalid protocol');
      } catch { nextErrors.project_url = 'Enter a full http:// or https:// URL, or leave this blank.'; }
    }
    if (values.budget && !budgets.includes(values.budget)) nextErrors.budget = 'Please choose a listed budget.';
    if (values.timeline && !timelines.includes(values.timeline)) nextErrors.timeline = 'Please choose a listed timeline.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus('idle');
      setFeedback('Please check the highlighted fields.');
      const firstField = Object.keys(nextErrors)[0];
      form.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus();
      return;
    }
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();
    if (!accessKey) {
      setStatus('error');
      setFeedback('The enquiry form is temporarily unavailable. Please email me using the link below.');
      return;
    }
    if (data.get('botcheck')) {
      setStatus('error');
      setFeedback('Unable to submit this enquiry. Please use the email link below.');
      return;
    }
    submitting.current = true;
    setStatus('sending');
    setFeedback('Sending your enquiry…');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        signal: controller.signal,
        body: JSON.stringify({
          ...values, access_key: accessKey, replyto: values.email,
          subject: 'New Project Enquiry - RAM Portfolio', botcheck: false,
        }),
      });
      const result: unknown = await response.json();
      if (!response.ok || typeof result !== 'object' || result === null || !('success' in result) || result.success !== true) {
        throw new Error('Submission rejected');
      }
      form.reset();
      setStatus('success');
      setFeedback('Thanks! Your project enquiry has been sent.');
    } catch {
      setStatus('error');
      setFeedback('We couldn’t confirm your enquiry was sent. Your details are still here. Please try again or email me below.');
    } finally {
      window.clearTimeout(timeout);
      submitting.current = false;
    }
  }

  function fieldProps(field: Field) {
    return {id: `enquiry-${field}`, name: field, 'aria-invalid': Boolean(errors[field]), 'aria-describedby': errors[field] ? `enquiry-${field}-error` : undefined};
  }
  const error = (field: Field) => errors[field] && <span className="project-enquiry__error" id={`enquiry-${field}-error`}>{errors[field]}</span>;

  return (
    <form className="project-enquiry" aria-labelledby="enquiry-heading" onSubmit={handleSubmit} noValidate>
      <h3 id="enquiry-heading">Discuss a Project</h3>
      <p className="project-enquiry__intro">Tell me what you’d like to build. Fields marked * are required; budget, timeline and links are optional.</p>
      <fieldset disabled={status === 'sending'}>
        <legend className="sr-only">Project enquiry details</legend>
        <div className="project-enquiry__grid">
          <div className="project-enquiry__field"><label htmlFor="enquiry-name">Name *</label><input {...fieldProps('name')} autoComplete="name" required maxLength={100}/>{error('name')}</div>
          <div className="project-enquiry__field"><label htmlFor="enquiry-email">Email *</label><input {...fieldProps('email')} type="email" autoComplete="email" required maxLength={254}/>{error('email')}</div>
          <div className="project-enquiry__field project-enquiry__wide"><label htmlFor="enquiry-project_type">Project type *</label><select {...fieldProps('project_type')} required defaultValue=""><option value="" disabled>Select a project type</option>{projectTypes.map(option => <option key={option}>{option}</option>)}</select>{error('project_type')}</div>
          <div className="project-enquiry__field project-enquiry__wide"><label htmlFor="enquiry-message">Project requirements *</label><textarea {...fieldProps('message')} rows={6} required maxLength={3000} placeholder="What do you need built or improved?"/>{error('message')}<span className="project-enquiry__hint">Maximum 3,000 characters.</span></div>
          <div className="project-enquiry__field"><label htmlFor="enquiry-budget">Estimated budget</label><select {...fieldProps('budget')} defaultValue=""><option value="">Select a budget (optional)</option>{budgets.map(option => <option key={option}>{option}</option>)}</select>{error('budget')}</div>
          <div className="project-enquiry__field"><label htmlFor="enquiry-timeline">Expected timeline</label><select {...fieldProps('timeline')} defaultValue=""><option value="">Select a timeline (optional)</option>{timelines.map(option => <option key={option}>{option}</option>)}</select>{error('timeline')}</div>
          <div className="project-enquiry__field project-enquiry__wide"><label htmlFor="enquiry-project_url">Figma or website URL</label><input {...fieldProps('project_url')} type="url" maxLength={2048} placeholder="https://"/>{error('project_url')}</div>
        </div>
        <input type="checkbox" name="botcheck" className="project-enquiry__honeypot" tabIndex={-1} aria-hidden="true" autoComplete="off"/>
        <button className="btn primary project-enquiry__submit" type="submit">{status === 'sending' ? 'Sending…' : 'Send Project Enquiry'}</button>
      </fieldset>
      <p className={`project-enquiry__feedback project-enquiry__feedback--${status}`} role="status" aria-live="polite" aria-atomic="true">{feedback}</p>
      {status === 'error' && <a className="project-enquiry__fallback" href="mailto:raja.asutosh1992@gmail.com">Email raja.asutosh1992@gmail.com</a>}
      <p className="project-enquiry__hint">Your enquiry is processed by Web3Forms and sent to my inbox. Please avoid sharing passwords or confidential information.</p>
    </form>
  );
}
