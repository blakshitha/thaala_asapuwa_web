"use client";
import Image from "next/image";
import Link from "next/link";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Section, sectionBlockSchemaField } from "../layout/section";
import { Card, CardContent, CardFooter } from "../ui/card";

export const ProductionGrid = ({ data }: { data: any }) => {
    return (
        <Section background={data.background!}>
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        {data.title && (
                            <h2
                                className="text-balance text-3xl font-semibold md:text-4xl"
                                data-tina-field={tinaField(data, "title")}
                            >
                                {data.title}
                            </h2>
                        )}
                        {data.description && (
                            <p
                                className="mt-3 text-muted-foreground"
                                data-tina-field={tinaField(data, "description")}
                            >
                                {data.description}
                            </p>
                        )}
                    </div>
                    {data.filters?.length > 0 && (
                        <div
                            className="flex flex-wrap gap-2"
                            data-tina-field={tinaField(data, "filters")}
                        >
                            {data.filters.map(
                                (filter: string, index: number) => (
                                    <span
                                        key={`${filter}-${index}`}
                                        className="rounded-full border border-foreground/20 px-3 py-1 text-xs uppercase tracking-wide"
                                    >
                                        {filter}
                                    </span>
                                ),
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {data.items?.map((item: any, index: number) => (
                        <Card
                            key={`${item?.title}-${index}`}
                            className="group overflow-hidden border-foreground/10 shadow-lg shadow-zinc-950/10"
                            data-tina-field={tinaField(item)}
                        >
                            {item?.image && (
                                <div className="relative h-52 w-full overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={
                                            item.imageAlt ||
                                            item.title ||
                                            "Production"
                                        }
                                        fill
                                        className="object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}
                            <CardContent className="pt-6">
                                <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                                    {item?.status && (
                                        <span
                                            data-tina-field={tinaField(
                                                item,
                                                "status",
                                            )}
                                        >
                                            {item.status}
                                        </span>
                                    )}
                                    {item?.year && (
                                        <span
                                            data-tina-field={tinaField(
                                                item,
                                                "year",
                                            )}
                                        >
                                            {item.year}
                                        </span>
                                    )}
                                    {item?.category && (
                                        <span
                                            data-tina-field={tinaField(
                                                item,
                                                "category",
                                            )}
                                        >
                                            {item.category}
                                        </span>
                                    )}
                                </div>
                                <h3
                                    className="mt-3 text-xl font-semibold"
                                    data-tina-field={tinaField(item, "title")}
                                >
                                    {item.title}
                                </h3>
                                {item.subtitle && (
                                    <p
                                        className="mt-2 text-sm text-muted-foreground"
                                        data-tina-field={tinaField(
                                            item,
                                            "subtitle",
                                        )}
                                    >
                                        {item.subtitle}
                                    </p>
                                )}
                                {item.summary && (
                                    <div
                                        className="prose prose-sm mt-4 max-w-none text-muted-foreground"
                                        data-tina-field={tinaField(
                                            item,
                                            "summary",
                                        )}
                                    >
                                        <TinaMarkdown content={item.summary} />
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="justify-between">
                                {item?.location && (
                                    <span
                                        className="text-xs text-muted-foreground"
                                        data-tina-field={tinaField(
                                            item,
                                            "location",
                                        )}
                                    >
                                        {item.location}
                                    </span>
                                )}
                                {item?.link && (
                                    <Link
                                        href={item.link}
                                        className="text-sm font-medium text-primary"
                                        data-tina-field={tinaField(
                                            item,
                                            "link",
                                        )}
                                    >
                                        View production
                                    </Link>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </Section>
    );
};

const defaultProductionItem = {
    title: "Jungle Book reimagined",
    subtitle: "Akram Khan Company",
    year: "2024",
    status: "Touring",
    category: "Dance",
    location: "International",
    summary:
        "A bold reimagining of the classic tale with new choreography, score, and design.",
};

export const productionGridBlockSchema: Template = {
    name: "productionGrid",
    label: "Production Grid",
    ui: {
        previewSrc: "/blocks/features.png",
        defaultItem: {
            background: "bg-black",
            title: "Touring productions",
            description:
                "Current and upcoming tours with creative teams and dates.",
            filters: ["Touring", "Archive", "Repertoire"],
            items: [
                defaultProductionItem,
                defaultProductionItem,
                defaultProductionItem,
            ],
        },
    },
    fields: [
        sectionBlockSchemaField as any,
        {
            type: "string",
            label: "Title",
            name: "title",
        },
        {
            type: "string",
            label: "Description",
            name: "description",
        },
        {
            type: "string",
            label: "Filters",
            name: "filters",
            list: true,
        },
        {
            type: "object",
            label: "Productions",
            name: "items",
            list: true,
            ui: {
                itemProps: (item) => ({ label: item?.title }),
                defaultItem: defaultProductionItem,
            },
            fields: [
                {
                    type: "image",
                    label: "Image",
                    name: "image",
                },
                {
                    type: "string",
                    label: "Image Alt",
                    name: "imageAlt",
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
                    type: "string",
                    label: "Year",
                    name: "year",
                },
                {
                    type: "string",
                    label: "Status",
                    name: "status",
                },
                {
                    type: "string",
                    label: "Category",
                    name: "category",
                },
                {
                    type: "string",
                    label: "Location",
                    name: "location",
                },
                {
                    type: "rich-text",
                    label: "Summary",
                    name: "summary",
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
