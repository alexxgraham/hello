import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";

import { collectUserObjects } from "~/models/user.server";
import { getUserId } from "~/session.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const userId = await getUserId(request);
  const { objectId } = params;
  if (!objectId) {
    return redirect("/objects");
  }
  if (userId) {
    return {
      mode: "Object Mode",
      object: await collectUserObjects(userId).then((res) =>
        res.find((o) => o.id === objectId),
      ),
    };
  }
  return redirect("/objects");
}

export default function PersonalObject() {
  const { mode, object } = useLoaderData<typeof loader>();
  return (
    <article className="h-full flex flex-col gap-4 p-4 justify-between">
      <table className="border text-sm">
        <thead className="border-b bg-zinc-100 flex">
          <th className="font-medium w-40 border-r">{mode}</th>
          <th className="font-medium px-2">Value Assignment</th>
        </thead>
        <tbody>
          <tr className="border-b flex">
            <td className="border-r w-40 text-center">Access</td>
            <td className="px-2 text-zinc-500">{`${object?.relation?.access}`}</td>
          </tr>
          <tr className="border-b flex">
            <td className="border-r w-40 text-center">Body</td>
            <td className="px-2 text-zinc-500">
              {object?.relation?.body?.data}
            </td>
          </tr>
          <tr className="border-b flex">
            <td className="border-r w-40 text-center">Count</td>
            <td className="px-2 text-zinc-500">{object?.relation?.count}</td>
          </tr>
          <tr className="border-b flex">
            <td className="border-r w-40 text-center">DateTime</td>
            <td className="px-2 text-zinc-500">
              {object?.relation?.timeSet?.time}{" "}
              {object?.relation?.timeSet?.zone}
            </td>
          </tr>
          <tr className="border-b flex">
            <td className="border-r w-40 text-center">Images</td>
            <td className="px-2 text-zinc-500">
              {object?.relation?.images && object.relation.images.length > 0
                ? object.relation.images.length
                : ""}
            </td>
          </tr>
          <tr className="border-b flex">
            <td className="border-r w-40 text-center">Level</td>
            <td className="px-2 text-zinc-500">{object?.relation?.level}</td>
          </tr>
          <tr className="border-b flex">
            <td className="border-r w-40 text-center">Locale</td>
            <td className="px-2 text-zinc-500">{object?.relation?.locale}</td>
          </tr>
          <tr className="flex">
            <td className="border-r w-40 text-center">Tables</td>
            <td className="px-2 text-zinc-500"></td>
          </tr>
        </tbody>
      </table>
      <span className="flex justify-center items-center gap-5 self-center h-16 w-1/2 bg-zinc-200 rounded-lg">
        <nav className="w-9 h-9 rounded-md bg-[#b2b2b5]">
          <button className="grid place-items-center w-full h-full">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              className="text-zinc-700"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.5 5.00006C3.22386 5.00006 3 5.22392 3 5.50006L3 11.5001C3 11.7762 3.22386 12.0001 3.5 12.0001L11.5 12.0001C11.7761 12.0001 12 11.7762 12 11.5001L12 5.50006C12 5.22392 11.7761 5.00006 11.5 5.00006L10.25 5.00006C9.97386 5.00006 9.75 4.7762 9.75 4.50006C9.75 4.22392 9.97386 4.00006 10.25 4.00006L11.5 4.00006C12.3284 4.00006 13 4.67163 13 5.50006L13 11.5001C13 12.3285 12.3284 13.0001 11.5 13.0001L3.5 13.0001C2.67157 13.0001 2 12.3285 2 11.5001L2 5.50006C2 4.67163 2.67157 4.00006 3.5 4.00006L4.75 4.00006C5.02614 4.00006 5.25 4.22392 5.25 4.50006C5.25 4.7762 5.02614 5.00006 4.75 5.00006L3.5 5.00006ZM7 1.6364L5.5682 3.0682C5.39246 3.24393 5.10754 3.24393 4.9318 3.0682C4.75607 2.89246 4.75607 2.60754 4.9318 2.4318L7.1818 0.181802C7.26619 0.09741 7.38065 0.049999 7.5 0.049999C7.61935 0.049999 7.73381 0.09741 7.8182 0.181802L10.0682 2.4318C10.2439 2.60754 10.2439 2.89246 10.0682 3.0682C9.89246 3.24393 9.60754 3.24393 9.4318 3.0682L8 1.6364L8 8.5C8 8.77614 7.77614 9 7.5 9C7.22386 9 7 8.77614 7 8.5L7 1.6364Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </nav>
        <nav className="w-9 h-9 rounded-md bg-[#b2b2b5]">
          <button className="grid place-items-center w-full h-full">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              className="text-zinc-700"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1464 1.14645C12.3417 0.951184 12.6583 0.951184 12.8535 1.14645L14.8535 3.14645C15.0488 3.34171 15.0488 3.65829 14.8535 3.85355L10.9109 7.79618C10.8349 7.87218 10.7471 7.93543 10.651 7.9835L6.72359 9.94721C6.53109 10.0435 6.29861 10.0057 6.14643 9.85355C5.99425 9.70137 5.95652 9.46889 6.05277 9.27639L8.01648 5.34897C8.06455 5.25283 8.1278 5.16507 8.2038 5.08907L12.1464 1.14645ZM12.5 2.20711L8.91091 5.79618L7.87266 7.87267L8.12731 8.12732L10.2038 7.08907L13.7929 3.5L12.5 2.20711ZM9.99998 2L8.99998 3H4.9C4.47171 3 4.18056 3.00039 3.95552 3.01877C3.73631 3.03668 3.62421 3.06915 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3.06915 3.62421 3.03669 3.73631 3.01878 3.95552C3.00039 4.18056 3 4.47171 3 4.9V11.1C3 11.5283 3.00039 11.8194 3.01878 12.0445C3.03669 12.2637 3.06915 12.3758 3.10899 12.454C3.20487 12.6422 3.35785 12.7951 3.54601 12.891C3.62421 12.9309 3.73631 12.9633 3.95552 12.9812C4.18056 12.9996 4.47171 13 4.9 13H11.1C11.5283 13 11.8194 12.9996 12.0445 12.9812C12.2637 12.9633 12.3758 12.9309 12.454 12.891C12.6422 12.7951 12.7951 12.6422 12.891 12.454C12.9309 12.3758 12.9633 12.2637 12.9812 12.0445C12.9996 11.8194 13 11.5283 13 11.1V6.99998L14 5.99998V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H4.9H4.87934C4.47686 14 4.14468 14 3.87409 13.9779C3.59304 13.9549 3.33469 13.9057 3.09202 13.782C2.7157 13.5903 2.40973 13.2843 2.21799 12.908C2.09434 12.6653 2.04506 12.407 2.0221 12.1259C1.99999 11.8553 1.99999 11.5231 2 11.1207V11.1206V11.1V4.9V4.87935V4.87932V4.87931C1.99999 4.47685 1.99999 4.14468 2.0221 3.87409C2.04506 3.59304 2.09434 3.33469 2.21799 3.09202C2.40973 2.71569 2.7157 2.40973 3.09202 2.21799C3.33469 2.09434 3.59304 2.04506 3.87409 2.0221C4.14468 1.99999 4.47685 1.99999 4.87932 2H4.87935H4.9H9.99998Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </nav>
        <nav className="w-9 h-9 rounded-md bg-[#db1111c9]">
          <button className="grid place-items-center w-full h-full">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              className="text-zinc-100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </nav>
      </span>
    </article>
  );
}
