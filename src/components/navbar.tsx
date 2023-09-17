import React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <div className=" flex justify-between p-4 border-b-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                sed tenetur porro nulla voluptates. Suscipit modi magnam velit.
                Nesciunt culpa a adipisci ipsa? Iusto nisi, ratione dolores
                suscipit aut eum sint a tenetur. Animi.
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
                sed tenetur porro nulla voluptates. Suscipit modi magnam velit.
                Nesciunt culpa a adipisci ipsa? Iusto nisi, ratione dolores
                suscipit aut eum sint a tenetur. Animi.
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div>
        <Button>Log out</Button>
      </div>
    </div>
    // <nav>

    // </nav>
  );
};

export default NavBar;
