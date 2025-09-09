const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-12">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">
        Contact Us
      </h1>
      <p className="text-gray-400 mb-10 text-center max-w-lg">
        Have questions, feedback, or need support? Fill out the form below or
        reach us directly.
      </p>

      {/* Contact Form */}
      <form className="w-full max-w-lg bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Your Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Message</label>
          <textarea
            rows="4"
            placeholder="Write your message..."
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 px-4 rounded-lg font-semibold"
        >
          Send Message
        </button>
      </form>

      {/* Extra Info */}
      <div className="mt-12 text-center text-gray-400 space-y-2">
        <a href="mailto:abhiguata18278@gmail.com">📧 abhiguata18278@gmail.com</a>
        <a href="tel:+917900899067">📞 +91 7900899067 </a>
      </div>
    </div>
  );
};

export default ContactUs;
