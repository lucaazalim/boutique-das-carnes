const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 1000;

module.exports = function getPagination(query) {
    const page = Math.abs(parseInt(query.page)) || DEFAULT_PAGE_NUMBER;
    const limit = Math.abs(parseInt(query.limit)) || DEFAULT_PAGE_LIMIT;
    
    const offset = (page - 1) * limit;
    
    return {
        offset,
        limit
    };
};
