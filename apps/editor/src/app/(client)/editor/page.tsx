"use client";

import Link from "next/link";

const Page = () => {
  return (
    <>
      {routeList().map((item) => {
        return (
          <Link key={item.route} href={item.route}>
            {item.title}
          </Link>
        );
      })}
    </>
  );
};
function routeList() {
  return [
    {
      title: "Basic",
      description: "",
      route: "/editor/basic",
    },
    {
      title: "Normal",
      description: "",
      route: "/editor/normal",
    },
    {
      title: "Advanced",
      description: "",
      route: "/editor/advanced",
    },
  ];
}
export default Page;
