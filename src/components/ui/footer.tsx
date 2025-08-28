

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">

        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-lg font-semibold">Library Master</h2>
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Library Master. All rights reserved.
          </p>
        </div>

        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="/all-books" className="hover:text-white transition">
            All Books
          </a>
          <a href="/add-book" className="hover:text-white transition">
            Add Book
          </a>
          <a href="/borrow-summary" className="hover:text-white transition">
            Borrow Summary
          </a>
        </div>

        <div className="flex space-x-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
