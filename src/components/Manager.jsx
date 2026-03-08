import { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
    const [src, setSrc] = useState("./assets/eye.png");
    const [type, setType] = useState("text");
    const [passwordArray, setPasswordArray] = useState([]);
    const [site, setSite] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function editPassword(id, user, pass, url) {
        let c = confirm("Do you really want to edit the details");
        if (c) {
            let username = prompt("What will be the new username ??");
            let password = prompt("Password ??");
            let site = prompt("Website url ??");

            if (username === null) {
                username = user;
            }

            if (password === null) {
                password = pass;
            }

            if (site === null) {
                site = url;
            }

            await fetch("http://localhost:3000", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    _id: id,   // ✅ correct key
                    site: site,
                    username: username,
                    password: password
                })
            });

            setPasswordArray(prev =>
                prev.map(item =>
                    item._id === id
                        ? { ...item, site, username, password }
                        : item
                )
            )

            toast('Password edited successfully!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    async function savePassword() {
        const newPassword = {
            site: site,
            username: username,
            password: password
        }
        if (site.trim() === "" || username.trim() === "" || password.trim() === "") {
            toast("Please fill all the details", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
        else {
            await fetch("http://localhost:3000", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    site: site,
                    username: username,
                    password: password
                })
            })

            setPasswordArray([...passwordArray, newPassword])

            setSite("")
            setUsername("")
            setPassword("")
            toast("Password saved successfully!!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    async function deletePassword(username1, password1, site1) {
        let c = confirm("Do you really want to delete this password ??");
        if (c) {
            await fetch("http://localhost:3000", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    site: site1,
                    username: username1,
                    password: password1
                })
            })
            setPasswordArray(prev =>
                prev.filter(item =>
                    !(item.username === username1 &&
                        item.password === password1 &&
                        item.site === site1)
                )
            )
            toast("Password deleted successfully!!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    async function getPasswords() {
        try {
            let response = await fetch("http://localhost:3000/", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response !== undefined) {
                let data = await response.json();
                setPasswordArray(data);
            }
        }
        catch (err) {   
            console.clear();
        }
    }

    useEffect(() => {
        getPasswords();
        toast("Good morning sir/mam", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }, [])

    function click() {
        if (src === "./assets/eye.png") {
            setSrc("./assets/eye-cross.png");
            setType("password");
        }
        else if (src === "./assets/eye-cross.png") {
            setSrc("./assets/eye.png");
            setType("text");
        }
    }

    function copy(text) {
        toast("Copied to clipboard!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    }

    return (
        <>
            <ToastContainer />
            <div className="flex flex-col min-h-screen sm:max-w-screen relative w-full px-2 sm:container sm:mx-auto">
                <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
                <div className="md:container p-2 md:p-0 mx-auto mt-3 w-full">
                    <div className="logo flex align-middle items-center justify-center">
                        <span className="text-green-500 lol text-3xl">&lt;</span>
                        <p className="lol text-3xl text-white">Pass</p>
                        <span className="text-green-500 lol text-3xl">OP/&gt;</span>
                    </div>
                    <p className="text-2xl italic font-[cursive] text-green-400 text-center mt-1">Your own password manager</p>
                    <div className="flex flex-col p-3 items-center">
                        <input value={site} onChange={(event) => { setSite(event.target.value) }} className="bg-white py-2 pl-6 border-4 border-green-500 rounded-full outline-none w-full sm:w-5/6 md:w-2/3 lg:w-5/12" type="text" id="url" placeholder="Enter Website URL" />
                        <div className="flex flex-col sm:flex-row gap-2 mt-3 w-full sm:w-5/6 md:w-2/3 lg:w-5/12">
                            <input type="text" value={username} onChange={(event) => { setUsername(event.target.value) }} className="bg-white w-full border-4 outline-none rounded-full border-green-500 px-8 py-2" id="username" placeholder="Enter Username" />
                            <div id="passwordInput" className="flex bg-white border-4 border-green-500 w-full rounded-full py-1">
                                <input value={password} onChange={(event) => { setPassword(event.target.value) }} type={type} className="px-8 py-1 outline-none w-full" placeholder="Enter password" />
                                <span className="relative right-3 cursor-pointer flex items-center">
                                    <img width={40} id="img" onClick={click} src={src} alt="eye" />
                                </span>
                            </div>
                        </div>
                        <button id="btn" type="submit" onClick={() => {
                            savePassword();
                        }} className="mt-4 border-2 border-green-400 flex p-2 cursor-pointer justify-center hover:bg-green-600 hover:border-green-600 space-x-2 items-center align-middle w-fit rounded-full px-6 bg-green-400">
                            <lord-icon
                                src="https://cdn.lordicon.com/qtebspeb.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#c7166f,secondary:#cb5eee"
                            >
                            </lord-icon>
                            <p className="italic font-serif">Save Password</p>
                        </button>
                        {passwordArray.length === 0 && <div className="mt-4 text-2xl font-[cursive] text-white italic">No passwords to show</div>}
                        {passwordArray.length !== 0 && <div className="passwords mt-3 w-full px-2">
                            <h2 className="text-3xl italic font-[cursive] text-center mb-1 text-white">Your passwords</h2>

                            {/* MOBILE CARDS - visible only on small screens */}
                            <div className="flex flex-col gap-3 sm:hidden">
                                {passwordArray.map((item, index) => (
                                    <div key={index} className="bg-white rounded-2xl shadow p-4 border border-green-200">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-semibold text-green-800 truncate">{item.site}</span>
                                            <span className="cursor-pointer" onClick={() => copy(item.site)}>
                                                <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="click" style={{ width: "20px", height: "20px" }} />
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center mb-1 text-sm text-gray-600">
                                            <span className="truncate">{item.username}</span>
                                            <span className="cursor-pointer" onClick={() => copy(item.username)}>
                                                <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="click" style={{ width: "20px", height: "20px" }} />
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm text-gray-600">
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <span className="cursor-pointer" onClick={() => copy(item.password)}>
                                                <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="click" style={{ width: "20px", height: "20px" }} />
                                            </span>
                                        </div>
                                        <div className="flex gap-3 mt-3 justify-end">
                                            <lord-icon src="https://cdn.lordicon.com/iubtdgvu.json" trigger="hover" stroke="bold" onClick={() => {
                                                editPassword(item._id, item.username, item.password, item.site);
                                            }} style={{ width: "26px", height: "26px", cursor: "pointer" }} />
                                            <lord-icon src="https://cdn.lordicon.com/tftntjtg.json" trigger="hover" stroke="bold" onClick={() => {
                                                deletePassword(item.username, item.password, item.site);
                                            }} style={{ width: "26px", height: "26px", cursor: "pointer" }} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* TABLE - visible only on sm and above */}
                            <div className="hidden sm:block overflow-x-auto w-full">
                                <table className="w-full min-w-125 rounded-2xl mt-4 table-fixed border-collapse bg-white shadow-md overflow-hidden">
                                    <thead className="bg-green-600 text-white">
                                        <tr>
                                            <th className="w-1/4 px-4 py-3 text-center text-2xl italic font-[cursive]">Site</th>
                                            <th className="w-10"></th>
                                            <th className="w-1/4 px-4 py-3 text-center text-2xl italic font-[cursive]">Username</th>
                                            <th className="w-10"></th>
                                            <th className="w-1/4 px-4 py-3 text-center text-2xl italic font-[cursive]">Password</th>
                                            <th className="w-10"></th>
                                            <th className="w-1/4 px-4 py-3 text-center text-2xl italic font-[cursive]">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-green-200 bg-green-100">
                                        {passwordArray.map((item, index) => (
                                            <tr key={index} className="hover:bg-green-100 transition-colors text-sm">
                                                <td className="px-4 py-3 text-center truncate">{item.site}</td>
                                                <td className="text-center cursor-pointer" onClick={() => copy(item.site)}>
                                                    <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="click" style={{ width: "20px", height: "20px" }} />
                                                </td>
                                                <td className="px-4 py-3 text-center truncate">{item.username}</td>
                                                <td className="text-center cursor-pointer" onClick={() => copy(item.username)}>
                                                    <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="click" style={{ width: "20px", height: "20px" }} />
                                                </td>
                                                <td className="px-4 py-3 text-center truncate">{"*".repeat(item.password.length)}</td>
                                                <td className="text-center cursor-pointer" onClick={() => copy(item.password)}>
                                                    <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="click" style={{ width: "20px", height: "20px" }} />
                                                </td>
                                                <td className="text-center space-x-2">
                                                    <lord-icon src="https://cdn.lordicon.com/iubtdgvu.json" trigger="hover" stroke="bold" onClick={() => {
                                                        editPassword(item._id, item.username, item.password, item.site);
                                                    }} style={{ width: "26px", height: "26px", cursor: "pointer" }} />
                                                    <lord-icon src="https://cdn.lordicon.com/tftntjtg.json" trigger="hover" stroke="bold" onClick={() => {
                                                        deletePassword(item.username, item.password, item.site);
                                                    }} style={{ width: "26px", height: "26px", cursor: "pointer" }} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager