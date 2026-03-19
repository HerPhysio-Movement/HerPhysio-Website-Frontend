const ContactMap = () => {
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.6504288553147!2d3.351486!3d6.601838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3faeb9f9c1c1c1c1%3A0x1c1c1c1c1c1c1c1c!2sIkeja%2CLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1234567890"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Her Physio Movement Map"
      />
    </div>
  );
};

export default ContactMap;
