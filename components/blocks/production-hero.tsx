"use client";
import Image from "next/image";
import Link from "next/link";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Section, sectionBlockSchemaField } from "../layout/section";

export const ProductionHero = ({ data }: { data: any }) => {
    return (
        <Section background={data.background!} className="py-16 md:py-24">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                    {data.eyebrow && (
                        <p
                            className="text-primary text-sm font-semibold tracking-[0.2em] uppercase"
                            data-tina-field={tinaField(data, "eyebrow")}
                        >
                            {data.eyebrow}
                        </p>
                    )}
                    {data.title && (
                        <h1
                            className="mt-4 text-balance text-4xl font-semibold leading-tight md:text-5xl"
                            data-tina-field={tinaField(data, "title")}
                        >
                            {data.title}
                        </h1>
                    )}
                    {data.subtitle && (
                        <p
                            className="mt-4 text-lg text-muted-foreground"
                            data-tina-field={tinaField(data, "subtitle")}
                        >
                            {data.subtitle}
                        </p>
                    )}
                    {data.body && (
                        <div
                            className="prose prose-neutral mt-6 max-w-none text-muted-foreground"
                            data-tina-field={tinaField(data, "body")}
                        >
                            <TinaMarkdown content={data.body} />
                        </div>
                    )}

                    {data.actions?.length > 0 && (
                        <div className="mt-8 flex flex-wrap gap-3">
                            {data.actions.map((action: any, index: number) => (
                                <Link
                                    key={`${action?.label}-${index}`}
                                    href={action?.link || "#"}
                                    className="rounded-full border border-foreground/20 px-5 py-2 text-sm font-medium transition hover:bg-foreground hover:text-background"
                                    data-tina-field={tinaField(action)}
                                >
                                    {action?.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {data.imageSrc && (
                    <div
                        className="relative overflow-hidden rounded-2xl border bg-background shadow-lg"
                        data-tina-field={tinaField(data, "imageSrc")}
                    >
                        <Image
                            src={data.imageSrc}
                            alt={data.imageAlt || "Production hero"}
                            width={1200}
                            height={900}
                            className="h-full w-full object-cover"
                        />
                    </div>
                )}
            </div>
        </Section>
    );
};

export const productionHeroBlockSchema: Template = {
    name: "productionHero",
    label: "Production Hero",
    ui: {
        previewSrc: "/blocks/hero.png",
        defaultItem: {
            background: "bg-black",
            eyebrow: "Production",
            title: "Akram Khan Company",
            subtitle: "Touring productions and repertoire",
            body: "A curated overview of touring productions with dates, collaborators, and press highlights.",
            actions: [
                {
                    label: "View Touring",
                    link: "/production/touring-productions",
                },
            ],
        },
    },
    fields: [
        sectionBlockSchemaField as any,
        {
            type: "string",
            label: "Eyebrow",
            name: "eyebrow",
        },
        {
            type: "string",
            label: "Title",
            name: "title",
        },
        {
            type: "string",
            label: "Subtitle",
            name: "subtitle",
        },
        {
            type: "rich-text",
            label: "Description",
            name: "body",
        },
        {
            type: "image",
            label: "Image",
            name: "imageSrc",
        },
        {
            type: "string",
            label: "Image Alt",
            name: "imageAlt",
        },
        {
            type: "object",
            label: "Actions",
            name: "actions",
            list: true,
            ui: {
                itemProps: (item) => ({ label: item?.label }),
                defaultItem: {
                    label: "Learn more",
                    link: "/production",
                },
            },
            fields: [
                {
                    type: "string",
                    label: "Label",
                    name: "label",
                },
                {
                    type: "string",
                    label: "Link",
                    name: "link",
                },
            ],
        },
    ],
};
