import ContributionCTA from "../components/HomePage/ContributionCTA";
import EventsSection from "../components/shared/EventsSection";
import { FaYoutube, FaHeart, FaBookOpen, FaPodcast } from "react-icons/fa";

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
          <div className="bg-[#FFD8E1] rounded-2xl p-6 border border-white/30">
            <span className="text-xs font-semibold text-[#FD90A7] uppercase tracking-wider">
              Announcement
            </span>
            <h3 className="text-xl font-bold text-[#1D2130] mt-1 mb-2">
              New: Free Pelvic Health Webinar Series
            </h3>
            <p className="text-[#525560]">
              Join us for a four‑part series with leading physiotherapists. First session: "Understanding Your Pelvic Floor" – available on demand now.
            </p>
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
                We believe every woman deserves access to compassionate, expert care. Our resources are designed to educate, empower, and support you – no matter where you are on your journey.
              </p>
              <button className="text-[#FD90A7] font-bold underline underline-offset-4 hover:no-underline transition">
                Read more about our mission
              </button>
            </div>

            {/* Right side – outer card containing three inner cards */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
                <div className="space-y-6">
                  {[
                    {
                      headline: "Empowering through education",
                      text: "Free guides, videos, and articles to help you understand your body and make informed decisions.",
                    },
                    {
                      headline: "Community health outreach",
                      text: "Workshops and events in local communities, bringing care directly to those who need it most.",
                    },
                    {
                      headline: "Specialised physiotherapy",
                      text: "One‑on‑one virtual consultations and personalized care plans for pelvic health, prenatal, and postpartum needs.",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 items-start p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition group"
                    >
                      <div className="w-12 h-12 bg-[#FD90A7]/10 rounded-lg flex items-center justify-center text-[#FD90A7] group-hover:bg-[#FD90A7]/20 transition">
                        {idx === 0 && <FaBookOpen className="w-5 h-5" />}
                        {idx === 1 && <FaHeart className="w-5 h-5" />}
                        {idx === 2 && <FaPodcast className="w-5 h-5" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1D2130] text-base mb-1">
                          {item.headline}
                        </h3>
                        <p className="text-[#525560] text-sm">
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
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block bg-white/30 text-[#1D2130] px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider mb-4">
              Learn at your own pace
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-4">
              Online Courses
            </h2>
            <p className="text-[#525560] text-lg">
              Evidence‑based courses designed by physiotherapists, for women.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Back Health & Posture",
                description:
                  "Learn exercises and habits to prevent and manage back pain, tailored for women.",
              },
              {
                title: "Pilates for Core Strength",
                description:
                  "Gentle, effective Pilates routines to strengthen your core and improve mobility.",
              },
              {
                title: "Pelvic Floor Basics",
                description:
                  "Understand your pelvic floor – anatomy, common issues, and simple exercises.",
              },
            ].map((course, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-white/50"
              >
                <div className="mb-4 p-2 bg-[#FD90A7]/5 rounded-xl inline-block">
                  <div className="w-12 h-12 bg-[#FD90A7]/10 rounded-lg flex items-center justify-center text-[#FD90A7]">
                    <FaBookOpen className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#1D2130] mb-2">
                  {course.title}
                </h3>
                <p className="text-[#525560] mb-4 text-sm">
                  {course.description}
                </p>
                <button className="border-2 border-[#FD90A7] text-[#FD90A7] font-medium px-4 py-2 rounded-full hover:bg-[#FD90A7] hover:text-white transition w-full">
                  View course
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recordings of HPM Webinars - as cards with images and play overlay */}
      <section className="px-4 sm:px-8 md:px-16 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Heading with dash */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
            <h2 className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
              Webinar Recordings
            </h2>
          </div>
          <p className="text-[#525560] text-lg mb-8 max-w-2xl">
            Missed a live session? Catch up on our most popular webinars, led by expert physiotherapists.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Pilates for Back Pain Management",
                presenter: "PT. Abraham",
                description:
                  "Learn gentle Pilates techniques to alleviate chronic back pain.",
                link: "https://www.youtube.com/watch?v=1Xg7Vj2Qb5Y",
                image: "/pilates.jpg",
              },
              {
                title: "The 3 Stages of Labour",
                presenter: "Dr. Aliya PT",
                description:
                  "What to expect, how to prepare, and physiotherapy tips for each stage.",
                link: "https://www.youtube.com/watch?v=Wk8zq9J6fUc",
                image: "/stagesLabour.jpg",
              },
              {
                title: "Postpartum Recovery & Pelvic Health",
                presenter: "PT. Mufatudeen",
                description:
                  "A guide to healing, strengthening, and regaining confidence after birth.",
                link: "https://www.youtube.com/watch?v=ZvKtGmHwFpM",
                image: "/pospartum.jpg",
              },
            ].map((webinar, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition group"
              >
                {/* Image container – full width, flexible height, no cropping */}
                <div className="relative w-full rounded-xl mb-4 overflow-hidden bg-gray-100">
                  <img
                    src={webinar.image}
                    alt={webinar.title}
                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={webinar.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-[#FD90A7] rounded-full flex items-center justify-center text-white hover:bg-[#f77997] transition"
                      aria-label={`Watch ${webinar.title}`}
                    >
                      <FaYoutube className="w-6 h-6" />
                    </a>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#1D2130] mb-1">
                  {webinar.title}
                </h3>
                <p className="text-sm text-[#FD90A7] font-medium mb-2">
                  {webinar.presenter}
                </p>
                <p className="text-[#525560] text-sm mb-4">
                  {webinar.description}
                </p>
                <a
                  href={webinar.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#FD90A7] text-white font-medium px-4 py-2 rounded-full hover:bg-[#f77997] transition w-full text-center"
                >
                  Watch recording
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="text-[#FD90A7] font-bold underline underline-offset-4 hover:no-underline transition">
              View all webinars
            </button>
          </div>
        </div>
      </section>

      {/* Articles / Blog Posts */}
      <section className="px-4 sm:px-8 md:px-16 py-16 bg-[#FFD8E1]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block bg-white/30 text-[#1D2130] px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider mb-4">
              From our blog
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-4">
              Articles & Insights
            </h2>
            <p className="text-[#525560] text-lg">
              Practical advice, stories, and expert perspectives on women's health.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Women's mental health after childbirth",
                excerpt:
                  "Recognizing the signs, seeking help, and building a support system.",
                date: "March 15, 2025",
              },
              {
                title: "Women in Physiotherapy: Breaking barriers",
                excerpt:
                  "Stories of female physiotherapists shaping the future of healthcare.",
                date: "February 28, 2025",
              },
              {
                title: "Caring for pelvic floor dysfunction",
                excerpt:
                  "A compassionate guide to symptoms, treatments, and daily care.",
                date: "January 10, 2025",
              },
            ].map((article, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border border-white/50"
              >
                <p className="text-xs text-[#FD90A7] font-medium mb-2">
                  {article.date}
                </p>
                <h3 className="text-xl font-bold text-[#1D2130] mb-2">
                  {article.title}
                </h3>
                <p className="text-[#525560] text-sm mb-4">{article.excerpt}</p>
                <a
                  href="#"
                  className="text-[#FD90A7] font-medium hover:underline inline-flex items-center"
                >
                  Read more <span className="ml-1">→</span>
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="text-[#FD90A7] font-bold underline underline-offset-4 hover:no-underline transition">
              View all articles
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
              Connect with us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                platform: "YouTube",
                action: "Watch, learn, and subscribe",
                url: "https://www.youtube.com/@HerPhysioMovement",
                icon: FaYoutube,
              },
              {
                platform: "Women's Health Portal",
                action: "Curated resources and articles",
                url: "https://www.womenshealth.com/",
                icon: FaHeart,
              },
              {
                platform: "Instagram",
                action: "Daily tips and community stories",
                url: "https://www.instagram.com/herphysio_movement",
                icon: FaHeart,
              },
            ].map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-[#FD90A7] hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#FD90A7]/10 rounded-xl flex items-center justify-center text-[#FD90A7] group-hover:bg-[#FD90A7]/20 transition">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1D2130]">
                      {social.platform}
                    </h3>
                  </div>
                  <p className="text-[#525560] text-sm mb-3">{social.action}</p>
                  <span className="text-[#FD90A7] font-medium text-sm group-hover:underline">
                    Follow us →
                  </span>
                </a>
              );
            })}
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