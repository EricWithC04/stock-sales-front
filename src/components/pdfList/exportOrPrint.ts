import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { PDFList } from './PDFList';

export const exportOrPrint = async (data: Array<any>, _mode: "export" | "print" = 'export') => {
    console.log("Intentando exportar");
    
    const blob = await pdf(PDFList({ data })).toBlob();
    saveAs(blob, 'listado.pdf');
};