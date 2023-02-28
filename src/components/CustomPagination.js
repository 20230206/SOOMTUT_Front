import { Pagination } from "react-bootstrap";
import React, {
    useState
} from "react";


function CustomPagination(curPage, pages) {

    const [selected, setSelected] = useState(1);

    const CreatePagination = (props) => {
        let active = props.curPage;
        let middleLast = props.pages - (props.pages % 5);
        let items = [];
        
        let startnum = parseInt(props.curPage / 5);
        if(props.curPage%5 == 0) startnum = startnum -1;

        if (props.curPage <= 5) {
            for(let number = 1; number <= 5; number++){
                if(number <= props.pages)
                items.push( <Pagination.Item
                     key={number}
                     active={number===active}
                     onClick={() => setSelected(number)} >
                        {number}
                    </Pagination.Item>
                )
            };
            if(props.pages>5) {
                items.push(
                    <Pagination.Ellipsis/>  
                )
                items.push(
                    <Pagination.Next onClick={() => setSelected(6)}/>
                )
                items.push(
                    <Pagination.Last onClick={() => setSelected(props.pages)}/>
                )
            }
        }

        else if (props.curPage > 5 && props.curPage <= middleLast)
        {
            items.push(
                <Pagination.First onClick={() => setSelected(1)} />
            )
            items.push(
                <Pagination.Prev onClick={() => setSelected(startnum*5 - 4)} />
            )
            items.push(
              <Pagination.Ellipsis />
            )
            for(let number = (startnum*5) + 1;
                         number <= (startnum*5) +5; number++ )
            {
                if(number <= props.pages)
                    items.push(
                        <Pagination.Item
                     key={number}
                     active={number===active}
                     onClick={() => setSelected(number)}
                    >
                        {number}
                    </Pagination.Item>
                    )

            };
            items.push(
                <Pagination.Ellipsis />
            )
            items.push(
                <Pagination.Next  onClick={() => setSelected(startnum*5+6)}/>
            )
            items.push(
                <Pagination.Last onClick={() => setSelected(props.pages)} />
            )

        }

        else if (props.curPage > 5 && props.curPage > middleLast) {
            items.push(
                <Pagination.First onClick={() => setSelected(1)} />
            )
            items.push(
                <Pagination.Prev onClick={() => setSelected(startnum*5 - 4)} />
            )
            items.push(
              <Pagination.Ellipsis />
            )
            for(let number = (startnum*5) + 1;
            number <= (startnum*5) +5; number++ )
            {
                if(number <= props.pages)
                items.push(
                <Pagination.Item
                key={number}
                active={number===active}
                onClick={() => setSelected(number)}
                >
                    {number}
                </Pagination.Item>
            )
            };

        }
        return items;
    }

    const Pages = () => {
            return (
                <Pagination > 
                    <CreatePagination curPage={curPage} pages={pages} /> 
                </Pagination> 
            )
        }

    return [Pages, selected]
}
export default CustomPagination;