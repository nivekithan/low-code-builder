import type { ClientApiRequestMethod } from "common/types";

export function getUniqueRouteDefinationName({
  method,
  route,
}: {
  route: string;
  method: ClientApiRequestMethod;
}) {
  return `${method}_${route.toLocaleUpperCase()}`;
}
