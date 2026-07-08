import { ArrowRight, Sparkles } from 'lucide-react';

const AboutIntro = () => {
  return (
    <section
      id="about-intro"
      className="relative overflow-hidden bg-gradient-to-br from-[#FFF5F7] via-white to-[#FFF8FA] px-4 py-20 sm:px-8 md:px-16 lg:py-28"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-5 h-48 w-48 rounded-full bg-[#FD90A7]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#C7365B]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-[#FD90A7] shadow-sm ring-1 ring-[#FD90A7]/10 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>About Her Physio Movement</span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#1D2130] sm:text-5xl lg:text-6xl">
              About Us
            </h1>
            <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#FD90A7] to-[#C7365B]" />

            <div className="mt-8 space-y-5 leading-8 text-[#525560]">
              <p>
                Her Physio Movement is a youth-led community of physiotherapy students and young professionals passionate about women’s health across Africa.
              </p>
              <p>
                We educate women across different ages who do not know much about their health and physiotherapy, and train healthcare professionals who do not understand the role of physiotherapy in women’s health.
              </p>
            </div>

            <a
              href="#mission-vision"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-[#FD90A7] bg-white px-6 py-3 font-semibold text-[#FD90A7] shadow-sm transition-all duration-300 hover:bg-[#FD90A7] hover:text-white"
            >
              Learn more
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-[#FD90A7]/10 bg-white/90 p-8 shadow-[0_20px_60px_-20px_rgba(199,54,91,0.35)] backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C7365B]">
                Our purpose
              </p>
              <p className="mt-5 leading-8 text-[#525560]">
                With women, we teach them about their health, how their bodies work, and how to prevent or manage problems before they get worse. Through outreach programs, we talk about many areas of women’s health, like pelvic health, joint problems, cardiovascular dysfunction, hormonal imbalance, muscle pains, or body discomfort.
              </p>

              <div className="mt-6 rounded-2xl border border-[#FD90A7]/15 bg-[#FFF5F7] p-5">
                <p className="text-base leading-8 text-[#1D2130]">
                  For physiotherapy students and professionals, we train and mentor them so that they can become women’s health experts. Through monthly webinars and regular workshops with experienced professionals, we support them to learn new information, gain skills and increase their confidence as women’s health experts.
                </p>
              </div>

              <p className="mt-6 text-base leading-8 text-[#525560]">
                When women know better, they live better, and when professionals are equipped to serve women well, everything changes.
              </p>

              <div className="mt-8 border-l-4 border-[#FD90A7] pl-4 italic text-[#1D2130]">
                That is Her Physio Movement.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
