function formatCPFOrCNPJ(document) {
    // Remove all non-numeric characters
    document = document.replace(/\D/g, '');

    if (document.length === 11) {
        // Format as CPF: XXX.XXX.XXX-XX
        return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (document.length === 14) {
        // Format as CNPJ: XX.XXX.XXX/XXXX-XX
        return document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    } else {
        // Return the original string if it's neither CPF nor CNPJ length
        return document;
    }
}

export {formatCPFOrCNPJ};