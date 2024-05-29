'use client';

import {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import {convertDateToISO} from '../../utils/date';

const Table = dynamic(() => import('./Table'));

export default function Page() {

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [relatorio, setRelatorio] = useState([]);

    const fetchRelatorio = () => {
        const url = `http://localhost:3001/relatorios/pedidos-por-cliente?fromDate=${convertDateToISO(fromDate)}&toDate=${convertDateToISO(toDate)}`;
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
            <h1 className="text-4xl font-semibold">Relatório de pedidos por cliente</h1>
            <div className="mt-5 grid grid-cols-7 gap-2 mb-5">
                <div className="col-span-3 flex flex-col">
                    <label className="block mb-1" htmlFor="start-date">
                        Data mínima
                    </label>
                    <input
                        type="text"
                        placeholder="DD/MM/AAAA"
                        className="p-2 border-2 border-gray-200 rounded-md"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
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
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
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
