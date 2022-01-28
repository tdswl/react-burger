import React, {useRef} from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch} from "react-redux";
import {dndReorderIngredients, removeIngredient} from "../../../../services/actions/burger";
import {ingredientPropTypes} from "../../../../utils/prop-types";
import {useDrag, useDrop} from 'react-dnd';
import PropTypes from "prop-types";

const DraggableElement = ({component, index}) => {
    const dispatch = useDispatch();

    const onDelete = (e, ingredient) => {
        e.stopPropagation();
        dispatch(removeIngredient(ingredient));
    };

    // Реализация ниже взята из примера https://react-dnd.github.io/react-dnd/examples/sortable/simple
    const ref = useRef(null);
    const [{handlerId}, drop] = useDrop({
        accept: 'ingredient',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            dispatch(dndReorderIngredients({dragIndex, hoverIndex}));
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    const [{isDragging}, drag] = useDrag({
        type: 'ingredient',
        item: () => {
            const key = component.key;
            return {key, index};
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <li ref={ref} style={{opacity}} data-handler-id={handlerId}>
            <DragIcon type="primary"/>
            <ConstructorElement
                text={component.name}
                price={component.price}
                thumbnail={component.image}
                handleClose={(e) => onDelete(e, component)}/>
        </li>
    )
}

DraggableElement.propTypes = {
    component: ingredientPropTypes.isRequired,
    index: PropTypes.number.isRequired
};

export default DraggableElement;