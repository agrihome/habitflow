"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAppSelector } from "@/redux/hooks";

export default function Header() {
  const header = useAppSelector((state) => state.header);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {header.map((item, idx) => {
              const isLast = idx === header.length - 1;
              return (
                <div key={idx} className="flex items-center">
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>
                        {item[0].toUpperCase() + item.slice(1)}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={`/{item}`}>
                        {item[0].toUpperCase() + item.slice(1)}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
