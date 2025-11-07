"use client";

import Image from "next/image";
import SplitText from "../SplitText";

export default function Story() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h4 className="text-emerald-700 font-semibold  mb-2">About Us</h4>
          <SplitText
            text="Help is Our Main Goal"
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            delay={60}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, x: 40 }}
            to={{ opacity: 1, x: 0 }}
            threshold={0.1}
            rootMargin="0px"
            textAlign="start"
          />

          <p className="text-gray-700 font-semibold mb-4">
            ORS Foundation is an organization that stands on the core values of
            Integrity, Transparency, and Discipline.
          </p>

          <p className="text-gray-600 mb-4 leading-relaxed">
            {" "}
            The Foundation engages in various activities to improve the quality
            of life of individuals and communities, with a special focus on
            widows and orphans. Some of the activities include providing
            necessities such as food and clothing, advancing educational
            opportunities, empowering entrepreneurs with start-up capital, and
            promoting health through education and awareness programs.
          </p>

          <p className="text-gray-600 leading-relaxed">
            The mission of the ORS Foundation is to reduce poverty and advance
            education, ultimately improving the quality of life of individuals
            and communities in need. The Foundation is dedicated to achieving
            this mission through its various initiatives. We understand the
            challenges faced by the underprivileged, and we are committed to the
            vision of making the world a better place for them. With your
            support, we can create a better future for those in need. Join us in
            our efforts to make a difference and build a more equitable world.
          </p>
        </div>
        <div className="flex justify-end">
          <div className="overflow-hidden rounded-2xl w-full md:w-[80%] h-[80vh] relative">
            <Image
              src="/value.jpg"
              alt="Children smiling"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
