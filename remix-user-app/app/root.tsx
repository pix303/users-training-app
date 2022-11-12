import { json } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import Header from "./components/header";

import styles from "./styles/app.css"
import { getEnv } from "./model/env.server";
import type { ENV } from "./model/env.server";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export async function loader() {
  return json({
    ENV: getEnv()
  });
}

declare global {
  interface Window {
    ENV: ENV
  }
}


export default function App() {
  const data = useLoaderData();
  return (
    <html lang="en" data-theme="winter">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <main className="mx-20">
          <Outlet />
        </main>
        <script dangerouslySetInnerHTML={{
          __html: `window.ENV= ${JSON.stringify(data.ENV)}`
        }} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
