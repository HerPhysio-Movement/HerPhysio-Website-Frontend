// src/pages/Resources.jsx
import ContributionCTA from "../components/HomePage/ContributionCTA";
import EventsSection from "../components/shared/EventsSection";

const Resources = () => {
  return (
    <main id="main-content" className="bg-white">
      {/* Top News with line */}
      <section className="px-4 sm:px-8 md:px-16 pt-16 pb-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
            <span className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
              Top news
            </span>
          </div>
        </div>
      </section>

      {/* Hero with outer card containing three inner cards */}
      <section className="px-4 sm:px-8 md:px-16 pb-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left text */}
            <div className="lg:w-1/2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1D2130] mb-4">
                Our goal is to provide inclusive care for women with special needs
              </h1>
              <p className="text-[#525560] text-lg mb-6">
                Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
              </p>
              <button className="text-[#FD90A7] font-bold underline underline-offset-4 hover:no-underline transition">
                Read more
              </button>
            </div>

            {/* Right side – outer card containing three inner cards */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="space-y-6">
                  {[
                    {
                      headline: "Empowering women through education",
                      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
                    },
                    {
                      headline: "Community health outreach",
                      text: "Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero.",
                    },
                    {
                      headline: "Specialised physiotherapy",
                      text: "Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus.",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      {/* Image placeholder */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-300 rounded-lg flex-shrink-0 flex items-center justify-center text-gray-600 text-xs">
                        Image
                      </div>
                      {/* Text */}
                      <div>
                        <h3 className="font-bold text-[#1D2130] text-sm sm:text-base mb-1">
                          {item.headline}
                        </h3>
                        <p className="text-[#525560] text-xs sm:text-sm">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Courses - pink background */}
      <section className="px-4 sm:px-8 md:px-16 py-16 bg-[#FFD8E1]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1D2130] mb-8">
            Online Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4">
                <div className="mb-4 p-1 border-2 border-[#FD90A7] rounded-lg">
                  <div className="bg-gray-200 w-full h-48 rounded-lg flex items-center justify-center text-gray-500">
                    Image placeholder
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#1D2130] mb-3">Back Management</h3>
                <p className="text-[#525560] mb-4">
                  Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
                </p>
                <button className="border-2 border-[#FD90A7] text-[#FD90A7] font-medium px-4 py-2 rounded-md hover:bg-[#FD90A7] hover:text-white transition">
                  View course
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recordings of HPM Webinars - as cards with pink buttons */}
      <section className="px-4 sm:px-8 md:px-16 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Heading with dash */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
            <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
              RECORDINGS OF HPM WEBINARS
            </h2>
          </div>
          <p className="text-[#525560] text-lg mb-8">
            Missed any of our webinars? Access past and recent webinar recordings
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Pilates for Back Pain Management",
                presenter: "Webinar 3.0 with PT: Abraham",
                link: "https://www.youtube.com/watch?v=1Xg7Vj2Qb5Y",
              },
              {
                title: "The 3 Stages of Labour",
                presenter: "Webinar 4.0 with Dr. Aliya PT",
                link: "https://www.youtube.com/watch?v=Wk8zq9J6fUc",
              },
              {
                title: "Postpartum Recovery and Pelvic Health",
                presenter: "Webinar 2.0 with PT: Mufatudeen",
                link: "https://www.youtube.com/watch?v=ZvKtGmHwFpM",
              },
            ].map((webinar, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <div className="bg-gray-200 w-full h-40 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                  Image placeholder
                </div>
                <h3 className="text-xl font-bold text-[#1D2130] mb-2">{webinar.title}</h3>
                <p className="text-[#525560] mb-4">{webinar.presenter}</p>
                <a
                  href={webinar.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#FD90A7] text-black font-medium px-4 py-2 rounded-md hover:bg-[#f77997] transition"
                >
                  View recording
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="text-[#FD90A7] font-bold underline underline-offset-4 hover:no-underline transition">
              View More
            </button>
          </div>
        </div>
      </section>

      {/* Articles / Blog Posts */}
      <section className="px-4 sm:px-8 md:px-16 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1D2130] mb-8">
            Articles/Blog Post
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Women's mental health" },
              { title: "Women in Physiotherapy" },
              { title: "Caring for women with pelvic floor dysfunction" },
            ].map((article, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <div className="bg-gray-200 w-full h-40 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                  Image placeholder
                </div>
                <h3 className="text-xl font-bold text-[#1D2130] mb-3">{article.title}</h3>
                <p className="text-[#525560]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="text-[#FD90A7] font-bold underline underline-offset-4 hover:no-underline transition">
              View More
            </button>
          </div>
        </div>
      </section>

      {/* Social Media Links - as cards with dash */}
      <section className="px-4 sm:px-8 md:px-16 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Heading with dash */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
            <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
              SOCIAL MEDIA LINKS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                platform: "HPM YouTube",
                action: "Watch video",
                url: "https://www.youtube.com/watch?v=1Xg7Vj2Qb5Y",
              },
              {
                platform: "Women's Health",
                action: "Learn more about atiend, consectetur adipiscing elit. Suspendisse varius enim",
                url: "https://www.womenshealth.com/",
              },
              {
                platform: "HPM YouTube",
                action: "Subscribe to get latest updates",
                url: "https://www.youtube.com/channel/UCnBxrRlD_4sN7yLgT0eEa0g",
              },
            ].map((social, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition">
                <div className="bg-gray-200 w-full h-40 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                  Image placeholder
                </div>
                <h3 className="text-xl font-bold text-[#1D2130] mb-3">{social.platform}</h3>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FD90A7] hover:underline"
                >
                  {social.action}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contribution CTA */}
      <ContributionCTA />
      {/* Events Section */}
      <EventsSection />
    </main>
  );
};

export default Resources;