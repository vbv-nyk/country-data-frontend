"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [combinedData, setCombinedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(100);
  const [year, setYear] = useState(2024);
  const [gdpYear, setGdpYear] = useState(2015);
  const [searchTerm, setSearchTerm] = useState("");

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

  return (
    <div className="">
      <h1 className="mb-4 text-3xl font-bold">Combined Data from Backend</h1>

      <div className="flex gap-4 mb-4">
        <label>
          Enter country name:
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
            className="px-2 py-1 ml-2 border border-gray-300"
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
            className="px-2 py-1 ml-2 border border-gray-300"
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
            className="px-2 py-1 ml-2 border border-gray-300"
          />
        </label>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-gray-200">Country ID</th>
            <th className="px-4 py-2 bg-gray-200">Name</th>
            <th className="px-4 py-2 bg-gray-200">Continent</th>
            <th className="px-4 py-2 bg-gray-200">Code</th>
            <th className="px-4 py-2 bg-gray-200">Population Year</th>
            <th className="px-4 py-2 bg-gray-200">Population Value</th>
            <th className="px-4 py-2 bg-gray-200">GDP Year</th>
            <th className="px-4 py-2 bg-gray-200">GDP Value</th>
            <th className="px-4 py-2 bg-gray-200">Total Cases</th>
            <th className="px-4 py-2 bg-gray-200">Active Cases</th>
            <th className="px-4 py-2 bg-gray-200">Deaths</th>
            <th className="px-4 py-2 bg-gray-200">Health Expenditure</th>
          </tr>
        </thead>
        <tbody>
          {currentCountries.map(
            (item, index) =>
              item.population_year === year &&
              item.gdp_year === gdpYear && (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 border">{item.country_id}</td>
                  <td className="px-4 py-2 border">{item.country_name}</td>
                  <td className="px-4 py-2 border">{item.continent}</td>
                  <td className="px-4 py-2 border">{item.code}</td>
                  <td className="px-4 py-2 border">{item.population_year}</td>
                  <td className="px-4 py-2 border">{item.population_value}</td>
                  <td className="px-4 py-2 border">{item.gdp_year}</td>
                  <td className="px-4 py-2 border">{item.gdp_value}</td>
                  <td className="px-4 py-2 border">{item.total_cases}</td>
                  <td className="px-4 py-2 border">{item.active_cases}</td>
                  <td className="px-4 py-2 border">{item.deaths}</td>
                  <td className="px-4 py-2 border">{item.health_exp}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
}
