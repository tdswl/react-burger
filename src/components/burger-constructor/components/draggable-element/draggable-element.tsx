import React, {FC, useRef} from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch} from "react-redux";
import {dndReorderIngredients, removeIngredient} from "../../../../services/actions/burger";
import {useDrag, useDrop, XYCoord} from 'react-dnd';
import {ISelectedIngredient} from "../../../../services/types/burger";

interface IDragItem {
    index: number
    id: string
    type: string
}

const DraggableElement: FC<{ component: ISelectedIngredient, index: number }> = ({component, index}) => {
    const dispatch = useDispatch();

    const onDelete = (ingredient: ISelectedIngredient) => {
        dispatch(removeIngredient(ingredient));
    };

    // Реализация ниже взята из примера https://react-dnd.github.io/react-dnd/examples/sortable/simple
    const ref = useRef<HTMLLIElement>(null);
    const [{handlerId}, drop] = useDrop({
        accept: 'ingredient',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: IDragItem, monitor) {
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
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
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
                handleClose={() => onDelete(component)}/>
        </li>
    )
}

export default DraggableElement;