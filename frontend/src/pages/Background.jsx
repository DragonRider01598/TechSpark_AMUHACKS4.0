const Background = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen -z-10 bg-[#dff1c8bb]">
      {/* Large Ellipses - Floating Animation */}
      <img
        src="/external/ellipse1952-bznd-600h.png"
        alt="Ellipse1952"
        className="absolute top-0 left-[-100px] w-[600px] opacity-40 animate-float"
      />
      <img
        src="/external/ellipse1953-zfls-600w.png"
        alt="Ellipse1953"
        className="absolute top-10 right-[-120px] w-[600px] opacity-40 animate-float animation-delay-2000"
      />
      <img
        src="/external/ellipse1951-zbv2-600w.png"
        alt="Ellipse1951"
        className="absolute bottom-20 left-1/3 w-[600px] opacity-40 animate-float animation-delay-4000"
      />

      {/* Fruits & Vegetables with Different Animations */}
      <img
        src="/external/image551956-jfb6-300w.png"
        alt="Pumpkin"
        className="absolute bottom-[58%] left-[2%] w-[120px] animate-bounce-slow"
      />
      <img
        src="/external/morango1955-a8t-300w.png"
        alt="Avocado"
        className="absolute bottom-[35%] left-[6%] w-[100px] animate-bounce-slow"
      />
      <img
        src="/external/abacate1958-03ua-300h.png"
        alt="Strawberry"
        className="absolute bottom-[10%] left-[1%] w-[120px] animate-bounce-slow"
      />
      <img
        src="/external/grape.svg"
        alt="Grape"
        className="absolute bottom-[58%] right-[1%] w-[120px] animate-bounce-slow"
      />
      <img
        src="/external/blueberry1954-1ub-300h.png"
        alt="Blueberry"
        className="absolute bottom-[35%] right-[6%] w-[100px] animate-bounce-slow"
      />
      <img
        src="/external/image661957-6xhu-400h.png"
        alt="Onion"
        className="absolute bottom-[10%] right-[1%] w-[120px] animate-bounce-slow"
      />
    </div>
  );
};

export default Background;
