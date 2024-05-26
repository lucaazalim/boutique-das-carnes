'use client';

import {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';

const Table = dynamic(() => import('./Table'));

const convertDateToISO = (date) => {
    if (!date) return date;
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
};

export default function Page() {
    const [startDateOfRange, setStartDateOfRange] = useState('');
    const [endDateOfRange, setEndDateOfRange] = useState('');
    const [relatorio, setRelatorio] = useState([]);

    const fetchRelatorio = () => {
        const url = `http://localhost:3001/relatorios/compras-by-fornecedor?startOfDateRange=${convertDateToISO(startDateOfRange)}&endOfDateRange=${convertDateToISO(endDateOfRange)}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setRelatorio(data);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        fetchRelatorio();
    }, []);

    return (
        <div>
            <h1 className="text-4xl font-semibold">Relatório de compras por fornecedor</h1>
            <div className="mt-5 grid grid-cols-7 gap-2">
                <div className="col-span-3 flex flex-col">
                    <label className="block mb-1" htmlFor="start-date">
                        Data mínima
                    </label>
                    <input
                        type="text"
                        placeholder="DD/MM/AAAA"
                        className="p-2 border-2 border-gray-200 rounded-md"
                        value={startDateOfRange}
                        onChange={(e) => setStartDateOfRange(e.target.value)}
                    />
                </div>
                <div className="col-span-3 flex flex-col">
                    <label className="block mb-1" htmlFor="end-date">
                        Data máxima
                    </label>
                    <input
                        type="text"
                        placeholder="DD/MM/AAAA"
                        className="p-2 border-2 border-gray-200 rounded-md"
                        value={endDateOfRange}
                        onChange={(e) => setEndDateOfRange(e.target.value)}
                    />
                </div>
                <div className="col-span-1 flex items-end">
                    <button
                        onClick={fetchRelatorio}
                        className="p-2 bg-blue-500 text-white rounded-md w-full"
                    >
                        Gerar
                    </button>
                </div>
            </div>
            <Table relatorio={relatorio}/>
        </div>
    );
}
