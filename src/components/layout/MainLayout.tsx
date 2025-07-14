const MainPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[radial-gradient(at_left_top,_#D58D8D,_#A78BFA)] text-white text-center px-4">
      <div className="max-w-xl">
        <h1 className="text-lg font-medium mb-2">Welcome to AI Lookup tool.</h1>
        <p className="mb-1">Snap it.</p>
        <p className="mb-1">Find visually similar listings online – instantly.</p>
        <p className="mb-1">
          Powered by OpenAI’s advanced image understanding, our web app scans your image,
          analyzes its content, and searches for related products across the web.
        </p>
        <p className="mb-1">
          Whether it’s fashion, furniture, or gadgets – we’ve got you covered.
        </p>
        <p className="mb-1">Say goodbye to keyword guessing.</p>
        <p className="mb-6">Say hello to visual search that actually works.</p>
      </div>

      <div className="flex gap-6 mb-10">
        <img
          src="/src/assets/login.png"
          alt="Log in"
          className="w-[120px] cursor-pointer hover:scale-105 transition-transform"
        />
        <img
          src="/src/assets/signup.png"
          alt="Sign up"
          className="w-[120px] cursor-pointer hover:scale-105 transition-transform"
        />
      </div>

      <div className="flex gap-6 items-center">
        <img src="/src/assets/fluxon-logo.svg" alt="Fluxon" className="h-10 w-auto" />
        <img src="/src/assets/ucu-logo.svg" alt="Ukrainian Catholic University" className="h-10 w-auto" />
      </div>
    </div>
  );
};

export default MainPage;
