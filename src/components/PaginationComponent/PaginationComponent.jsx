import { Pagination } from 'react-bootstrap';
import './PaginationComponent.css';

export default function PaginationComponent({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const renderPaginationItems = () => {
        let items = [];
        
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 3) {
            endPage = Math.min(5, totalPages);
        }
        if (currentPage >= totalPages - 2) {
            startPage = Math.max(1, totalPages - 4);
        }

        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </Pagination.Item>
            );
        }
        return items;
    };

    return (
        <div className='d-flex justify-content-center my-4'>
            <Pagination>
                <Pagination.First
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                />
                <Pagination.Prev
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                />
                {renderPaginationItems()}
                <Pagination.Next
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                />
                <Pagination.Last
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </div>
    );
}
