import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for managing table data with sorting, pagination, and search
 * @param {Array} data - The initial data array
 * @param {string} searchField - The field to search on (default: 'building')
 * @param {number} pageSize - Number of items per page (default: 10)
 * @param {string} defaultSortColumn - Default column to sort by
 * @param {string} defaultSortDirection - Default sort direction ('asc' or 'desc')
 * @returns {Object} Object containing all the table state and handlers
 */
export const useTableData = (
    data,
    searchField = 'building',
    pageSize = 10,
    defaultSortColumn = 'updatedAt',
    defaultSortDirection = 'desc'
) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState(defaultSortColumn);
    const [sortDirection, setSortDirection] = useState(defaultSortDirection);
    const [items, setItems] = useState(data);
    const [filteredItems, setFilteredItems] = useState(data);
    const tableRef = useRef(null);

    // Filter items based on search term
    useEffect(() => {
        const filtered = items.filter((item) =>
            item[searchField].toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(filtered);
        setCurrentPage(1);
    }, [searchTerm, items, searchField]);

    // Listen for the custom "change-sort" event emitted by <daikin-table>
    useEffect(() => {
        const tableEl = tableRef.current;
        if (!tableEl) return;

        const handleSortChange = (e) => {
            const column = e.target.sort;
            const direction = e.target.order;
            if (column) setSortColumn(column);
            if (direction) setSortDirection(direction);
        };

        tableEl.addEventListener('change-sort', handleSortChange);
        return () => {
            tableEl.removeEventListener('change-sort', handleSortChange);
        };
    }, []);

    // Sort items
    const sortItems = (column) => {
        const direction =
            sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortDirection(direction);
    };

    // Get sorted and paginated items
    const getSortedItems = () => {
        const sorted = [...filteredItems].sort((a, b) => {
            let aValue = a[sortColumn];
            let bValue = b[sortColumn];

            // Handle date sorting
            if (sortColumn === 'alertedAt' || sortColumn === 'updatedAt') {
                aValue = new Date(aValue);
                bValue = new Date(bValue);
            }

            if (sortDirection === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        return sorted;
    };

    const sortedItems = getSortedItems();
    const totalPages = Math.ceil(sortedItems.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentItems = sortedItems.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const updateItems = (newItems) => {
        setItems(newItems);
    };

    const addItem = (newItem) => {
        setItems((prev) => [...prev, newItem]);
    };

    const removeItem = (itemId) => {
        setItems((prev) => prev.filter((item) => item.id !== itemId));
    };

    const updateItem = (itemId, updates) => {
        setItems((prev) =>
            prev.map((item) => (item.id === itemId ? { ...item, ...updates } : item))
        );
    };

    return {
        // State
        searchTerm,
        currentPage,
        sortColumn,
        sortDirection,
        items,
        filteredItems,
        sortedItems,
        currentItems,
        totalPages,
        startIndex,
        endIndex,
        tableRef,

        // Handlers
        setSearchTerm,
        sortItems,
        handlePageChange,
        updateItems,
        addItem,
        removeItem,
        updateItem
    };
};
