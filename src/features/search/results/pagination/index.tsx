import React from "react";
import { Pagination } from "antd";
import { PAGE_SIZE } from "../../hooks";

type Props = {
    /** Текущая страница */
    page: number;
    /** Количество результатов */
    count: number;
    /** @handler Изменение номера страницы */
    handlePageChange: (page: number) => void;
};

/**
 * Пагинация по поиску
 */
const ResultsPagination = (props: Props) => {
    const { count, page, handlePageChange } = props;
    return (
        <div className="search-results__pagination text-center mt-6">
            {count > PAGE_SIZE && (
                <Pagination
                    current={page}
                    /**
                     * Отображаем минимальное
                     * - либо по кол-ву результатов,
                     * - либо с ограничением в 100 страниц
                     * (как на github)
                     * @remark Да и их API не возвращает результаты после 1000
                     */
                    total={Math.min(count, 100 * PAGE_SIZE)}
                    onChange={handlePageChange}
                    pageSize={PAGE_SIZE}
                    showSizeChanger={false}
                    showQuickJumper
                    responsive
                />
            )}
        </div>
    );
};

export default ResultsPagination;
