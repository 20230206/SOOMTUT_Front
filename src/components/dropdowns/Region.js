import styles from "../../assets/styles/components/dropdowns/dropdown.module.css"

import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Region_List = [ 
    { id:1, name:"서울" },
    { id:2, name:"부산" },
    { id:3, name:"대전" },
    { id:4, name:"대구" },
    { id:5, name:"광주" },
    { id:6, name:"제주" },
    { id:7, name:"경기" },
    { id:8, name:"강원" },
    { id:9, name:"충북" },
    { id:10, name:"충남" },
    { id:11, name:"전북" },
    { id:12, name:"전남" },
    { id:13, name:"경북" },
    { id:14, name:"경남" }
];
function Region (props) {

    const [selected, setSelected] = useState(false)
    const navigate = useNavigate();

    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const memberId = params.get("memberId");

    const [category, setCategory] = useState(null);

    useEffect(() => {
        if(!selected) {
            if(Object.keys(props).length !== 0){
                setCategory(props.category);
                setSelected(true);
            }
            else {
                setCategory(0);
                setSelected(true);
            }
        }
    }, [])


    const [prevSelected, setPrevSelected] = useState();
    useEffect(() =>{
        if(selected && !prevSelected) {
            if(memberId && category)  {
                setPrevSelected(`/lectures?mode=search&memberId=${memberId}&category=${category}&region=`)
            }
            else if (!memberId && category) {
                setPrevSelected(`/lectures?mode=search&category=${category}&region=`)
            }
        }
    }, [selected, category])

    const SelectCategory = (item) => {
        console.log("NEXT : "+prevSelected + item.name);
        navigate(`${prevSelected}${item.name}`)
        setSelected(Region_List[item.id]);
    }

    const [showList, setShowList] = useState(false)
    const handleShowList = () => setShowList(!showList);

    const CreateCategories = () => {
        const arr = []
            Region_List.map((item, index) => {
            arr.push(
                <button
                  key={index}
                  className={styles.categoryButton}
                  onClick={() => SelectCategory(item)}
                >
                    {item.name}
                </button>
            )
            })
        return arr;
    }

    const DropDown = () => {
        return ( 
            <div className={styles.wrap}>
            <button
                className={styles.toggleButton}
                onClick={()=>handleShowList()}
            > 지역 {showList ? "▲" : "▼"} </button> 
            { showList && <CreateCategories /> }
            </div>
        )
        
    }

    return (
            <DropDown />
    );
}
export default Region;