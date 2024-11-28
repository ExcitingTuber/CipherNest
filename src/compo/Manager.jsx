import React, { useEffect, useState } from "react";
import savebutton from "../assets/icons8-save-as.gif";
import deletebutton from "../assets/deletebutton.png";
import editbutton from "../assets/editbutton.png";
import copybutton from "../assets/copybutton.png";
import showPass from "../assets/showPass.png";
import hidePass from "../assets/hidePass.png";


const Manager = () => {

  const [form, setForm] = useState({ url: "", email: "", pass: "", note: "" });
  const [toggleType, setToggleType] = useState("password");
  const [passwordArray, setPasswordArray] = useState([]);

  let passToggleIcon = showPass;
  let passToggleIconAlt = "show";

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  function goTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  function showPassword(e) {
    if (toggleType === "password") {
      e.target.src = hidePass;
      passToggleIcon = hidePass;
      passToggleIconAlt = "hide";
      setToggleType("text");
    } else {
      e.target.src = showPass;
      passToggleIcon = showPass;
      passToggleIconAlt = "show";
      setToggleType("password");
    }
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const storePassword = () => {
    if (
      form.url !== "" ||
      form.email !== "" ||
      form.pass !== "" ||
      form.note !== ""
    ) {
      setPasswordArray([...passwordArray, form]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, form])
      );
      setForm({ url: "", email: "", pass: "", note: "" });
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const deletePassword = (index) => {
    let c = confirm("Do you want to DELETE your data??");
    if (c) {
      setPasswordArray(passwordArray.filter((_, i) => i !== index));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((_, i) => i !== index))
      );
    }
  };

  const editPassword = (index) => {
    let c = confirm("Do you want to EDIT your data??");
    if (c) {
      setForm(passwordArray.filter((_, i) => i === index)[0]);
      setPasswordArray(passwordArray.filter((_, i) => i !== index));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((_, i) => i !== index))
      );
      goTop();
    }
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-amber-200 opacity-20 blur-[100px]"></div>
      </div>

      <div className="flex flex-col items-center w-full gap-2 py-4">
        <h1 className="font-bold text-4xl">
          <span>
            &lt;Cipher<span className="text-amber-300">Nest</span>/&gt;
          </span>
        </h1>
        <p className="font-mono text-2xl">Shelf your credentials</p>
      </div>
      <div className="flex flex-col items-center gap-2 w-full ">
        <input
          type="text"
          name="url"
          onChange={handleChange}
          value={form.url}
          placeholder="Site Name/URL"
          autoComplete="off"
          className="px-4 py-2 my-1 h-12 rounded-full border border-zinc-800 text-xl w-2/5 min-w-fit"
        />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={form.email}
          placeholder="Username/email"
          autoComplete="off"
          className="px-4 py-2 my-1 h-12 rounded-full border border-zinc-800 text-xl w-2/5 min-w-fit"
        />

        <div className="relative flex w-2/5 min-w-fit">
          <input
            type={toggleType}
            name="pass"
            onChange={handleChange}
            value={form.pass}
            placeholder="Password"
            autoComplete="off"
            className="px-4 py-2 my-1 h-12 rounded-full border border-zinc-800 text-xl w-full"
          />
          <span className="absolute right-0 cursor-pointer">
            <img
              src={passToggleIcon}
              alt={passToggleIconAlt}
              title="show/hide"
              className="h-11 px-2 pt-3"
              onClick={showPassword}
            />
          </span>
        </div>

        <textarea
          name="note"
          onChange={handleChange}
          value={form.note}
          placeholder="Add Note"
          cols="25"
          rows="10"
          autoComplete="off"
          className=" px-4 py-2 rounded-2xl border border-zinc-800 text-xl text-wrap h-24 w-2/5 min-w-fit"
        ></textarea>

        <button
          onClick={storePassword}
          className="m-4 px-2 py-2 text-lg font-mono flex border border-zinc-800 rounded-tl-2xl rounded-br-2xl rounded-bl-md rounded-tr-md bg-amber-200 hover:font-bold shadow-lg active:shadow-none active:translate-y-1"
          title="save"
        >
          Store Credentials
          <img src={savebutton} alt="saveicon" className="h-8 px-1 ml-2" />
        </button>
      </div>

      <div className="mt-6 p-3 passwords flex flex-col justify-center items-center">
        <h2 className="p-3 font-bold text-2xl">Your Credentials</h2>

        {passwordArray.length === 0 && (
          <p className="text-lg font-mono">Nothing to show !!</p>
        )}
        {passwordArray.length !== 0 && (
          <table className="table-auto w-fit sm:w-4/6 rounded-lg overflow-hidden">
            <thead className="bg-zinc-800 text-white">
              <tr>
                <th className="py-2 text-sm sm:text-lg">Site/URL</th>
                <th className="py-2 text-sm sm:text-lg">Username/Email</th>
                <th className="py-2 text-sm sm:text-lg">Password</th>
                <th className="py-2 text-sm sm:text-lg">Note</th>
                <th className="py-2 text-sm sm:text-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-amber-100">
              {passwordArray.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="overflow-hidden text-wrap max-sm:text-xs text-center py-2 border border-amber-300">
                      <div className="flex justify-center items-center">
                        {item.url}
                        {item.url !== "" && (
                          <img
                            src={copybutton}
                            alt="copy"
                            title="copy"
                            className="h-3 sm:h-5 mx-2 cursor-pointer"
                            onClick={() => {
                              copyText(item.url);
                            }}
                          />
                        )}
                      </div>
                    </td>
                    <td className="overflow-hidden text-wrap max-sm:text-xs text-center py-2 border border-amber-300">
                      <div className="flex justify-center items-center">
                        {item.email}
                        {item.email !== "" && (
                          <img
                            src={copybutton}
                            alt="copy"
                            title="copy"
                            className="h-3 sm:h-5 mx-2 cursor-pointer"
                            onClick={() => {
                              copyText(item.email);
                            }}
                          />
                        )}
                      </div>
                    </td>
                    <td className="overflow-hidden text-wrap max-sm:text-xs text-center py-2 border border-amber-300">
                      <div className="flex justify-center items-center">
                        {"*".repeat(item.pass.length)}
                        {item.pass !== "" && (
                          <img
                            src={copybutton}
                            alt="copy"
                            title="copy"
                            className="h-3 sm:h-5 mx-2 cursor-pointer"
                            onClick={() => {
                              copyText(item.pass);
                            }}
                          />
                        )}
                      </div>
                    </td>
                    <td className="overflow-hidden text-wrap max-sm:text-xs text-center py-2 border border-amber-300">
                      <div className="flex justify-center items-center">
                        {item.note}
                        {item.note !== "" && (
                          <img
                            src={copybutton}
                            alt="copy"
                            title="copy"
                            className="h-3 sm:h-5 mx-2 cursor-pointer"
                            onClick={() => {
                              copyText(item.note);
                            }}
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-1 border border-amber-300">
                      <div className="flex justify-center items-center max-sm:flex-col">
                        <img
                          src={editbutton}
                          alt="edit"
                          title="edit"
                          className="h-3 sm:h-5 sm:mx-2 cursor-pointer"
                          onClick={() => {
                            editPassword(index);
                          }}
                        />
                        <img
                          src={deletebutton}
                          alt="delete"
                          title="delete"
                          className="h-3 sm:h-5 sm:mx-2 cursor-pointer"
                          onClick={() => {
                            deletePassword(index);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Manager;
