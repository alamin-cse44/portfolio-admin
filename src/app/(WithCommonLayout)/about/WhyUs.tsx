const WhyUs = () => {
  return (
    <section className="container mx-auto px-4 text-center mt-10">
      <h2 className="text-3xl font-bold">Why Rent <span className="text-primary">From Us?</span> </h2>
      <p className="text-gray-600 mt-2">
        We offer the best rental houses with unmatched quality and service.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[
          {
            title: "Prime Locations",
            desc: "Our houses are located in top-rated areas, close to amenities.",
          },
          {
            title: "Affordable Prices",
            desc: "We offer competitive pricing for high-quality rentals.",
          },
          {
            title: "24/7 Support",
            desc: "Our support team is always available for assistance.",
          },
        ].map((item, index) => (
          <div key={index} className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-600 mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyUs;
