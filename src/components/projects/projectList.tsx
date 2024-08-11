import { ProjectLists } from "!/lib/models/projects";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import { Link } from "@tanstack/react-router";

export function ProjectList({ projectLists }: { projectLists: ProjectLists }) {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projectLists.map((project) => (
        <li
          key={project.id}
          className="col-span-1 divide-y rounded-lg bg-background shadow text-card-foreground border"
        >
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium">{project.name}</h3>
              </div>
              <p className="mt-1 truncate text-sm text-muted-foreground">
                {project.path}
              </p>
            </div>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-border">
              <div className="flex w-0 flex-1">
                <Link
                  to={`/projects/${project.id}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold"
                >
                  <ArrowUpRightIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                  View project
                </Link>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
