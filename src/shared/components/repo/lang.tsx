import React from "react";
import { Language } from "models";

type Props = Partial<Language>;

// FIXME: specify types
// FIXME: move to shared? (ждем пока появится еще хотя бы 1 место использования)
const Lang = ({ color, name }: Props) => {
    if (!color || !name) return null;
    return (
        <div className="repo__lang flex items-center">
            <span
                className="repo__lang-marker"
                style={{
                    backgroundColor: color,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                }}
            />
            <span className="repo__lang-label ml-2">{name}</span>
        </div>
    );
};

export default Lang;
