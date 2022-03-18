import { useEffect } from 'react';
import {ILocationState} from "../services/types/types";
import {fetchIngredients} from "../services/actions/burger";
import {useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../services/hooks";

export function useIngredients() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {ingredients, ingredientsRequest} = useAppSelector(store => store.burger);

    useEffect(() => {
        const locationState = location.state as ILocationState;
        if (!locationState?.modal && (!ingredients || ingredients.length === 0) && !ingredientsRequest) {
            dispatch(fetchIngredients() as any)
        }
    }, [dispatch, location, ingredients, ingredientsRequest])

    return {isIngredientsLoaded: ingredients && !ingredientsRequest};
}