import { useEffect } from 'react';
import {ILocationState, IRootState} from "../services/types/types";
import {fetchIngredients} from "../services/actions/burger";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

export function useIngredients() {
    const dispatch = useDispatch();
    const location = useLocation();
    const {ingredients, ingredientsRequest} = useSelector((store: IRootState) => store.burger);

    useEffect(() => {
        const locationState = location.state as ILocationState;
        if (!locationState?.modal && (!ingredients || ingredients.length === 0) && !ingredientsRequest) {
            dispatch(fetchIngredients())
        }
    }, [dispatch, location, ingredients, ingredientsRequest])

    return {isIngredientsLoaded: ingredients && !ingredientsRequest};
}