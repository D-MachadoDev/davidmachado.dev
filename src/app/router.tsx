import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

export type Route =
  | { name: "home" }
  | { name: "projects" }
  | { name: "project"; id: string }
  | { name: "gallery" }
  | { name: "about" }
  | { name: "notFound" };

const PROJECT_PATH = /^\/projects\/([^/]+)$/;

export function parseRoute(pathname: string): Route {
  const path = pathname.replace(/\/+$/, "") || "/";

  if (path === "/") return { name: "home" };
  if (path === "/projects") return { name: "projects" };
  if (path === "/gallery") return { name: "gallery" };
  if (path === "/about") return { name: "about" };

  const project = PROJECT_PATH.exec(path);
  if (project) {
    try {
      return { name: "project", id: decodeURIComponent(project[1]) };
    } catch {
      return { name: "notFound" };
    }
  }

  return { name: "notFound" };
}

export function routeKey(route: Route): string {
  return route.name === "project" ? `project:${route.id}` : route.name;
}

interface RouterValue {
  route: Route;
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterValue | null>(null);

function currentPath(): string {
  return typeof window === "undefined" ? "/" : window.location.pathname;
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const onPopState = () => setPath(currentPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = useCallback((to: string) => {
    if (to === window.location.pathname + window.location.search) return;
    window.history.pushState({}, "", to);
    setPath(to);
    window.scrollTo(0, 0);
  }, []);

  const value = useMemo<RouterValue>(
    () => ({ route: parseRoute(path), path, navigate }),
    [path, navigate],
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter(): RouterValue {
  const value = useContext(RouterContext);
  if (!value) {
    throw new Error("useRouter must be used inside RouterProvider");
  }
  return value;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

export function Link({ href, onClick, children, ...rest }: LinkProps) {
  const { navigate } = useRouter();
  const internal = href.startsWith("/") && !href.startsWith("//");

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (!internal || event.defaultPrevented) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (event.currentTarget.target && event.currentTarget.target !== "_self") return;
    if (event.currentTarget.hasAttribute("download")) return;
    event.preventDefault();
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
