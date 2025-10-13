import React, { useState } from "react";
import { Menu, X, Briefcase, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { logout } from "@/store/slices/authSlice";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.auth);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: "Browse", href: "/job-browse" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold">
                Career<span className="text-purple-600">Hub</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation and Auth Buttons */}
          <div className="hidden md:flex items-center space-x-7">
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium flex items-center space-x-1"
                >
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10 cursor-pointer">
                      <AvatarImage
                        src={user.profile?.profilePhoto}
                        alt={user.fullName}
                      />
                      <AvatarFallback className="bg-purple-600 text-white">
                        {user.fullName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.fullName}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/my-applications")}
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    <span>My Applications</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-gray-700 cursor-pointer hover:text-purple-600"
                  >
                    Login
                  </Button>
                </Link>

                <Link to="/signup">
                  <Button className="bg-purple-600 cursor-pointer hover:bg-purple-700 text-white">
                    Signup
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-gray-700"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium flex items-center space-x-2 px-2 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{link.name}</span>
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-2 py-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user.profile?.profilePhoto}
                          alt={user.fullName}
                        />
                        <AvatarFallback className="bg-purple-600 text-white">
                          {user.fullName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.fullName}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <Link to={"/profile"}>
                      <Button
                        variant="ghost"
                        className="w-full cursor-pointer justify-start text-gray-700"
                        onClick={() => {
                          navigate("/profile");
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                    </Link>

                    <Link to={"/my-applications"}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-700"
                        onClick={() => {
                          navigate("/my-applications");
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <Briefcase className="mr-2 h-4 w-4" />
                        My Applications
                      </Button>
                    </Link>

                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700"
                      // onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Signup
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
