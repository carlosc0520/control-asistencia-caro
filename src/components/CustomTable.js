
import DataTable, { Alignment } from 'react-data-table-component';
import CustomLoader from './CustomLoader';

const CustomTable = ({
    columns,
    data,
    onSort,
    isConvert = true,
    pagination = true,
    progressPending,
    customStyles,
    title = ''
}) => {

    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };
    const convertData = (data) => {
        if (!isConvert) return data;
        let newData = data.map((obj, index) => ({ ...obj, index: (index + 1) }))
        return newData
    }



    return (
        <div className="my-4 table-general">
            <p
                className="text-center text-2xl font-bold text-gray-800"
            >{title}</p>
            <DataTable
                customStyles={customStyles}
                subHeaderAlign={Alignment.CENTER}
                columns={columns}
                data={convertData(data)}
                pagination={pagination}
                paginationComponentOptions={paginationComponentOptions}
                responsive
                onSort={onSort}
                progressPending={progressPending}
                progressComponent={<CustomLoader />}
                noDataComponent={<div style={{ padding: "24px" }}>No hay registros para mostrar</div>}
            />
        </div>
    );
};

export default CustomTable;