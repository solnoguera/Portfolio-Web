import Image from "next/image";
import { SectionHeading } from "../ui/SectionHeading";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-y border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1fr_280px] lg:py-28">
        <div>
          <SectionHeading id="about-title" index="04" title="About" />
          <div className="max-w-2xl space-y-5 text-lg leading-relaxed">
            <p>
              I&apos;m a full stack engineer from Buenos Aires who likes owning problems end to end: sitting with the
              client to understand what they actually need, making the architecture call, shipping it and being on the
              hook when production misbehaves.
            </p>
            <p>
              Most of my work has lived where correctness matters more than speed: payment flows that must confirm
              exactly once, compliance-bound software for public agencies and on-chain transfers with no undo. That
              taught me to design for failure first: idempotency, retries, reconciliation and good metrics.
            </p>
            <p>
              I started as a mentored junior and now mentor others through code reviews and pairing. I care about
              accessible, well-tested interfaces as much as the backend behind them. I&apos;ve worked in English with
              U.S. teams for 2+ years and I&apos;m finishing my University Technical Degree in Programming at UNAHUR
              (Dec 2026).
            </p>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[280px] self-start md:mt-20">
          <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 border-2 border-accent-2" />
          <Image
            src="/images/profile.webp"
            alt="Portrait of Sol Noguera"
            width={640}
            height={785}
            loading="lazy"
            sizes="280px"
            className="relative w-full border-2 border-fg"
          />
        </div>
      </div>
    </section>
  );
}
