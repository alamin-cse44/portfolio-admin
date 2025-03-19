"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    description:
      "This platform has transformed the way I do business. The support team is incredible!",
    tags: ["Entrepreneur", "Business Owner"],
  },
  {
    id: 2,
    name: "Jane Smith",
    description:
      "I love the seamless experience. Everything is smooth and well-designed!",
    tags: ["Designer", "Freelancer"],
  },
  {
    id: 3,
    name: "Robert Brown",
    description:
      "Absolutely the best service I have used in a long time. Highly recommended!",
    tags: ["Developer", "Tech Enthusiast"],
  },
  {
    id: 4,
    name: "Emily Johnson",
    description:
      "User-friendly interface and excellent customer support. A must-have tool!",
    tags: ["Marketer", "Content Creator"],
  },
  {
    id: 5,
    name: "Michael Williams",
    description:
      "Great experience! I will continue using this service for my projects.",
    tags: ["Project Manager", "Entrepreneur"],
  },
];

export default function TestimonialSliders() {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          What Our <span className="text-primary">Clients Say</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Hear from some of our happy clients
        </p>

        <div className="mt-8">
          <Swiper
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            spaceBetween={20}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            // navigation
            modules={[Pagination, Navigation, Autoplay]}
            className="pb-6"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <Card className="p-6 bg-white shadow-lg rounded-lg text-left">
                  <p className="text-gray-700 italic">
                    "{testimonial.description}"
                  </p>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <div className="flex flex-wrap mt-2">
                    {testimonial.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full mr-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
