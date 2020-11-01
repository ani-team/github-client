import React, { useState } from "react";
import { Spin, Alert } from "antd";
import { usePrevious } from "shared/hooks";
import { useHelloQuery } from "../query.gen";

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
    const [count, setCount] = useState(1);
    const prevCount = usePrevious(count);
    const { data, loading, error } = useHelloQuery();

    return (
        <div
            className="demo-feat p-4 border border-solid"
            style={{ borderColor, borderWidth: count }}
        >
            <h2>DemoFeat</h2>
            <p>Контент для демонстрации отображения и функционала фичи</p>
            {/* <button onClick={() => client.resetStore().then(console.log)}>Logout</button> */}
            {error && <Alert message={error.message} type="error" showIcon />}
            <div className="demo-feat__content flex">
                <div className="demo-feat__user w-20 shadow mr-4 flex justify-center items-center">
                    {loading && <Spin className="absolute" />}
                    {data?.viewer.login || "-"}
                </div>
                <div className="demo-feat__history w-15 shadow p-4 mr-4">
                    <p className="text-gray-500">{prevCount || "-"}</p>
                    <p>{count}</p>
                </div>
                <div className="demo-feat__actions">
                    <button
                        type="button"
                        onClick={() => setCount(count + 1)}
                        className="demo-feat__btn"
                    >
                        Reduce
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DemoFeat;
