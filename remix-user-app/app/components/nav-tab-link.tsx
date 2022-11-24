import { NavLink } from "@remix-run/react";

export default function NavTabLink({ label, path }: { label: string, path: string }) {
    const baseClass = "tab tab-lifted";
    return (
        <NavLink prefetch="none" to={path} className={({ isActive }) => isActive ? baseClass + ' tab-active' : baseClass}>{label}</NavLink>
    );
}