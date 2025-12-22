import type { Template } from "tinacms";

export const centerBlockSchema: Template = {
    name: "Center",
    label: "Center",
    fields: [
        {
            name: "children",
            label: "Content",
            type: "rich-text",
        },
    ],
};
