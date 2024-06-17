import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { collectUserObjects } from "~/models/user.server";
import { getUserId } from "~/session.server";
import { useUser } from "~/utils";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);
  if (userId) {
    const objects = await collectUserObjects(userId);
    return { objects };
  }
}

export default function Object() {
  const user = useUser();
  const { objects } = useLoaderData<typeof loader>();
  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center bg-zinc-100 py-2 px-4">
        <h1>
          <Link to=".">Objects</Link>
        </h1>
      </header>
      <hr />
      <main className="flex h-full bg-zinc-50">
        <div className="h-full w-64 border-r bg-zinc-100">
          <nav className="p-4 underline text-zinc-600 text-xs flex gap-2">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            {user.email}
          </nav>
          <hr />
          <ol className="p-4 flex flex-col gap-2">
            {objects.length > 0
              ? objects.map((o, i) => {
                  let backgroundDot = "bg-zinc-500 ";
                  if (o.relation) {
                    const ListItemClass =
                      "flex items-center justify-between rounded-md hover:bg-[#00000015] py-2 px-3";
                    backgroundDot = "bg-red-500 ";
                    return (
                      <Link
                        to={`/object/${o.id}`}
                        key={i}
                        className={ListItemClass}
                      >
                        <section className="flex gap-2 items-center">
                          <span
                            className={
                              backgroundDot +
                              "inline-block rounded-full w-1.5 h-1.5"
                            }
                          />
                          <p className="leading-none align-middle text-sm">
                            {o.stem},{" "}
                            <span className="text-zinc-500">{o.nature}</span>
                          </p>
                        </section>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Link>
                    );
                  }
                })
              : null}
          </ol>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
