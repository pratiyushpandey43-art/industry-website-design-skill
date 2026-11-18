import { ArrowUpRight } from "@/components/icons";
import type { Category } from "@/lib/catalog";

export function CategoryCard({
  category,
  image,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}: {
  category: Category;
  image?: { src: string; alt: string };
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <a
      href={category.href}
      className={`group relative isolate flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[4px] bg-ink-deep p-5 text-white shadow-card transition-shadow duration-300 hover:shadow-lift focus-visible:outline-offset-4 sm:min-h-[340px] sm:p-6 ${className}`}
    >
      <div className="media-zoom absolute inset-0 -z-10">
        <img
          src={(image ?? category.heroImage).src}
          alt={(image ?? category.heroImage).alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className="h-full w-full object-cover"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/5 transition-opacity duration-300 group-hover:from-ink group-hover:via-ink/65"
      />
      <div className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition duration-300 group-hover:border-accent group-hover:bg-accent">
        <ArrowUpRight className="h-4 w-4" />
      </div>
      <div className="mb-auto flex items-center gap-2 text-[0.625rem] font-bold tracking-[0.2em] text-white/70 uppercase">
        <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
        Category {category.index}
      </div>
      <h3 className="mt-16 font-display text-[1.375rem] leading-tight font-extrabold text-white sm:text-[1.5rem]">
        {category.fullLabel}
      </h3>
      <p className="mt-2 line-clamp-2 max-w-sm text-[0.875rem] leading-relaxed text-white/70">
        {category.overviewCopy[0]}
      </p>
      <span className="mt-4 inline-flex items-center gap-2 text-[0.6875rem] font-bold tracking-[0.14em] text-white uppercase">
        Explore
        <ArrowUpRight className="h-3.5 w-3.5 text-accent transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </a>
  );
}
