import {useEffect} from 'react';
import {ILocationState} from "../types/types";
import {fetchIngredients} from "../actions/burger";
import {useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./hooks";

export function useIngredients() {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const {ingredients, ingredientsRequest} = useAppSelector(store => store.burger);

    useEffect(() => {
        const locationState = location.state as ILocationState;
        if (!locationState?.modal && (!ingredients || ingredients.length === 0) && !ingredientsRequest) {
            dispatch(fetchIngredients())
        }
    }, [dispatch, location, ingredients, ingredientsRequest])

    return {isIngredientsLoaded: ingredients && !ingredientsRequest};
}