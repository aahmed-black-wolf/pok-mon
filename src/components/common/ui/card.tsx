"use client";

import Image from "next/legacy/image";
import React from "react";
import { useRouter } from "next/navigation";

type TCardProps = {
  src?: string;
  title?: string;
  subTitle?: string | number;
  id?: number | string;
  onClick?: () => void;
};

export default function Card({ src, title, subTitle, id, onClick }: TCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (id) {
      router.push(`/pokmon/${id}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white cursor-pointer p-4 flex flex-col justify-between items-center rounded-md shadow-md md:w-50 w-40 h-50 md:h-50 lg:w-70 lg:h-60"
    >
      {src && (
        <div className="w-full rounded-md  bg-pagination-bg h-[80%] flex justify-center items-center">
          <div className="w-2/3 relative h-full">
            <Image
              placeholder="blur"
              blurDataURL={src}
              alt={title || "img-title"}
              src={src}
              layout="fill"
              loading="lazy"
            />
          </div>
        </div>
      )}
      <div className="text-center">
        {title && <h2 className="font-bold">{title}</h2>}
        {subTitle && <p className="text-text-muted">{subTitle}</p>}
      </div>
    </div>
  );
}
