import React from "react";

type Props = {
    borderColor?: React.CSSProperties["borderColor"];
};

/**
 * @feature Демо-фича для демонстрации:
 * - структуры фичи
 * - использования фичи
 * - реализации фичи
 * !!! FIXME: Удалить позднее (после реализации реальных фич)
 */
const DemoFeat = ({ borderColor = "#a6b2c3" }: Props) => {
    return (
        <div className="demo-feat p-4 border border-solid" style={{ borderColor }}>
            <h2>DemoFeat</h2>
            <p>Контент для демонстрации отображения и функционала фичи</p>
        </div>
    );
};

export default DemoFeat;
