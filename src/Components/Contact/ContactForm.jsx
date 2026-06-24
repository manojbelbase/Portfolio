import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaRegCommentDots,
} from "react-icons/fa";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    const k1 = "8748d7fb";
    const k2 = "1c12";
    const k3 = "4d8f";
    const k4 = "8177";
    const k5 = "cb325b09a221";
    formData.append("access_key", `${k1}-${k2}-${k3}-${k4}-${k5}`);

    const urlParts = ["https://", "api.web3forms.com", "/submit"];
    const response = await fetch(urlParts.join(""), {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-col lg:flex-row justify-center items-center gap-8 md:mt-8 mt-4 p-2 md:p-8 bg-primary border border-gray-700 rounded-md sm:rounded-2xl text-gray-100">
      <div className="lg:w-1/2 space-y-6 text-center lg:text-left p-2">
        <h3 className="text-2xl font-bold flex items-center justify-center lg:justify-start">
          Send me a message <FaRegCommentDots className="ml-2 text-xl" />
        </h3>
        <p className="text-gray-400 md:text-base text-sm text-justify">
          Feel free to reach out through the contact form or find my contact
          information below. I'm always open to feedback, questions, and
          suggestions. Let's connect!
        </p>
        <ul className="space-y-4">
          <li className="flex items-center gap-2 text-gray-300">
            <FaEnvelope className="text-secondary" />
            <span>manojbelbase56@gmail.com</span>
          </li>
          <li className="flex items-center gap-2 text-gray-300">
            <FaPhone className="text-secondary" />
            <span>+977 9864415071</span>
          </li>
          <li className="flex items-center gap-2 text-gray-300">
            <FaMapMarkerAlt className="text-secondary" />
            <span>Lumbini, Nepal</span>
          </li>
        </ul>
      </div>

      <div className="lg:w-1/2 bg-gray-900 md:p-8 p-3 sm:p-4 shadow-lg rounded-md sm:rounded-2xl">
        <form onSubmit={onSubmit} className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Your Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            required
            className="w-full p-2 bg-gray-800 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
          />

          <label className="block text-sm font-medium text-gray-300">
            Phone Number
          </label>
          <input
            type="tel"
            name="mobile"
            placeholder="Enter your mobile number"
            required
            className="w-full p-2 bg-gray-800 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
          />

          <label className="block text-sm font-medium text-gray-300">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email id"
            required
            className="w-full p-2 bg-gray-800 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
          />

          <label className="block text-sm font-medium text-gray-300">
            Write a message here
          </label>
          <textarea
            name="message"
            placeholder="Enter your message"
            rows={6}
            required
            className="w-full p-2 bg-gray-800 text-gray-200 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
          ></textarea>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-secondary text-white font-semibold rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:bg-secondary"
          >
            Submit Now
          </button>
        </form>
        <span className="block mt-4 text-center text-sm text-gray-300">
          {result}
        </span>
      </div>
    </div>
  );
};

export default Contact;
