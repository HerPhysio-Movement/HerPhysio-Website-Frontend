import { ArrowRight, BookOpen, HeartHandshake, Sparkles, GraduationCap } from 'lucide-react';

const highlights = [
  {
    title: 'For learners',
    text: 'Access practical knowledge, webinars, and trusted guidance at every stage of your journey.',
    icon: GraduationCap,
  },
  {
    title: 'For changemakers',
    text: 'Find tools and insight to lead impact in women’s health with confidence and clarity.',
    icon: HeartHandshake,
  },
];

const ResourcesIntro = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF5F7] via-white to-[#FFF8FA] px-4 py-20 sm:px-8 md:px-16 lg:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#FD90A7]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#C7365B]/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#FD90A7]/8 to-[#C7365B]/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-[#FD90A7] shadow-sm ring-1 ring-[#FD90A7]/10 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Resources</span>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#1D2130] sm:text-5xl lg:text-6xl">
              Grow your knowledge to move women’s health forward.
            </h1>
            <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[#FD90A7] to-[#C7365B]" />

            <p className="mt-8 leading-8 text-[#525560]">
              Our goal is to build a new generation of women’s health physiotherapists and changemakers across Africa.
            </p>

            <p className="mt-5 leading-8 text-[#525560]">
              We believe every physiotherapist and changemaker needs to be better equipped to be valuable and relevant in the women’s health field. Our resources are designed to empower you no matter where you are on your journey.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8">
              <a
                href="about-us#mission-vision"
                className="group inline-flex items-center gap-2 rounded-full border border-[#FD90A7] bg-white px-6 py-3 font-semibold text-[#FD90A7] shadow-sm transition-all duration-300 hover:bg-[#FD90A7] hover:text-white"
              >
                Read more about our mission
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FFF5F7] px-4 py-2 text-sm font-medium text-[#C7365B]">
                <BookOpen className="w-4 h-4" />
                Practical, evidence-based, and community-led
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#FD90A7]/10 bg-white/90 p-7 shadow-[0_24px_70px_-24px_rgba(199,54,91,0.35)] backdrop-blur-sm sm:p-8 -rotate-2 hover:rotate-0 hover:scale-105 transition duration-500">
            <div className="rounded-[20px] border border-[#FD90A7]/15 bg-[#FFF5F7] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C7365B]">
                Why these resources matter
              </p>
              <p className="mt-4 leading-8 text-[#1D2130]">
                They help you grow your knowledge, strengthen your confidence, and stay connected to practical tools that support women’s health practice and advocacy.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4 p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF5F7] text-[#FD90A7]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1D2130]">{item.title}</p>
                      <p className="mt-1 text-sm leading-7 text-[#525560]">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesIntro;
