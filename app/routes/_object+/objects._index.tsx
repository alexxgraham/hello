import { Link } from "@remix-run/react";

export default function ObjectsIndexPage() {
  return (
    <p className="text-sm p-4">
      No object selected.
      <br />
      Please select on the left, or{" "}
      <Link to="/new/object" className="text-zinc-500 underline">
        create one here.
      </Link>
    </p>
  );
}
