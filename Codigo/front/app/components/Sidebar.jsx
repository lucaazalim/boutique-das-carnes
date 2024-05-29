'use client';

import {useState} from 'react';
import {
    FaBars,
    FaX,
    FaUser,
    FaCartShopping,
    FaMoneyBill,
    FaClipboardList,
    FaChartLine,
    FaWarehouse,
    FaFileInvoice
} from "react-icons/fa6";
import Link from "next/link";
import {FaHome} from "react-icons/fa";
import {usePathname} from "next/navigation";

function Item({href, name, onClick, icon: Icon}) {

    const isCurrent = href === usePathname();

    return (
        <Link href={href} className="text-gray-700" onClick={onClick}>
            <li className={`py-2 rounded-xl px-3 mb-3 ${isCurrent ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>
                <div className="flex">
                    <div className="flex flex-col justify-center">
                        {Icon && <Icon className="text-xl inline-block mr-2"/>}
                    </div>
                    <div>
                        {name}
                    </div>
                </div>
            </li>
        </Link>
    );
}

export default function Sidebar() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button onClick={toggleDrawer}
                    className="p-4 mr-2 text-xl bg-secondary text-white rounded hover:scale-105 transition-transform z-10">
                <FaBars/>
            </button>
            <div
                className={`fixed inset-0 bg-black bg-opacity-75 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleDrawer}></div>
            <div
                className={`overflow-auto fixed inset-y-0 left-0 w-max bg-white shadow-md z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4">
                    <div className="absolute right-3 top-3">
                        <button onClick={toggleDrawer} className="text-gray-600">
                            <FaX/>
                        </button>
                    </div>
                    <h2 className="text-xl font-bold mb-5">Menu</h2>
                    <ul>
                        <Item href="/" name="Início" onClick={toggleDrawer} icon={FaHome}/>
                        <Item href="/fornecedores" name="Fornecedores" onClick={toggleDrawer} icon={FaUser}/>
                        <Item href="/clientes" name="Clientes" onClick={toggleDrawer} icon={FaUser}/>
                        <Item href="/compras" name="Compras" onClick={toggleDrawer} icon={FaCartShopping}/>
                        <Item href="/estoque" name="Estoque" onClick={toggleDrawer} icon={FaWarehouse}/>
                        <Item href="/despesas" name="Despesas" onClick={toggleDrawer} icon={FaMoneyBill}/>
                        <ul className="pl-5">
                            <Item href="/categoria-despesa" name="Categorias" onClick={toggleDrawer}
                                  icon={FaClipboardList}/>
                        </ul>
                        <Item href="/pedidos" name="Pedidos" onClick={toggleDrawer} icon={FaFileInvoice}/>
                    </ul>
                </div>
                <div className="p-4 border-t">
                    <h2 className="text-xl font-bold mb-5">Relatórios</h2>
                    <ul>
                        <Item href="/relatorios/compras-por-fornecedor" name="Compras por fornecedor"
                              onClick={toggleDrawer} icon={FaChartLine}/>
                        <Item href="/relatorios/pedidos-por-cliente" name="Pedidos por cliente" onClick={toggleDrawer}
                              icon={FaChartLine}/>
                        <Item href="/relatorios/lucro-por-compra" name="Lucro por compra" onClick={toggleDrawer}
                              icon={FaChartLine}/>
                    </ul>
                </div>
                <div className="p-4 border-t">
                    <h2 className="text-xl font-bold mb-5">Sistema</h2>
                    <ul>
                        <Item href="/usuarios" name="Usuários" onClick={toggleDrawer} icon={FaUser}/>
                    </ul>
                </div>
            </div>
        </>
    );
};
