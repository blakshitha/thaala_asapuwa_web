import React from "react";
import { videoBlockSchema } from "@/components/blocks/video";
import { centerBlockSchema } from "@/tina/fields/center";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Collection } from "tinacms";

const Post: Collection = {
    label: "Events",
    name: "post",
    path: "content/posts",
    format: "mdx",
    ui: {
        router: ({ document }) => {
            return `/posts/${document._sys.breadcrumbs.join("/")}`;
        },
    },
    fields: [
        {
            type: "string",
            label: "Title",
            name: "title",
            isTitle: true,
            required: true,
        },
        {
            type: "image",
            name: "heroImg",
            label: "Event Hero Image",
            // @ts-ignore
            uploadDir: () => "posts",
        },
        {
            type: "object",
            label: "Event Gallery",
            name: "gallery",
            list: true,
            ui: {
                itemProps: (item) => {
                    return { label: item?.alt || item?.caption || "Gallery image" };
                },
            },
            fields: [
                {
                    type: "image",
                    label: "Image",
                    name: "image",
                    // @ts-ignore
                    uploadDir: () => "posts",
                },
                {
                    type: "string",
                    label: "Alt text",
                    name: "alt",
                },
                {
                    type: "string",
                    label: "Caption",
                    name: "caption",
                },
            ],
        },
        {
            type: "rich-text",
            label: "Event Summary",
            name: "excerpt",
            overrides: {
                toolbar: ["bold", "italic", "link"],
            },
        },
        {
            type: "reference",
            label: "Organizer",
            name: "author",
            collections: ["author"],
            ui: {
                //@ts-ignore
                optionComponent: (
                    props: {
                        name?: string;
                        avatar: string;
                    },
                    _internalSys: { path: string }
                ) => {
                    const { name, avatar } = props;
                    if (!name) return _internalSys.path;

                    return (
                        <p className="flex min-h-8 items-center gap-4">
                            <Avatar>
                                {avatar && (
                                    <AvatarImage
                                        src={avatar}
                                        alt={`${name} Profile`}
                                    />
                                )}
                                <AvatarFallback>
                                    {name
                                        .split(" ")
                                        .map(
                                            (part) =>
                                                part[0]?.toUpperCase() || ""
                                        )
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            {name}
                        </p>
                    );
                },
            },
        },
        {
            type: "datetime",
            label: "Event Date",
            name: "date",
            ui: {
                dateFormat: "MMMM DD YYYY",
                timeFormat: "hh:mm A",
            },
        },
        {
            type: "datetime",
            label: "End Date (optional)",
            name: "endDate",
            ui: {
                dateFormat: "MMMM DD YYYY",
                timeFormat: "hh:mm A",
            },
        },
        {
            type: "string",
            label: "Location",
            name: "location",
        },
        {
            type: "string",
            label: "Venue",
            name: "venue",
        },
        {
            type: "string",
            label: "Ticket URL",
            name: "ticketUrl",
        },
        {
            type: "string",
            label: "Ticket Button Label",
            name: "ticketLabel",
            ui: {
                defaultValue: "Get tickets",
            },
        },
        {
            type: "object",
            label: "Event Tags",
            name: "tags",
            list: true,
            fields: [
                {
                    type: "reference",
                    label: "Tag",
                    name: "tag",
                    collections: ["tag"],
                    ui: {
                        optionComponent: (
                            props: {
                                name?: string;
                            },
                            _internalSys: { path: string }
                        ) => props.name || _internalSys.path,
                    },
                },
            ],
            ui: {
                itemProps: (item) => {
                    return { label: item?.tag };
                },
            },
        },
        {
            type: "rich-text",
            label: "Event Details",
            name: "_body",
            templates: [
                {
                    name: "BlockQuote",
                    label: "Block Quote",
                    fields: [
                        {
                            name: "children",
                            label: "Quote",
                            type: "rich-text",
                            overrides: {
                                toolbar: ["bold", "italic", "link"],
                            },
                        },
                        {
                            name: "authorName",
                            label: "Author",
                            type: "string",
                        },
                    ],
                },
                {
                    name: "DateTime",
                    label: "Date & Time",
                    inline: true,
                    fields: [
                        {
                            name: "format",
                            label: "Format",
                            type: "string",
                            options: ["utc", "iso", "local"],
                        },
                    ],
                },
                {
                    name: "NewsletterSignup",
                    label: "Newsletter Sign Up",
                    fields: [
                        {
                            name: "children",
                            label: "CTA",
                            type: "rich-text",
                        },
                        {
                            name: "placeholder",
                            label: "Placeholder",
                            type: "string",
                        },
                        {
                            name: "buttonText",
                            label: "Button Text",
                            type: "string",
                        },
                        {
                            name: "disclaimer",
                            label: "Disclaimer",
                            type: "rich-text",
                            overrides: {
                                toolbar: ["bold", "italic", "link"],
                            },
                        },
                    ],
                    ui: {
                        defaultItem: {
                            placeholder: "Enter your email",
                            buttonText: "Notify Me",
                        },
                    },
                },
                videoBlockSchema,
                centerBlockSchema,
            ],
            isBody: true,
        },
    ],
};

export default Post;
