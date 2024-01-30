interface TableData {
    // This is the schema for a column. The column should abide by
    // this schema for the column definition
    columns: Array<{
        id: string;        // <- id of the column. Should match the one on the data rows
        ordinalNo: number; // <- position of the column
        title: string;     // <- name of the column
        type: string;      // <- type of the data in the column
        width?: number;    // <- defines the width of the column
    }>;
    // Array of rows. Each columnId represents the cell on a given row for a given column
    data: Array<{
        id: string;                  // rowId
        [columnId: string]: any;    // Data for the column
    }>;
}

export { TableData };
