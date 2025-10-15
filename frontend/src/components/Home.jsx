import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
 
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "UI/UX Designer",
    "DevOps Engineer",
    "Mobile Developer",
    "Product Manager",
  ];

  const handleSearch = () => {
    console.log("Search Query:", searchQuery);
  };

  const handleCategoryClick = (category) => {
    console.log("Selected Category:", category);
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-red-50 text-red-600 border border-red-200">
            No. 1 Job Hunt Website
          </span>
        </div>

        <div className="text-center max-w-4xl mx-auto mb-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Find Your Perfect Job &<br />
            <span className="text-purple-600">Build Your Career</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Discover thousands of job opportunities with all the information you
            need. It's your future. Come find it. Manage all your job
            applications from start to finish.
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative flex items-center pr-3 bg-white rounded-full shadow-lg border   overflow-hidden">
            <Input
              type="text"
              placeholder="Find your dream jobs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="flex-1 h-14 text-base pl-6 pr-4 border-none ring-0 focus:outline-none focus:ring-0 focus:ring-transparent focus:border-transparent"
            />

            <Button
              onClick={handleSearch}
              className="bg-purple-600 cursor-pointer hover:bg-purple-700 text-white rounded-full h-10 w-10 transition-all duration-300"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 cursor-pointer md:-ml-4">
              {categories.map((category, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-auto">
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap  cursor-pointer shadow-sm hover:shadow-md transition-all duration-200
                        ${
                          selectedCategory === category
                            ? "bg-purple-100 text-purple-700 border border-purple-600"
                            : "bg-white text-gray-700 border border-gray-200 hover:border-purple-600 hover:text-purple-600"
                        }`}
                  >
                    {category}
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 cursor-pointer" />
            <CarouselNext className="right-0 cursor-pointer" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Home;
