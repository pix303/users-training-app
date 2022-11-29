'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavTabLink({ label, path }: { label: string, path: string }) {
    const baseClass = "tab tab-lifted";
    const pathname = usePathname();


    return (
        <Link href={path} className={pathname?.endsWith(path) ? "tab-active " + baseClass : baseClass} >
            {label}
        </Link>
    );
}