import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  // const { v4: uuidv4 } = require("uuid");
  // uuidv4();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArays, setpasswordArays] = useState([]);
  const passwordRef = useRef();
  const getPassword = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setpasswordArays(passwords);
  };

  useEffect(() => {
    getPassword();
  }, []);
  const copyText = (text) => {
    toast.info("Copied To Clipboard", {
      position: "top-right",
      autoClose: "5000",
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      transition: "Bounce",
    });
    navigator.clipboard.writeText(text);
  };
  const showPassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  };
  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: form.id}),
        });

      setpasswordArays([...passwordArays, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify([...passwordArays, { ...form, id: uuidv4() }])
      // );
      // console.log([...passwordArays, form]);
      setform({site:"",username:"",password: ""})
    } else {
      toast("Site & Username are not valid", {
        position: "top-right",
        autoClose: "5000",
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        transition: "Bounce",
      });
    }
  };

  const deletePassword = async(id) => {
    let c = confirm("Are you sure you want to delete this password?");
    if (c) {
      setpasswordArays(passwordArays.filter((item) => item.id !== id));
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArays.filter((item) => item.id !== id))
      // );
        let res = await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id}),
        });
    }
  };
  const editPassword = (id) => {
    setform({...passwordArays.filter((item) => item.id === id)[0], id: id});
    setpasswordArays(passwordArays.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition="Bounce"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className=" bg-purple-50 md:mycontainer">
        <h1 className="text-4xl text font-bold text-center">
          Password Manager
        </h1>
        <p className="text-purple-500 text-lg text-center">
          Your own Password Manager
        </p>

        <div className="text-black flex flex-col p-4 gap-4 items-center">
          <input
            onChange={handleChange}
            value={form.site}
            placeholder="Enter the URL "
            type="text"
            className="rounded-full border border-purple-600 w-full p-4 py-1"
            name="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-3">
            <input
              onChange={handleChange}
              value={form.username}
              placeholder="Enter the username "
              type="text"
              className="rounded-full border border-purple-600 w-full p-4 py-1"
              name="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                onChange={handleChange}
                value={form.password}
                placeholder="Enter password"
                type="password"
                className="rounded-full border border-purple-600 w-full p-4 py-1"
                name="password"
              />
              <span
                className="absolute right-0 cursor-pointer "
                onClick={showPassword}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/vfczflna.json"
                  trigger="hover"
                  stroke="bold"
                  colors="primary:#e5d1fa,secondary:#a855f7"
                ></lord-icon>
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center item-center rounded-full text-purple-500 border border-purple-600 hover:font-bold w-fit px-2 py-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#a855f7"
            ></lord-icon>
            Add
          </button>
          <div className="table mx-auto w-full">
            <h2 className="font-bold text-2xl py-3 text-center">
              Your Passwords
            </h2>
            {passwordArays.length === 0 && (
              <div className="font-bold text-l py-3 text-center">
                No Passwords to show... Try to save one!!!
              </div>
            )}
            {passwordArays.length != 0 && (
              <table className="table mx-auto w-full text-center overflow-hidden rounded-lg py-2">
                <thead className="bg-purple-200 font-bold">
                  <tr>
                    <th className=" w-1/4">Site</th>
                    <th className=" w-1/4">Username</th>
                    <th className=" w-1/4">Password</th>
                    <th className=" w-1/4">Edit/Delete</th>
                  </tr>
                </thead>
                <tbody className="bg-purple-100">
                  {passwordArays.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <a href="item.site" target="_blank">
                            {item.site}
                          </a>
                          <lord-icon
                            onClick={() => {
                              copyText(item.site);
                            }}
                            src="https://cdn.lordicon.com/wzwygmng.json"
                            trigger="hover"
                            colors="primary:#121331,secondary:#a855f7"
                            style={{
                              width: "20px",
                              height: "20px",
                              padding: "4px",
                              cursor: "pointer",
                            }}
                          ></lord-icon>
                        </td>
                        <td>
                          {item.username}
                          <lord-icon
                            onClick={() => {
                              copyText(item.username);
                            }}
                            src="https://cdn.lordicon.com/wzwygmng.json"
                            trigger="hover"
                            colors="primary:#121331,secondary:#a855f7"
                            style={{
                              width: "20px",
                              height: "20px",
                              padding: "4px",
                              cursor: "pointer",
                            }}
                          ></lord-icon>
                        </td>
                        <td>
                          {item.password}
                          <lord-icon
                            onClick={() => {
                              copyText(item.password);
                            }}
                            src="https://cdn.lordicon.com/wzwygmng.json"
                            trigger="hover"
                            colors="primary:#121331,secondary:#a855f7"
                            style={{
                              width: "20px",
                              height: "20px",
                              padding: "4px",
                              cursor: "pointer",
                            }}
                          ></lord-icon>
                        </td>
                        <td>
                          <lord-icon
                            onClick={() => {
                              editPassword(item.id);
                            }}
                            src="https://cdn.lordicon.com/wuvorxbv.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#121331,secondary:#a855f7"
                            style={{
                              width: "20px",
                              height: "20px",
                              padding: "4px",
                              margin: "0px 10px",
                            }}
                          ></lord-icon>
                          <lord-icon
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                            src="https://cdn.lordicon.com/drxwpfop.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#121331,secondary:#a855f7"
                            style={{
                              width: "20px",
                              height: "20px",
                              padding: "4px",
                              margin: "0px 10px",
                            }}
                          ></lord-icon>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manager;
