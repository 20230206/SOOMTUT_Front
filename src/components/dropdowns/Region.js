import styles from "../../assets/styles/components/dropdowns/dropdown.module.css"

import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const Category_List = [ 
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

    const [selected, setSelected] = useState(null)
    useEffect(() => {
        if(!selected) {
            if(Object.keys(props).length === 0) {
                setSelected(Category_List[0]);
            }
            else {
                setSelected(Category_List[props.categoryId]);
            }
        }
    }, [props])

    const SelectCategory = (id) => {
        setSelected(Category_List[id]);
    }

    const [showList, setShowList] = useState(false)
    const handleShowList = () => setShowList(!showList);

    const CreateCategories = () => {
        const arr = []
            Category_List.map((item, index) => {
            arr.push(
                <button
                  key={index}
                  className={styles.categoryButton}
                  onClick={() => SelectCategory(item.id)}
                >
                    {item.name}
                </button>
            )
            })
        return arr;
    }

    const DropDown = () => {
        if(selected) {
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
        
    }

    return [DropDown, selected];
}
export default Region;