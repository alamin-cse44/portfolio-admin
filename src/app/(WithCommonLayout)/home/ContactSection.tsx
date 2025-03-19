import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { Card } from "@/components/ui/card";

const ContactSection = () => {
  return (
    <section className="py-12  bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        We Are Available For You <span className="text-primary">24/7</span>
      </h2>
      <p className="text-gray-500 mt-2 text-sm md:text-base">
        OUR ONLINE SUPPORT SERVICE IS ALWAYS 24 HOURS
      </p>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 gap-10 mt-10">
        {/* Google Map */}
        <div className="w-full h-64 md:h-96">
          <iframe
            className="w-full h-full rounded-lg shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509371!2d144.955923615682!3d-37.81720974202124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df5a44f0b%3A0x1c69a0fda1e5a2a5!2sStone%20%26%20Chalk%20Melbourne!5e0!3m2!1sen!2sau!4v1679606401870!5m2!1sen!2sau"
            loading="lazy"
            title="test"
          ></iframe>
        </div>

        {/* Contact Details */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Address */}
          <Card className="p-4 flex flex-col gap-8">
            <div className="flex justify-center items-center gap-2">
              <FaMapMarkerAlt className="text-indigo-600 text-xl" />
              <h3 className="font-semibold text-gray-900">Address</h3>
            </div>
            <p className="text-gray-600 text-sm">
              112/B - Road 121, King/St, Dhaka, Bangladesh
            </p>
          </Card>

          <Card className="p-4 flex flex-col gap-8">
            <div className="flex justify-center items-center gap-2">
              <FaEnvelope className="text-indigo-600 text-xl" />
              <h3 className="font-semibold text-gray-900">Mail</h3>
            </div>
            <p className="text-gray-600 text-sm">alamin23712@gmail.com</p>
          </Card>

          <Card className="p-4 flex flex-col gap-8">
            <div className="flex justify-center items-center gap-2">
              <FaPhone className="text-indigo-600 text-xl" />
              <h3 className="font-semibold text-gray-900">Call</h3>
            </div>
            <p className="text-gray-600 text-sm">+880 1643530690</p>
          </Card>

          {/* Social Links */}
          <Card className="p-4 flex flex-col items-center gap-8">
            <h3 className="font-semibold text-gray-900">Social Account</h3>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/rehan.mohammed.al.amin/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600"
              >
                <FaFacebookF className="text-xl" />
              </a>
              <a
                href="https://www.linkedin.com/in/al-amin-1b4587216/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600"
              >
                <FaTwitter className="text-xl" />
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
