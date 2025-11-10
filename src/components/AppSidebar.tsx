"use client";

import {
  Calendar,
  FastForward,
  File,
  Heart,
  Phone,
  Power,
  Search,
  Users,
} from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  Sidebar,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "./ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const items = [
  {
    title: "Causes",
    url: "/dashboard",
    icon: Heart,
  },
  {
    title: "Contact",
    url: "/dashboard/contact",
    icon: Phone,
  },
];

function AppSidebar() {
  const currentPath = usePathname();
  const router = useRouter();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link
          href="/"
          className="text-xl font-bold flex items-center gap-2 mb-4"
        >
          <Image src="/logo.png" alt="Charitia Logo" width={40} height={40} />{" "}
          ORS FOUNDATION
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-0 m-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = currentPath === item.url;
                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={`${
                      isActive
                        ? "border-l-4 border-sidebar-accent-foreground"
                        : "ml-1"
                    }`}
                  >
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                variant={"ghost"}
                className="text-destructive"
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("/login");
                }}
              >
                <Power />
                <span>Log Out</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
