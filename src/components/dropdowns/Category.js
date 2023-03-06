import styles from "../../assets/styles/components/dropdowns/dropdown.module.css"

import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const Category_List = [ 
    { id:0, name:"전체" },
    { id:1, name:"스포츠" },
    { id:2, name:"댄스" },
    { id:3, name:"공부" },
    { id:4, name:"외국어" },
    { id:5, name:"음악" },
    { id:6, name:"IT" },
    { id:7, name:"디자인" },
    { id:8, name:"요리" },
    { id:9, name:"미술" },
    { id:10, name:"운동" }
];

function Category(props) {

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
                > 카테고리 {showList ? "▲" : "▼"} </button> 
                { showList && <CreateCategories /> }
              </div>
            )
        }
        
    }

    return [DropDown, selected];
}

export default Category;