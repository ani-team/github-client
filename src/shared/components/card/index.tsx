import React from "react";
import cn from "classnames";
import "./index.scss";

type Props = {
    /** Заголовок */
    title?: string;
    /** Ссылка на сущность (в заголовке) */
    titleHref?: string;
    /** Описание */
    description?: string;
    /** Ссылка на превью */
    previewUrl?: string;
    /** Секция действий */
    actions?: React.ReactNode;
    /** Класс */
    className?: string;
};

/**
 * @UIKit Карточка
 * @remark Используется для отображения базовых сущностей: Repo, User, Org
 */
const Card = (props: Props) => {
    const { actions, previewUrl, description, title, titleHref, className } = props;

    return (
        <div className={cn("card", "flex", className)}>
            {previewUrl && (
                <div className="card__preview">
                    <img src={previewUrl} alt="preview" width={90} height={90} />
                </div>
            )}
            <div className="card__details ml-4 flex flex-col flex-grow">
                {title && (
                    <a className="card__title text-title" href={titleHref}>
                        {title}
                    </a>
                )}
                {description && <span className="card__description">{description}</span>}
            </div>
            {actions && <div className="card__actions ml-4">{actions}</div>}
        </div>
    );
};

export default Card;
