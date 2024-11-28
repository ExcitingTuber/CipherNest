import React from "react";

const Footer = () => {
  const githublogo = "/src/assets/githublogo.png";

  function goTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <div>
      <footer className="mt-10 sticky bottom-0 w-full py-3 flex justify-center items-center gap-5 bg-zinc-800 text-white">
        <div className="flex justify-center items-center">
          <div
            className="logo font-bold sm:text-lg cursor-pointer"
            onClick={goTop}
          >
            <span>
              &lt;Cipher<span className="text-amber-300">Nest</span>/&gt;
            </span>
          </div>
          <p className="px-3 font-mono text-xs sm:text-sm text-white">
            Shelf your credentials
          </p>
        </div>

        <a
          href="https://github.com/ExcitingTuber?tab=repositories"
          target="_blank"
          className="flex max-sm:hidden"
          title="github"
        >
          <img src={githublogo} alt="github" className="h-6 px-2" />
          Contact us
        </a>
      </footer>
    </div>
  );
};

export default Footer;
