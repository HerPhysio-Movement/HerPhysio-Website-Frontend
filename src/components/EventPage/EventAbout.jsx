import { Link } from "react-router-dom";

const EventAbout = () => {
  return (
    <section className="px-6 sm:px-10 md:px-16 lg:px-20 py-16 sm:py-20 bg-white text-[#1D2130]">
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link
          to="/events"
          className="inline-flex items-center text-[#FD90A7] mb-8 hover:underline text-sm sm:text-base"
        >
          ← Back to Events
        </Link>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 leading-tight">
          About
        </h2>

        {/* First two paragraphs */}
        <div className="space-y-6 mb-10">
          <p className="text-base sm:text-lg leading-relaxed text-[#525560]">
            Et morbi vitae lobortis nam odio. Faucibus vitae vel neque nullam in
            in lorem platea mattis. Euismod aenean rhoncus scelerisque amet
            tincidunt scelerisque aliquam. Luctus porttitor elit vel sapien,
            accumsan et id ut est. Posuere molestie in turpis quam. Scelerisque
            in viverra mi ut quisque. In sollicitudin sapien, vel nulla quisque
            vitae. Scelerisque eget accumsan, non in. Posuere magna erat
            bibendum amet, nisi eu id.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-[#525560]">
            Viverra at diam nunc non ornare. Sed ultricies pulvinar nunc, lacus
            sem. Tellus aliquam ut euismod cursus dui lectus. Ut amet, cras
            volutpat dui. A bibendum viverra eu cras. Mauris morbi sed dignissim
            a in nec aliquam fringilla et. Mattis elit dignissim nibh sit. Donec
            arcu sed elit scelerisque tempor ornare tristique. Integer faucibus
            duis praesent tempor feugiat ornare in. Erat libero egestas porttitor
            nunc pellentesque mauris et pulvinar eget.
          </p>
        </div>

        {/* Image */}
        <div className="flex justify-center mb-10">
          <img
            src="/Outreach.jpg"
            alt="Community members working together"
            className="rounded-xl object-cover w-full max-h-[400px] sm:max-h-[500px] md:max-h-[600px] shadow-lg"
          />
        </div>

        {/* Third paragraph after image */}
        <p className="text-base sm:text-lg leading-relaxed text-[#525560]">
          Et morbi vitae lobortis nam odio. Faucibus vitae vel neque nullam in
          in lorem platea mattis. Euismod aenean rhoncus scelerisque amet
          tincidunt scelerisque aliquam. Luctus porttitor elit vel sapien,
          accumsan et id ut est. Posuere molestie in turpis quam. Scelerisque
          in viverra mi ut quisque. In sollicitudin sapien, vel nulla quisque
          vitae. Scelerisque eget accumsan, non in. Posuere magna erat bibendum
          amet, nisi eu id.
        </p>
      </div>
    </section>
  );
};

export default EventAbout;