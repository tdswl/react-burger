import React from "react";
import styles from './feed.module.css'
import FeedOrder from "./components/feed-order/feed-order";
import {useDispatch, useSelector} from "react-redux";
import {ILocationState, IRootState} from "../../services/types/types";
import {useLocation, useNavigate} from "react-router-dom";
import {fetchIngredients} from "../../services/actions/burger";

const Feed = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const {feed} = useSelector((store: IRootState) => store.feed);
    const {ingredients, ingredientsRequest} = useSelector((store: IRootState) => store.burger);

    React.useEffect(() => {
        const locationState = location.state as ILocationState;
        // Если не модалка и нет ингридиентов, то надо бы запросить. Непонятно, есть ли роут для получение одного ингридиента
        if (!locationState?.modal && (!ingredients || ingredients.length === 0) && !ingredientsRequest) {
            dispatch(fetchIngredients())
        }
    }, [dispatch, location, ingredients, ingredientsRequest])

    const onOrderClick = (id: number) => {
        if (id) {
            navigate(`/feed/${id}`, {state: {background: location}})
        }
    };

    return (
        <section className={styles.ingredientsContainer}>
            {feed &&
                (
                    <article className={styles.scrollableContainer}>
                        <ul className={styles.ingredientsList}>
                            {feed?.orders?.map((item) =>
                                (
                                    <li key={item.number} onClick={() => onOrderClick(item.number)}>
                                        <FeedOrder order={item}/>
                                    </li>
                                ))}
                        </ul>
                    </article>
                )}
        </section>
    )
}

export default Feed;