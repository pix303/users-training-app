export default function UserDetailLayout({ children }: { children: React.ReactNode }) {
    return <div>
        <h1>User detail layout wrapper</h1>
        <div className="border-red-600 border-2 px-5">{children}</div>
    </div>
} 