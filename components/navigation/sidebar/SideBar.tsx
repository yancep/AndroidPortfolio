// import { Card, Spacer } from "@heroui/react";
// import { usePathname } from "next/navigation";
// import { ReactNode, useState } from "react";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// import { ScrollableContent } from "../../scroll/ScrolleableContent";
// import AltGapidLogo from "../../Icons/app/alt/AltGapidLogo";
// import { LinkSection } from "./LinkSection";

// export type LinkModel = {
//   name: string;
//   href?: string;
//   icon?: ReactNode;
//   topContent?: string;
//   links?: LinkModel[];
//   notification?: boolean;
//   info?: string;
//   exact?: boolean;
// };

// export const SideBar = ({
//   baseLinks,
//   configLinks,
//   children,
// }: {
//   headerChildren?: ReactNode;
//   children: ReactNode;
//   baseLinks: LinkModel[];
//   configLinks?: LinkModel[];
//   servicesLinks?: LinkModel[];
//   backRoute?: string;
//   configRoute?: string;
// }) => {
//   const [subLinkOpen, changeSubLinkOpen] = useState<{ [name: string]: boolean }>(
//     () => {
//       const init: { [name: string]: boolean } = {};
//       [...baseLinks, ...(configLinks || [])].forEach((link) => {
//         if (link.links && link.links.length > 0) {
//           init[link.name] = false;
//         }
//       });
//       return init;
//     }
//   );
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const toggleSideBarButton = () => setSidebarOpen(!isSidebarOpen);
//   const pathname = usePathname();
//   const isConfigRoute = pathname.includes("configuraciones");
//   const finalLinks = isConfigRoute ? configLinks : baseLinks;

//   return (
//     <section className="flex h-full w-full fixed">
//       <div className="relative h-full">
//         <Card
//           className="absolute right-0 top-20 z-10 flex h-7 w-7 translate-x-[50%] cursor-pointer items-center
//            justify-center rounded-[30%] bg-default-50 text-[1.1rem] focus:ring-slate-400"
//           isPressable
//           onPress={toggleSideBarButton}
//         >
//           {isSidebarOpen ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
//         </Card>
//         <Card
//           className="sidebar rounded-[0px] flex flex-col h-full border-r-1 border-divider"
//           data-collapse={isSidebarOpen}
//           shadow="none"
//         >
//           {(pathname.includes("entidad") || pathname.includes("plan")) && (
//             <div>
//               <div
//                 className={`flex flex-row justify-center items-center mt-4 mb-3 transition-all duration-300 ${isSidebarOpen ? "ml-4" : ""}`}
//               >
//                 <AltGapidLogo />
//                 <Spacer />
//                 <span
//                   className={`text-[1em] font-semibold text-inherit transition-all duration-300 ${
//                     isSidebarOpen ? "opacity-0 w-0" : "opacity-100 w-auto"
//                   } overflow-hidden whitespace-nowrap`}
//                 >
//                   Plan de la Ciencia
//                 </span>
//               </div>
//             </div>
//           )}

//           <div className="flex flex-col h-[calc(100%-60px)]">
//             <ScrollableContent isCollapsed={isSidebarOpen} >
//               <div className="flex flex-col p-2 gap-4">
//                 {finalLinks && (
//                   <LinkSection
//                     finalLinks={finalLinks}
//                     pathname={pathname}
//                     isCollapsed={isSidebarOpen}
//                     openSublinks={subLinkOpen!}
//                     changeOpenSublink={changeSubLinkOpen!}
//                   />
//                 )}
//               </div>
//             </ScrollableContent>
//           </div>
//         </Card>
//       </div>
//       {children}
//     </section>
//   );
// };
