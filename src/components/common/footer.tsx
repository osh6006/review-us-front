import React from "react";
import Layout from "./layout";
import { Link } from "react-router-dom";
import { navbarRoutes } from "../../utils/routes-info";
import { Facebook, Github, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="text-white bg-primary px-5 py-5 
    sm:py-12 sm:px-0
    
    "
    >
      <Layout>
        <div className="flex justify-between items-center">
          <Link
            to={"/"}
            className="flex-initial lg:flex-1 text-lg uppercase font-bold"
          >
            Review us
          </Link>
          <ul className="flex justify-around text-xs items-center gap-x-5 sm:gap-x-12">
            {navbarRoutes?.map((route) => (
              <Link to={route.pathname} key={route.pathname}>
                {route.label}
              </Link>
            ))}
          </ul>
        </div>
        <div className="max-w-sm my-8 font-normal text-left">
          <p>
            made by | 팀 리뷰어스
            <br />
            프론트엔드 | ohs6006@gmail.com
            <br />
            백엔드 | backminhee@gmail.com
            <br />
            Git | https://github.com/minheebaek/reviewus
          </p>
        </div>
        <div className="flex justify-between items-center text-xs ">
          <div className="flex-1">
            {`Copyright ${new Date().getFullYear()}. All Rights Reserved`}
          </div>
          <div className="flex gap-x-3">
            <Facebook
              size={20}
              className="btn-circle btn-xs cursor-pointer hover:text-blue-600 transition-colors"
            />
            <Github
              size={20}
              className="btn-circle btn-xs cursor-pointer hover:text-violet-600 transition-colors"
            />
            <Instagram
              size={20}
              className="btn-circle btn-xs cursor-pointer hover:text-pink-600 transition-colors"
            />
          </div>
        </div>
      </Layout>
    </footer>
  );
};

export default Footer;
