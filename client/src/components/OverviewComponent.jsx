import React from "react";
import foods from "../data/OverviewOfFood";

const OverviewComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <h1 className="text-black font-julee text-[38px] font-bold p-2">
        Overview of Food:
      </h1>
      <div className="mt-4 p-5 w-full max-w-5xl">
        {foods.map((food, index) => (
          <div
            key={food.id}
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-12`}
          >
            <div className={`flex justify-center ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
              <img
                src={food.img}
                alt="Food"
                className="w-full h-auto max-w-xs md:max-w-md rounded-lg "
              />
            </div>

            
            <div className={`text-left ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
              <p className="text-black text-lg leading-relaxed font-semibold">{food.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewComponent;
