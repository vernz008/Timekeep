import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdOutlinePrint, MdOutlineTimer } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import NewCutOff from "../component/NewCutOff";
import axios from "axios";
import EditCutOff from "../component/EditCutOff";

const Home_Page = () => {
  const [id, setID] = useState(0);
  const [modal, setModal] = useState(false);
  const [editmodal, setEditModal] = useState(false);
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [timekeep, setTimekeep] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/company").then((res) => {
      setCompany(res.data);
    });

    axios.get("http://127.0.0.1:8000/api/branch").then((res) => {
      setBranch(res.data);
    });

    axios.get("http://127.0.0.1:8000/api/timekeep").then((res) => {
      setTimekeep(res.data);
    });
  }, []);

  const deleteRecord = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/timekeep/${id}`)
      .then((res) => {
        alert("Timekeep record has been deleted!");

        setTimekeep(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-screen w-screen bg-[#F2ECEC] flex justify-center items-center">
      {modal === true ? (
        <NewCutOff setModal={setModal} setTimekeep={setTimekeep} />
      ) : (
        ""
      )}

      {editmodal === true ? (
        <EditCutOff
          setEditModal={setEditModal}
          setTimekeep={setTimekeep}
          id={id}
        />
      ) : (
        ""
      )}
      <div className="w-full h-full">
        <div className="flex items-center w-full h-[20%] bg-[#F2ECEC]">
          <div className="w-[300px] h-[80px] ml-5 bg-white border-[1px] border-gray-400">
            <div className="h-1 w-full bg-[#2B3043]"></div>
            <div className="h-full flex flex-col justify-center items-center">
              <span className="font-sans text-[20px] font-bold ">
                Compensation Benefits
              </span>
              <span className="">Timekeeping System</span>
            </div>
          </div>
          {/* Filter */}
          <div className="w-[1000px] h-[80px] ml-5 bg-white border-[1px] border-gray-400">
            <div className="h-1 w-full bg-[#2B3043]"></div>
            <div className="flex items-center">
              <div className="flex mt-10 ml-3">
                Company:
                <select
                  className="border-[1px] border-gray-600 focus:outline-none"
                  id="selection"
                  name="selection"
                >
                  {company.map((data) => {
                    return (
                      <>
                        <option value={data.id}>{data.company_name}</option>;
                      </>
                    );
                  })}
                </select>
              </div>

              <div className="flex mt-10 ml-3">
                Branch:
                <select
                  className="border-[1px] border-gray-600 focus:outline-none"
                  id="selection"
                  name="selection"
                >
                  {branch.map((data) => {
                    return (
                      <>
                        <option value={data.id}>{data.branch_name}</option>
                      </>
                    );
                  })}
                </select>
              </div>

              <div className="flex mt-10 ml-[100px]">
                <button
                  onClick={(e) => {
                    setModal(true);
                  }}
                  className="text-white bg-[#2B3043] text-[10px] p-0.5 w-[120px]"
                >
                  <div className="flex justify-center">
                    <IoAddCircleOutline className="text-[20px]" />
                    <span className="flex items-center"> CREATE NEW</span>
                  </div>
                </button>
              </div>

              <div className="flex mt-10 ml-5">
                <button className="text-white bg-[#2B3043] text-[10px] p-0.5 w-[120px]">
                  <div className="flex justify-center">
                    <MdOutlinePrint className="text-[20px]" />
                    <span className="flex items-center"> PRINT SUMMARY</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[80%] bg-[#F2ECEC]">
          <div className="flex">
            <div className="w-[300px] h-[475px] ml-5 bg-white border-[1px] border-gray-400">
              <div className="h-1 w-full bg-[#2B3043]"></div>
              <div className="h-full flex flex-col justify-center">
                <div className="flex flex-col w-full h-full mt-5">
                  <div className="flex justify-center">
                    <img
                      className="h-[150px] w-[150px] rounded-full border-[1px] border-gray-600"
                      src="/src/images/company_logo.png"
                      alt=""
                    />
                  </div>

                  <div className="flex justify-center">
                    <span className="text-[12px]">
                      Peso Resources Development Corporation
                    </span>
                  </div>
                  <div className="flex justify-center">
                    <span className="text-[12px]">
                      Brgy, 111B K-9th, Quezon City, 1102 Metro Manila
                    </span>
                  </div>
                  <div className="flex justify-center">
                    <span className="text-[12px]">09090990909</span>
                  </div>
                </div>
              </div>
              <div className="h-0.5 w-full bg-[#2B3043]"></div>
            </div>

            <div className="w-[1000px] h-[475px] ml-5 bg-white border-[1px] border-gray-400">
              <div className="h-1 w-full bg-[#2B3043]"></div>
              {/* content */}
              <div className="w-full">
                <h5 className="p-1">Timekeeping: Cutoff</h5>
                <div className="flex justify-end w-full pr-5">
                  Cut-off:
                  <select
                    className="border-[1px] border-gray-600 focus:outline-none"
                    id="selection"
                    name="selection"
                  >
                    <option value="option1">12-16-23 - 12-31-23</option>
                    <option value="option2">12-16-23 - 12-31-23</option>
                    <option value="option3">12-16-23 - 12-31-23</option>
                    <option value="option4">12-16-23 - 12-31-23</option>
                  </select>
                </div>
              </div>

              <div className="m-5 overflow-scroll h-[375px]">
                <table className="w-full text-[12px]">
                  <tr className="">
                    <th className="border-[1px] border-gray-600">CUT OFF ID</th>
                    <th className="border-[1px] border-gray-600">COMPANY</th>
                    <th className="border-[1px] border-gray-600">BRANCH</th>
                    <th className="border-[1px] border-gray-600">FROM</th>
                    <th className="border-[1px] border-gray-600">TO</th>
                    <th className="border-[1px] border-gray-600">ACTIONS</th>
                  </tr>

                  {timekeep.map((data) => {
                    return (
                      <>
                        <tr>
                          <td className="border-[1px] border-gray-600 text-center">
                            {data.date_from} - {data.date_to}
                          </td>
                          <td className="border-[1px] border-gray-600 text-center">
                            {data.company_name}
                          </td>
                          <td className="border-[1px] border-gray-600 text-center">
                            {data.branch_name}
                          </td>
                          <td className="border-[1px] border-gray-600 text-center">
                            {data.date_from}
                          </td>
                          <td className="border-[1px] border-gray-600 text-center">
                            {data.date_to}
                          </td>
                          <td className="border-[1px] border-gray-600 text-center">
                            <div className="flex w-full justify-center">
                              <div>
                                <button
                                  onClick={() => {
                                    setEditModal(true);
                                    setID(data.id);
                                  }}
                                  className="bg-[#2B3043] rounded-full m-1"
                                >
                                  <FaEdit className="text-[20px] p-1 text-white" />
                                </button>
                              </div>
                              <div>
                                <button
                                  onClick={() => {
                                    deleteRecord(data.id);
                                  }}
                                  className="bg-[#2B3043] rounded-full m-1"
                                >
                                  <RiDeleteBin5Fill className="text-[20px] p-1 text-white" />
                                </button>
                              </div>
                              <div>
                                <button className="bg-[#2B3043] rounded-full m-1">
                                  <MdOutlineTimer className="text-[20px] p-1 text-white" />
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </table>
              </div>
              <div className="h-0.5 w-full bg-[#2B3043]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home_Page;
