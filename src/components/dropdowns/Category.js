import styles from "../../assets/styles/components/dropdowns/dropdown.module.css"

import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

    const [selected, setSelected] = useState(false)
    const navigate = useNavigate();

    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const memberId = params.get("memberId");

    const [region, setRegion] = useState(null);

    useEffect(() => {
        if(!selected) {
            if(Object.keys(props).length !== 0){
                setRegion(props.region);
                setSelected(true);
            }
            else {
                setRegion(0);
                setSelected(true);
            }
        }
    }, [])


    const [prevSelected, setPrevSelected] = useState();
    useEffect(() =>{
        if(selected && !prevSelected) {
            if(memberId && region)  {
                setPrevSelected(`/lectures?mode=search&memberId=${memberId}&region=${region}&category=`)
            }
            else if (!memberId && region) {
                setPrevSelected(`/lectures?mode=search&region=${region}&category=`)
            }
        }
    }, [prevSelected, region])

    const SelectCategory = (item) => {
        console.log("NEXT : "+prevSelected + item.id);
        navigate(`${prevSelected}${item.id}`)
        setSelected(Category_List[item.id]);
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
                    className={`${styles.toggleButton} ${showList ? styles.active : ''}`}
                    onClick={handleShowList}
                >
                    카테고리 {showList ? '▲' : '▼'}
                </button>
                {showList && <CreateCategories />}
            </div>
        )
    }

    return (
        <div>
            <DropDown />
        </div>
    );
}

export default Category;