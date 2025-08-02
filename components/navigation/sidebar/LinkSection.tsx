import { LinkModel } from "@/components/navigation/sidebar/SideBar";
import { CustomToolTip } from "@/components/tooltip/CustomTooltip";
import { PRIMARY_COLOR } from "@/core/theme/app_colors";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { Badge, Divider, Spacer } from "@heroui/react";
import clsx from "clsx";
import Link from "next/link";

interface Props {
  pathname: string;
  finalLinks: LinkModel[];
  isCollapsed: boolean;
  openSublinks: { [name: string]: boolean };
  changeOpenSublink: (val: { [name: string]: boolean }) => void;
}

export function LinkSection({
  pathname,
  finalLinks,
  isCollapsed,
  openSublinks,
  changeOpenSublink,
}: Props) {
  return (
    <div className="flex w-full flex-col">
      {finalLinks.map((link, index) => {
        const hasSublinks = !!link.links?.length;
        const isActive =
          hasSublinks && link.links!.some((s) => pathname === s.href);
        
        const currentLink = link.href && 
          (link.exact ? pathname === link.href : pathname.includes(link.href));
          
        const hasNotification =
          hasSublinks && link.links!.some((s) => s.notification);
        const isOpen = hasSublinks && openSublinks[link.name];

        return (
          <div key={index}>
            {link.topContent ?? <label className="font-roboto">{link.topContent}</label>}
            <div
              className="flex w-full items-center cursor-pointer"
              onClick={() =>
                hasSublinks &&
                changeOpenSublink({
                  ...openSublinks,
                  [link.name]: !openSublinks[link.name],
                })
              }
            >
              <Divider
                style={{
                  width: 4,
                  height: 20,
                  borderRadius: 50,
                  background:
                    isActive || currentLink ? PRIMARY_COLOR : "transparent",
                }}
                orientation="vertical"
              />
              <Spacer />
              {hasSublinks ? (
                <div
                  className={clsx(
                    "my-0.5 flex w-full items-center justify-start rounded-lg px-1 py-2 text-medium hover:bg-default-100",
                    isActive || currentLink ? "bg-default-100" : ""
                  )}
                >
                  {link.icon}
                  <Spacer />
                  {!isCollapsed && (
                    <div className="flex w-full items-center justify-between">
                      <p>{link.name}</p>
                      {isOpen ? (
                        <ChevronUpIcon className="w-3 h-3" />
                      ) : (
                        <ChevronDownIcon className="w-3 h-3" />
                      )}
                      {hasNotification && (
                        <Badge
                          content="!"
                          color="danger"
                          placement="bottom-right"
                        >
                          <span />
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.href || "#"}
                  className={clsx(
                    "my-0.5 flex w-full items-center justify-start rounded-lg px-1 py-2 text-medium hover:bg-default-100",
                    currentLink ? "bg-default-100" : ""
                  )}
                >
                  {link.icon}
                  <Spacer />
                  {!isCollapsed && (
                    <div className="flex w-full items-center justify-between">
                      <p>{link.name}</p>
                      {hasNotification && (
                        <Badge
                          content="!"
                          color="danger"
                          placement="bottom-right"
                        >
                          <span />
                        </Badge>
                      )}
                    </div>
                  )}
                </Link>
              )}
            </div>

            {hasSublinks && isOpen && !isCollapsed && (
              <div className="ml-6 mt-1 flex flex-col gap-1">
                {link.links!.map((sublink, subIndex) => (
                  <Link
                    key={subIndex}
                    href={sublink.href ?? "#"}
                    className={clsx(
                      "flex items-center rounded px-2 py-1 text-sm hover:bg-default-100",
                      pathname === sublink.href
                        ? "font-semibold text-primary"
                        : "text-foreground"
                    )}
                  >
                    {sublink.icon && (
                      <>
                        {sublink.icon}
                        <Spacer x={1} />
                      </>
                    )}
                    <span>{sublink.name}</span>
                    {sublink.notification && sublink.info && (
                      <CustomToolTip info={sublink.info}>
                        <Badge
                          content="!"
                          color="danger"
                          placement="bottom-right"
                        >
                          <span />
                        </Badge>
                      </CustomToolTip>
                    )}
                  </Link>
                ))}
              </div>
            )}

            <Spacer />
          </div>
        );
      })}
    </div>
  );
}