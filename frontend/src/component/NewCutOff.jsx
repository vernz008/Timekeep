import React, { useEffect, useState } from "react";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import axios from "axios";

const NewCutOff = ({ setModal, setTimekeep }) => {
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [timekeep_inputs, setTimekeep_Inputs] = useState({
    company: "",
    branch: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/company").then((res) => {
      setCompany(res.data);
    });

    axios.get("http://127.0.0.1:8000/api/branch").then((res) => {
      setBranch(res.data);
    });
  }, []);

  console.log(timekeep_inputs);

  const send = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/timekeep", {
        company_id: timekeep_inputs.company,
        branch_id: timekeep_inputs.branch,
        date_from: timekeep_inputs.startDate,
        date_to: timekeep_inputs.endDate,
      })
      .then((res) => {
        setTimekeep(res.data);
        setModal(false);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setTimekeep_Inputs((prevInputs) => ({
  //     ...prevInputs,
  //     [name]: value,
  //   }));
  // };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black/50 absolute !top-0 !left-0 z-999">
      <div className="h-[51%] w-[30%] bg-white">
        <div className="w-full h-[80px] flex bg-[#2B3043]">
          <img src="/src/images/company_logo.png" alt="" />
          <span className="m-2 font-bold text-white p-2 mr-[120px]">
            <span>Timekeeping</span>
            <br />
            <span className="text-[12px]">Create New Cut-Off</span>
          </span>

          <div className="ml-12 mt-1">
            <button
              onClick={() => setModal(false)}
              className="font-bold text-white"
            >
              X
            </button>
          </div>
        </div>

        <div className="w-full h-[220px] flex justify-center items-center">
          <form className="w-[360px] mt-5" onSubmit={send}>
            <label className="font-bold text-[15px] mr-2" htmlFor="">
              <HiOutlineBuildingOffice2 className="text-[20px] float-left" />
              Company:
            </label>
            <select
              className="text-[12px] h-7 border-[1px] border-gray-600 mb-2 focus:outline-none rounded"
              name="company"
              id="company"
              // onChange={handleInputChange}
              onChange={(e) => {
                setTimekeep_Inputs({
                  ...timekeep_inputs,
                  company: e.target.value,
                });
              }}
            >
              <option value="" selected disabled>
                Select Company
              </option>
              {company.map((data) => {
                return (
                  <>
                    <option key={data.id} value={data.id}>
                      {data.company_name}
                    </option>
                    ;
                  </>
                );
              })}
            </select>
            <label className="font-bold text-[15px] mr-2" htmlFor="">
              <IoLocationOutline className="text-[20px] float-left mr-4" />
              Branch:
            </label>
            <select
              className="text-[12px] h-7 border-[1px] border-gray-600 w-[254px] focus:outline-none rounded"
              name="branch"
              id="branch"
              // onChange={handleInputChange}
              onChange={(e) => {
                setTimekeep_Inputs({
                  ...timekeep_inputs,
                  branch: e.target.value,
                });
              }}
            >
              <option value="" selected disabled>
                Select Brach
              </option>
              {branch.map((data) => {
                return (
                  <>
                    <option key={data.id} value={data.id}>
                      {data.branch_name}
                    </option>
                    ;
                  </>
                );
              })}
            </select>
            <label className="font-bold text-[15px] mr-2" htmlFor="">
              <FaRegCalendarAlt className="text-[20px] float-left mr-4" />
              Cut off:
            </label>{" "}
            <br />
            <div className="w-full flex justify-center mb-1">
              <span className="">From:</span>{" "}
              <input
                className="focus:outline-none border-[1px] border-gray-700 rounded"
                type="date"
                name="startDate"
                id="startDate"
                onChange={(e) => {
                  setTimekeep_Inputs({
                    ...timekeep_inputs,
                    startDate: e.target.value,
                  });
                }}
              />
            </div>
            <div className="w-full flex justify-center mb-5">
              <span className="mr-5">To:</span>{" "}
              <input
                className="focus:outline-none border-[1px] border-gray-700 rounded"
                type="date"
                name="endDate"
                id="endDate"
                onChange={(e) => {
                  setTimekeep_Inputs({
                    ...timekeep_inputs,
                    endDate: e.target.value,
                  });
                }}
              />
            </div>
            <div className="w-full">
              <hr />
            </div>
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                className="bg-[#327379] p-1 rounded w-[80px] text-white hover:opacity-75"
              >
                SAVE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCutOff;
