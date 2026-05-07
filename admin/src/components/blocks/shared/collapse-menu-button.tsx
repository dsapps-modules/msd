"use client";
import { CustomIcons } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import * as LucideIcons from "lucide-react";
import { ChevronDown, Dot } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Key, useEffect, useState } from "react";

const AllIcons = { ...LucideIcons, ...CustomIcons };
interface CollapseMenuButtonProps {
  icon: string;
  route: string;
  label: string;
  submenus: any[];
  isOpen: boolean | undefined;
  setIsLoading: any;
  search?: string;
}

export function CollapseMenuButton({
  icon,
  route,
  label,
  submenus,
  isOpen,
  search = "",
  setIsLoading,
}: CollapseMenuButtonProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    if (search) {
      const hasSearchMatch = submenus.some((submenu) =>
        submenu.perm_title?.toLowerCase().includes(search.toLowerCase())
      );
      if (hasSearchMatch) {
        setIsCollapsed(true);
        return;
      }
    }

    const hasActiveSubmenu = submenus.some(
      (submenu) => pathnameWithoutLocale === submenu.perm_name
    );

    if (hasActiveSubmenu) {
      setIsCollapsed(true);
    }
  }, [search, submenus, pathnameWithoutLocale]);

  const filteredSubmenus = search
    ? submenus.filter((submenu) =>
        submenu.perm_title?.toLowerCase().includes(search.toLowerCase())
      )
    : submenus;

  const iconName = (icon || "LayoutGrid") as keyof typeof AllIcons;
  const IconComponent = AllIcons[iconName] as
    | React.ComponentType<{ size: number }>
    | undefined;

  if (
    search &&
    filteredSubmenus.length === 0 &&
    !label.toLowerCase().includes(search.toLowerCase())
  ) {
    return null;
  }

  return isOpen ? (
    <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className="w-full"
    >
      <CollapsibleTrigger
        className="[&[data-state=open]>div>div>svg]:rotate-180 mb-1"
        asChild
      >
        <Button
          variant="label"
          className="w-full justify-start h-10 text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100 dark:hover:bg-[#2f3a5f]"
          data-testid={`collapse-button-${label
            .replace(/\s+/g, "-")
            .toLowerCase()}`}
        >
          <div className="w-full items-center flex justify-between">
            <div className="flex items-center">
              <span className="">
                {IconComponent && <IconComponent size={20} />}
              </span>
              <p
                className={cn(
                  "max-w-[150px] truncate",
                  isOpen
                    ? "translate-x-0 opacity-100 mx-4"
                    : "-translate-x-96 opacity-0"
                )}
              >
                {highlightText(label, search)}
              </p>
            </div>
            {filteredSubmenus.length > 0 && (
              <div
                className={cn(
                  "whitespace-nowrap",
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-96 opacity-0"
                )}
              >
                <ChevronDown
                  size={18}
                  className="transition-transform duration-200"
                />
              </div>
            )}
          </div>
        </Button>
      </CollapsibleTrigger>
      {filteredSubmenus.length > 0 && (
        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          {filteredSubmenus.map(
            (
              { id, perm_name, perm_title, active, options }: any,
              index: Key
            ) => {
              const isSubmenuActive = perm_name === pathnameWithoutLocale;
              return (
                <Button
                  key={index}
                  variant={isSubmenuActive ? "labelActive" : "label"}
                  className={`w-full justify-start h-10 mb-1 cursor-pointer  ${
                    isSubmenuActive
                      ? "bg-slate-200 text-slate-900 dark:bg-[#2f3a5f] dark:text-white"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-white dark:text-opacity-60 dark:hover:text-opacity-100 dark:hover:bg-[#2f3a5f]"
                  }`}
                  asChild
                  onClick={(e) => {
                    const isNewTab = e.metaKey || e.ctrlKey || e.button === 1;

                    if (!isNewTab && perm_name !== pathnameWithoutLocale) {
                      setIsLoading(true);
                    }
                  }}
                >
                  <Link
                    href={perm_name}
                    onClick={() => {
                      if (options) {
                        localStorage.setItem(
                          "selectedOptions",
                          JSON.stringify(options)
                        );
                      }
                    }}
                  >
                    <span className="mr-4 ml-2">
                      <Dot size={18} />
                    </span>
                    <p
                      className={cn(
                        "max-w-[170px] truncate ",
                        isOpen
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-96 opacity-0"
                      )}
                    >
                      {highlightText(perm_title, search)}
                    </p>
                  </Link>
                </Button>
              );
            }
          )}
        </CollapsibleContent>
      )}
    </Collapsible>
  ) : (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="label"
                className="w-full justify-start h-10 mb-1"
              >
                <div className="w-full items-center flex justify-between">
                  <div className="flex items-center">
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      {IconComponent && <IconComponent size={20} />}
                    </span>
                    <p
                      className={cn(
                        "max-w-[200px] truncate",
                        isOpen === false ? "opacity-0" : "opacity-100"
                      )}
                    >
                      {label}
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent side="right" sideOffset={25} align="start">
        <DropdownMenuLabel className="max-w-[190px] truncate">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {filteredSubmenus.map(({ perm_title, perm_name }: any, index: Key) => (
          <DropdownMenuItem key={index} asChild>
            <Link className="cursor-pointer" href={perm_name || route}>
              <p className="max-w-[180px] truncate">
                {highlightText(perm_title, search)}
              </p>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuArrow className="fill-border" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function highlightText(text: string, search: string) {
  if (!search) return text;

  const parts = text.split(new RegExp(`(${escapeRegExp(search)})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === search.toLowerCase() ? (
          <span
            key={i}
            className="bg-yellow-200 text-black dark:text-white px-1 rounded"
          >
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

// Helper function to escape special regex characters
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
