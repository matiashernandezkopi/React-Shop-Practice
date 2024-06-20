import React, { Dispatch, SetStateAction, useState } from "react";
import { Ventas} from "../types/VentasDefinitions";

import { getCoreRowModel, useReactTable,  flexRender, ColumnDef, getPaginationRowModel, PaginationState } from "@tanstack/react-table";
import { MouseForm } from "./tableMouseForm";
import { deleteVenta, updatedVentas } from "../services/ventasdb";



interface VentasTableProps {
    data: Ventas[];
    setActualizar: Dispatch<SetStateAction<boolean>>;
    actualizar:boolean
}

export const VentasTable: React.FC<VentasTableProps> = ({ data, actualizar ,setActualizar }) => {
    
    const columns: ColumnDef<Ventas, unknown>[] = [{
        header: "ID",
        accessorKey: "id"
    }, {
        header: "Nombre",
        accessorKey: "name"
    }, {
        header: "Telefono",
        accessorKey: "phone"
    },{
        header: "Email",
        accessorKey: "email"
    }, {
        header: "Cantidad",
        accessorKey: "amount"
    }, {
        header: "Fecha",
        accessorKey: "date"
    }];
    
    
    const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

   
    const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
        state: {
        pagination,
        }, 
    });


    const [actualCellValue,setActualCellValue] = useState<string >("");
    const [cellType, setCellType] = useState<string>("");
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [editingRowId, setEditingRowId] = useState<string | null>(null);

    const handleCellClick = (Id: string,cellType:string,rowId: string,cellValue:string) => {
        if (rowId===selectedRowId) {
            setActualCellValue(cellValue)
            setCellType(cellType)
            
            
            setIsFormOpen(true);
            
            setEditingRowId(Id);

        }else{setSelectedRowId(rowId);}
        
    };

    const handleFormSubmit = (formData: string) => {
        if (editingRowId !== null) {
            updatedVentas(parseInt(editingRowId),cellType,  formData);
            setIsFormOpen(false);
            setEditingRowId(null);
            setActualizar(!actualizar)
        }
    };
    
    

    const handleFormClose = () => {
        setIsFormOpen(false);
    };

    const handleDeleteClick = async (ventaid: number) => {
        try {
            await deleteVenta(ventaid);
            setActualizar(!actualizar); // Actualiza los datos después de eliminar la venta
        } catch (error) {
            console.error('Error al eliminar la venta:', error);
        }
    };

    

    return (
        <>
            {isFormOpen && (<MouseForm isOpen={isFormOpen} onSubmit={handleFormSubmit} onClose={handleFormClose}  type={cellType} actualCellValue={actualCellValue}/>)}
            
            <table className="min-w-full divide-y divide-blue-500">
                <thead className="bg-blue-500 text-white w-full">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} >
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                            <th key="delete" > </th>
                        </tr>
                    ))}
                </thead>
                <tbody className="bg-white divide-y divide-blue-500 text-black">
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}  className={selectedRowId === row.id ? "bg-blue-200" : ""}>
                            {row.getVisibleCells().map(cell => (
                            <td key={cell.id} onClick={() => handleCellClick(row.getValue("id"), cell.column.id,row.id,cell.getValue() as string)} className="px-6 py-4 whitespace-nowrap">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                        <td>
                            <button className="text-red-700 " onClick={() => handleDeleteClick(row.getValue("id"))}><span role="img" aria-label="Tacho de basura">🗑️</span></button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center items-center gap-2">
                <button
                    className="border rounded p-1"
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                    >
                    {'<<'}
                    </button>
                    <button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    >
                    {'<'}
                </button>
                
                Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
                {table.getRowCount().toLocaleString()} Rows


                <button
                className="border rounded p-1"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                >
                {'>'}
                </button>
                <button
                className="border rounded p-1"
                onClick={() => table.lastPage()}
                disabled={!table.getCanNextPage()}
                >
                {'>>'}
                </button>
            </div>
            {/*<div className="flex items-center gap-2">
                
                
                <span className="flex items-center gap-1">
                <div>Page</div>
                <strong>
                    {table.getState().pagination.pageIndex + 1} of{' '}
                    {table.getPageCount().toLocaleString()}
                </strong>
                </span>
                <span className="flex items-center gap-1">
                | Go to page:
                <input
                    type="number"
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    table.setPageIndex(page)
                    }}
                    className="border p-1 rounded w-16 text-black"
                />
                </span>
                <select className="text-black"
                value={table.getState().pagination.pageSize}
                onChange={e => {
                    table.setPageSize(Number(e.target.value))
                }}
                >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                    </option>
                ))}
                </select>
            </div>*/}
            
            
            
        </>
    );
};

