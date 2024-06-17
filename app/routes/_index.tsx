import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => [{ title: "Aode | Home" }];

export default function Index() {
  return (
    <main className="grid h-full">
      <h1 className="self-center text-center text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-6xl">
        <span className="block uppercase text-red drop-shadow-md">
          Alex Graham
        </span>
      </h1>
    </main>
  );
}
