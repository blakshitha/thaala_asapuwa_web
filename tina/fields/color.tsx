import React from "react";
import { wrapFieldsWithMeta } from "tinacms";

export const colorOptions = [
    "gold",
    "white",
    "black",
    "goldOnBlack",
    "blackOnGold",
    "whiteOnBlack",
];

export const ColorPickerInput = wrapFieldsWithMeta(({ input }) => {
    const inputClasses = {
        gold: "bg-amber-500 border-amber-600",
        white: "bg-white border-gray-300",
        black: "bg-black border-gray-800",
        goldOnBlack:
            "bg-gradient-to-r from-amber-500 to-black border-amber-600",
        blackOnGold: "bg-gradient-to-r from-black to-amber-500 border-black",
        whiteOnBlack: "bg-gradient-to-r from-white to-black border-gray-400",
    };

    return (
        <>
            <input type="text" id={input.name} className="hidden" {...input} />
            <div className="flex gap-2 flex-wrap">
                {colorOptions.map((color) => {
                    return (
                        <button
                            key={color}
                            className={`w-9 h-9 rounded-full shadow border ${
                                (inputClasses as any)[color]
                            } ${
                                input.value === color
                                    ? "ring-[3px] ring-offset-2 ring-blue-400"
                                    : ""
                            }`}
                            onClick={() => {
                                input.onChange(color);
                            }}
                        ></button>
                    );
                })}
            </div>
        </>
    );
});
