const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 0;

module.exports = function getPagination(query) {

    if (query.page === undefined && query.page_size === undefined) {
        return {
            offset: 0,
            limit: 500
        };
    }

    const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
    const limit = Math.abs(query.page_size) || DEFAULT_PAGE_LIMIT;
    
    const offset = (page - 1) * limit;
    
    return {
        offset,
        limit
    };
};
