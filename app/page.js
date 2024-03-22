"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [combinedData, setCombinedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(100);
  const [year, setYear] = useState(2024);
  const [gdpYear, setGdpYear] = useState(2015);
  const [searchTerm, setSearchTerm] = useState("");
  const [showTable, setShowTable] = useState(false); // State to control showing/hiding table

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/combined-data");
        const data = await response.json();
        setCombinedData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const currentCountries = combinedData.filter((item) =>
    item.country_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleYearChange = (event) => {
    setYear(parseInt(event.target.value));
  };

  const handleGdpYearChange = (event) => {
    setGdpYear(parseInt(event.target.value));
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowTable = () => {
    setShowTable(true);
  };

  return (
    <div className="h-screen">
      {!showTable ? ( // Conditionally render the landing page
        <div className="h-screen overflow-y-scroll bg-[url('/world_map.png')] bg-blue-950  bg-center bg-blend-luminosity flex justify-start text-white">
          <div className="flex flex-col justify-center w-1/3 gap-3 p-10 bg-slate-950">
            <h1 className="text-3xl font-bold">
              Welcome to Information Management System.
            </h1>
            <p className="">
              We aim to make accessing data easier. For this demonstration,
              we've taken country data from several sources and combined it so
              people have an easier time finding what they want.
            </p>
            <button
              onClick={handleShowTable}
              className="px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              View Data
            </button>
          </div>
        </div>
      ) : (
        // Render the table
        <div className="absolute w-screen h-screen overflow-y-scroll bg-contain">
          <div className="p-4 text-white bg-slate-950">
            <h1 className="mb-4 text-3xl font-bold">
              Combined Data from Backend
            </h1>

            <div className="flex gap-4">
              <label>
                Enter country name:
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                  className="px-2 py-1 ml-2 text-black border border-gray-300"
                />
              </label>
              <label className="mr-2">
                Year:
                <input
                  type="number"
                  value={year}
                  max={"2024"}
                  min={"2015"}
                  onChange={handleYearChange}
                  className="px-2 py-1 ml-2 text-black border border-gray-300"
                />
              </label>
              <label>
                GDP Year:
                <input
                  type="number"
                  value={gdpYear}
                  min={"2011"}
                  max={"2015"}
                  onChange={handleGdpYearChange}
                  className="px-2 py-1 ml-2 text-black border border-gray-300"
                />
              </label>
            </div>
          </div>
          <div className="h-screen bg-blend-multiply  bg-[rgb(1,0,0,0.6)] text-white  overflow-y-scroll bg-[url('/world_map_2.png')] bg-cover bg-no-repeat bg-center">
            <table className="font-bold bg-no-repeat border-collapse w-fit ">
              <thead>
                <tr className="text-bold">
                  <th className="px-4 py-2 ">Country ID</th>
                  <th className="px-4 py-2 ">Name</th>
                  <th className="px-4 py-2 ">Continent</th>
                  <th className="px-4 py-2">Code</th>
                  <th className="px-4 py-2">Population Year</th>
                  <th className="px-4 py-2">Population Value</th>
                  <th className="px-4 py-2">GDP Year</th>
                  <th className="px-4 py-2">GDP Value</th>
                  <th className="px-4 py-2">Total Cases</th>
                  <th className="px-4 py-2">Active Cases</th>
                  <th className="px-4 py-2">Deaths</th>
                  <th className="px-4 py-2">Health Expenditure</th>
                </tr>
              </thead>
              <tbody className="h-screen font-extrabold text-center ">
                {currentCountries.map(
                  (item, index) =>
                    item.population_year === year &&
                    item.gdp_year === gdpYear && (
                      <tr key={index} className="border-t ">
                        <td className="py-2border">{item.country_id}</td>
                        <td className="py-2 border ">{item.country_name}</td>
                        <td className="py-2 border ">{item.continent}</td>
                        <td className="py-2 border ">{item.code}</td>
                        <td className="py-2 border ">{item.population_year}</td>
                        <td className="py-2 border ">
                          {item.population_value}
                        </td>
                        <td className="py-2 border">{item.gdp_year}</td>
                        <td className="py-2 border">{item.gdp_value}</td>
                        <td className="py-2 border">{item.total_cases}</td>
                        <td className="py-2 border">{item.active_cases}</td>
                        <td className="py-2 border">{item.deaths}</td>
                        <td className="py-2 border">{item.health_exp}</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
