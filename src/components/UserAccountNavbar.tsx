import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import Image from "next/image";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Icons } from "./Icons";

interface UserAccountNavbarProps {
  email: string | undefined;
  name: string;
  imageUrl: string;
}
const UserAccountNavbar = ({
  email,
  imageUrl,
  name,
}: UserAccountNavbarProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visuble">
        <Button className="rounded-full h-8 w-8 aspect-square bg-slate-400">
          <Avatar className="relative w-8 h-8">
            {imageUrl ? (
              <div className="relative aspect-square h-full w-full">
                <Image
                  fill
                  src={imageUrl}
                  alt="profile picture"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <AvatarFallback>
                <span className="sr-only">{name}</span>
                <Icons.user className="h-4 w-4 text-zinc-900"/>
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default UserAccountNavbar;
