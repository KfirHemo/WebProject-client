import React, { ChangeEvent } from 'react';
import { Form, Col, Pagination } from 'react-bootstrap';

interface PaginationComponentProps {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    onPageChange: (pageNumber: number) => void;
    onItemsPerPageChange: (itemsPerPage: number) => void;
    availableItemsPerPage: number[];
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
    currentPage,
    itemsPerPage,
    totalItems,
    onPageChange,
    onItemsPerPageChange,
    availableItemsPerPage,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        if (typeof onPageChange === 'function') {
            onPageChange(pageNumber);
        }
    };

    const handleItemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedItemsPerPage = parseInt(e.target.value, 10);
        const newTotalPages = Math.ceil(totalItems / selectedItemsPerPage);

        let newPage = currentPage;
        if (newTotalPages >= currentPage) {
            const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
            newPage = Math.max(1, Math.ceil(indexOfFirstItem / selectedItemsPerPage) + 1);
        }

        onItemsPerPageChange(selectedItemsPerPage);

        if (typeof onPageChange === 'function') {
            onPageChange(newPage);
        }
    };

    return (
        <Form.Group className="mb-3" controlId="formGroupPagination">
            <Col>
                <Pagination>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </Col>
            <Form.Label>Items per page:</Form.Label>
            <Col xs={3}>
                <Form.Select
                    className="ml-2 custom-select-sm"
                    name="itemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                >
                    {availableItemsPerPage.map((items) => (
                        <option key={items} value={items}>
                            {items}
                        </option>
                    ))}
                    <option value={totalItems}>All</option>
                </Form.Select>
            </Col>
        </Form.Group>
    );
};

export default PaginationComponent;
