import { useState } from "react";
import { saveContactMessage } from "../utils/storage";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [notice, setNotice] = useState({ type: "", text: "" });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const result = saveContactMessage(form);
    setNotice({ type: result.ok ? "ok" : "error", text: result.message });
    if (result.ok) setForm({ name: "", email: "", message: "" });
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {notice.text && (
        <p className={notice.type === "ok" ? "form-success" : "form-error"} role="status">
          {notice.text}
        </p>
      )}

      <label htmlFor="contact-name">Name</label>
      <input
        id="contact-name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your name"
        required
      />

      <label htmlFor="contact-email">Email</label>
      <input
        id="contact-email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="you@email.com"
        required
      />

      <label htmlFor="contact-message">Message</label>
      <textarea
        id="contact-message"
        name="message"
        rows="5"
        value={form.message}
        onChange={handleChange}
        placeholder="How can AgriMart help?"
        required
      />

      <button type="submit" className="primary-btn">Send message</button>
    </form>
  );
}

export default ContactForm;
