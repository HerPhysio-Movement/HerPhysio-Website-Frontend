import { useState } from "react";
import { MapPin, Send, Phone, Mail } from "lucide-react";
import ContactMap from "../components/ContactPage/contactMap";

const buttonPink = "rgba(253, 144, 167, 1)";

// Office locations with directions from major Lagos landmarks
const offices = [
  {
    name: "Head Office",
    address: "23 Marina Road, Lagos Island, Lagos, Nigeria",
    coords: [6.4531, 3.3958],
    directions: [
      {
        from: "Murtala Muhammed Airport",
        time: "30 mins via Lagos-Ibadan Expressway",
      },
      { from: "CMS Bus Stop", time: "10 mins walk or 5 mins drive" },
      { from: "Oshodi", time: "25 mins via Ikorodu Road" },
      { from: "Ikeja City Mall", time: "20 mins via Ikorodu Road" },
      { from: "Lekki Phase 1", time: "35 mins via Third Mainland Bridge" },
      { from: "Victoria Island", time: "20 mins via Marina" },
      { from: "Maryland", time: "20 mins via Ikorodu Road" },
      { from: "Yaba", time: "15 mins via Herbert Macaulay" },
      { from: "Apapa", time: "25 mins via Marine Bridge" },
    ],
  },
  {
    name: "Branch Office",
    address: "Opp Awolowo round about, Ikeja, Lagos, Nigeria",
    coords: [6.608, 3.356],
    directions: [
      {
        from: "Murtala Muhammed Airport",
        time: "15 mins via Obafemi Awolowo Way",
      },
      { from: "Ikeja City Mall", time: "5 mins walk" },
      { from: "Ojota", time: "10 mins via Ikorodu Road" },
      { from: "Oshodi", time: "10 mins via Agege Motor Road" },
      { from: "Maryland", time: "12 mins via Ikorodu Road" },
      { from: "Yaba", time: "25 mins via Agege Motor Road" },
      { from: "CMS", time: "35 mins via Ikorodu Road / Third Mainland" },
      { from: "Lekki", time: "45 mins via Third Mainland / Ikorodu" },
      { from: "Victoria Island", time: "40 mins via Third Mainland" },
    ],
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Message sent (demo)");
  };

  return (
    <main id="main-content" className="pt-20 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with dash */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
          <span className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
            CONTACT US
          </span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            We'd love to hear from you
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have any question in mind or want to enquire? Please feel free to
            contact us through the form or the following details.
          </p>
        </div>

        {/* Main content: form + contact info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Left column: Contact Form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-md border border-gray-200"
            >
              <div className="space-y-6">
                {/* First Name */}
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                    required
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="johndoe@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your Message"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition resize-none"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-full text-white font-medium transition-all hover:opacity-90 shadow-md hover:shadow-lg flex items-center justify-center"
                  style={{ backgroundColor: buttonPink }}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send message
                </button>
              </div>
            </form>
          </div>

          {/* Right column: Contact Info Cards */}
          <div className="space-y-6">
            {/* Let's Talk Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Let's talk
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-pink-500" />
                  <a
                    href="tel:+2341234567890"
                    className="text-gray-600 hover:text-pink-600 hover:underline transition"
                  >
                    +234 123 456 7890
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-pink-500" />
                  <a
                    href="mailto:info@womensphysiocare.org"
                    className="text-gray-600 hover:text-pink-600 hover:underline transition"
                  >
                    info@womensphysiocare.org
                  </a>
                </div>
              </div>
            </div>

            {/* Head Office Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Head Office
                  </h3>
                  <p className="text-gray-600">{offices[0].address}</p>
                </div>
              </div>
            </div>

            {/* Branch Office Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Branch Office
                  </h3>
                  <p className="text-gray-600">{offices[1].address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width Map Section */}
      <div className="w-full bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Our Locations
          </h2>
          <ContactMap offices={offices} />
        </div>
      </div>
    </main>
  );
};

export default Contact;
