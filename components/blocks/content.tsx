"use client";
import React from "react";

import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import { PageBlocksContent } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { Mermaid } from "./mermaid";
import { sectionBlockSchemaField } from "../layout/section";
import {
    scriptCopyBlockSchema,
    ScriptCopyBtn,
} from "../magicui/script-copy-btn";
import { centerBlockSchema } from "@/tina/fields/center";

export const Content = ({ data }: { data: PageBlocksContent }) => {
    return (
        <Section
            background={data.background!}
            className="prose prose-lg prose-headings:text-white prose-p:text-white prose-strong:text-white prose-ul:text-white prose-ol:text-white prose-li:text-white prose-a:text-primary prose-a:hover:text-primary/80 prose-a:no-underline prose-a:hover:underline"
            data-tina-field={tinaField(data, "body")}
        >
            <TinaMarkdown
                content={data.body}
                components={{
                    mermaid: (props: any) => <Mermaid {...props} />,
                    scriptCopyBlock: (props: any) => (
                        <ScriptCopyBtn {...props} />
                    ),
                    Center: (props: any) => (
                        <div className="text-center">
                            <TinaMarkdown content={props.children} />
                        </div>
                    ),
                }}
            />
        </Section>
    );
};

export const contentBlockSchema: Template = {
    name: "content",
    label: "Content",
    ui: {
        previewSrc: "/blocks/content.png",
        defaultItem: {
            background: "bg-black",
            body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
        },
    },
    fields: [
        sectionBlockSchemaField as any,
        {
            type: "rich-text",
            label: "Body",
            name: "body",
            templates: [scriptCopyBlockSchema, centerBlockSchema],
        },
    ],
};
