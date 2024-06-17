import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";

import { collectUniqueObject } from "~/models/user.server";
import { getUserId } from "~/session.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);
  const { objectMode, objectId } = params;
  if (!objectId) {
    return redirect("/objects");
  }
  if (userId) {
    switch (objectMode) {
      case "access":
        return {
          mode: "Access",
          object: await collectUniqueObject(objectId).then(
            (res) => `${res?.relation?.access}`,
          ),
        };
      case "body":
        return {
          mode: "Body",
          object: await collectUniqueObject(objectId).then(
            (res) => res?.relation?.body?.byteLength,
          ),
        };
      case "count":
        return {
          mode: "Count",
          object: await collectUniqueObject(objectId).then(
            (res) => res?.relation?.count,
          ),
        };
      case "images":
        return {
          mode: "Images",
          object: await collectUniqueObject(objectId).then(
            (res) => res?.relation?.images.length,
          ),
        };
      case "level":
        return {
          mode: "Level",
          object: await collectUniqueObject(objectId).then(
            (res) => res?.relation?.level,
          ),
        };
      case "locale":
        return {
          mode: "Locale",
          object: await collectUniqueObject(objectId).then(
            (res) => res?.relation?.locale,
          ),
        };
      case "time-set":
        return {
          mode: "DateTime",
          object: await collectUniqueObject(objectId).then(
            (res) => res?.relation?.timeSet?.time,
          ),
        };
      default:
        return redirect("/objects");
    }
  }
}

export default function LocaleObject() {
  const { mode, object } = useLoaderData<typeof loader>();
  return (
    <article className="p-4">
      <p className="flex gap-2 items-center">
        {mode} Object:
        <span className="rounded-md bg-[#00000015] flex-1 px-2 text-zinc-500 text-sm py-0.5">
          {object}
        </span>
      </p>
    </article>
  );
}
