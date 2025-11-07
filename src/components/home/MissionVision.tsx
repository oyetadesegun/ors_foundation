export default function MissionVision() {
  return (
    <section className="py-20 bg-white" id="mission-vision">
      <div className="max-w-6xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <h3 className="text-primary font-semibold text-lg mb-3 uppercase tracking-wide">
            Mission
          </h3>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Improving Quality of Life Through Poverty Reduction and Education
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to improve the quality of life for individuals and
            communities by reducing poverty and advancing education. We strive
            to empower people with the resources, skills, and opportunities they
            need to create a sustainable future.
          </p>
        </div>

        <div className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <h3 className="text-primary font-semibold text-lg mb-3 uppercase tracking-wide">
            Vision
          </h3>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Creating a Better World for the Underprivileged
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We exist to make the world a better place for the underprivileged by
            promoting equality, education, and human dignity. Our vision is a
            world where everyone, regardless of background, has access to
            opportunity and hope.
          </p>
        </div>
      </div>
    </section>
  );
}
