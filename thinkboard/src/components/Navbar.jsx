import { Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tighter">
            Thinkboard
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          <Link to={"/create"} className="btn btn-primary ">
            <PlusIcon className="w-5 h-5" />
            <span>New Note</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
