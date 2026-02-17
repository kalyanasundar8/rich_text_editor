"use client";

import { useState, useRef, useEffect } from "react";
import { useSlate } from "slate-react";
import { toggleHeading, isHeadingActive } from "./ToggleHeading";
import { HeadingType } from "@/app/core/EditorTypes";
import { StandardIcons } from "@/app/toolbar/StandardIcons";
import { ChevronDown } from "lucide-react";

type BlockFormat = HeadingType | "paragraph";

type HeadingOption = {
    format: BlockFormat;
    icon: React.ComponentType<{ size?: number }>;
};

const headingOptions: HeadingOption[] = [
    { format: "paragraph", icon: StandardIcons.pargraph },
    { format: "heading-one", icon: StandardIcons.heading_one },
    { format: "heading-two", icon: StandardIcons.heading_two },
    { format: "heading-three", icon: StandardIcons.heading_three },
    { format: "heading-four", icon: StandardIcons.heading_four },
    { format: "heading-five", icon: StandardIcons.heading_five },
    { format: "heading-six", icon: StandardIcons.heading_six },
];

const HeadingDropdown = () => {
    const editor = useSlate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Get current active heading
    const getActiveHeading = (): string => {
        const formatMap: Record<BlockFormat, string> = {
            "paragraph": "P",
            "heading-one": "H1",
            "heading-two": "H2",
            "heading-three": "H3",
            "heading-four": "H4",
            "heading-five": "H5",
            "heading-six": "H6",
        };
        for (const option of headingOptions) {
            if (option.format === "paragraph") continue;
            if (isHeadingActive(editor, option.format)) {
                return formatMap[option.format];
            }
        }
        return "P";
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (format: BlockFormat) => {
        if (format === "paragraph") {
            // Convert to paragraph by toggling off any active heading
            for (const option of headingOptions) {
                if (option.format !== "paragraph" && isHeadingActive(editor, option.format)) {
                    toggleHeading(editor, option.format);
                    break;
                }
            }
        } else {
            toggleHeading(editor, format);
        }
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className="relative inline-block">
            <button
                type="button"
                onMouseDown={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }}
                className="flex items-center md:space-x-2 p-1 md:px-2 md:py-1 rounded-md border border-transparent"
            >
                <span className="text-sm">{getActiveHeading()}</span>
                <ChevronDown size={16} />
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10 min-w-[150px]">
                    {headingOptions.map((option) => {
                        const Icon = option.icon;
                        const isActive = option.format === "paragraph"
                            ? !headingOptions.some(o => o.format !== "paragraph" && isHeadingActive(editor, o.format))
                            : isHeadingActive(editor, option.format);

                        return (
                            <button
                                key={option.format}
                                type="button"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    handleSelect(option.format);
                                }}
                                className={`flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-100 ${isActive ? "bg-gray-200" : ""
                                    }`}
                            >
                                <Icon size={18} />
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default HeadingDropdown;
