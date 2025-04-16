import React from "react";
import {
  FileText,
  Briefcase,
  TrendingUp,
  Eye,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

const quickLinks = [
  {
    title: "New Project",
    color: {
      main: "bg-blue-100",
      text: "text-blue-600",
      hover: "group-hover:bg-blue-200",
      border: "hover:border-blue-100",
      background: "hover:bg-blue-50",
    },
    href: "/admin/projects",
    icon: Briefcase,
  },
  {
    title: "New Blog Post",
    color: {
      main: "bg-orange-100",
      text: "text-orange-600",
      hover: "group-hover:bg-orange-200",
      border: "hover:border-orange-100",
      background: "hover:bg-orange-50",
    },
    href: "/admin/blogs",
    icon: FileText,
  },
  {
    title: "View Requests",
    color: {
      main: "bg-yellow-100",
      text: "text-yellow-600",
      hover: "group-hover:bg-yellow-200",
      border: "hover:border-yellow-100",
      background: "hover:bg-yellow-50",
    },
    href: "/admin/requests",
    icon: MessageSquare,
  },
  {
    title: "Analytics",
    color: {
      main: "bg-green-100",
      text: "text-green-600",
      hover: "group-hover:bg-green-200",
      border: "hover:border-green-100",
      background: "hover:bg-green-50",
    },
    href: "/admin/analytics",
    icon: Eye,
  },
];

const ActionLink = ({ link }) => {
  return (
    <Link
      href={link.href}
      className={`flex items-center gap-3 p-4 rounded-xl border border-gray-100 ${link.color.border} ${link.color.background} transition-all group`}
    >
      <div
        className={`p-2 rounded-lg ${link.color.main} ${link.color.text} ${link.color.hover}`}
      >
        <link.icon className="w-4 h-4" />
      </div>
      <span className="text-sm font-medium">{link.title}</span>
    </Link>
  );
};

const QuickActions = () => {
  return (
    <div className="rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">Quick Actions</h2>
        <TrendingUp className="w-5 h-5 text-neutral-light-grey" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {quickLinks.map((item) => (
          <div key={item.title}>
            <ActionLink link={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
