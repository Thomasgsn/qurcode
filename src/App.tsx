import React, {useState} from "react"
import {FaGithub} from "react-icons/fa";
import {MdQuestionMark} from "react-icons/md";
import Grainient from "./components/Grainient";
import {Modal, ModalTrigger} from "./components/Modal";

import QRCode from "react-qr-code"

interface Settings {
    bgColor: string,
    fgColor: string,
}

function App() {
    const [data, setData] = useState<string>('')
    const [settings, setSettings] = useState<Settings>({bgColor: '#FFFFFF', fgColor: '#000000'})
    const [type, setType] = useState<"url" | "text">("url")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setSettings((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [open, setOpen] = useState(false);
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    const copy = () => {
        const url = `${window.location.origin}/qr?data=${encodeURIComponent(data)}&fg=${encodeURIComponent(settings.fgColor)}&bg=${encodeURIComponent(settings.bgColor)}`;
        navigator.clipboard.writeText(url).then(() => alert(`QR to ${data} is copied`));
    };

    const download = () => {
        const svg = document.querySelector("svg");
        if (!svg) return;

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);

            const png = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = png;
            link.download = "qur-code.png";
            link.click();
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgString);
    };
    return (
        <>
            <div className='overflow-hidden'>
                <div className="absolute top-0 left-0 right-0 bottom-0 w-dvw h-dvh -z-1" aria-hidden="true">
                    <Grainient/>
                </div>
                <main
                    className="flex items-center max-h-dvh overflow-auto gap-6 p-2 h-full w-dvw flex-col lg:flex-row lg:items-end lg:justify-center lg: py-12">
                    <fieldset className="max-w-132 w-full">
                        <div
                            className="flex items-center mb-2.5 bg-custom-white/70 backdrop-blur-xl w-fit rounded-lg relative overflow-hidden">
                            <button className="z-2 h-full px-4 py-2.5" onClick={() => setType("url")}>Send an url
                            </button>
                            <button className="z-2 h-full px-4 py-2.5" onClick={() => setType("text")}>Send a text
                            </button>
                            <div
                                className="absolute top-1/2 -translate-y-1/2 bg-custom-white w-1/2 h-full transition-transform duration-300 ease-in-out"
                                style={{
                                    left: type === 'url' ? '0%' : '100%',
                                    transform: type === 'url' ? 'translateX(0)' : 'translateX(-100%)',
                                }}></div>
                        </div>
                        <div
                            className="bg-custom-white/70 backdrop-blur-xl flex flex-col p-4 rounded-lg min-h-75 gap-4 justify-between">
                            <div>
                                <div className="flex *:w-full gap-4 flex-col xs:flex-row">
                                    <div className="flex flex-col">
                                        <label htmlFor="fgColor" className="text-lg">Foreground Color</label>
                                        <input type="color" name="fgColor" id="fgColor"
                                               value={settings.fgColor}
                                               className="w-full"
                                               onChange={handleChange}/>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="bgColor" className="text-lg">Background Color</label>
                                        <input type="color" name="bgColor" id="bgColor"
                                               value={settings.bgColor}
                                               className="w-full"
                                               onChange={handleChange}/>
                                    </div>
                                </div>
                                <hr className="my-4 opacity-25"/>
                                <div className="flex flex-col">
                                    <label htmlFor="content"
                                           className="mb-1 text-lg">{type == "url" ? "Link" : "Content"}</label>
                                    {type == "url" ?
                                        <input
                                            className="bg-custom-white inset-shadow-xl inset-shadow-custom-black rounded-lg py-2 px-3"
                                            type="text"
                                            name="content"
                                            id="content"
                                            placeholder="Enter your url here"
                                            value={data}
                                            onChange={(e) => setData(e.target.value)}/>
                                        :
                                        <textarea
                                            className="bg-custom-white inset-shadow-xl inset-shadow-custom-black rounded-lg py-2 px-3 max-h-[20vh] min-h-16"
                                            name="content"
                                            id="content"
                                            placeholder="Enter your text here"
                                            value={data}
                                            onChange={(e) => setData(e.target.value)}/>
                                    }
                                </div>
                            </div>

                            <div>
                                <hr className="mb-4 opacity-25"/>
                                <div
                                    className="flex items-center gap-2 *:py-2 *:px-4 *:rounded-lg *:w-fit *:hover:opacity-50 *:active:scale-98 *:transition-all">
                                    <button
                                        className="bg-custom-white text-custom-black"
                                        onClick={copy}>
                                        Copy the link !
                                    </button>
                                    <button
                                        className="bg-custom-black text-custom-white "
                                        onClick={download}>
                                        Download !
                                    </button>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <div className="bg-custom-white flex flex-col p-4 rounded-lg size-75">
                        <QRCode value={data || ""} fgColor={settings.fgColor} bgColor={settings.bgColor} size={268}/>
                    </div>
                </main>
                <ModalTrigger
                    className="bg-custom-black rounded-full p-1.5 drop-shadow-xl drop-shadow-black/25 absolute bottom-4 right-4" {...{onOpen}}>
                    <MdQuestionMark size={16} color="white"/>
                </ModalTrigger>
                <Modal
                    {...{open, onClose, setOpen}}
                    className="bg-custom-white flex gap-4 rounded-xl p-4"
                >
                    <a href="https://github.com/Thomasgsn/qurcode/" target="_blank"
                       className="flex items-center gap-2 rounded-lg bg-custom-black px-4 py-2 text-custom-white hover:opacity-50 active:scale-98 transition-all">
                        <FaGithub/>
                        <span>GitHub</span>
                    </a>
                </Modal>
            </div>
        </>
    )
}

export default App
