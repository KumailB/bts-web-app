import { useRouter } from "next/router"

/**
 * Component properties for a EventDetailsBlock.
 */
interface SiteHeaderProps {
  name: string;
}

export default function SiteHeader({ name }: SiteHeaderProps) {

  const router = useRouter()
  const logout = async () => {
    router.push("/");
  }

  return (
    <div className="flex h-16 px-24 py-10 bg-blue-700 justify-between gap-4 filter drop-shadow-2xl">
      <div className="flex items-center justify-center gap-4">
        <img src="/logo.svg" className="h-16" />
        <h1 className="text-6xl italic font-semibold tracking-wide">BTS</h1>
      </div>
      <div className="flex items-center justify-center gap-24">
        <h2 className="text-3xl italic font-semibold tracking-wide">
          Hi, {name}!
        </h2>
        <button
          type="button"
          onClick={logout}
          className="transition duration-400 ease-in-out bg-yellow-500 hover:bg-red-500 rounded-full text-white font-semibold"
        >
          <div className="py-2 px-4 text-xl">Log Out</div>
        </button>
      </div>
    </div>
  );
}
