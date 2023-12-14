import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section
      className="w-full bg-transparent mx-auto
        sm:w-[90%]
        max-w-[120rem]
    "
    >
      {children}
    </section>
  );
};

export default Layout;
