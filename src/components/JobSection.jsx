import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";

const JobSection = () => {
  const [isSort, setIsSort] = useState(false);
  const [search, setSearch] = useState("");
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

  function handelOnSubmit(e) {
    e.preventDefault();
    setMin(e.target.min.value);
    setMax(e.target.max.value);
    console.log({ min, max });
  }

  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://job-portal-server-rho-six.vercel.app/jobs?search=${search}&sort=${isSort}&min=${min}&max=${max}`
      )
      .then((result) => {
        setJobs(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search, isSort, min, max]);

  return (
    <div className="max-w-7xl mx-auto px-5 py-20 text-textColor">
      <div className="text-center">
        <h1 className="font-bold text-4xl">Jobs of the day</h1>
        <p className="text-base text-gray-400 mt-2">
          Search and connect with the right candidates faster.
        </p>
      </div>

      <div className="flex justify-center gap-5 mt-8 flex-wrap">
        <label className="flex-1 input input-bordered flex items-center gap-2">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="grow"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div>
          <form className="flex gap-3 flex-wrap" onSubmit={handelOnSubmit}>
            <input
              name="min"
              required
              type="number"
              placeholder="min"
              className="input input-bordered w-[120px]"
            />
            <input
              name="max"
              required
              type="number"
              placeholder="max"
              className="input input-bordered w-[120px]"
            />
            <button className="btn">Filter</button>
          </form>
        </div>

        <button onClick={() => setIsSort(!isSort)} className="btn">
          Sort By Price
        </button>
      </div>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job}></JobCard>
        ))}
      </div>
    </div>
  );
};

export default JobSection;
