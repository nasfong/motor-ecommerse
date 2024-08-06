import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Package2 } from "lucide-react"
import { Link } from '@/navigation';

type RightClickLoginProps = {
  isAuth: boolean
  onLogout: () => void
}

export function RightClickLogin({
  isAuth, onLogout
}: RightClickLoginProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        {!isAuth ? (
          <Link
            href="/login"
          >
            <ContextMenuItem inset>
              Login
            </ContextMenuItem>
          </Link>
        ) : (
          <ContextMenuItem inset onClick={onLogout}>
            Logout
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu >
  )
}
