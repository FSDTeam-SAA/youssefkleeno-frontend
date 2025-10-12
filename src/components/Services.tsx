import MonthlyService from "./MonthlyService";
import OneTimeService from "./OneTimeService";

const Services = () => {
  return (
    <div>
      <section id="services" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-semibold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto text-balance">
              Choose between a one-time wash or subscribe for regular cleaning
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mx-auto">
            {/* Monthly Subscription Card */}
            <MonthlyService />
            {/* One-time Wash Card */}
            <OneTimeService />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
