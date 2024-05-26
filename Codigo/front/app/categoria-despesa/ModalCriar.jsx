import React from "react";

function ModalCriar({openModal, setOpenModal}) {
    const [categoria, setCategoria] = React.useState({
        nome: "",
        descricao: "",
        cor: "",
    });

    const handleChange = (e) => {
        setCategoria({...categoria, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:3001/despesas-categorias", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(categoria),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setOpenModal(false)
                window.location.reload()
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className={`${openModal ? "" : "hidden"}`}>
            <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/70 z-50"></div>
            <div
                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 max-h-[calc(100vh-20%)] rounded-md overflow-auto scrollbartop">
                <h1 className="text-2xl font-semibold">Criar Compra</h1>
                <form className="mt-5 grid grid-cols-2 gap-2" onSubmit={handleSubmit}>
                    <label>
                        Nome:
                        <input
                            type="text"
                            name="nome"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Descrição:
                        <input
                            type="text"
                            name="descricao"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Cor:
                        <input
                            type="color"
                            name="cor"
                            className="p-2 border-2 border-gray-200 rounded-md w-full h-20"
                            onChange={handleChange}
                        />
                    </label>
                    <button
                        type="submit"
                        className="col-span-2 bg-green-500 text-white p-2 rounded-md"
                    >
                        Criar
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenModal(false);
                        }}
                        className="col-span-2 bg-red-500 text-white p-2 rounded-md"
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModalCriar;
