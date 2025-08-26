"use client";
import Link from "next/link";

export default function Breadcrumb({ paths = [] }) {
  return (
   <>
    <section className="Breadcrumb-section">
      <span className="small-text text-uppercase">
        {paths.map((item, index) => (
          <span key={index}>
            {item.href ? (
              <Link href={item.href} className="text-white">
                {item.label}
              </Link>
            ) : (
              <span className="text-white">{item.label}</span>
            )}
            {index < paths.length - 1 && " / "}
          </span>
        ))}
      </span>
    </section>
    <hr />
   </>
  );
}
