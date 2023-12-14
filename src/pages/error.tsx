import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-200 text-9xl">404</h1>
        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Oops!
        </p>

        <p className="mt-4 text-gray-500">
          잘못된 경로 혹은 권한이 없는 페이지에 접근했어요!
        </p>

        <Link
          to="/"
          className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
