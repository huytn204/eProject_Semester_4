import React from 'react';
import '../Style/contact.scss';

const ContactPage = () =>{
    return (
      <div className="contact-container">
        <div className="contact-info">
          <h2>Address:</h2>
          <p>410 S Missouri St, Indianapolis, IN 46225, USA</p>

          <h3>Reservations:</h3>
          <p>
            <a href="mailto:info@demolink.org">info@demolink.org</a><br />
            Toll Free phone number: +1.777.999.5000
          </p>

          <h3>Front Desk:</h3>
          <p>
            <a href="mailto:info@demolink.org">info@demolink.org</a><br />
            Toll Free phone number: +1.777.999.5050<br />
            Fax: +1.777.999.5051
          </p>
        </div>

        <div className="contact-form">
          <h2>Contact Form</h2>
          <p>Required fields are followed by *</p>
          <form>
            <label>
              First Name:*
              <input type="text" name="firstName" placeholder="First Name" required />
            </label>
            <label>
              Last Name:*
              <input type="text" name="lastName" placeholder="Last Name" required />
            </label>
            <label>
              Email:*
              <input type="email" name="email" placeholder="Email" required />
            </label>
            <label>
              Phone:*
              <input type="tel" name="phone" placeholder="Phone" required />
            </label>
            <label>
              Message:*
              <textarea name="message" placeholder="Message" required></textarea>
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
    </div>
    );
  };
  export default ContactPage;