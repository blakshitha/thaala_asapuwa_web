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
                            className="relative max-w-4xl lg:max-w-5xl mx-auto"
                        >
                            <Image
                                priority={true}
                                src={post.heroImg}
                                alt={post.title}
                                className="absolute block mx-auto rounded-lg w-full h-auto blur-2xl brightness-150 contrast-[0.9] dark:brightness-150 saturate-200 opacity-50 dark:opacity-30 mix-blend-multiply dark:mix-blend-hard-light"
                                aria-hidden="true"
                                width={500}
                                height={500}
                                style={{ maxHeight: "25vh" }}
                            />
                            <Image
                                priority={true}
                                src={post.heroImg}
                                alt={post.title}
                                width={500}
                                height={500}
                                className="relative z-10 mb-14 mx-auto block rounded-lg w-full h-auto opacity-100"
                                style={{ maxWidth: "25vh" }}
                            />
                        </div>
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
