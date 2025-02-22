import Link from "next/link";
import { Card } from "../ui/card";

interface AuthCardProps {
  title: string;
  subTitle: string;
  altText: string;
  altLinkText: string;
  altLinkHref: string;
  children: React.ReactNode;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subTitle,
  altText,
  altLinkText,
  altLinkHref,
  children,
}: AuthCardProps) => {
  return (
    <Card className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl text-gray-900 font-extrabold">{title}</h1>
        <h1 className="text-md text-gray-700">{subTitle} </h1>
      </div>
      {children}
      <div className="flex gap-2 justify-center">
        {altText}
        <Link href={altLinkHref} className="text-indigo-600">
          {altLinkText}
        </Link>
      </div>
    </Card>
  );
};
