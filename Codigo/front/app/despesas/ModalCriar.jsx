import React from "react";
import ModalDocumentos from "../components/ModalDocumentos";

function ModalCriar({ openModal, setOpenModal }) {
    const [despesa, setDespesa] = React.useState({
        data: "",
        valor: "",
        nome: "",
    });
    const [openDocumento, setOpenDocumento] = React.useState(false);
    const [idDoc, setIdDoc] = React.useState(null);
    const [catDespesas, setCatDespesas] = React.useState([]);

    const handleChange = (e) => {
        setDespesa({ ...despesa, [e.target.name]: e.target.value });
    };

    React.useEffect(() => {
        setDespesa({ ...despesa, id_documento_comprovante: idDoc });
    }, [idDoc]);

    React.useEffect(() => {
        fetch(`http://localhost:3001/despesas-categorias`)
            .then((response) => response.json())
            .then((data) => {
                setCatDespesas(data);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:3001/despesas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(despesa),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setOpenModal(false);
                window.location.reload();
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className={`${openModal ? "" : "hidden"}`}>
            <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/70 z-50"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 z-50 max-h-[calc(100vh-20%)] rounded-md overflow-auto scrollbartop">
                <h1 className="text-2xl font-semibold">Criar Despesa</h1>
                <form
                    className="mt-5 grid grid-cols-2 gap-2"
                    onSubmit={handleSubmit}
                >
                    <label>
                        Data:
                        <input
                            type="date"
                            name="data"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Valor:
                        <input
                            type="number"
                            name="valor"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                            onChange={handleChange}
                        />
                    </label>
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
                        Categoria:
                        <select
                            name="id_categoria"
                            className="p-2 border-2 border-gray-200 rounded-md w-full"
                            onChange={handleChange}
                        >
                            <option value="">Selecione uma categoria</option>
                            {catDespesas.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.nome}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenDocumento(true);
                        }}
                        className="bg-blue-500 text-white p-2 rounded-md col-span-2"
                    >
                        Adicionar Documento
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 text-white p-2 rounded-md col-span-2"
                    >
                        Criar
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setOpenModal(false);
                        }}
                        className="bg-red-500 text-white p-2 rounded-md col-span-2"
                    >
                        Cancelar
                    </button>
                </form>
            </div>
            <ModalDocumentos
                openDocumento={openDocumento}
                setOpenDocumento={setOpenDocumento}
                setIdDoc={setIdDoc}
            />
        </div>
    );
}

export default ModalCriar;
