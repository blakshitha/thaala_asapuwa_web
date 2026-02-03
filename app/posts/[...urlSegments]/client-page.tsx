"use client";
import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { PostQuery } from "@/tina/__generated__/types";
import { useLayout } from "@/components/layout/layout-context";
import { Section } from "@/components/layout/section";
import { components } from "@/components/mdx-components";
import ErrorBoundary from "@/components/error-boundary";

const titleColorClasses = {
    gold: "from-amber-400 to-amber-600",
    white: "from-white to-zinc-200",
    black: "from-zinc-800 to-black dark:from-zinc-200 dark:to-white",
    primary: "from-primary to-primary",
    goldOnBlack: "from-amber-400 to-amber-600",
    blackOnGold: "from-zinc-800 to-black",
    whiteOnBlack: "from-white to-zinc-300",
};

interface ClientPostProps {
    data: PostQuery;
    variables: {
        relativePath: string;
    };
    query: string;
}

export default function PostClientPage(props: ClientPostProps) {
    const { theme } = useLayout();
    const { data } = useTina({ ...props });
    const post = data.post;
    const gallery = (post as unknown as {
        gallery?: Array<{
            image?: string | null;
            alt?: string | null;
            caption?: string | null;
        }> | null;
    }).gallery;
    const [galleryIndex, setGalleryIndex] = React.useState(0);
    const galleryItems = (gallery || []).filter((item) => item?.image);
    const activeGalleryItem = galleryItems[galleryIndex];

    const startDate = post.date ? new Date(post.date) : null;
    const endDate = post.endDate ? new Date(post.endDate) : null;

    const formatDateOnly = (value: Date) => format(value, "MMM dd, yyyy");
    const formatTimeOnly = (value: Date) => format(value, "h:mm a");
    const formatDateTime = (value: Date) =>
        format(value, "MMM dd, yyyy • h:mm a");

    let formattedDate = "";
    if (startDate && !isNaN(startDate.getTime())) {
        if (endDate && !isNaN(endDate.getTime())) {
            const sameDay =
                format(startDate, "yyyy-MM-dd") ===
                format(endDate, "yyyy-MM-dd");
            formattedDate = sameDay
                ? `${formatDateOnly(startDate)} • ${formatTimeOnly(
                      startDate,
                  )} – ${formatTimeOnly(endDate)}`
                : `${formatDateOnly(startDate)} • ${formatTimeOnly(
                      startDate,
                  )} – ${formatDateOnly(endDate)} • ${formatTimeOnly(
                      endDate,
                  )}`;
        } else {
            formattedDate = formatDateTime(startDate);
        }
    }

    const titleColour =
        titleColorClasses[theme!.color! as keyof typeof titleColorClasses];

    return (
        <ErrorBoundary>
            <Section>
                <h2
                    data-tina-field={tinaField(post, "title")}
                    className={`w-full relative\tmb-8 text-6xl font-extrabold tracking-normal text-center title-font`}
                >
                    <span
                        className={`bg-clip-text text-transparent bg-linear-to-r ${titleColour}`}
                    >
                        {post.title}
                    </span>
                </h2>
                <div className="flex flex-col items-center gap-6 mb-16">
                    {(formattedDate || post.location || post.venue) && (
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                            {formattedDate && (
                                <span data-tina-field={tinaField(post, "date")}>
                                    {formattedDate}
                                </span>
                            )}
                            {post.location && (
                                <span data-tina-field={tinaField(post, "location")}>
                                    {post.location}
                                </span>
                            )}
                            {post.venue && (
                                <span data-tina-field={tinaField(post, "venue")}>
                                    {post.venue}
                                </span>
                            )}
                        </div>
                    )}
                    {post.excerpt && (
                        <div
                            data-tina-field={tinaField(post, "excerpt")}
                            className="prose dark:prose-dark text-center max-w-2xl text-muted-foreground"
                        >
                            <TinaMarkdown content={post.excerpt} />
                        </div>
                    )}
                    {post.author && (
                        <div
                            data-tina-field={tinaField(post, "author")}
                            className="flex items-center justify-center"
                        >
                            {post.author.avatar && (
                                <div className="shrink-0 mr-4">
                                    <Image
                                        data-tina-field={tinaField(
                                            post.author,
                                            "avatar"
                                        )}
                                        priority={true}
                                        className="h-14 w-14 object-cover rounded-full shadow-xs"
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        width={500}
                                        height={500}
                                    />
                                </div>
                            )}
                            <p
                                data-tina-field={tinaField(post.author, "name")}
                                className="text-base font-medium text-gray-600 group-hover:text-gray-800 dark:text-gray-200 dark:group-hover:text-white"
                            >
                                Hosted by {post.author.name}
                            </p>
                        </div>
                    )}
                    {post.ticketUrl && (
                        <a
                            href={post.ticketUrl}
                            data-tina-field={tinaField(post, "ticketUrl")}
                            className="inline-flex items-center rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
                        >
                            <span data-tina-field={tinaField(post, "ticketLabel")}>
                                {post.ticketLabel || "Get tickets"}
                            </span>
                        </a>
                    )}
                </div>
                {post.heroImg && (
                    <div className="px-4 w-full">
                        <div
                            data-tina-field={tinaField(post, "heroImg")}
                            className="relative max-w-6xl 2xl:max-w-7xl mx-auto"
                        >
                            <Image
                                priority={true}
                                src={post.heroImg}
                                alt={post.title}
                                className="absolute inset-0 block mx-auto rounded-xl w-full h-full object-cover blur-3xl brightness-150 contrast-[0.9] dark:brightness-150 saturate-200 opacity-50 dark:opacity-30 mix-blend-multiply dark:mix-blend-hard-light"
                                aria-hidden="true"
                                width={500}
                                height={500}
                            />
                            <Image
                                priority={true}
                                src={post.heroImg}
                                alt={post.title}
                                width={500}
                                height={500}
                                className="relative z-10 mb-14 mx-auto block rounded-xl w-full h-auto opacity-100"
                            />
                        </div>
                    </div>
                )}
                {gallery && gallery.length > 0 && (
                    <div
                        data-tina-field={tinaField(post, "gallery")}
                        className="mt-10 w-full"
                    >
                        {activeGalleryItem && (
                            <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
                                <div className="relative">
                                    <figure className="overflow-hidden rounded-2xl border border-border bg-card">
                                        <div className="relative aspect-video">
                                            <Image
                                                data-tina-field={tinaField(
                                                    activeGalleryItem,
                                                    "image"
                                                )}
                                                src={activeGalleryItem.image!}
                                                alt={activeGalleryItem.alt || post.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        {activeGalleryItem.caption && (
                                            <figcaption
                                                data-tina-field={tinaField(
                                                    activeGalleryItem,
                                                    "caption"
                                                )}
                                                className="px-4 py-3 text-sm text-muted-foreground"
                                            >
                                                {activeGalleryItem.caption}
                                            </figcaption>
                                        )}
                                    </figure>
                                    {galleryItems.length > 1 && (
                                        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
                                            <button
                                                type="button"
                                                aria-label="Previous image"
                                                className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-sm backdrop-blur transition hover:bg-background"
                                                onClick={() =>
                                                    setGalleryIndex((prev) =>
                                                        prev === 0
                                                            ? galleryItems.length - 1
                                                            : prev - 1
                                                    )
                                                }
                                            >
                                                ‹
                                            </button>
                                            <button
                                                type="button"
                                                aria-label="Next image"
                                                className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-sm backdrop-blur transition hover:bg-background"
                                                onClick={() =>
                                                    setGalleryIndex((prev) =>
                                                        prev ===
                                                        galleryItems.length - 1
                                                            ? 0
                                                            : prev + 1
                                                    )
                                                }
                                            >
                                                ›
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {galleryItems.length > 1 && (
                                    <div className="flex items-center justify-center gap-2">
                                        {galleryItems.map((item, index) => (
                                            <button
                                                key={`${item.image}-${index}`}
                                                type="button"
                                                aria-label={`Go to image ${index + 1}`}
                                                className={`h-2.5 w-2.5 rounded-full transition ${
                                                    index === galleryIndex
                                                        ? "bg-primary"
                                                        : "bg-muted-foreground/40"
                                                }`}
                                                onClick={() =>
                                                    setGalleryIndex(index)
                                                }
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
                <div
                    data-tina-field={tinaField(post, "_body")}
                    className="prose dark:prose-dark w-full max-w-none prose-headings:text-white prose-p:text-white prose-strong:text-white prose-ul:text-white prose-ol:text-white prose-li:text-white prose-a:text-primary prose-a:hover:text-primary/80"
                >
                    <TinaMarkdown
                        content={post._body}
                        components={{
                            ...components,
                        }}
                    />
                </div>
            </Section>
        </ErrorBoundary>
    );
}
