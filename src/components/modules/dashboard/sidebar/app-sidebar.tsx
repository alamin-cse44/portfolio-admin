"use client";

import * as React from "react";
import { BookDown, ListCollapse, SquareTerminal, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
// import Logo from "@/app/assets/svgs/Logo";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/profile",
        icon: SquareTerminal,
        isActive: true,
      },
      {
        title: "Users",
        url: "/admin/users",
        icon: Users,
        isActive: true,
      },
      {
        title: "Projects",
        url: "/admin/projects",
        icon: BookDown,
        isActive: true,
      },
      {
        title: "Skills",
        url: "/admin/skills",
        icon: BookDown,
        isActive: true,
      },
      // {
      //   title: "Shop",
      //   url: "/user/shop/all-products",
      //   icon: Bot,
      //   items: [
      //     {
      //       title: "Manage Products",
      //       url: "/user/shop/all-products",
      //     },
      //     {
      //       title: "Manage Categories",
      //       url: "/user/shop/category",
      //     },
      //     {
      //       title: "Manage Brands",
      //       url: "/user/shop/brand",
      //     },
      //   ],
      // },
    ],
    

    navUser: [
      {
        title: "Dashboard",
        url: "/profile",
        icon: SquareTerminal,
        isActive: true,
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center">
                  {/* <Logo /> */}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <h2 className="font-bold text-xl">My Portfolio</h2>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {user?.userRole === "admin" && <NavMain items={data.navMain} />}
        {user?.userRole === "user" && <NavMain items={data.navUser} />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
