import React, { Suspense, lazy, useEffect, useState } from "react"
import { Modal, ModalTrigger } from "./components/Modal";

import QRCode from "react-qr-code"

const Grainient = lazy(() => import("./components/Grainient"));

interface Settings {
    bgColor: string,
    fgColor: string,
}

const GithubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18a2.65 2.65 0 0 0-1.11-1.46c-.91-.62.07-.61.07-.61a2.1 2.1 0 0 1 1.53 1.03 2.13 2.13 0 0 0 2.91.83 2.14 2.14 0 0 1 .63-1.34c-2.22-.25-4.56-1.11-4.56-4.94a3.87 3.87 0 0 1 1.03-2.68 3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.48 9.48 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.37.84.4 1.79.1 2.64a3.86 3.86 0 0 1 1.03 2.68c0 3.84-2.34 4.69-4.57 4.93a2.39 2.39 0 0 1 .68 1.86V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
);

const QuestionIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.1 9a3 3 0 1 1 5.8 1c-.4 1-1.2 1.5-2 2.1-.7.5-.9 1-.9 1.9" />
        <path d="M12 17h.01" />
    </svg>
);

function App() {
    const [data, setData] = useState<string>('')
    const [settings, setSettings] = useState<Settings>({ bgColor: '#FFFFFF', fgColor: '#000000' })
    const [type, setType] = useState<"url" | "text">("url")

    useEffect(() => {
        document.title = "Free QR Code Generator | QURCode";

        const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
        if (description) {
            description.content = "Create free QR codes instantly for URLs and text. Customize colors, copy a shareable QR link, or download a PNG with QURCode.";
        }

        const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
        if (robots) robots.content = "index, follow, max-image-preview:large";

        const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (canonical) canonical.href = `${window.location.origin}/`;
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSettings((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const [open, setOpen] = useState(false);
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    const copy = () => {
        const params = new URLSearchParams({
            data,
            fg: settings.fgColor,
            bg: settings.bgColor,
        });
        const url = `${window.location.origin}/qr?${params.toString()}`;
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
                <div className="absolute top-0 left-0 right-0 bottom-0 w-dvw h-dvh -z-1 bg-[linear-gradient(135deg,#ff9ffc_0%,#5227ff_52%,#b19eef_100%)]" aria-hidden="true">
                    <Suspense fallback={null}>
                        <Grainient />
                    </Suspense>
                </div>
                <main
                    className="flex items-center max-h-dvh overflow-auto gap-6 p-2 h-full w-dvw flex-col lg:flex-row lg:items-end lg:justify-center lg: py-12">
                    <fieldset className="max-w-132 w-full">
                        <legend className="sr-only">Free QR code generator</legend>
                        <h1 className="sr-only">Free QR Code Generator</h1>
                        <div
                            className="flex items-center mb-2.5 bg-custom-white/70 backdrop-blur-xl w-fit rounded-lg relative overflow-hidden"
                            role="tablist"
                            aria-label="QR code content type">
                            <button className="z-2 h-full px-4 py-2.5" role="tab" aria-selected={type === "url"} onClick={() => setType("url")}>Send an url
                            </button>
                            <button className="z-2 h-full px-4 py-2.5" role="tab" aria-selected={type === "text"} onClick={() => setType("text")}>Send a text
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
                                            onChange={handleChange} />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="bgColor" className="text-lg">Background Color</label>
                                        <input type="color" name="bgColor" id="bgColor"
                                            value={settings.bgColor}
                                            className="w-full"
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <hr className="my-4 opacity-25" />
                                <div className="flex flex-col">
                                    <label htmlFor="content"
                                        className="mb-1 text-lg">{type == "url" ? "Link" : "Content"}</label>
                                    {type == "url" ?
                                        <input
                                            className="bg-custom-white inset-shadow-xl inset-shadow-custom-black rounded-lg py-2 px-3"
                                            type="url"
                                            inputMode="url"
                                            autoComplete="url"
                                            name="content"
                                            id="content"
                                            placeholder="Enter your url here"
                                            value={data}
                                            onChange={(e) => setData(e.target.value)} />
                                        :
                                        <textarea
                                            className="bg-custom-white inset-shadow-xl inset-shadow-custom-black rounded-lg py-2 px-3 max-h-[20vh] min-h-16"
                                            name="content"
                                            id="content"
                                            placeholder="Enter your text here"
                                            value={data}
                                            onChange={(e) => setData(e.target.value)} />
                                    }
                                </div>
                            </div>

                            <div>
                                <hr className="mb-4 opacity-25" />
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
                    <div className="bg-custom-white flex flex-col p-4 rounded-lg size-75" aria-label="Generated QR code preview">
                        <QRCode value={data || ""} fgColor={settings.fgColor} bgColor={settings.bgColor} size={268} />
                    </div>
                </main>
                <ModalTrigger
                    aria-label="Open project links"
                    className="bg-custom-black text-custom-white rounded-full p-1.5 drop-shadow-xl drop-shadow-black/25 absolute bottom-4 right-4" {...{ onOpen }}>
                    <QuestionIcon />
                </ModalTrigger>
                <Modal
                    {...{ open, onClose, setOpen }}
                    className="bg-custom-white flex gap-4 rounded-xl p-4"
                >
                    <a href="https://github.com/Thomasgsn/qurcode/" target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg bg-custom-black px-4 py-2 text-custom-white hover:opacity-50 active:scale-98 transition-all">
                        <GithubIcon />
                        <span>GitHub</span>
                    </a>
                </Modal>
            </div>
        </>
    )
}

export default App
