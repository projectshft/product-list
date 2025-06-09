import type { ReactNode } from "react"
import { SearchInput } from "@components/navbar/components"
import { NavbarLogo } from "@components/navbar/components"
import { DarkThemeToggle } from "flowbite-react"

export const Navbar = (): ReactNode => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b-1">
      <div className="flex flex-row items-center justify-between p-5">
        <NavbarLogo />

        {/* Screen sizes > medium - Search / Toggle Layout */}
        <div className="hidden md:block">
          <SearchInput />
        </div>
        <DarkThemeToggle />
      </div>
      {/* Mobile Search Input */}
      <div className="w-full px-5 pb-5 md:pb-0 md:hidden">
        <SearchInput />
      </div>
    </nav>
  )
}
