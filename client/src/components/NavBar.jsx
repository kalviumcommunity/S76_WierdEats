import React from "react";

const NavBar = ({ isVisible }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full flex justify-center items-center z-30 transition-transform duration-500 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex flex-row justify-center items-center h-[40px] w-[700px] bg-[#6948DF] mt-4 rounded-full gap-20 border border-black shadow-lg">
        <div className="relative flex flex-col items-center justify-center">
          <h1 className="text-black font-julee text-2xl relative z-10">WeirdEats</h1>
          <div className="w-6 h-6 rounded-full bg-white absolute mr-[80px] animate-float"></div>
        </div>
        <div className="flex flex-row justify-center items-center gap-3">
          {["Home", "Foods", "My Account", "Login"].map((item) => (
            <div
              key={item}
              className="w-[90px] h-7 rounded-md flex justify-center items-center text-center text-[15px] font-semibold hover:scale-110 transition duration-300 hover:bg-white hover:text-[#6948DF]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
