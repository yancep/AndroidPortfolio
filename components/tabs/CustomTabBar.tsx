"use client";
import { useState } from "react";
import { Spacer, Tab, Tabs } from "@heroui/react";

export type TabProps = {
  icon: React.ReactNode;
  label?: string;
  content: React.ReactNode;
  key: string;
};

export function CustomTabBar({
  tabs,
  className,
  rightContent,
  noneRightContent = <div></div>,
  keyRightContent = [],
}: {
  tabs: TabProps[];
  className?: string;
  rightContent?: React.ReactNode;
  noneRightContent?: React.ReactNode;
  keyRightContent?: string[];
}) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].key);

  const shouldShowRightContent = keyRightContent.includes(activeTab);

  return (
    <div className={className ?? "w-full flex flex-col"}>
      <div className="w-full flex justify-between items-center px-6 mt-2 ">
        <div className="flex space-x-4">
          <Tabs
            size="md"
            aria-label="Dynamic tabs"
            items={tabs}
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key!.toString())}
          >
            {(item) => (
              <Tab
                key={item.key}
                title={
                  <div className="flex items-center space-x-2">
                    {item.icon}
                    {item.label && (
                      <>
                        <Spacer x={2} />
                        <span>{item.label}</span>
                      </>
                    )}
                  </div>
                }
              />
            )}
          </Tabs>
        </div>
        {shouldShowRightContent ? <div>{rightContent}</div> : noneRightContent}
      </div>
      <div className="w-full py-3 px-6">{tabs.find((tab) => tab.key === activeTab)?.content}</div>
    </div>
  );
}