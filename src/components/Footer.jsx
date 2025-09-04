
export default function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-md text-white shadow-inner py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>
      Made with ❤️ using React & Tailwind. <br />
          &copy; {new Date().getFullYear()} <span className="font-semibold">QuizMaster</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

