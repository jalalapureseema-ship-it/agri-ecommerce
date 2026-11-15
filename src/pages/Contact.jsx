import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

function Contact() {
  return (
    <div className="home-page">
      <Navbar />
      <section className="page-shell contact-page">
        <div>
          <p className="small-title">CONTACT</p>
          <h1>Talk to AgriMart</h1>
          <p>
            Send a note about an order, a listing, or a partnership. Messages
            are saved in this browser. A live mailbox is not connected yet.
          </p>
          <p>Messages are saved in this browser only. Connect an email service to receive them centrally.</p>
        </div>
        <ContactForm />
      </section>
      <Footer />
    </div>
  );
}

export default Contact;
