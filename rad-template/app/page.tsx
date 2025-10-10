'use client';

export default function Home() {
    return (
        <div className="flex grow items-center justify-center font-sans dark:bg-black">
            <main className="flex w-full max-w-3xl flex-col items-center justify-between bg-white px-16 py-32 sm:items-start dark:bg-black">
                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h1 className="max-w-xs text-3xl leading-10 font-semibold tracking-tight text-black dark:text-zinc-50">
                        To get started, edit the page.tsx file.
                    </h1>
                </div>
                <div className="mt-6 flex flex-col gap-4 text-base font-medium sm:flex-row">
                    <a
                        className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] md:w-[158px] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Documentation
                    </a>
                </div>
            </main>
        </div>
    );
}
