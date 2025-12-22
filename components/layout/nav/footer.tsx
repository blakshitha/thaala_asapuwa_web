"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";

export const Footer = () => {
    const { globalSettings } = useLayout();
    const { header, footer } = globalSettings!;

    return (
        <footer className="border-t bg-black pt-12 pb-8">
            <div className="mx-auto max-w-5xl px-6">
                <div className="flex flex-wrap items-center gap-6 flex-col md:flex-row md:justify-between">
                    <div className="order-last flex items-center justify-center md:order-first md:justify-start">
                        <Link
                            href="/"
                            aria-label="go home"
                            className="flex items-center gap-3"
                        >
                            {header?.logo ? (
                                <Image
                                    src={header.logo}
                                    alt={header?.name || "Logo"}
                                    width={180}
                                    height={54}
                                    className="h-12 w-auto"
                                />
                            ) : (
                                <Icon
                                    parentColor={header!.color!}
                                    data={{
                                        name: header!.icon?.name || "",
                                        color: header!.icon?.color || undefined,
                                        style: header!.icon?.style || undefined,
                                    }}
                                />
                            )}
                        </Link>
                        <span className="self-center text-zinc-400 text-sm ml-4">
                            © {new Date().getFullYear()} {header?.name}, All
                            rights reserved
                        </span>
                    </div>

                    <div className="order-first flex justify-center gap-6 text-sm md:order-last md:justify-end">
                        {footer?.social?.map((link, index) => {
                            if (!link) return null;
                            return (
                                <Link
                                    key={`${link.icon}${index}`}
                                    href={link.url || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon
                                        data={{
                                            name: link.icon?.name || "",
                                            color:
                                                link.icon?.color || undefined,
                                            style:
                                                link.icon?.style || undefined,
                                            size: "small",
                                        }}
                                        className="text-muted-foreground hover:text-primary block"
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </footer>
    );
};
